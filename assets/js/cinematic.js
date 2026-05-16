const SLIDES = [
  {
    tag:  { icon: '🇰🇷', label: 'NAVER BLOG', bg: 'rgba(26,180,82,0.2)', color: '#4ade80' },
    headline: '<em>블로그 하나</em>로<br>월 100만원 만들기',
    sub: '네이버 블로그 수익화의 핵심은 꾸준한 포스팅과 SEO 최적화. 자동화 툴로 시간을 아끼고 수익은 극대화하세요.',
    cta: { label: 'BlogAuto Pro 시작하기', url: 'https://www.blogautopro.com' },
    deco: '📝',
    bg: 'linear-gradient(135deg, #0f2027 0%, #1a3a2a 45%, #0f3460 100%)',
  },
  {
    tag:  { icon: '💰', label: 'GOOGLE ADSENSE', bg: 'rgba(66,133,244,0.2)', color: '#93c5fd' },
    headline: '애드센스 <em>승인</em>부터<br><em>수익 최적화</em>까지',
    sub: '광고 배치 전략과 콘텐츠 품질이 수익을 결정합니다. 올바른 방법으로 빠르게 승인받고 CPC를 높이세요.',
    cta: { label: '애드센스 가이드 보기', url: '#' },
    deco: '💸',
    bg: 'linear-gradient(135deg, #0a0f2e 0%, #1a1a4e 45%, #2d1b69 100%)',
  },
  {
    tag:  { icon: '🛒', label: 'SMARTSTORE', bg: 'rgba(255,153,0,0.2)', color: '#fbbf24' },
    headline: '스마트스토어<br><em>자동화</em>로 잠자며 벌기',
    sub: '상품 등록부터 주문 처리까지 반복 작업을 자동화하세요. 내가 쉴 때도 스토어는 돌아갑니다.',
    cta: { label: 'Store Auto 써보기', url: 'https://storeauto.vercel.app' },
    deco: '🛍️',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #3d1f00 45%, #5c2e00 100%)',
  },
  {
    tag:  { icon: '📈', label: 'SEO RANKING', bg: 'rgba(0,200,150,0.2)', color: '#34d399' },
    headline: '<em>상위노출</em>의 비밀,<br>랭킹 분석으로 찾아라',
    sub: '경쟁자보다 한발 앞선 키워드 전략이 트래픽을 만듭니다. 실시간 순위 추적으로 내 블로그 위치를 파악하세요.',
    cta: { label: 'Rank Checker 확인하기', url: 'https://rank-checker-omega.vercel.app' },
    deco: '🚀',
    bg: 'linear-gradient(135deg, #001a0f 0%, #003d22 45%, #005c33 100%)',
  },
];

const CIN = {
  current:  0,
  total:    SLIDES.length,
  interval: null,
  elapsed:  0,
  DURATION: 5000,
  TICK:     60,
  paused:   false,
};

function buildCinematic() {
  const slidesHTML = SLIDES.map((s, i) => `
    <div class="cin-slide ${i === 0 ? 'active' : ''}" style="background:${s.bg}">
      <div class="cin-tag" style="background:${s.tag.bg}; color:${s.tag.color}">
        ${s.tag.icon} ${s.tag.label}
      </div>
      <h2 class="cin-headline">${s.headline}</h2>
      <p class="cin-sub">${s.sub}</p>
      <a class="cin-cta" href="${s.cta.url}" target="_blank" rel="noopener"
         onclick="event.stopPropagation()">${s.cta.label} →</a>
      <div class="cin-deco">${s.deco}</div>
    </div>
  `).join('');

  const barsHTML = SLIDES.map((_, i) => `
    <div class="cin-bar ${i === 0 ? 'active' : ''}" onclick="event.stopPropagation(); cinGoTo(${i})">
      <div class="cin-bar__fill" id="cinBar${i}"></div>
    </div>
  `).join('');

  return `
    <section class="cinematic" id="cinematic" onclick="cinNext()">
      ${slidesHTML}
      <div class="cin-controls" onclick="event.stopPropagation()">
        <div class="cin-bars">${barsHTML}</div>
        <span class="cin-counter" id="cinCounter">1 / ${CIN.total}</span>
        <button class="cin-playbtn" id="cinPlay" onclick="cinTogglePause()">⏸</button>
      </div>
    </section>
  `;
}

function cinGoTo(idx) {
  const slides = document.querySelectorAll('.cin-slide');
  const bars   = document.querySelectorAll('.cin-bar');
  if (!slides.length) return;

  slides[CIN.current].classList.remove('active');
  slides[CIN.current].classList.add('exit');
  const prev = CIN.current;
  setTimeout(() => slides[prev].classList.remove('exit'), 700);

  for (let i = 0; i < CIN.total; i++) {
    const fill = document.getElementById('cinBar' + i);
    bars[i].classList.remove('active', 'done');
    if (i < idx) { bars[i].classList.add('done'); if(fill) fill.style.width = '100%'; }
    else         { if(fill) fill.style.width = '0%'; }
  }

  CIN.current = idx;
  CIN.elapsed = 0;
  slides[CIN.current].classList.add('active');
  bars[CIN.current].classList.add('active');
  document.getElementById('cinCounter').textContent = (CIN.current + 1) + ' / ' + CIN.total;
  cinResetTimer();
}

function cinNext() { cinGoTo((CIN.current + 1) % CIN.total); }
function cinPrev() { cinGoTo((CIN.current - 1 + CIN.total) % CIN.total); }

function cinStartTimer() {
  clearInterval(CIN.interval);
  CIN.interval = setInterval(function() {
    if (CIN.paused) return;
    CIN.elapsed += CIN.TICK;
    var pct = Math.min((CIN.elapsed / CIN.DURATION) * 100, 100);
    var fill = document.getElementById('cinBar' + CIN.current);
    if (fill) fill.style.width = pct + '%';
    if (CIN.elapsed >= CIN.DURATION) cinNext();
  }, CIN.TICK);
}

function cinResetTimer() {
  CIN.elapsed = 0;
  clearInterval(CIN.interval);
  if (!CIN.paused) cinStartTimer();
}

function cinTogglePause() {
  CIN.paused = !CIN.paused;
  var btn = document.getElementById('cinPlay');
  if (btn) btn.textContent = CIN.paused ? '▶' : '⏸';
  if (!CIN.paused) cinStartTimer();
  else clearInterval(CIN.interval);
}

function initCinematic() {
  var wrap = document.getElementById('cinematicWrap');
  if (!wrap) return;
  wrap.innerHTML = buildCinematic();
  cinStartTimer();
}
