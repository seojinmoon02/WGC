const archiveItems = [
  {
    id: 'SESSION 08',
    title: '가까운 사람과 멀어지는 언어',
    summary: '친밀한 관계 안에서 말이 어긋나는 순간과 그 원인에 대한 대화',
    category: 'family',
    categoryLabel: 'FAMILY',
    date: '2026.11.22',
    href: 'session-08.html',
    size: 'tall'
  },
  {
    id: 'SESSION 07',
    title: '요즘의 문화 취향은 어떻게 공유되는가',
    summary: '콘텐츠, 밈, 추천 알고리즘이 취향 형성에 미치는 영향에 대한 세션',
    category: 'culture',
    categoryLabel: 'CULTURE',
    date: '2026.10.09',
    href: 'session-07.html',
    size: 'medium'
  },
  {
    id: 'SESSION 06',
    title: '사회적 입장 차이는 어디에서 시작되는가',
    summary: '같은 이슈를 전혀 다르게 받아들이는 이유를 탐색하는 대화',
    category: 'society',
    categoryLabel: 'SOCIETY',
    date: '2026.09.14',
    href: 'session-06.html',
    size: 'medium'
  },
  {
    id: 'SESSION 05',
    title: '좋아하는 것을 공개하는 용기',
    summary: '취향을 말하는 일이 왜 때로는 어렵고, 또 중요한지에 대한 세션',
    category: 'taste',
    categoryLabel: 'TASTE',
    date: '2026.08.21',
    href: 'session-05.html',
    size: 'short'
  },
  {
    id: 'SESSION 04',
    title: '일과 삶의 균형은 모두에게 같은가',
    summary: '세대와 직업에 따라 다르게 느껴지는 균형의 기준을 나누는 대화',
    category: 'work',
    categoryLabel: 'WORK',
    date: '2026.07.28',
    href: 'session-04.html',
    size: 'tall'
  },
  {
    id: 'SESSION 03',
    title: '가족 안의 다른 가치관',
    summary: '세대 차이와 존중의 방식에 대한 오프라인 세션',
    category: 'family',
    categoryLabel: 'FAMILY',
    date: '2026.07.19',
    href: 'session-03.html',
    size: 'short'
  },
  {
    id: 'SESSION 02',
    title: '취향은 어떻게 만들어지는가',
    summary: '음악, 패션, 음식 취향의 형성과 변화에 대한 이야기',
    category: 'taste',
    categoryLabel: 'TASTE',
    date: '2026.06.04',
    href: 'session-02.html',
    size: 'medium'
  },
  {
    id: 'SESSION 01',
    title: '나와 다른 일의 방식',
    summary: '직업관, 일의 리듬, 안정성과 도전에 대한 대화',
    category: 'work',
    categoryLabel: 'WORK',
    date: '2026.05.12',
    href: 'session-01.html',
    size: 'short'
  },
  {
    id: 'SESSION 00',
    title: '세션 파일럿: 낯선 대화를 시작하는 법',
    summary: '플랫폼 초기 파일럿 세션으로, 대화 구조와 질문 리듬을 실험한 기록',
    category: 'culture',
    categoryLabel: 'CULTURE',
    date: '2025.12.18',
    href: 'session-00.html',
    size: 'medium'
  }
];

const categoryLabels = {
  all: '전체 세션',
  work: '일',
  taste: '취향',
  family: '가족',
  society: '사회',
  culture: '문화'
};

const state = {
  category: 'all',
  visibleCount: 9
};

const masonry = document.getElementById('archive-masonry');
const loadMoreButton = document.getElementById('archive-load-more');
const filterStatus = document.getElementById('archive-filter-status');

function getFilteredItems() {
  const items = state.category === 'all'
    ? archiveItems
    : archiveItems.filter((item) => item.category === state.category);

  return items.sort(
    (a, b) =>
      new Date(b.date.replace(/\./g, '-')) -
      new Date(a.date.replace(/\./g, '-'))
  );
}

function renderArchive() {
  const filtered = getFilteredItems();
  const visible = filtered.slice(0, state.visibleCount);

  masonry.innerHTML = visible.map((item) => `
    <a class="archive-stream-card archive-stream-card--${item.size}" href="${item.href}">
      <div class="archive-stream-card-top">
        <span class="archive-stream-id">${item.id}</span>
        <span class="archive-stream-date">${item.date}</span>
      </div>

      <div class="archive-stream-card-visual archive-stream-card-visual--${item.category}"></div>

      <div class="archive-stream-card-body">
        <p class="archive-stream-category">${item.categoryLabel}</p>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
      </div>

      <div class="archive-stream-card-bottom">
        <span class="archive-link">상세 보기</span>
      </div>
    </a>
  `).join('');

  filterStatus.textContent = `${categoryLabels[state.category]} / ${filtered.length}개`;
  loadMoreButton.style.display = filtered.length > state.visibleCount ? 'inline-flex' : 'none';
}

document.querySelectorAll('.archive-filter-chip').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.archive-filter-chip').forEach((chip) => {
      chip.classList.remove('is-active');
    });

    button.classList.add('is-active');
    state.category = button.dataset.category;
    state.visibleCount = 9;
    renderArchive();
  });
});

loadMoreButton.addEventListener('click', () => {
  state.visibleCount += 6;
  renderArchive();
});

renderArchive();