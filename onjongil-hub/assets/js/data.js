// ── 설정 ──────────────────────────────────────────────────────────────────
const CONFIG = {
  ADMIN_PW:    '0000',              // 관리자 비밀번호 (여기서 변경)
  STORAGE_KEY: 'onjongil_tools_v1', // 로컬스토리지 키
};

// ── 기본 툴 (첫 방문 시 자동 등록) ────────────────────────────────────────
const DEFAULT_TOOLS = [
  {
    name:     'BlogAuto Pro',
    url:      'https://www.blogautopro.com',
    desc:     '블로그 포스팅 자동화 도구',
    cat:      'naver',
    icon:     '📝',
    colorIdx: 0,
  },
  {
    name:     'Store Auto',
    url:      'https://storeauto.vercel.app',
    desc:     '스마트스토어 자동화 도구',
    cat:      'side',
    icon:     '🛒',
    colorIdx: 3,
  },
  {
    name:     'Rank Checker',
    url:      'https://rank-checker-omega.vercel.app',
    desc:     '블로그 순위 체크 도구',
    cat:      'naver',
    icon:     '📊',
    colorIdx: 5,
  },
];

// ── 카드 색상 팔레트 ──────────────────────────────────────────────────────
const COLORS = [
  { bg: '#fff0f5', border: '#ffc0d8', glow: '#ffb3cc', icon: '#ff6b9d' }, // 핑크
  { bg: '#f0f6ff', border: '#b3ccff', glow: '#aac5ff', icon: '#3b7ff5' }, // 블루
  { bg: '#f0fff5', border: '#a3e8be', glow: '#9de0b8', icon: '#1e9641' }, // 그린
  { bg: '#fff9f0', border: '#ffd4a3', glow: '#ffc98a', icon: '#e67e00' }, // 오렌지
  { bg: '#f7f0ff', border: '#d4b3ff', glow: '#c9a8ff', icon: '#7c3aed' }, // 퍼플
  { bg: '#f0fbff', border: '#a3dcf0', glow: '#9dd8ee', icon: '#0288d1' }, // 스카이
];

// ── 카테고리 정의 ─────────────────────────────────────────────────────────
const CATS = {
  naver:   { label: '네이버',    bg: '#e8f5e9', color: '#1a7a35', solidClass: 'tag--naver-solid'   },
  adpost:  { label: '애드포스트', bg: '#fce4ec', color: '#c2185b', solidClass: 'tag--adpost-solid'  },
  adsense: { label: '애드센스',  bg: '#e3f2fd', color: '#1565c0', solidClass: 'tag--adsense-solid' },
  side:    { label: '부업',      bg: '#fff3e0', color: '#e65100', solidClass: 'tag--side-solid'    },
  etc:     { label: '기타',      bg: '#f3f3f3', color: '#777777', solidClass: 'tag--etc-solid'     },
};
