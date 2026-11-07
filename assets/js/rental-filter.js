document.addEventListener('DOMContentLoaded', function () {
  const root = document.querySelector('[data-rental-filter]');
  if (!root) return;

  const buttons = Array.from(document.querySelectorAll('[data-rental-category]'));
  const groups = Array.from(document.querySelectorAll('[data-rental-group]'));
  const items = Array.from(document.querySelectorAll('[data-rental-item]'));
  const search = document.querySelector('[data-rental-search]');
  const empty = document.querySelector('[data-rental-empty]');
  let category = 'all';

  function applyFilter() {
    const query = (search && search.value ? search.value : '').trim().toLowerCase();
    let visibleCount = 0;

    groups.forEach(function (group) {
      const groupCategory = group.getAttribute('data-rental-group');
      let groupVisible = 0;
      group.querySelectorAll('[data-rental-item]').forEach(function (item) {
        const text = (item.getAttribute('data-rental-search-text') || item.textContent || '').toLowerCase();
        const categoryMatch = category === 'all' || groupCategory === category;
        const searchMatch = !query || text.includes(query);
        const show = categoryMatch && searchMatch;
        item.hidden = !show;
        if (show) { groupVisible++; visibleCount++; }
      });
      group.hidden = groupVisible === 0;
    });

    if (empty) empty.hidden = visibleCount !== 0;
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      category = button.getAttribute('data-rental-category') || 'all';
      buttons.forEach(function (b) {
        const active = b === button;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      applyFilter();
    });
  });

  if (search) search.addEventListener('input', applyFilter);
  applyFilter();
});
