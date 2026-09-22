// ================================================================
// 안내도 기반 데이터. 모든 px 는 assets/resort-map-annot.png 위 픽셀 좌표를
// "폭 2000 기준"으로 적은 값 (실제 이미지 2158px → PX_SCALE 로 환산).
// ================================================================
window.MAP_IMG = { src:'assets/resort-map-annot.png', w:2158, h:838 };
window.PX_SCALE = 2158/2000;

// ----- GPS(위경도) ↔ 안내도 픽셀 보정점 -----
// 앱은 이 쌍들로 최소제곱 아핀변환을 구해 GPS 점을 안내도 위에 찍는다.
// 앱의 "보정" 모드로 쌍을 추가하면 localStorage 에 쌓이고, 여기로 옮겨 적으면 영구 반영.
window.CALIB = [
  { px:[655,668],  lat:20.9125539, lng:-156.6912768, name:'Lahaina 엘리베이터' },
  { px:[1745,555], lat:20.9135683, lng:-156.6929377, name:'Napili 엘리베이터' },
  { px:[412,627],  lat:20.9119657, lng:-156.6912590, name:'Monarchy(33)' },
  { px:[480,440],  lat:20.9119100, lng:-156.6913120, name:'Media Lounge(18)' },
];

// ----- 지점(노드). venue:true 만 목적지 선택 가능. floor: L | 1 | out -----
// px 는 안내도 상 아이콘 위치(실측 GPS 와 별개). est:true 는 안내도 상 위치 추정.
window.NODES = {
  // 목적지
  sunsetTerrace:{ name:'Sunset Terrace',            px:[345,365],  floor:'1', venue:true, note:'안내도 1번 · 로비에서 계단 ↓' },
  mediaLounge:  { name:'Media Lounge',              px:[480,440],  floor:'1', venue:true, note:'안내도 18번 · 로비에서 계단 ↓' },
  monarchy14:   { name:'Monarchy Ballroom 1-4',     px:[412,627],  floor:'1', venue:true, note:'안내도 33번 · 로비에서 계단 ↓ · 키노트' },
  monarchy57:   { name:'Monarchy 5-7',              px:[440,660],  floor:'1', venue:true, note:'33번 옆 · 데모' },
  lahElev:      { name:'Lahaina Tower 엘리베이터',   px:[655,665],  floor:'L', venue:true, note:'미팅룸 351·364(3층) / 479(4층) / 579(5층)' },
  lahaina12:    { name:'Lahaina Room 1 & 2',        px:[620,540],  floor:'L', venue:true, est:true, note:'Lahaina Tower 로비층' },
  lahaina34:    { name:'Lahaina Room 3 & 4',        px:[600,585],  floor:'L', venue:true, est:true, note:'Lahaina Tower 로비층' },
  halonaKai:    { name:'Halona Kai Lawn',           px:[1200,565], floor:'L', venue:true, est:true, note:'Atrium Tower 옆 잔디 입구' },
  atriumElev:   { name:'Atrium Tower 엘리베이터',    px:[1230,632], floor:'1', venue:true },
  recCenter:    { name:'레크리에이션 센터',           px:[1400,400], floor:'1', venue:true, est:true, note:'수영장 앞' },
  jacuzzi:      { name:'자쿠지',                    px:[1784,354], floor:'1', venue:true, est:true, note:'바다쪽' },
  napiliElev:   { name:'Napili Tower 엘리베이터',    px:[1745,555], floor:'1', venue:true },
  smoking:      { name:'흡연 구역',                  px:[1885,690], floor:'out', venue:true, note:'실외 · 도로 옆' },
  // 경유점 (빨간 도보길 위)
  bW:{px:[60,300]}, b1:{px:[200,240]}, b2:{px:[450,235]}, b3:{px:[700,215]}, b4:{px:[1000,190]}, b5:{px:[1090,170]}, b6:{px:[1500,130]}, b7:{px:[1720,150]}, b8:{px:[1750,185]},
  sunsetLink:{px:[440,300]}, groupEnt:{px:[240,470]}, lobbyW:{px:[400,390]},
  stairs:{px:[555,470], name:'로비 계단', floor:'L'}, lobbyS:{px:[440,520]},
  lahLink:{px:[700,600]},
  s1:{px:[700,550]}, s2:{px:[900,560]}, s3:{px:[1150,540]}, s4:{px:[1330,530]}, s5:{px:[1470,525]}, s6:{px:[1600,610]}, s7:{px:[1790,690]},
  atriumN:{px:[1275,380]}, pool1:{px:[1060,280]}, pool2:{px:[1130,260]}, pool3:{px:[1200,320]},
  napPool:{px:[1680,360]}, nap2:{px:[1700,440]}, nap3:{px:[1740,470]},
};

