// ── 상태 ──────────────────────────────────────────────────────────────────
let cards    = [];
let isAdmin  = false;
let editIdx  = -1;
let selColor = 0;

// ── 스토리지 ──────────────────────────────────────────────────────────────
function loadCards() {
  const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
  if (saved) {
    try { cards = JSON.parse(saved); }
    catch { cards = [...DEFAULT_TOOLS]; }
  } else {
    cards = [...DEFAULT_TOOLS];
    saveCards();
  }
}

function saveCards() {
  localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(cards));
}

// ── 렌더 래퍼 ─────────────────────────────────────────────────────────────
function render() {
  renderGrid(cards, isAdmin);
}

// ── 툴 열기 ───────────────────────────────────────────────────────────────
function openTool(encodedUrl) {
  const url = decodeURIComponent(encodedUrl);
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
}

// ── FAB ───────────────────────────────────────────────────────────────────
function onFabClick() {
  if (!isAdmin) {
    document.getElementById('pwInput').value = '';
    hide('pwErr');
    show('pwOverlay');
    setTimeout(() => document.getElementById('pwInput').focus(), 150);
  } else {
    openEditSheet(-1);
  }
}

// ── 관리자 인증 ───────────────────────────────────────────────────────────
function checkPw() {
  const v = document.getElementById('pwInput').value;
  if (v === CONFIG.ADMIN_PW) {
    hide('pwOverlay');
    isAdmin = true;
    show('adminBar');
    render();
  } else {
    show('pwErr');
    document.getElementById('pwInput').value = '';
    document.getElementById('pwInput').focus();
  }
}

function exitAdmin() {
  isAdmin = false;
  hide('adminBar');
  render();
}

// ── 편집 시트 ─────────────────────────────────────────────────────────────
function openEditSheet(idx) {
  editIdx  = idx;
  selColor = 0;

  if (idx === -1) {
    document.getElementById('editTitle').textContent = '툴 추가';
    document.getElementById('fName').value = '';
    document.getElementById('fUrl').value  = '';
    document.getElementById('fDesc').value = '';
    document.getElementById('fCat').value  = 'naver';
    document.getElementById('fIcon').value = '';
  } else {
    const c = cards[idx];
    document.getElementById('editTitle').textContent = '툴 수정';
    document.getElementById('fName').value = c.name;
    document.getElementById('fUrl').value  = c.url;
    document.getElementById('fDesc').value = c.desc  || '';
    document.getElementById('fCat').value  = c.cat   || 'naver';
    document.getElementById('fIcon').value = c.icon  || '';
    selColor = c.colorIdx ?? 0;
  }

  renderColorPick(selColor);
  show('editOverlay');
}

function pickColor(i) {
  selColor = i;
  renderColorPick(selColor);
}

function editCard(i) {
  openEditSheet(i);
}

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
    desc:     document.getElementById('fDesc').value.trim(),
    cat:      document.getElementById('fCat').value,
    icon:     document.getElementById('fIcon').value.trim() || '🔧',
    colorIdx: selColor,
  };

  if (editIdx === -1) cards.push(card);
  else                cards[editIdx] = card;

  saveCards();
  hide('editOverlay');
  render();
}

// ── 오버레이 유틸 ─────────────────────────────────────────────────────────
function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

function closeOnBackdrop(event, id) {
  if (event.target.classList.contains('overlay')) hide(id);
}
function closeById(id) { hide(id); }

// ── 키보드 ────────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    hide('pwOverlay');
    hide('editOverlay');
  }
});

// ── 관리자 바 admin 모드 시 상단 여백 보정 ───────────────────────────────
function updateBodyPadding() {
  const bar = document.getElementById('adminBar');
  if (!bar.classList.contains('hidden')) {
    document.body.style.paddingTop = bar.offsetHeight + 'px';
  } else {
    document.body.style.paddingTop = '0';
  }
}

// ── 초기화 ────────────────────────────────────────────────────────────────
(function init() {
  loadCards();
  render();
})();
