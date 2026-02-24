(function spawnParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const dur  = Math.random() * 14 + 8;
    const delay= Math.random() * 12;
    const dx   = (Math.random() - 0.5) * 120;
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

const glow = document.getElementById('mouseGlow');
const rightPanel = document.getElementById('rightPanel');
rightPanel.addEventListener('mousemove', (e) => {
  const rect = rightPanel.getBoundingClientRect();
  glow.style.left = (e.clientX - rect.left) + 'px';
  glow.style.top  = (e.clientY - rect.top) + 'px';
});

let toastTimer;
function showToast(msg, type='info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + (type==='error'?'error':type==='success'?'success':'');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.className='toast', 3000);
}

const modal = document.getElementById('signinModal');
document.getElementById('openSignin').addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('active');
});
document.getElementById('modalClose').addEventListener('click', () => {
  modal.classList.remove('active');
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

function setError(field, show) {
  field.classList.toggle('has-error', show);
  field.classList.toggle('valid', !show && field.querySelector('input').value !== '');
}
function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

const passInput    = document.getElementById('reg-pass');
const strengthFill = document.getElementById('strength-fill');
const strengthLbl  = document.getElementById('strength-label');

passInput.addEventListener('input', () => {
  const v = passInput.value;
  let score = 0;
  if (v.length >= 8)  score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const labels = ['','Weak — barely seaworthy!','Decent — sails at half-mast','Strong — ready to plunder!','Unbreakable — Davy Jones weeps!'];
  const colors  = ['','#e03040','#e8a030','#4caf90','#c9a453'];
  const pcts    = [0, 25, 50, 75, 100];

  strengthFill.style.width      = pcts[score] + '%';
  strengthFill.style.background = colors[score] || '#e03040';
  strengthLbl.textContent       = labels[score] || '';
});

document.getElementById('signupBtn').addEventListener('click', async () => {
  const email   = document.getElementById('reg-email');
  const user    = document.getElementById('reg-user');
  const pass    = document.getElementById('reg-pass');
  const confirm = document.getElementById('reg-confirm');
  const fEmail  = document.getElementById('f-email');
  const fUser   = document.getElementById('f-user');
  const fPass   = document.getElementById('f-pass');
  const fConf   = document.getElementById('f-confirm');

  const emailOk   = validateEmail(email.value.trim());
  const userOk    = user.value.trim().length >= 3;
  const passOk    = pass.value.length >= 8;
  const confirmOk = confirm.value === pass.value && confirm.value !== '';

  setError(fEmail, !emailOk);
  setError(fUser, !userOk);
  setError(fPass, !passOk);
  setError(fConf, !confirmOk);

  if (!emailOk || !userOk || !passOk || !confirmOk) {
    showToast('⚔ Fix yer errors, landlubber!', 'error');
    return;
  }

  const btn = document.getElementById('signupBtn');
  btn.classList.add('loading');
  showToast('⚓ Rallying the crew...', 'info');

  await new Promise(r => setTimeout(r, 2000));
  btn.classList.remove('loading');
  showToast('🏴‍☠️ Welcome aboard, ' + user.value.trim() + '! The seas await!', 'success');
});

document.getElementById('signinBtn').addEventListener('click', async () => {
  const email = document.getElementById('si-email');
  const pass  = document.getElementById('si-pass');
  const fEmail= email.closest('.field');
  const fPass = pass.closest('.field');

  const emailOk = validateEmail(email.value.trim());
  const passOk  = pass.value.length > 0;

  setError(fEmail, !emailOk);
  setError(fPass, !passOk);
  document.getElementById('si-email-err').style.display = emailOk ? 'none' : 'block';
  document.getElementById('si-pass-err').style.display  = passOk  ? 'none' : 'block';

  if (!emailOk || !passOk) {
    showToast('⚔ Check yer manifest again!', 'error');
    return;
  }

  const btn = document.getElementById('signinBtn');
  btn.classList.add('loading');

  await new Promise(r => setTimeout(r, 1800));
  btn.classList.remove('loading');
  modal.classList.remove('active');
  showToast('⚓ Ahoy! Welcome back, pirate!', 'success');
});

document.getElementById('googleBtn').addEventListener('click', () => {
  showToast('🏴‍☠️ Seekin\' Google\'s blessing...', 'info');
});

document.querySelectorAll('.btn-submit, .btn-google').forEach(btn => {
  btn.addEventListener('click', function(e) {
    if (this.classList.contains('loading')) return;
    const circle = document.createElement('span');
    const d = Math.max(this.offsetWidth, this.offsetHeight);
    const rect = this.getBoundingClientRect();
    circle.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${d}px; height:${d}px;
      left:${e.clientX-rect.left-d/2}px;
      top:${e.clientY-rect.top-d/2}px;
      background:rgba(255,255,255,0.15);
      transform:scale(0); animation:ripple 0.55s linear;
    `;
    this.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  });
});

const st = document.createElement('style');
st.textContent = '@keyframes ripple{to{transform:scale(3);opacity:0;}}';
document.head.appendChild(st);

document.getElementById('reg-email').addEventListener('blur', function() {
  setError(document.getElementById('f-email'), !validateEmail(this.value.trim()));
});
document.getElementById('reg-user').addEventListener('blur', function() {
  setError(document.getElementById('f-user'), this.value.trim().length < 3);
});
document.getElementById('reg-pass').addEventListener('blur', function() {
  setError(document.getElementById('f-pass'), this.value.length < 8);
});
document.getElementById('reg-confirm').addEventListener('input', function() {
  const p = document.getElementById('reg-pass').value;
  setError(document.getElementById('f-confirm'), this.value !== p || this.value === '');
});