// ----- 도보 이동로(간선) — 안내도의 빨간 선. stairs:true 는 층 이동(+40m, 안내문구) -----
window.EDGES = [
  // 해변 산책로
  ['bW','b1'],['b1','b2'],['b2','b3'],['b3','b4'],['b4','b5'],['b5','b6'],['b6','b7'],['b7','b8'],
  // Sunset Terrace / 로비 남쪽
  ['b2','sunsetLink'],['sunsetLink','lobbyW'],
  ['lobbyW','sunsetTerrace',{stairs:true,msg:'계단으로 1층 내려가기'}],
  ['groupEnt','bW'],['groupEnt','lobbyS'],['lobbyS','lobbyW'],
  ['stairs','mediaLounge',{stairs:true,msg:'계단으로 1층 내려가기'}],
  ['stairs','lobbyS'],
  ['lobbyS','monarchy14',{stairs:true,msg:'계단으로 1층 내려가기'}],
  ['monarchy14','monarchy57'],['mediaLounge','monarchy14'],
  // Lahaina Tower 로비층
  ['stairs','lahaina12'],['lahaina12','lahaina34'],['lahaina34','lahLink'],['lahLink','lahElev'],
  ['stairs','s1'],['lahaina12','s1'],['lahLink','s1'],
  // 중앙 통로
  ['s1','s2'],['s2','s3'],['s3','s4'],['s4','s5'],['s5','s6'],['s6','s7'],['s7','smoking'],
  ['s3','atriumElev'],['s4','atriumElev'],['s3','halonaKai'],['halonaKai','atriumN'],
  // 수영장 쪽
  ['atriumN','pool3'],['pool3','pool2'],['pool2','b5'],['pool2','pool1'],['pool1','b4'],
  ['pool3','recCenter'],['recCenter','napPool'],['napPool','jacuzzi'],
  ['b8','napPool'],['napPool','nap2'],['nap2','nap3'],['nap3','napiliElev'],
  ['s5','napiliElev'],['s5','nap3'],
];

// ===== 일정 (HST). v: NODES 키. null 이면 리조트 밖(안내 없음) =====
window.SCHEDULE = [
  { date: '2026-09-22', day: 'Day 1 · 화', items: [
    { s: '06:30', e: '07:30', t: 'Train Like a Manchester United Pro', v: 'halonaKai' },
    { s: '06:30', e: '08:30', t: '조식', v: 'sunsetTerrace' },
    { s: '08:45', e: '11:00', t: 'CEO 비전 및 모바일 키노트 | Snapdragon for the Agentic Age', v: 'monarchy14' },
    { s: '12:00', e: '13:00', t: '중식', v: 'sunsetTerrace' },
    { s: '13:00', e: '14:00', t: 'Day 1 데모', v: 'monarchy57' },
    { s: '14:00', e: '14:30', t: '두르가 말라디 – 6G 미디어 라운드테이블', sub: 'Durga Malladi, EVP, GM, Technology Planning, Edge Solutions, and Data Center', v: 'lahElev', room: 'Meeting Room 351 · 3층' },
    { s: '14:30', e: '15:30', t: '모바일 벤치마킹', v: 'lahaina12' },
    { s: '16:00', e: '16:45', t: '모바일 Q&A', v: 'lahaina34' },
    { s: '17:00', e: '21:00', t: '석식', v: null, place: 'Olowalu Plantation House (리조트 밖)' },
  ]},
  { date: '2026-09-23', day: 'Day 2 · 수', items: [
    { s: '06:30', e: '07:30', t: 'Train Like an F1 Driver', v: 'halonaKai' },
    { s: '06:30', e: '08:30', t: '조식', v: 'sunsetTerrace' },
    { s: '09:00', e: '11:30', t: '퍼스널 AI, 사운드 및 PC 키노트 | Snapdragon for the Agentic Age', v: 'monarchy14' },
    { s: '11:30', e: '12:00', t: '크리스 패트릭 – 모바일 미디어 라운드테이블', sub: 'Chris Patrick, SVP & GM, Mobile Handset', v: 'lahElev', room: 'Executive Meeting Room 579 · 5층' },
    { s: '12:00', e: '12:45', t: '중식', v: 'sunsetTerrace' },
    { s: '13:45', e: '14:30', t: '니틴 쿠마르 – 컴퓨트 미디어 라운드테이블', sub: 'Nitin Kumar, VP, Product Management', v: 'lahElev', room: 'Meeting Room 364 · 3층' },
    { s: '14:30', e: '15:15', t: '퍼스널 AI 및 사운드 Q&A', v: 'lahaina34' },
    { s: '16:00', e: '17:00', t: 'Day 2 데모', v: 'monarchy57' },
    { s: '16:30', e: '20:30', t: '석식', v: null, place: "Leilani's (리조트 밖)" },
  ]},
  { date: '2026-09-24', day: 'Day 3 · 목', items: [
    { s: '06:30', e: '07:30', t: 'Sunrise Yoga with The rOMing Yogi', v: 'halonaKai' },
    { s: '06:30', e: '08:00', t: '조식', v: 'sunsetTerrace' },
    { s: '08:00', e: '08:45', t: '지아드 아스가르 – 퍼스널 AI 미디어 라운드테이블', sub: 'Ziad Asghar, SVP & GM, XR, Wearables and Personal AI', v: 'lahElev', room: 'Executive Meeting Room 479 · 4층' },
    { s: '09:00', e: '11:00', t: 'Elite Experiences', v: 'monarchy14' },
    { s: '10:30', e: '12:00', t: '데모 (Day 2와 동일)', v: 'monarchy57' },
    { s: '12:00', e: '13:30', t: '중식', v: 'sunsetTerrace' },
    { s: '13:00', e: '16:00', t: 'Chair Massage + Lokelani Essentials', v: 'halonaKai' },
    { s: '16:30', e: '21:00', t: '루아우 (Luau)', v: null, place: 'Westin Hotel – Aloha Pavilion (리조트 밖)' },
  ]},
];
