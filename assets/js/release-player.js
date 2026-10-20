(() => {
  'use strict';
  let apiPromise;
  const isCzech = () => document.documentElement.dataset.lang === 'cs';
  const label = (cs, en) => isCzech() ? cs : en;
  function loadApi() {
    if (window.SC && window.SC.Widget) return Promise.resolve(window.SC.Widget);
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timer = setTimeout(() => reject(new Error('SoundCloud API timeout')), 15000);
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => {
        clearTimeout(timer);
        if (window.SC && window.SC.Widget) resolve(window.SC.Widget);
        else reject(new Error('SoundCloud API unavailable'));
      };
      script.onerror = () => { clearTimeout(timer); script.remove(); reject(new Error('SoundCloud API blocked')); };
      document.head.append(script);
    }).catch(error => { apiPromise = undefined; throw error; });
    return apiPromise;
  }
  document.querySelectorAll('[data-release-player]').forEach(player => {
    const button = player.querySelector('button');
    const status = player.querySelector('[role="status"]');
    const mount = player.querySelector('[data-player-mount]');
    let attempt = 0;
    button.addEventListener('click', () => {
      const current = ++attempt;
      let timer, widget, finished = false;
      button.disabled = true;
      status.hidden = false;
      status.textContent = label('Načítání SoundCloudu…', 'Loading SoundCloud…');
      const iframe = document.createElement('iframe');
      function fallback() {
        if (current !== attempt || finished) return;
        clearTimeout(timer);
        button.disabled = false;
        button.hidden = false;
        status.hidden = false;
        status.textContent = label('Pokud se přehrávač nenačetl, zkus to znovu nebo použij odkaz na SoundCloud níže.', 'If the player has not loaded, try again or use the SoundCloud link below.');
      }
      function failed() {
        fallback();
        finished = true;
        if (widget) widget.unbind(window.SC.Widget.Events.READY);
        iframe.remove();
      }
      try {
        const source = new URL(player.dataset.source);
        if (source.protocol !== 'https:' || !['api.soundcloud.com', 'soundcloud.com', 'www.soundcloud.com'].includes(source.hostname)) throw new Error('Invalid SoundCloud URL');
        const params = new URLSearchParams({url: source.href, auto_play: 'false', color: '#ff6a00', show_artwork: 'false', show_user: 'true', single_active: 'true', visual: 'false'});
        iframe.src = 'https://w.soundcloud.com/player/?' + params;
        iframe.className = 'release-track-player';
        iframe.width = '100%';
        iframe.height = '166';
        iframe.scrolling = 'no';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.title = player.dataset.title;
        iframe.onerror = failed;
        mount.replaceChildren(iframe);
        timer = setTimeout(fallback, 20000);
        // The native player works independently of the optional Widget API.
        loadApi().then(Widget => {
          if (current !== attempt || finished) return;
          widget = Widget(iframe);
          if (Widget.Events.ERROR) widget.bind(Widget.Events.ERROR, failed);
          widget.bind(Widget.Events.READY, () => {
            if (current !== attempt || finished) return;
            finished = true;
            clearTimeout(timer);
            button.hidden = true;
            status.hidden = true;
            widget.play();
          });
        }).catch(fallback);
      } catch { failed(); }
    });
  });
})();
