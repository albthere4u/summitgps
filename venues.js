// ===== 지점(노드) =====
// 현장 측정 좌표. floor: 'L'(로비층) | '1'(로비 아래층) | 'out'(실외)
// venue:true 인 노드만 목적지로 선택 가능. 나머지는 경로 연결용 경유점.
window.NODES = {
  halonaKai:    { name:'Halona Kai Lawn',            lat:20.9129391, lng:-156.6922132, floor:'L',  venue:true, note:'잔디 입구 · Atrium Tower 옆' },
  lahaina12:    { name:'Lahaina Room 1 & 2',         lat:20.9124108, lng:-156.6915433, floor:'L',  venue:true, note:'Lahaina Tower 로비층' },
  lahaina34:    { name:'Lahaina Room 3 & 4',         lat:20.9123215, lng:-156.6913794, floor:'L',  venue:true, note:'Lahaina Tower 로비층' },
  lahElev:      { name:'Lahaina Tower 엘리베이터',    lat:20.9125539, lng:-156.6912768, floor:'L',  venue:true, note:'미팅룸 351·364(3층) / 479(4층) / 579(5층) · 1층은 로비 계단으로' },
  lahStairs:    { name:'로비 계단 (↓1층)',           lat:20.9121300, lng:-156.6913000, floor:'L',  venue:false },
  mediaLounge:  { name:'Media Lounge',               lat:20.9119100, lng:-156.6913120, floor:'1',  venue:true, note:'로비 아래 1층' },
  monarchy14:   { name:'Monarchy Ballroom 1-4',      lat:20.9119657, lng:-156.6912590, floor:'1',  venue:true, note:'로비 아래 1층 · 키노트' },
  monarchy57:   { name:'Monarchy 5-7',               lat:20.9119429, lng:-156.6912533, floor:'1',  venue:true, note:'로비 아래 1층 · 데모' },
  sunsetTerrace:{ name:'Sunset Terrace',             lat:20.9118715, lng:-156.6909908, floor:'1',  venue:true, note:'로비 아래 1층 · 식사' },
  recCenter:    { name:'레크리에이션 센터 (수영장 앞)', lat:20.9128981, lng:-156.6926695, floor:'1',  venue:true, note:'수영장 앞' },
  jacuzzi:      { name:'자쿠지',                     lat:20.9131361, lng:-156.6933377, floor:'1',  venue:true, note:'바다쪽' },
  smoking:      { name:'흡연 구역',                   lat:20.9139200, lng:-156.6929196, floor:'out',venue:true, note:'실외' },
  napiliElev:   { name:'Napili Tower 엘리베이터',     lat:20.9135683, lng:-156.6929377, floor:'1',  venue:true, note:'1층' },
};

// ===== 도보 이동로(간선) — 안내도 회색 점선 기준 추정. [from, to, 안내문구(선택)] =====
// 층 이동 간선은 stairs:true → 거리 가중치 +40m, 안내에 "엘리베이터/계단" 문구.
window.EDGES = [
  ['lahElev','lahaina12'],
  ['lahElev','lahaina34'],
  ['lahaina12','lahaina34'],
  ['lahElev','lahStairs'],
  ['lahaina34','lahStairs'],
  ['lahStairs','mediaLounge',   { stairs:true, msg:'계단으로 1층 내려가기' }],
  ['lahStairs','monarchy14',    { stairs:true, msg:'계단으로 1층 내려가기' }],
  ['lahStairs','sunsetTerrace', { stairs:true, msg:'계단으로 1층 내려가기' }],
  ['mediaLounge','monarchy14'],
  ['monarchy14','monarchy57'],
  ['monarchy57','sunsetTerrace'],
  ['monarchy14','sunsetTerrace'],
  ['lahElev','halonaKai'],
  ['lahaina12','halonaKai'],
  ['halonaKai','recCenter'],
  ['recCenter','jacuzzi'],
  ['recCenter','napiliElev'],
  ['napiliElev','smoking'],
  ['jacuzzi','napiliElev'],
];

// ===== 도식 안내도 블록 (미터 좌표: x=북쪽으로 +, y=동쪽(내륙)으로 +) =====
// 기준점 lat0/lng0 은 index.html 의 ORIGIN. 값은 눈대중 — 자유롭게 조정.
window.BLOCKS = [
  { kind:'sea',   label:'바다 (Kāʻanapali Beach)', x:-20, y:-30, w:320, h:40 },
  { kind:'bldg',  label:'Napili Tower',          x:175, y:60,  w:70,  h:45 },
  { kind:'bldg',  label:'Atrium Tower',          x:105, y:180, w:70,  h:40 },
  { kind:'pool',  label:'Lahaina Pool',          x:120, y:35,  w:60,  h:45 },
  { kind:'lawn',  label:'Halona Kai Lawn',       x:110, y:128, w:55,  h:45 },
  { kind:'bldg',  label:'Lahaina Tower (L층)',   x:50,  y:205, w:65,  h:60 },
  { kind:'bldg1', label:'Monarchy · Media Lounge (1층)', x:0, y:228, w:50, h:42 },
  { kind:'bldg1', label:'Sunset Terrace (1층)',  x:2,   y:272, w:42,  h:30 },
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
