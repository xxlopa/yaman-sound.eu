(function () {
  function initRentalFilter() {
    const filter = document.querySelector('[data-rental-filter]');
    if (!filter) return;

    const buttons = Array.from(filter.querySelectorAll('[data-rental-category]'));
    const search = filter.querySelector('[data-rental-search]');
    const groups = Array.from(document.querySelectorAll('[data-rental-group]'));
    const empty = document.querySelector('[data-rental-empty]');
    let activeCategory = 'all';

    function normalize(value) {
      return (value || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
    }

    function updatePlaceholder() {
      if (!search) return;
      const lang = document.documentElement.getAttribute('data-lang') || 'en';
      search.placeholder = lang === 'cs'
        ? search.getAttribute('data-placeholder-cs')
        : search.getAttribute('data-placeholder-en');
    }

    function applyFilter() {
      const term = normalize(search ? search.value : '');
      let visibleItems = 0;

      groups.forEach(function (group) {
        const category = group.getAttribute('data-rental-group');
        const categoryMatches = activeCategory === 'all' || activeCategory === category;
        let groupVisibleItems = 0;

        group.querySelectorAll('[data-rental-item]').forEach(function (item) {
          const searchText = normalize(item.getAttribute('data-rental-search-text') || item.textContent);
          const searchMatches = !term || searchText.indexOf(term) !== -1;
          const visible = categoryMatches && searchMatches;
          item.hidden = !visible;
          if (visible) groupVisibleItems += 1;
        });

        group.hidden = groupVisibleItems === 0;
        visibleItems += groupVisibleItems;
      });

      if (empty) empty.hidden = visibleItems !== 0;
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeCategory = button.getAttribute('data-rental-category') || 'all';
        buttons.forEach(function (other) {
          const active = other === button;
          other.classList.toggle('active', active);
          other.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        applyFilter();
      });
    });

    if (search) {
      search.addEventListener('input', applyFilter);
    }

    document.querySelectorAll('[data-lang-button]').forEach(function (button) {
      button.addEventListener('click', function () {
        window.setTimeout(updatePlaceholder, 0);
      });
    });

    updatePlaceholder();
    applyFilter();
  }

  document.addEventListener('DOMContentLoaded', initRentalFilter);
})();
