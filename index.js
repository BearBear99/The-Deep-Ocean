//  throttle 
const throttle = (fn, wait = 80) => {
  let t = 0;
  return (...args) => {
    const now = performance.now();
    if (now - t >= wait) { t = now; fn(...args); }
  };
};

// Highlight nav link on scroll
const navLinks = document.querySelectorAll('#site-header nav a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Add smooth scroll for footer logo and text
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.footer-logo');
  const title = document.querySelector('.footer-text');

  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (title) {
    title.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
    });
  }
});

//  Wave motion  
(function waveMotion(){
  const paths = Array.from(document.querySelectorAll('.waveband .wave path'));
  if (!paths.length) return;

  const bases = paths.map(p => {
    const d = p.getAttribute('d') || '';
    const y1m = d.match(/M0,([-\d.]+)/);
    const y2m = d.match(/C240,([-\d.]+)/);
    const yMidm = d.match(/480,([-\d.]+)/);
    const y1 = y1m ? parseFloat(y1m[1]) : 60;
    const y2 = y2m ? parseFloat(y2m[1]) : 100;
    const yMid = yMidm ? parseFloat(yMidm[1]) : (y1 - 50);
    const diff = yMid - y1;
    return { p, y1, y2, diff };
  });

  let t = 0;
  function frame(){
    t += 0.02;
    bases.forEach((b, i) => {
      const phase = i * Math.PI / 3;
      const amp1 = 6;
      const amp2 = 8;
      const y1 = b.y1 + Math.sin(t * 1.3 + phase) * amp1;
      const y2 = b.y2 + Math.cos(t * 1.0 + phase) * amp2;
      const yMid = y1 + b.diff;
      const d = `
        M0,${y1.toFixed(2)}
        C240,${y2.toFixed(2)} 480,${yMid.toFixed(2)} 720,${y1.toFixed(2)}
        C960,${y2.toFixed(2)} 1200,${yMid.toFixed(2)} 1440,${y1.toFixed(2)}
        L1440,120 L0,120 Z
      `.replace(/\s+/g,' ').trim();
      b.p.setAttribute('d', d);
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

//  Depth counter replay 
(function () {
  function ready(fn){ document.readyState!=='loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    const sec = document.getElementById('depth');
    if (!sec) return;
    const numEl = sec.querySelector('.depth-num');
    if (!numEl) return;

    const START = 1000;
    const END = 10984;
    const DURATION = 1800;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ENTER_T = 0.45;
    const EXIT_T  = 0.15;

    let playing = false;
    let playedThisPass = false;
    let rafId = 0;

    const fmt = (n) => n.toLocaleString('en-US') + ' m';
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function stopAnim(){
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      playing = false;
    }

    function animateCount(){
      if (playing || playedThisPass) return;
      playedThisPass = true;
      playing = true;

      if (reduceMotion){
        numEl.textContent = fmt(END);
        numEl.setAttribute('aria-valuenow', String(END));
        playing = false;
        return;
      }

      const t0 = performance.now();
      function frame(now){
        const t = Math.min((now - t0) / DURATION, 1);
        const val = Math.round(START + (END - START) * easeOutCubic(t));
        numEl.textContent = fmt(val);
        numEl.setAttribute('aria-valuenow', String(val));
        if (t < 1){
          rafId = requestAnimationFrame(frame);
        } else {
          playing = false;
        }
      }
      rafId = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const r = entry.intersectionRatio || 0;
        if (entry.isIntersecting && r >= ENTER_T){
          animateCount();
        }
        if (r < EXIT_T){
          stopAnim();
          playedThisPass = false;
          numEl.textContent = fmt(START);
          numEl.setAttribute('aria-valuenow', String(START));
        }
      });
    }, { threshold: [0, EXIT_T, ENTER_T, 1] });

    io.observe(sec);

    if (!('IntersectionObserver' in window)){
      setTimeout(animateCount, 600);
    }

    window.addEventListener('pageshow', (e)=>{
      if (e.persisted){
        playedThisPass = false;
        numEl.textContent = fmt(START);
        numEl.setAttribute('aria-valuenow', String(START));
      }
    });
  });
})();

//  Scroll-based nav highlighting 
(function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#site-header nav a");

  window.addEventListener(
    "scroll",
    throttle(() => {
      let current = "";
      sections.forEach((sec) => {
        const top = window.scrollY;
        if (top >= sec.offsetTop - 100) {
          let id = sec.getAttribute("id");
          if (id === "depth") id = "intro";
          current = id;
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    })
  );
})();

//  Wave motion for SVG paths 
(function () {
  const paths = Array.from(document.querySelectorAll(".waveband .wave path"));
  if (!paths.length) return;

  const bases = paths.map((p) => {
    const d = p.getAttribute("d") || "";
    const y1m = d.match(/M0,([-\d.]+)/);
    const y2m = d.match(/C240,([-\d.]+)/);
    const yMidm = d.match(/480,([-\d.]+)/);
    const y1 = y1m ? parseFloat(y1m[1]) : 60;
    const y2 = y2m ? parseFloat(y2m[1]) : 100;
    const yMid = yMidm ? parseFloat(yMidm[1]) : y1 - 50;
    const diff = yMid - y1;
    return { p, y1, y2, diff };
  });

  let t = 0;
  function frame() {
    t += 0.02;
    bases.forEach((b, i) => {
      const phase = (i * Math.PI) / 3;
      const amp1 = 6;
      const amp2 = 8;
      const y1 = b.y1 + Math.sin(t * 1.3 + phase) * amp1;
      const y2 = b.y2 + Math.cos(t * 1.0 + phase) * amp2;
      const yMid = y1 + b.diff;
      const d = `
        M0,${y1.toFixed(2)}
        C240,${y2.toFixed(2)} 480,${yMid.toFixed(2)} 720,${y1.toFixed(2)}
        C960,${y2.toFixed(2)} 1200,${yMid.toFixed(2)} 1440,${y1.toFixed(2)}
        L1440,120 L0,120 Z
      `.replace(/\s+/g, " ").trim();
      b.p.setAttribute("d", d);
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

//  Depth counter animation 
(function () {
  function ready(fn) {
    document.readyState !== "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    const sec = document.getElementById("depth");
    if (!sec) return;
    const numEl = sec.querySelector(".depth-num");
    if (!numEl) return;

    const START = 1000;
    const END = 10984;
    const DURATION = 1800;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ENTER_T = 0.45;
    const EXIT_T = 0.15;

    let playing = false;
    let playedThisPass = false;
    let rafId = 0;

    const fmt = (n) => n.toLocaleString("en-US") + " m";
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function stopAnim() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      playing = false;
    }

    function animateCount() {
      if (playing || playedThisPass) return;
      playedThisPass = true;
      playing = true;

      if (reduceMotion) {
        numEl.textContent = fmt(END);
        numEl.setAttribute("aria-valuenow", String(END));
        playing = false;
        return;
      }

      const t0 = performance.now();
      function frame(now) {
        const t = Math.min((now - t0) / DURATION, 1);
        const val = Math.round(START + (END - START) * easeOutCubic(t));
        numEl.textContent = fmt(val);
        numEl.setAttribute("aria-valuenow", String(val));
        if (t < 1) {
          rafId = requestAnimationFrame(frame);
        } else {
          playing = false;
        }
      }
      rafId = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const r = entry.intersectionRatio || 0;
          if (entry.isIntersecting && r >= ENTER_T) {
            animateCount();
          }
          if (r < EXIT_T) {
            stopAnim();
            playedThisPass = false;
            numEl.textContent = fmt(START);
            numEl.setAttribute("aria-valuenow", String(START));
          }
        });
      },
      { threshold: [0, EXIT_T, ENTER_T, 1] }
    );

    io.observe(sec);

    if (!("IntersectionObserver" in window)) {
      setTimeout(animateCount, 600);
    }

    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        playedThisPass = false;
        numEl.textContent = fmt(START);
        numEl.setAttribute("aria-valuenow", String(START));
      }
    });
  });
})();

