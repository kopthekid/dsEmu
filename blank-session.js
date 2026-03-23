(function () {
  if (window.top !== window.self) {
    return;
  }

  function buildWrapperMarkup(targetUrl, title, iconHref) {
    const safeTarget = JSON.stringify(targetUrl);
    const safeTitle = JSON.stringify(title);
    const iconMarkup = iconHref
      ? `<link rel="icon" href=${JSON.stringify(iconHref)}>`
      : '';

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]))}</title>
    ${iconMarkup}
    <style>
      html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #111;
      }

      iframe {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
      }
    </style>
  </head>
  <body>
    <iframe allow="autoplay; fullscreen" referrerpolicy="strict-origin-when-cross-origin"></iframe>
    <script>
      document.title = ${safeTitle};
      const frame = document.querySelector('iframe');
      frame.src = ${safeTarget};
    <\/script>
  </body>
</html>`;
  }

  function openInAboutBlank(targetUrl) {
    const resolvedUrl = new URL(targetUrl || window.location.href, window.location.href).href;
    const popup = window.open('about:blank', '_blank');

    if (!popup) {
      return null;
    }

    const title = document.title || 'Study Page';
    const iconHref =
      document.querySelector('link[rel~="icon"]')?.href ||
      document.querySelector('link[rel="shortcut icon"]')?.href ||
      '';

    popup.document.open();
    popup.document.write(buildWrapperMarkup(resolvedUrl, title, iconHref));
    popup.document.close();
    popup.focus();
    return popup;
  }

  function onBlankSessionLinkClick(event) {
    const anchor = event.target.closest('a[data-blank-session]');
    if (!anchor) {
      return;
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const popup = openInAboutBlank(anchor.href);
    if (popup) {
      event.preventDefault();
    }
  }

  function createFallbackButton() {
    if (document.getElementById('about-blank-launcher')) {
      return;
    }

    const button = document.createElement('button');
    button.id = 'about-blank-launcher';
    button.type = 'button';
    button.textContent = 'Open in about:blank';
    button.setAttribute('aria-label', 'Open this page in an about blank session');

    Object.assign(button.style, {
      position: 'fixed',
      right: '16px',
      bottom: '16px',
      zIndex: '9999',
      padding: '10px 14px',
      border: 'none',
      borderRadius: '999px',
      background: '#f0c85a',
      color: '#111',
      fontFamily: 'Verdana, sans-serif',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
    });

    button.addEventListener('click', () => {
      const popup = openInAboutBlank(window.location.href);
      if (!popup) {
        button.textContent = 'Allow popups, then try again';
      }
    });

    document.body.appendChild(button);
  }

  window.openSiteInAboutBlank = openInAboutBlank;

  document.addEventListener('click', onBlankSessionLinkClick);

  if (document.documentElement.hasAttribute('data-blank-button')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createFallbackButton, { once: true });
    } else {
      createFallbackButton();
    }
  }
})();
