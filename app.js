// dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// copy email button
const toast = document.getElementById('toast');
document.getElementById('copyEmail').addEventListener('click', async () => {
  const email = document.getElementById('email').textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = 'Email copied: ' + email;
    toast.style.display = 'block';
    setTimeout(() => (toast.style.display = 'none'), 1500);
  } catch {
    alert('Copy failed, please copy manually.');
  }
});

// mock subscribe counter
const subBtn = document.getElementById('subscribeBtn');
if (subBtn) {
  const subCountEl = document.getElementById('subCount');
  let count = parseInt(subCountEl.textContent, 10);
  subBtn.addEventListener('click', () => {
    count += 1;
    subBtn.setAttribute('disabled', 'true');
    subBtn.innerHTML = 'Thanks for subscribing!';
    setTimeout(() => {
      subBtn.removeAttribute('disabled');
      subBtn.innerHTML = 'Subscribe <span id="subCount">' + count + '</span>';
    }, 1600);
  });
}

// WEBSITE THUMBNAIL HANDLER
// If `data-thumb` (local image) exists, use it.
// Otherwise try favicon via Google S2 (lightweight) as a fallback.
document.querySelectorAll('.item.website').forEach(card => {
  const img = card.querySelector('img.thumb');
  const localThumb = card.getAttribute('data-thumb');
  const domain = card.getAttribute('data-domain');

  let src = localThumb && localThumb.length ? localThumb : '';
  if (!src && domain) {
    // fallback to favicon (not full-page screenshot, but at least a visual cue)
    src = 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(domain) + '&sz=128';
    img.style.objectFit = 'contain';
    img.style.background = '#fff';
  }
  if (src) img.src = src;

  // If image fails, hide it gracefully
  img.addEventListener('error', () => { img.style.display = 'none'; });
});