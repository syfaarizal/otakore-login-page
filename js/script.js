/* ── Particle background ── */
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 32; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const dur  = Math.random() * 14 + 8;
    const delay= Math.random() * 12;
    const dx   = (Math.random() - 0.5) * 140;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%; bottom:0;
      --dx:${dx}px;
      animation-duration:${dur}s;
      animation-delay:-${delay}s;
    `;
    container.appendChild(p);
  }
})();


/* ── Mouse glow (right panel) ── */
const glow       = document.getElementById('mouseGlow');
const rightPanel = document.getElementById('rightPanel');

if (glow && rightPanel) {
  rightPanel.addEventListener('mousemove', e => {
    const rect = rightPanel.getBoundingClientRect();
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top  = (e.clientY - rect.top)  + 'px';
  });
}


/* ── Toast notification ── */
let toastTimer;
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className   = 'toast show' + (type === 'error' ? ' error' : type === 'success' ? ' success' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast'; }, 3200);
}


/* ── Modal (sign in) ── */
const modal = document.getElementById('signinModal');

document.getElementById('openSignin').addEventListener('click', e => {
  e.preventDefault();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


/* ── Validation helpers ── */
function setError(fieldEl, hasError) {
  fieldEl.classList.toggle('has-error', hasError);
  const inp = fieldEl.querySelector('input');
  fieldEl.classList.toggle('valid', !hasError && inp && inp.value !== '');
}
function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}


/* ── Password strength ── */
const passInput    = document.getElementById('reg-pass');
const strengthFill = document.getElementById('strength-fill');
const strengthLbl  = document.getElementById('strength-label');

if (passInput) {
  passInput.addEventListener('input', () => {
    const v = passInput.value;
    let score = 0;
    if (v.length >= 8)          score++;
    if (/[A-Z]/.test(v))        score++;
    if (/[0-9]/.test(v))        score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;

    const labels = ['', 'Weak — barely seaworthy!', 'Decent — sails at half-mast', 'Strong — ready to plunder!', 'Unbreakable — Davy Jones weeps!'];
    const colors = ['', '#e03040', '#e8a030', '#4caf90', '#c9a453'];
    const pcts   = [0, 25, 50, 75, 100];

    strengthFill.style.width      = pcts[score] + '%';
    strengthFill.style.background = colors[score] || '#e03040';
    strengthLbl.textContent       = labels[score] || '';
  });
}


/* ── Ripple effect (all buttons) ── */
function addRipple(e) {
  if (this.classList.contains('loading')) return;
  const d    = Math.max(this.offsetWidth, this.offsetHeight);
  const rect = this.getBoundingClientRect();

  // Support both mouse and touch events
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  const circle = document.createElement('span');
  circle.style.cssText = `
    position:absolute; border-radius:50%; pointer-events:none;
    width:${d}px; height:${d}px;
    left:${clientX - rect.left - d / 2}px;
    top:${clientY - rect.top  - d / 2}px;
    background:rgba(255,255,255,0.15);
    transform:scale(0); animation:ripple 0.55s linear;
  `;
  this.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}

document.querySelectorAll('.btn-submit, .btn-google').forEach(btn => {
  btn.addEventListener('click',      addRipple);
  btn.addEventListener('touchstart', addRipple, { passive: true });
});


/* ── Sign Up ── */
document.getElementById('signupBtn').addEventListener('click', async () => {
  const email   = document.getElementById('reg-email');
  const user    = document.getElementById('reg-user');
  const pass    = document.getElementById('reg-pass');
  const confirm = document.getElementById('reg-confirm');

  const emailOk   = validateEmail(email.value);
  const userOk    = user.value.trim().length >= 3;
  const passOk    = pass.value.length >= 8;
  const confirmOk = confirm.value === pass.value && confirm.value !== '';

  setError(document.getElementById('f-email'),   !emailOk);
  setError(document.getElementById('f-user'),    !userOk);
  setError(document.getElementById('f-pass'),    !passOk);
  setError(document.getElementById('f-confirm'), !confirmOk);

  if (!emailOk || !userOk || !passOk || !confirmOk) {
    showToast('⚔ Fix yer errors, landlubber!', 'error');
    return;
  }

  const btn = document.getElementById('signupBtn');
  btn.classList.add('loading');
  showToast('⚓ Rallying the crew...', 'info');

  // Replace this timeout with your real API call
  await new Promise(r => setTimeout(r, 2000));

  btn.classList.remove('loading');
  showToast('🏴‍☠️ Welcome aboard, ' + user.value.trim() + '! The seas await!', 'success');
});


/* ── Sign In ── */
document.getElementById('signinBtn').addEventListener('click', async () => {
  const email  = document.getElementById('si-email');
  const pass   = document.getElementById('si-pass');
  const fEmail = email.closest('.field');
  const fPass  = pass.closest('.field');

  const emailOk = validateEmail(email.value);
  const passOk  = pass.value.length > 0;

  setError(fEmail, !emailOk);
  setError(fPass,  !passOk);
  document.getElementById('si-email-err').style.display = emailOk ? 'none' : 'block';
  document.getElementById('si-pass-err').style.display  = passOk  ? 'none' : 'block';

  if (!emailOk || !passOk) {
    showToast('⚔ Check yer manifest again!', 'error');
    return;
  }

  const btn = document.getElementById('signinBtn');
  btn.classList.add('loading');

  // Replace this timeout with your real API call
  await new Promise(r => setTimeout(r, 1800));

  btn.classList.remove('loading');
  closeModal();
  showToast('⚓ Ahoy! Welcome back, pirate!', 'success');
});


/* ── Google OAuth button ── */
document.getElementById('googleBtn').addEventListener('click', () => {
  showToast("🏴‍☠️ Seekin' Google's blessing...", 'info');
  // Add your Google OAuth redirect or popup here
});


/* ── Inline blur validation (real-time feedback) ── */
document.getElementById('reg-email').addEventListener('blur', function () {
  setError(document.getElementById('f-email'), !validateEmail(this.value));
});
document.getElementById('reg-user').addEventListener('blur', function () {
  setError(document.getElementById('f-user'), this.value.trim().length < 3);
});
document.getElementById('reg-pass').addEventListener('blur', function () {
  setError(document.getElementById('f-pass'), this.value.length < 8);
});
document.getElementById('reg-confirm').addEventListener('input', function () {
  const p = document.getElementById('reg-pass').value;
  setError(document.getElementById('f-confirm'), this.value !== p || this.value === '');
});