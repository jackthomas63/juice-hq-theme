/* Juice HQ theme scripts: work carousel, brand film, enquiry form. */

class JhqCarousel extends HTMLElement {
  connectedCallback() {
    this.track = this.querySelector('.jhq-carousel__track');
    this.slides = Array.from(this.querySelectorAll('.jhq-carousel__slide'));
    this.count = this.querySelector('.jhq-carousel__count');
    this.bar = this.querySelector('.jhq-carousel__bar span');
    if (!this.track || !this.slides.length) return;
    this.querySelector('[data-prev]')?.addEventListener('click', () => this.go(-1));
    this.querySelector('[data-next]')?.addEventListener('click', () => this.go(1));
    this.track.addEventListener('scroll', () => this.update(), { passive: true });
    ['mouseenter', 'focusin', 'touchstart'].forEach((e) => this.addEventListener(e, () => (this.paused = true), { passive: true }));
    ['mouseleave', 'focusout'].forEach((e) => this.addEventListener(e, () => (this.paused = false)));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = parseInt(this.dataset.interval || '0', 10);
    if (delay > 0 && !reduce) this.timer = setInterval(() => { if (!this.paused && !document.hidden) this.go(1); }, delay);
    this.update();
  }
  disconnectedCallback() { clearInterval(this.timer); }
  index() {
    const left = this.track.scrollLeft;
    let best = 0;
    this.slides.forEach((s, i) => { if (Math.abs(s.offsetLeft - this.track.offsetLeft - left) < Math.abs(this.slides[best].offsetLeft - this.track.offsetLeft - left)) best = i; });
    return best;
  }
  atEnd() { return this.track.scrollLeft + this.track.clientWidth >= this.track.scrollWidth - 4; }
  go(dir) {
    let i = this.index() + dir;
    if (dir > 0 && this.atEnd()) i = 0;
    if (i < 0) i = this.slides.length - 1;
    this.track.scrollTo({ left: this.slides[i].offsetLeft - this.track.offsetLeft });
  }
  update() {
    const n = this.slides.length;
    const i = this.index();
    const pad = (x) => String(x).padStart(2, '0');
    if (this.count) this.count.textContent = pad(i + 1) + ' / ' + pad(n);
    if (this.bar) {
      const max = this.track.scrollWidth - this.track.clientWidth;
      const visible = this.track.clientWidth / (this.track.scrollWidth || 1);
      const p = max > 0 ? this.track.scrollLeft / max : 1;
      this.bar.style.width = Math.min(100, (visible + (1 - visible) * p) * 100) + '%';
    }
  }
}
if (!customElements.get('jhq-carousel')) customElements.define('jhq-carousel', JhqCarousel);

class JhqFilm extends HTMLElement {
  connectedCallback() {
    const btn = this.querySelector('[data-play]');
    const video = this.querySelector('video');
    const tpl = this.querySelector('template');
    btn?.addEventListener('click', () => {
      if (video) { video.muted = false; video.loop = false; video.currentTime = 0; video.controls = true; video.play(); }
      else if (tpl) { this.querySelector('.jhq-film').appendChild(tpl.content.cloneNode(true)); }
      this.querySelector('.jhq-film').classList.add('is-playing');
    });
  }
}
if (!customElements.get('jhq-film')) customElements.define('jhq-film', JhqFilm);

class JhqEnquiry extends HTMLElement {
  connectedCallback() {
    this.radios = Array.from(this.querySelectorAll('input[name="contact[Enquiry type]"]'));
    if (!this.radios.length) return;
    const param = new URLSearchParams(location.search).get('type');
    if (param) {
      const match = this.radios.find((r) => r.dataset.key === param);
      if (match) match.checked = true;
    }
    this.radios.forEach((r) => r.addEventListener('change', () => this.update()));
    this.update();
  }
  update() {
    const cur = this.radios.find((r) => r.checked) || this.radios[0];
    const stockist = cur.dataset.key === 'stockist';
    this.querySelectorAll('fieldset[data-group]').forEach((fs) => {
      fs.disabled = (fs.dataset.group === 'stockist') !== stockist;
    });
    this.querySelectorAll('[data-label-org]').forEach((el) => (el.textContent = cur.dataset.org || 'Company'));
    this.querySelectorAll('[data-label-date]').forEach((el) => (el.textContent = cur.dataset.date || 'Date'));
    this.querySelectorAll('[data-label-notes]').forEach((el) => (el.textContent = cur.dataset.notes || 'Tell us more'));
    const send = this.querySelector('[data-send]');
    if (send) send.textContent = stockist ? 'Send stockist enquiry' : 'Send enquiry';
  }
}
if (!customElements.get('jhq-enquiry')) customElements.define('jhq-enquiry', JhqEnquiry);
