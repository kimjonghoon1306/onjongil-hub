// ── 설정 ──────────────────────────────────────────────────────
const ADMIN_PW   = '0000';   // ← 비밀번호 여기서 변경
const STORAGE_KEY = 'onjongil_tools_v1';

// ── 기본 툴 (처음 방문 시 자동 등록) ──────────────────────────
const DEFAULT_TOOLS = [
  {
    name: 'BlogAuto Pro',
    url: 'https://www.blogautopro.com',
    desc: '블로그 포스팅 자동화 도구',
    cat: 'naver',
    icon: '📝',
    colorIdx: 0
  },
  {
    name: 'Store Auto',
    url: 'https://storeauto.vercel.app',
    desc: '스마트스토어 자동화 도구',
    cat: 'side',
    icon: '🛒',
    colorIdx: 3
  },
  {
    name: 'Rank Checker',
    url: 'https://rank-checker-omega.vercel.app',
    desc: '블로그 순위 체크 도구',
    cat: 'naver',
    icon: '📊',
    colorIdx: 5
  }
];

// ── 색상 팔레트 ───────────────────────────────────────────────
const COLORS = [
  { bg: '#fff0f5', border: '#ffb3cc', icon: '#ff6b9d' },  // 핑크
  { bg: '#f0f7ff', border: '#b3d4ff', icon: '#2979ff' },  // 블루
  { bg: '#f0fff4', border: '#b3f0c8', icon: '#1e9641' },  // 그린
  { bg: '#fff8f0', border: '#ffd4a3', icon: '#e67e00' },  // 오렌지
  { bg: '#f5f0ff', border: '#d4b3ff', icon: '#7c3aed' },  // 퍼플
  { bg: '#f0faff', border: '#a3e0ff', icon: '#0288d1' },  // 스카이
];

// ── 카테고리 ──────────────────────────────────────────────────
const CATS = {
  naver:   { label: '네이버',    bg: '#d4edda', color: '#1a7a35' },
  adpost:  { label: '애드포스트', bg: '#fce4ec', color: '#c2185b' },
  adsense: { label: '애드센스',  bg: '#e3f2fd', color: '#1565c0' },
  side:    { label: '부업',      bg: '#fff3e0', color: '#e65100' },
  etc:     { label: '기타',      bg: '#f3f3f3', color: '#777'    },
};

// ── 상태 ──────────────────────────────────────────────────────
let cards    = [];
let isAdmin  = false;
let editIdx  = -1;
let selColor = 0;

// ── 초기화 ────────────────────────────────────────────────────
function init() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { cards = JSON.parse(saved); } catch { cards = [...DEFAULT_TOOLS]; }
  } else {
    cards = [...DEFAULT_TOOLS];
    saveCards();
  }
  render();
}

function saveCards() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

// ── 렌더 ──────────────────────────────────────────────────────
function render() {
  const grid = document.getElementById('toolGrid');
  const count = document.getElementById('toolCount');
  count.textContent = cards.length ? `총 ${cards.length}개` : '';

  if (!cards.length) {
    grid.innerHTML = `
      <div class="empty">
        아직 추가된 툴이 없어요<br>
        관리자 로그인 후 + 버튼을 눌러 추가하세요
      </div>`;
    return;
  }

  grid.innerHTML = cards.map((c, i) => {
    const col = COLORS[c.colorIdx ?? 0];
    const cat = CATS[c.cat] ?? CATS.etc;
    const adminBtns = isAdmin ? `
      <div class="card-actions">
        <button class="act-btn act-edit" onclick="event.stopPropagation(); editCard(${i})">수정</button>
        <button class="act-btn act-del"  onclick="event.stopPropagation(); delCard(${i})">삭제</button>
      </div>` : '';

    return `
      <div class="card"
           style="background:${col.bg}; border-color:${col.border}"
           onclick="${isAdmin ? '' : `openTool('${encodeURIComponent(c.url)}')`}"
           role="button" tabindex="0"
           aria-label="${c.name} 열기">
        <div class="card-icon" style="background:${col.border}">${c.icon || '🔧'}</div>
        <div class="card-name">${escHtml(c.name)}</div>
        <div class="card-desc">${escHtml(c.desc || '')}</div>
        <span class="card-badge" style="background:${cat.bg}; color:${cat.color}">${cat.label}</span>
        <span class="card-arrow">›</span>
        ${adminBtns}
      </div>`;
  }).join('');
}

