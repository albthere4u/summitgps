// 장소 좌표 — ★ 표시는 위성사진 기준 추정값. 현장 좌표 받으면 교체.
// lat/lng: GPS 안내 도착점(입구). px: assets/resort-map.png(2126x1104) 위 핀 위치.
// floor/note: 도착 직전 안내 문구.
window.VENUES = {
  monarchy14: {
    name: 'Monarchy Ballroom 1-4',
    lat: 20.91555, lng: -156.69470, estimated: true,
    px: [560, 640],
    note: 'Lahaina Tower 컨퍼런스 구역 · 볼룸 입구',
  },
  monarchy57: {
    name: 'Monarchy 5-7 (데모)',
    lat: 20.91545, lng: -156.69455, estimated: true,
    px: [600, 700],
    note: 'Monarchy 1-4와 같은 볼룸 구역',
  },
  lahaina12: {
    name: 'Lahaina Room 1 & 2',
    lat: 20.91600, lng: -156.69520, estimated: true,
    px: [480, 590],
    note: 'Lahaina Tower 미팅룸',
  },
  lahaina34: {
    name: 'Lahaina Room 3 & 4',
    lat: 20.91605, lng: -156.69510, estimated: true,
    px: [500, 610],
    note: 'Lahaina Tower 미팅룸',
  },
  lahainaTower: {
    name: 'Lahaina Tower (엘리베이터)',
    lat: 20.91580, lng: -156.69500, estimated: true,
    px: [520, 660],
    note: '엘리베이터로 해당 층 이동',
  },
  sunsetTerrace: {
    name: 'Sunset Terrace',
    lat: 20.91530, lng: -156.69540, estimated: true,
    px: [880, 400],
    note: 'Lahaina Pool 바다쪽 테라스',
  },
  halonaKai: {
    name: 'Halona Kai Lawn',
    lat: 20.91380, lng: -156.69360, estimated: true,
    px: [1200, 380],
    note: '해변 잔디',
  },
};

// 일정 — 시간은 HST. venue가 null이면 리조트 밖(지도 안내 없음).
window.SCHEDULE = [
  { date: '2026-09-22', day: 'Day 1 · 화', items: [
    { s: '06:30', e: '07:30', t: 'Train Like a Manchester United Pro', v: 'halonaKai' },
    { s: '06:30', e: '08:30', t: '조식', v: 'sunsetTerrace' },
    { s: '08:45', e: '11:00', t: 'CEO 비전 및 모바일 키노트 | Snapdragon for the Agentic Age', v: 'monarchy14' },
    { s: '12:00', e: '13:00', t: '중식', v: 'sunsetTerrace' },
    { s: '13:00', e: '14:00', t: 'Day 1 데모', v: 'monarchy57' },
    { s: '14:00', e: '14:30', t: '두르가 말라디 – 6G 미디어 라운드테이블', sub: 'Durga Malladi, EVP, GM, Technology Planning, Edge Solutions, and Data Center', v: 'lahainaTower', room: 'Meeting Room 351 · 3층' },
    { s: '14:30', e: '15:30', t: '모바일 벤치마킹', v: 'lahaina12' },
    { s: '16:00', e: '16:45', t: '모바일 Q&A', v: 'lahaina34' },
    { s: '17:00', e: '21:00', t: '석식', v: null, place: 'Olowalu Plantation House (리조트 밖)' },
  ]},
  { date: '2026-09-23', day: 'Day 2 · 수', items: [
    { s: '06:30', e: '07:30', t: 'Train Like an F1 Driver', v: 'halonaKai' },
    { s: '06:30', e: '08:30', t: '조식', v: 'sunsetTerrace' },
    { s: '09:00', e: '11:30', t: '퍼스널 AI, 사운드 및 PC 키노트 | Snapdragon for the Agentic Age', v: 'monarchy14' },
    { s: '11:30', e: '12:00', t: '크리스 패트릭 – 모바일 미디어 라운드테이블', sub: 'Chris Patrick, SVP & GM, Mobile Handset', v: 'lahainaTower', room: 'Executive Meeting Room 579 · 5층' },
    { s: '12:00', e: '12:45', t: '중식', v: 'sunsetTerrace' },
    { s: '13:45', e: '14:30', t: '니틴 쿠마르 – 컴퓨트 미디어 라운드테이블', sub: 'Nitin Kumar, VP, Product Management', v: 'lahainaTower', room: 'Meeting Room 364 · 3층' },
    { s: '14:30', e: '15:15', t: '퍼스널 AI 및 사운드 Q&A', v: 'lahaina34' },
    { s: '16:00', e: '17:00', t: 'Day 2 데모', v: 'monarchy57' },
    { s: '16:30', e: '20:30', t: '석식', v: null, place: "Leilani's (리조트 밖)" },
  ]},
  { date: '2026-09-24', day: 'Day 3 · 목', items: [
    { s: '06:30', e: '07:30', t: 'Sunrise Yoga with The rOMing Yogi', v: 'halonaKai' },
    { s: '06:30', e: '08:00', t: '조식', v: 'sunsetTerrace' },
    { s: '08:00', e: '08:45', t: '지아드 아스가르 – 퍼스널 AI 미디어 라운드테이블', sub: 'Ziad Asghar, SVP & GM, XR, Wearables and Personal AI', v: 'lahainaTower', room: 'Executive Meeting Room 479 · 4층' },
    { s: '09:00', e: '11:00', t: 'Elite Experiences', v: 'monarchy14' },
    { s: '10:30', e: '12:00', t: '데모 (Day 2와 동일)', v: 'monarchy57' },
    { s: '12:00', e: '13:30', t: '중식', v: 'sunsetTerrace' },
    { s: '13:00', e: '16:00', t: 'Chair Massage + Lokelani Essentials', v: 'halonaKai' },
    { s: '16:30', e: '21:00', t: '루아우 (Luau)', v: null, place: 'Westin Hotel – Aloha Pavilion (리조트 밖)' },
  ]},
];
