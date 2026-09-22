// ================================================================
// 안내도 기반 데이터. px 는 assets/resort-map-v2.png (1672x941) 위 픽셀 좌표.
// 배경 이미지에 라벨·핀이 이미 그려져 있으므로 앱은 작은 링 마커만 겹쳐 그린다.
// ================================================================
window.MAP_IMG = { src:'assets/resort-map-v2.png', w:1672, h:941 };
window.PX_SCALE = 1;

// ----- GPS(위경도) ↔ 안내도 픽셀 보정점 (최소제곱 아핀변환) -----
// 앱 "보정" 모드로 추가한 쌍은 localStorage 에 쌓임 → 일정 탭 하단에서 복사해 여기로 옮기면 영구 반영.
window.CALIB = [
  { px:[528,668],  lat:20.9125539, lng:-156.6912768, name:'Lahaina 엘리베이터' },
  { px:[1475,553], lat:20.9135683, lng:-156.6929377, name:'Napili 엘리베이터' },
  { px:[290,585],  lat:20.9119657, lng:-156.6912590, name:'Monarchy' },
  { px:[350,462],  lat:20.9119100, lng:-156.6913120, name:'Media Lounge' },
];

// ----- 지점(노드). venue:true 만 목적지. floor: L | 1 | out -----
window.NODES = {
  // 목적지 (배경 이미지의 핀 위치)
  sunsetTerrace:{ name:'Sunset Terrace',            px:[195,378],  floor:'1', venue:true, note:'로비에서 계단 ↓ · 식사' },
  mediaLounge:  { name:'Media Lounge',              px:[350,462],  floor:'1', venue:true, note:'로비에서 계단 ↓' },
  lahaina12:    { name:'Lahaina Room 1 & 2',        px:[430,497],  floor:'L', venue:true, note:'Lahaina Tower 로비층' },
  lahaina34:    { name:'Lahaina Room 3 & 4',        px:[445,543],  floor:'L', venue:true, note:'Lahaina Tower 로비층' },
  monarchy14:   { name:'Monarchy Ballroom 1-4',     px:[290,585],  floor:'1', venue:true, note:'로비에서 계단 ↓ · 키노트' },
  monarchy57:   { name:'Monarchy 5-7',              px:[350,663],  floor:'1', venue:true, note:'Monarchy 1-4 옆 · 데모' },
  lahElev:      { name:'Lahaina Tower 엘리베이터',   px:[528,668],  floor:'L', venue:true, note:'미팅룸 351·364(3층) / 479(4층) / 579(5층)' },
  halonaKai:    { name:'Halona Kai Lawn',           px:[1030,540], floor:'L', venue:true, note:'Atrium Tower 옆 잔디 입구' },
  atriumElev:   { name:'Atrium Tower 엘리베이터',    px:[962,650],  floor:'1', venue:true },
  recCenter:    { name:'레크리에이션 센터',           px:[1160,352], floor:'1', venue:true, note:'수영장 앞' },
  jacuzzi:      { name:'자쿠지',                    px:[1410,385], floor:'1', venue:true, note:'Napili Pool 옆' },
  napiliElev:   { name:'Napili Tower 엘리베이터',    px:[1475,553], floor:'1', venue:true },
  smoking:      { name:'흡연 구역',                  px:[1530,768], floor:'out', venue:true, note:'실외 · 도로 옆' },
  // 경유점 (배경의 빨간 도보길 위)
  bW:{px:[40,385]}, b1:{px:[160,345]}, b2:{px:[330,310]}, b3:{px:[430,280]}, b4:{px:[700,250]}, b5:{px:[890,235]}, b6:{px:[1000,200]}, b7:{px:[1210,190]}, b8:{px:[1420,215]}, b9:{px:[1510,255]},
  n1:{px:[1495,335]}, n2:{px:[1470,400]}, n3:{px:[1445,470]}, n4:{px:[1440,540]},
  p1:{px:[870,300]}, p2:{px:[905,370]}, p3:{px:[1000,400]}, p4:{px:[1060,440]}, p5:{px:[1050,490]},
  sl1:{px:[360,350]}, sl2:{px:[372,405]}, lobbyN:{px:[355,440]},
  stairs:{px:[372,470], name:'로비 계단', floor:'L'}, lobbyS:{px:[300,500]},
  gW:{px:[170,455]}, g1:{px:[200,520]}, g2:{px:[240,535]},
  c0:{px:[395,525]}, c1:{px:[430,600]}, c2:{px:[600,590]}, c3:{px:[700,600]}, c4:{px:[820,625]}, c5:{px:[900,610]}, c6:{px:[985,590]}, c7:{px:[1100,605]}, c8:{px:[1250,605]}, c9:{px:[1400,640]}, c10:{px:[1500,700]},
  lahLink:{px:[520,640]},
};

// ----- 도보 이동로(간선). stairs:true 는 층 이동(+40m, 안내문구) -----
window.EDGES = [
  // 해변 산책로 → Napili Tower
  ['bW','b1'],['b1','b2'],['b2','b3'],['b3','b4'],['b4','b5'],['b5','b6'],['b6','b7'],['b7','b8'],['b8','b9'],
  ['b9','n1'],['n1','n2'],['n2','n3'],['n3','n4'],['n4','napiliElev'],
  // 수영장 루프
  ['b5','p1'],['p1','p2'],['p2','p3'],['p3','p4'],['p4','p5'],['p5','halonaKai'],
  ['p3','recCenter'],['recCenter','b7'],['jacuzzi','n2'],['jacuzzi','b8'],
  // Lahaina Tower 로비 / 1층
  ['b2','sl1'],['sl1','sl2'],['sl2','lobbyN'],['lobbyN','stairs'],
  ['stairs','mediaLounge',{stairs:true,msg:'계단으로 1층 내려가기'}],
  ['stairs','sunsetTerrace',{stairs:true,msg:'계단으로 1층 내려가기'}],
  ['stairs','lobbyS'],['lobbyS','monarchy14',{stairs:true,msg:'계단으로 1층 내려가기'}],
  ['mediaLounge','sunsetTerrace'],['mediaLounge','monarchy14'],['monarchy14','monarchy57'],
  ['gW','bW'],['gW','g1'],['g1','g2'],['g2','lobbyS'],
  ['stairs','c0'],['c0','lahaina12'],['lahaina12','lahaina34'],['lahaina34','c1'],['c1','lahLink'],['lahLink','lahElev'],
  // 중앙 통로 → Atrium → Napili → 흡연구역
  ['c1','c2'],['c2','c3'],['c3','c4'],['c4','c5'],['c5','c6'],['c6','c7'],['c7','c8'],['c8','c9'],['c9','c10'],['c10','smoking'],
  ['c6','halonaKai'],['c6','atriumElev'],['c7','atriumElev'],['c9','napiliElev'],['c9','n4'],
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