//  Single-frame image rotator (Section3) 
(function(){
  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function(){
    const root = document.querySelector('#challenges .rotator');
    if (!root) return;

    const frame = root.querySelector('.rotor-frame');
    const images = Array.from(frame.querySelectorAll('img'));
    const btnPrev = root.querySelector('.rotor-arrow.prev');
    const btnNext = root.querySelector('.rotor-arrow.next');
    const dotsWrap = root.querySelector('.rotor-dots');

    if (!images.length) return;

    dotsWrap.innerHTML = '';
    const dots = images.map((_, idx) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Slide ${idx + 1}`);
      dotsWrap.appendChild(b);
      return b;
    });

    let i = 0;
    let timer = null;
    const INTERVAL = 3500;

    function show(idx){
      i = (idx + images.length) % images.length;
      images.forEach((img, k) => img.classList.toggle('is-active', k === i));
      dots.forEach((d, k) => d.classList.toggle('active', k === i));
    }

    function go(step){ show(i + step); }
    function play(){ stop(); timer = setInterval(() => go(1), INTERVAL); }
    function stop(){ if (timer) clearInterval(timer); timer = null; }

    btnPrev?.addEventListener('click', () => { stop(); go(-1); play(); });
    btnNext?.addEventListener('click', () => { stop(); go(1); play(); });

    dots.forEach((d, idx) => d.addEventListener('click', () => { stop(); show(idx); play(); }));

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', play);

    const lb = document.getElementById('lightbox');
    if (lb){
      const lbImg = lb.querySelector('.lb-img');
      const lbCap = lb.querySelector('.lb-cap');
      const lbClose = lb.querySelector('.lb-close');
      let lastFocus = null;

      if (lb.parentElement !== document.body) {
        document.body.appendChild(lb);
      }

      function openLB(imgEl){
        const cap = imgEl.dataset.cap || imgEl.alt || '';
        const src = imgEl.getAttribute('data-full') || imgEl.currentSrc || imgEl.src;
        lastFocus = document.activeElement;
        lbImg.src = src;
        lbImg.alt = cap;
        lbCap.textContent = cap;
        lb.setAttribute('aria-hidden','false');
        lbClose?.focus();
        stop();
      }

      function closeLB(){
        lb.setAttribute('aria-hidden','true');
        lbImg.src = '';
        lbCap.textContent = '';
        lastFocus?.focus();
        play();
      }

      images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(){
          openLB(this);
        });
      });

      lb.addEventListener('click', (e) => {
        if (e.target === lb) closeLB();
      });
      lbClose?.addEventListener('click', closeLB);
      window.addEventListener('keydown', (e) => {
        if (lb.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') closeLB();
      });

      lbImg.addEventListener('click', closeLB);
    }

    show(0);
    play();
  });
})();

//  Quiz
(function () {
  const correctAnswers = {
    1: '11000',
    2: '27000',
    3: '450',
    4: 'habitat'
  };
  let score = 0;
  let currentQuestion = 1;
  const totalQuestions = 4;
  const answered = new Set();

  const quizContainer = document.querySelector('#quiz .quiz-container');
  const quizQuestions = document.querySelectorAll('.quiz-question');
  const quizResult = document.getElementById('quiz-result');
  const scoreEl = document.getElementById('quiz-score');
  const messageEl = document.getElementById('quiz-message');
  const retryBtn = document.getElementById('quiz-retry');

  function showQuestion(index) {
    quizQuestions.forEach((question, i) => {
      question.classList.toggle('active', i + 1 === index);
      question.hidden = i + 1 !== index;
    });
    quizResult.hidden = true;
  }

  function showResult() {
    quizQuestions.forEach(question => {
      question.hidden = true;
      question.classList.remove('active');
    });
    quizResult.hidden = false;
    quizResult.classList.add('active');
    scoreEl.textContent = `Score: ${score}/${totalQuestions}`;
    
    if (score === totalQuestions) {
      messageEl.textContent = 'Excellent! You answered all questions correctly!';
    } else if (score >= totalQuestions - 2) {
      messageEl.textContent = 'Great job! You got most of them right!';
    } else {
      messageEl.textContent = 'Well done for trying! Review the facts and try again!';
    }
  }

  function resetQuiz() {
    score = 0;
    currentQuestion = 1;
    answered.clear();
    quizQuestions.forEach(question => {
      question.querySelector('.feedback').textContent = '';
      question.querySelectorAll('.choices button').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
      });
    });
    showQuestion(1);
  }

  quizQuestions.forEach(question => {
    const buttons = question.querySelectorAll('.choices button');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const q = btn.dataset.q;
        const a = btn.dataset.a;
        const feedback = question.querySelector('.feedback');
        
        if (answered.has(q)) return;

        answered.add(q);
        buttons.forEach(b => {
          b.disabled = true;
          if (b.dataset.a === correctAnswers[q]) {
            b.classList.add('correct');
          } else if (b === btn) {
            b.classList.add('wrong');
          }
        });

        if (a === correctAnswers[q]) {
          score += 1;
          feedback.textContent = 'Correct!';
        } else {
          feedback.textContent = 'Not quite—try again next time.';
        }

        setTimeout(() => {
          if (currentQuestion < totalQuestions) {
            currentQuestion += 1;
            showQuestion(currentQuestion);
          } else {
            showResult();
          }
        }, 1000);
      });
    });
  });

  retryBtn.addEventListener('click', resetQuiz);
  showQuestion(1);

  const quizSection = document.querySelector('#quiz');
  const waveContainer = document.querySelector('.quiz-wave-container');

  if (quizSection && waveContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          quizSection.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    observer.observe(quizSection);
  }
})();

// Wave For Quiz Section 
(function extendWaveMotion() {
  const paths = Array.from(document.querySelectorAll('.quiz-wave svg path'));
  if (!paths.length) return;

  const bases = paths.map(p => {
    const d = p.getAttribute('d') || '';
    const y1m = d.match(/M0,([-\d.]+)/);
    const y2m = d.match(/C240,([-\d.]+)/);
    const yMidm = d.match(/480,([-\d.]+)/);
    const y1 = y1m ? parseFloat(y1m[1]) : 160;
    const y2 = y2m ? parseFloat(y2m[1]) : 240;
    const yMid = yMidm ? parseFloat(yMidm[1]) : (y1 - 80);
    const diff = yMid - y1;
    return { p, y1, y2, diff };
  });

  let t = 0;
  function frame() {
    t += 0.02;
    bases.forEach((b, i) => {
      const phase = i * Math.PI / 3;
      const amp1 = 20;
      const amp2 = 30;
      const y1 = b.y1 + Math.sin(t * 1.3 + phase) * amp1;
      const y2 = b.y2 + Math.cos(t * 1.0 + phase) * amp2;
      const yMid = y1 + b.diff;
      const d = `
        M0,${y1.toFixed(2)}
        C240,${y2.toFixed(2)} 480,${yMid.toFixed(2)} 720,${y1.toFixed(2)}
        C960,${y2.toFixed(2)} 1200,${yMid.toFixed(2)} 1440,${y1.toFixed(2)}
        L1440,320 L0,320 Z
      `.replace(/\s+/g, ' ').trim();
      b.p.setAttribute('d', d);
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

//  Site-wide cursor bubbles 
const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduce) {
  const canvas = document.createElement('canvas');
  canvas.id = 'cursorCanvas';
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', zIndex: 1, pointerEvents: 'none'
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
  window.addEventListener('resize', resize); resize();

  const spawn = (x, y, n = 12) => {
    for (let i = 0; i < n; i++) {
      particles.push({
        x, y,
        r: Math.random()*3 + 2,
        vx: (Math.random()-0.5)*0.6,
        vy: - (Math.random()*1.2 + 0.4),
        a: 1
      });
    }
  };
  const moveEmit = throttle(e => {
    const x = e.clientX, y = e.clientY;
    spawn(x, y, 10);
  }, 20);
  window.addEventListener('mousemove', moveEmit, {passive:true});

  function tick(){
    ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = particles.length-1; i >= 0; i--){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vy -= 0.006;
      p.a -= 0.012;
      if (p.a <= 0 || p.y < -20) { particles.splice(i,1); continue; }
      ctx.globalAlpha = Math.max(p.a,0);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(132, 181, 192, 0.69)';
      ctx.fill();
      ctx.globalAlpha = Math.max(p.a*0.6,0);
      ctx.beginPath();
      ctx.arc(p.x - p.r*0.3, p.y - p.r*0.3, p.r*0.5, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(216, 216, 216, 0.58)';
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
}

//  Star Rating System 
(function () {
  const starContainers = document.querySelectorAll('.stars');

  starContainers.forEach(container => {
    const stars = container.querySelectorAll('.star');

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        stars.forEach(s => s.classList.remove('selected'));
        for (let i = 0; i < value; i++) {
          stars[i].classList.add('selected');
        }
        const question = container.getAttribute('data-question');
        console.log(`Question ${question} rated: ${value} stars`);
      });

      star.addEventListener('mouseover', () => {
        const value = parseInt(star.getAttribute('data-value'));
        stars.forEach(s => s.classList.remove('hover'));
        for (let i = 0; i < value; i++) {
          stars[i].classList.add('hover');
        }
      });

      container.addEventListener('mouseout', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });
    });
  });
})();

// Zone Creature Animation 
(function () {
  const zones = document.querySelectorAll('.zone');
  if (!zones.length) {
    console.log('No .zone elements found');
    return;
  }

  const observerOptions = {
    root: null,
    threshold: [0, 0.2, 0.9],
    rootMargin: '0px 0px -10% 0px'
  };

  const zoneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const creatures = entry.target.querySelectorAll('.creature');

      if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
        const titleEl = entry.target.querySelector('h2');
        if (titleEl) console.log('Zone visible:', titleEl.textContent);
        creatures.forEach((creature, index) => {
          console.log(`Adding .visible to creature ${index + 1}`);
          creature.classList.add('visible');
        });
      } else if (entry.intersectionRatio < 0.2) {
        const titleEl = entry.target.querySelector('h2');
        if (titleEl) console.log('Zone exiting:', titleEl.textContent);
        creatures.forEach(creature => creature.classList.remove('visible'));
      }
    });
  }, observerOptions);

  zones.forEach(zone => {
    const titleEl = zone.querySelector('h2');
    if (titleEl) console.log('Observing zone:', titleEl.textContent);
    zoneObserver.observe(zone);
  });
})();

// Lightbox 
(function () {
  let lb = document.getElementById('lightbox');
  let lbImg, lbCap, lbClose, lastFocus;

  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML = `
      <img class="lb-img" alt="">
      <p class="lb-cap"></p>
      <button class="lb-close" aria-label="Close lightbox">×</button>
    `;
    document.body.appendChild(lb);
  }

  lbImg  = lb.querySelector('.lb-img');
  lbCap  = lb.querySelector('.lb-cap');
  lbClose = lb.querySelector('.lb-close');

  const images = document.querySelectorAll('.zone .creature img');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLB(img));
  });

  function openLB(imgEl) {
    const cap = imgEl.dataset.cap || imgEl.alt || '';
    const src = imgEl.getAttribute('data-full') || imgEl.currentSrc || imgEl.src;
    lastFocus = document.activeElement;
    lbImg.src = src;
    lbImg.alt = cap;
    lbCap.textContent = cap;
    lb.setAttribute('aria-hidden', 'false');
    lbClose.focus();
  }

  function closeLB() {
    lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    lbCap.textContent = '';
    if (lastFocus) lastFocus.focus();
  }

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLB();
  });
  lbClose.addEventListener('click', closeLB);
  lbImg.addEventListener('click', closeLB);
  window.addEventListener('keydown', (e) => {
    if (lb.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') closeLB();
  });
})();