function openTool(encodedUrl) {
  const url = decodeURIComponent(encodedUrl);
  if (url) window.open(url, '_blank', 'noopener');
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── FAB / 관리자 진입 ─────────────────────────────────────────
function onFabClick() {
  if (!isAdmin) {
    document.getElementById('pwInput').value = '';
    document.getElementById('pwErr').classList.add('hidden');
    show('pwOverlay');
    setTimeout(() => document.getElementById('pwInput').focus(), 150);
  } else {
    openEditSheet(-1);
  }
}

function checkPw() {
  const v = document.getElementById('pwInput').value;
  if (v === ADMIN_PW) {
    hide('pwOverlay');
    isAdmin = true;
    document.getElementById('adminBar').classList.remove('hidden');
    render();
  } else {
    document.getElementById('pwErr').classList.remove('hidden');
    document.getElementById('pwInput').value = '';
    document.getElementById('pwInput').focus();
  }
}

function exitAdmin() {
  isAdmin = false;
  document.getElementById('adminBar').classList.add('hidden');
  render();
}

// ── 편집 시트 ─────────────────────────────────────────────────
function openEditSheet(idx) {
  editIdx = idx;

  if (idx === -1) {
    document.getElementById('editTitle').textContent = '툴 추가';
    document.getElementById('fName').value = '';
    document.getElementById('fUrl').value  = '';
    document.getElementById('fDesc').value = '';
    document.getElementById('fCat').value  = 'naver';
    document.getElementById('fIcon').value = '';
    selColor = 0;
  } else {
    const c = cards[idx];
    document.getElementById('editTitle').textContent = '툴 수정';
    document.getElementById('fName').value = c.name;
    document.getElementById('fUrl').value  = c.url;
    document.getElementById('fDesc').value = c.desc || '';
    document.getElementById('fCat').value  = c.cat  || 'naver';
    document.getElementById('fIcon').value = c.icon || '';
    selColor = c.colorIdx ?? 0;
  }

  buildColorPick();
  show('editOverlay');
}

function buildColorPick() {
  document.getElementById('colorPick').innerHTML = COLORS.map((c, i) => `
    <div class="cp ${i === selColor ? 'sel' : ''}"
         style="background:${c.bg}; border-color:${c.icon}"
         onclick="pickColor(${i})"
         title="색상 ${i+1}"></div>
  `).join('');
}

function pickColor(i) {
  selColor = i;
  buildColorPick();
}

function editCard(i) { openEditSheet(i); }

function delCard(i) {
  if (confirm(`"${cards[i].name}" 을(를) 삭제할까요?`)) {
    cards.splice(i, 1);
    saveCards();
    render();
  }
}

function saveCard() {
  const name = document.getElementById('fName').value.trim();
  const url  = document.getElementById('fUrl').value.trim();

  if (!name) { alert('툴 이름을 입력하세요'); return; }
  if (!url)  { alert('URL을 입력하세요'); return; }
  if (!url.startsWith('http')) { alert('URL은 https:// 로 시작해야 합니다'); return; }

  const card = {
    name,
    url,
    desc: document.getElementById('fDesc').value.trim(),
    cat:  document.getElementById('fCat').value,
    icon: document.getElementById('fIcon').value.trim() || '🔧',
    colorIdx: selColor,
  };

  if (editIdx === -1) cards.push(card);
  else                cards[editIdx] = card;

  saveCards();
  hide('editOverlay');
  render();
}

// ── 오버레이 유틸 ─────────────────────────────────────────────
function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

function closeOverlay(event, id) {
  if (event.target.classList.contains('overlay')) hide(id);
}
function closeOverlayById(id) { hide(id); }

// ── 키보드 접근성 ─────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    hide('pwOverlay');
    hide('editOverlay');
  }
});

// ── 실행 ──────────────────────────────────────────────────────
init();
