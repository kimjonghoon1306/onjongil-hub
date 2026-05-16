// ── HTML 이스케이프 ───────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── 카드 HTML 생성 ────────────────────────────────────────────────────────
function buildCardHTML(card, index, isAdmin) {
  const col = COLORS[card.colorIdx ?? 0];
  const cat = CATS[card.cat] ?? CATS.etc;

  const adminBtns = isAdmin
    ? `<div class="tool-card__actions">
         <button class="act-btn act-edit" onclick="event.stopPropagation(); editCard(${index})">수정</button>
         <button class="act-btn act-del"  onclick="event.stopPropagation(); delCard(${index})">삭제</button>
       </div>`
    : '';

  const clickAttr = isAdmin
    ? ''
    : `onclick="openTool('${encodeURIComponent(card.url)}')"`;

  return `
    <div class="tool-card"
         style="background:${col.bg}; border-color:${col.border}"
         ${clickAttr}
         role="button"
         tabindex="0"
         aria-label="${esc(card.name)} 열기"
         onkeydown="if(!${isAdmin} && event.key==='Enter') openTool('${encodeURIComponent(card.url)}')">

      <div class="tool-card__glow" style="background:${col.glow}"></div>

      <div class="tool-card__icon" style="background:${col.border}">
        ${esc(card.icon || '🔧')}
      </div>

      <div class="tool-card__name">${esc(card.name)}</div>
      <div class="tool-card__desc">${esc(card.desc || '')}</div>

      <div class="tool-card__footer">
        <span class="tool-card__badge"
              style="background:${cat.bg}; color:${cat.color}">
          ${cat.label}
        </span>
        <span class="tool-card__arrow">›</span>
      </div>

      ${adminBtns}
    </div>`;
}

// ── 빈 상태 HTML ──────────────────────────────────────────────────────────
function buildEmptyHTML() {
  return `
    <div class="empty-state">
      <div class="empty-state__emoji">🛠️</div>
      <div class="empty-state__title">아직 추가된 툴이 없어요</div>
      <div class="empty-state__sub">관리자 로그인 후 + 버튼을 눌러 추가하세요</div>
    </div>`;
}

// ── 색상 선택기 렌더 ──────────────────────────────────────────────────────
function renderColorPick(selColor) {
  document.getElementById('colorPick').innerHTML = COLORS.map((c, i) => `
    <div class="cp ${i === selColor ? 'sel' : ''}"
         style="background:${c.bg}; border-color:${c.icon}"
         onclick="pickColor(${i})"
         title="색상 ${i + 1}">
    </div>
  `).join('');
}

// ── 메인 그리드 렌더 ─────────────────────────────────────────────────────
function renderGrid(cards, isAdmin) {
  const grid  = document.getElementById('toolGrid');
  const count = document.getElementById('toolCount');

  count.textContent = cards.length ? `총 ${cards.length}개` : '';

  if (!cards.length) {
    grid.innerHTML = buildEmptyHTML();
    return;
  }

  grid.innerHTML = cards.map((c, i) => buildCardHTML(c, i, isAdmin)).join('');
}
