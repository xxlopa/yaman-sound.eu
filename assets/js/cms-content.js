(function () {
  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeImage(src) {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;
    return src.charAt(0) === "/" ? src.substring(1) : src;
  }

  function localizedText(item) {
    return '<span class="cs">' + escapeHtml(item.text_cs) + '</span><span class="en">' + escapeHtml(item.text_en || item.text_cs) + '</span>';
  }

  function visibleItems(data) {
    return (data.items || [])
      .filter(function (item) { return item.visible !== false; })
      .sort(function (a, b) { return Number(a.order || 999) - Number(b.order || 999); });
  }

  function renderSound(container, items) {
    container.innerHTML = items.map(function (item) {
      var image = normalizeImage(item.image);
      var url = item.url || "#";
      return '<article class="card label-post-card sound-post-inline">' +
        '<a class="event-card-link" href="' + escapeHtml(url) + '">' +
        (image ? '<img src="' + escapeHtml(image) + '" alt="' + escapeHtml(item.title) + '">' : '') +
        '<div class="card-content">' +
        (item.label ? '<p class="role">' + escapeHtml(item.label) + '</p>' : '') +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + localizedText(item) + '</p>' +
        '</div></a></article>';
    }).join('');
  }

  function renderEvents(container, items) {
    container.innerHTML = items.map(function (item) {
      var image = normalizeImage(item.image);
      var url = item.url || "#";
      var classes = 'card event-poster-card' + (item.featured ? ' featured-event' : '');
      return '<article class="' + classes + '">' +
        '<a class="event-card-link" href="' + escapeHtml(url) + '" aria-label="Open ' + escapeHtml(item.title) + '">' +
        (image ? '<img class="hauntedvila-flyer" src="' + escapeHtml(image) + '" loading="lazy" alt="' + escapeHtml(item.title) + '">' : '') +
        '<div class="card-content">' +
        (item.label ? '<p class="role">' + escapeHtml(item.label) + '</p>' : '') +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<div class="event-meta">' +
        (item.date ? '<span>' + escapeHtml(item.date) + '</span>' : '') +
        (item.location ? '<span>' + escapeHtml(item.location) + '</span>' : '') +
        '</div>' +
        '<p>' + localizedText(item) + '</p>' +
        '<div class="button-row"><span class="btn ghost">View event ↗</span></div>' +
        '</div></a></article>';
    }).join('');
  }

  function renderMedia(container, items) {
    container.innerHTML = items.map(function (item) {
      var video = item.youtube_id ? String(item.youtube_id).trim() : "";
      var image = normalizeImage(item.image);
      var mediaHtml = "";
      if (video) {
        mediaHtml = '<div class="video-frame compact-video"><iframe src="https://www.youtube.com/embed/' + escapeHtml(video) + '?rel=0&modestbranding=1" title="' + escapeHtml(item.title) + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>';
      } else if (image) {
        mediaHtml = '<a href="' + escapeHtml(item.url || '#') + '"><img src="' + escapeHtml(image) + '" alt="' + escapeHtml(item.title) + '"></a>';
      }
      return '<article class="sound-video-card">' + mediaHtml +
        '<div class="card-content">' +
        (item.label ? '<p class="eyebrow">' + escapeHtml(item.label) + '</p>' : '') +
        '<h2>' + escapeHtml(item.title) + '</h2>' +
        '<p>' + localizedText(item) + '</p>' +
        '</div></article>';
    }).join('');
  }

  function renderCollection(container, name, data) {
    var items = visibleItems(data);
    if (name === "sound") renderSound(container, items);
    if (name === "events") renderEvents(container, items);
    if (name === "media") renderMedia(container, items);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-cms-collection]").forEach(function (container) {
      var name = container.getAttribute("data-cms-collection");
      fetch("content/" + name + ".json", { cache: "no-store" })
        .then(function (response) { if (!response.ok) throw new Error(name); return response.json(); })
        .then(function (data) { renderCollection(container, name, data); })
        .catch(function () {
          container.setAttribute("data-cms-error", "true");
        });
    });
  });
})();
