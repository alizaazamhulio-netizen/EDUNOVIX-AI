/* ============================================================
   FORCE & MOTION — Interactive MDCAT Physics
   All interactions, simulations, MCQs, localStorage
   ============================================================ */

(function() {
'use strict';

/* ============ UTILITIES ============ */
function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2500);
}
window.showToast = showToast;

window.scrollToSection = function(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

window.revealAnswer = function(id) {
  var el = document.getElementById(id);
  if (el) {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
};

/* ============ THEME TOGGLE ============ */
var themeToggle = document.getElementById('themeToggle');
var savedTheme = localStorage.getItem('fm-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', function() {
  var current = document.documentElement.getAttribute('data-theme');
  var next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('fm-theme', next);
  if (typeof drawNewtonGraph === 'function') drawNewtonGraph();
});

/* ============ MOBILE NAV ============ */
var hamburger = document.getElementById('navHamburger');
var navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(function(a) {
  a.addEventListener('click', function() { navLinks.classList.remove('open'); });
});

/* ============ SCROLL TOP ============ */
var scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', function() {
  if (window.scrollY > 400) scrollTopBtn.classList.add('show');
  else scrollTopBtn.classList.remove('show');
  updateProgress();
  updateActiveNav();
});
scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============ PROGRESS TRACKING ============ */
var sections = ['sec-1','sec-2','sec-3','sec-4','sec-5','sec-6','sec-7','sec-8','sec-9','sec-10'];
var visitedSections = JSON.parse(localStorage.getItem('fm-visited') || '[]');

function updateProgress() {
  sections.forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
      if (visitedSections.indexOf(id) === -1) {
        visitedSections.push(id);
        localStorage.setItem('fm-visited', JSON.stringify(visitedSections));
      }
    }
  });
  var pct = Math.round((visitedSections.length / sections.length) * 100);
  var heroP = document.getElementById('heroProgress');
  var fill = document.getElementById('progressFill');
  if (heroP) heroP.textContent = pct + '%';
  if (fill) fill.style.width = pct + '%';
}

function updateActiveNav() {
  var links = navLinks.querySelectorAll('a');
  var scrollPos = window.scrollY + 100;
  links.forEach(function(link) {
    link.classList.remove('active');
    var href = link.getAttribute('href');
    if (!href || href === '#hero') return;
    var target = document.querySelector(href);
    if (target && target.offsetTop <= scrollPos && target.offsetTop + target.offsetHeight > scrollPos) {
      link.classList.add('active');
    }
  });
}

/* ============ ANIMATION HELPER ============ */
function animateTransform(element, fromX, toX, duration, onComplete) {
  var start = null;
  function step(ts) {
    if (!start) start = ts;
    var progress = Math.min((ts - start) / duration, 1);
    var eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    var x = fromX + (toX - fromX) * eased;
    element.setAttribute('transform', 'translate(' + x + ',95)');
    if (progress < 1) requestAnimationFrame(step);
    else if (onComplete) onComplete();
  }
  requestAnimationFrame(step);
}

/* ============ SECTION 1: MOTION ANIMATION ============ */
var motionPlaying = false;
window.playMotion = function() {
  if (motionPlaying) return;
  motionPlaying = true;
  var car = document.getElementById('motionCar');
  var posEl = document.getElementById('motionPos');
  var timeEl = document.getElementById('motionTime');
  var btn = document.getElementById('playMotionBtn');
  btn.textContent = 'Moving...';
  btn.disabled = true;

  var duration = 3000;
  var startT = null;
  var fromX = 20, toX = 320;

  function step(ts) {
    if (!startT) startT = ts;
    var p = Math.min((ts - startT) / duration, 1);
    var eased = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2,2)/2;
    var x = fromX + (toX - fromX) * eased;
    car.setAttribute('transform', 'translate(' + x + ',95)');
    posEl.textContent = ((x - fromX) * 0.1).toFixed(1) + ' m';
    timeEl.textContent = ((p * 3)).toFixed(1) + ' s';
    if (p < 1) requestAnimationFrame(step);
    else {
      motionPlaying = false;
      btn.textContent = 'Reset Motion';
      btn.disabled = false;
      btn.onclick = function() {
        car.setAttribute('transform', 'translate(20,95)');
        posEl.textContent = '0 m';
        timeEl.textContent = '0 s';
        btn.textContent = 'Play Motion';
        btn.onclick = window.playMotion;
      };
    }
  }
  requestAnimationFrame(step);
};

/* ============ SECTION 2: DISTANCE & DISPLACEMENT ============ */
var walkState = 'reset';
window.showDistance = function() {
  var student = document.getElementById('walkStudent');
  var distVal = document.getElementById('distVal');
  var dispVal = document.getElementById('dispVal');
  var note = document.getElementById('walkNote');
  var distPath = document.getElementById('distPath');
  var dispPath = document.getElementById('dispPath');
  distPath.setAttribute('opacity', '0.7');
  dispPath.setAttribute('stroke-width', '2');
  note.textContent = 'Distance = 10 m (full path: 5m east + 5m west). Displacement = 0 m (same start and end point).';
  distVal.textContent = '10 m';
  dispVal.textContent = '0 m';

  student.setAttribute('cx', '200');
  var phase = 0;
  var startT = null;
  function step(ts) {
    if (!startT) startT = ts;
    var p = Math.min((ts - startT) / 1500, 1);
    var eased = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2,2)/2;
    var x;
    if (phase === 0) { x = 200 + 120 * eased; if (p >= 1) { phase = 1; startT = null; } }
    else { x = 320 - 120 * eased; }
    student.setAttribute('cx', x);
    if (phase === 0 || p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
};

window.showDisplacement = function() {
  var distPath = document.getElementById('distPath');
  var dispPath = document.getElementById('dispPath');
  var student = document.getElementById('walkStudent');
  var note = document.getElementById('walkNote');
  distPath.setAttribute('opacity', '0.2');
  dispPath.setAttribute('stroke-width', '4');
  student.setAttribute('cx', '200');
  note.textContent = 'Displacement = 0 m. The straight line from start to finish is zero because you end where you began.';
  document.getElementById('distVal').textContent = '10 m';
  document.getElementById('dispVal').textContent = '0 m';
};

window.resetWalk = function() {
  var student = document.getElementById('walkStudent');
  var distPath = document.getElementById('distPath');
  var dispPath = document.getElementById('dispPath');
  student.setAttribute('cx', '200');
  distPath.setAttribute('opacity', '0.7');
  dispPath.setAttribute('stroke-width', '4');
  document.getElementById('distVal').textContent = '0 m';
  document.getElementById('dispVal').textContent = '0 m';
  document.getElementById('walkNote').textContent = 'Click "Show Distance" to see the full path, or "Show Displacement" to see the straight-line result.';
};

/* ============ SECTION 3: SPEED & VELOCITY ============ */
var svMode = 'speed';
var svPlaying = false;
window.setSpeedVelocityMode = function(mode) {
  svMode = mode;
  document.getElementById('toggleSpeed').classList.toggle('active', mode === 'speed');
  document.getElementById('toggleVel').classList.toggle('active', mode === 'velocity');
  var arrow = document.getElementById('svArrow');
  arrow.setAttribute('opacity', mode === 'velocity' ? '1' : '0');
  document.getElementById('svLabel').textContent = mode === 'speed' ? 'Speed:' : 'Velocity:';
};

window.playSpeedVelocity = function() {
  if (svPlaying) return;
  svPlaying = true;
  var car = document.getElementById('svCar');
  var distEl = document.getElementById('svDist');
  var timeEl = document.getElementById('svTime');
  var valEl = document.getElementById('svVal');
  var btn = document.getElementById('svPlayBtn');
  btn.textContent = 'Playing...';
  btn.disabled = true;

  var duration = 2500;
  var fromX = 20, toX = 320;
  var startT = null;
  function step(ts) {
    if (!startT) startT = ts;
    var p = Math.min((ts - startT) / duration, 1);
    var eased = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2,2)/2;
    var x = fromX + (toX - fromX) * eased;
    car.setAttribute('transform', 'translate(' + x + ',75)');
    var dist = (x - fromX) * 0.1;
    var time = p * 2.5;
    distEl.textContent = dist.toFixed(1) + ' m';
    timeEl.textContent = time.toFixed(1) + ' s';
    valEl.textContent = time > 0 ? (dist / time).toFixed(1) + ' m/s' : '0 m/s';
    if (p < 1) requestAnimationFrame(step);
    else {
      svPlaying = false;
      btn.textContent = 'Reset';
      btn.disabled = false;
      btn.onclick = function() {
        car.setAttribute('transform', 'translate(20,75)');
        distEl.textContent = '0 m';
        timeEl.textContent = '0 s';
        valEl.textContent = '0 m/s';
        btn.textContent = 'Play';
        btn.onclick = window.playSpeedVelocity;
      };
    }
  }
  requestAnimationFrame(step);
};

/* ============ SECTION 4: ACCELERATION ============ */
var accelVal = 2;
var accelPlaying = false;

window.updateAccel = function() {
  accelVal = parseFloat(document.getElementById('accelSlider').value);
  document.getElementById('accelSliderVal').textContent = accelVal;
  document.getElementById('accelVal').textContent = accelVal + ' m/s²';
};
document.getElementById('accelSlider').addEventListener('input', window.updateAccel);

window.playAccel = function() {
  if (accelPlaying) return;
  accelPlaying = true;
  var car = document.getElementById('accelCar');
  var finalVEl = document.getElementById('accelFinalV');
  var timeEl = document.getElementById('accelTime');
  var btn = document.getElementById('accelPlayBtn');
  btn.textContent = 'Accelerating...';
  btn.disabled = true;

  var duration = 4000;
  var fromX = 20;
  var maxDist = 300;
  var startT = null;
  function step(ts) {
    if (!startT) startT = ts;
    var t = (ts - startT) / 1000;
    var p = Math.min(t / 4, 1);
    var v = accelVal * t;
    var s = 0.5 * accelVal * t * t;
    var x = fromX + Math.min(s * 8, maxDist);
    car.setAttribute('transform', 'translate(' + x + ',75)');
    finalVEl.textContent = v.toFixed(1) + ' m/s';
    timeEl.textContent = t.toFixed(1) + ' s';
    if (p < 1 && x < fromX + maxDist) requestAnimationFrame(step);
    else {
      accelPlaying = false;
      btn.textContent = 'Reset';
      btn.disabled = false;
      btn.onclick = function() {
        car.setAttribute('transform', 'translate(20,75)');
        finalVEl.textContent = '0 m/s';
        timeEl.textContent = '0 s';
        btn.textContent = 'Play';
        btn.onclick = window.playAccel;
      };
    }
  }
  requestAnimationFrame(step);
};

window.playZeroAccel = function() {
  var car = document.getElementById('accelCar');
  var finalVEl = document.getElementById('accelFinalV');
  var timeEl = document.getElementById('accelTime');
  var accelVEl = document.getElementById('accelVal');
  var btn = document.getElementById('accelPlayBtn');
  var constV = 5;
  accelVEl.textContent = '0 m/s² (constant velocity)';
  finalVEl.textContent = constV + ' m/s';
  var startT = null;
  var fromX = 20, maxDist = 300;
  function step(ts) {
    if (!startT) startT = ts;
    var t = (ts - startT) / 1000;
    var p = Math.min(t / 3, 1);
    var x = fromX + constV * t * 20;
    car.setAttribute('transform', 'translate(' + Math.min(x, fromX + maxDist) + ',75)');
    timeEl.textContent = t.toFixed(1) + ' s';
    if (p < 1 && x < fromX + maxDist) requestAnimationFrame(step);
    else {
      btn.textContent = 'Reset';
      btn.onclick = function() {
        car.setAttribute('transform', 'translate(20,75)');
        finalVEl.textContent = '0 m/s';
        timeEl.textContent = '0 s';
        accelVEl.textContent = accelVal + ' m/s²';
        btn.textContent = 'Play';
        btn.onclick = window.playAccel;
      };
    }
  }
  requestAnimationFrame(step);
};

/* ============ SECTION 5: FORMULA QUIZ ============ */
var formulaQuizData = [
  { q: 'If u, a and t are given and you need v, which equation should you use?', opts: ['s = ut + ½at²', 'v = u + at', 'v² = u² + 2as', 's = ½(u + v)t'], answer: 1, fb: 'Correct! v = u + at directly gives final velocity from initial velocity, acceleration, and time.' },
  { q: 'If u, a and s are given (no time), which equation finds v?', opts: ['v = u + at', 's = ut + ½at²', 'v² = u² + 2as', 's = ½(u + v)t'], answer: 2, fb: 'Correct! v² = u² + 2as does not require time — perfect when time is unknown.' },
  { q: 'If u, v and t are given (no acceleration), which equation finds s?', opts: ['s = ut + ½at²', 'v = u + at', 'v² = u² + 2as', 's = ½(u + v)t'], answer: 3, fb: 'Correct! s = ½(u + v)t uses average velocity times time — no acceleration needed.' },
  { q: 'If u, a and t are given and you need displacement s, which equation?', opts: ['s = ut + ½at²', 'v = u + at', 'v² = u² + 2as', 's = ½(u + v)t'], answer: 0, fb: 'Correct! s = ut + ½at² gives displacement from initial velocity, acceleration, and time.' }
];
var formulaQuizIdx = 0;

window.answerFormulaQuiz = function(idx) {
  var q = formulaQuizData[formulaQuizIdx];
  var opts = document.querySelectorAll('#formulaQuizOpts .quiz-opt');
  var fb = document.getElementById('formulaQuizFb');
  opts.forEach(function(o, i) {
    o.disabled = true;
    if (i === q.answer) o.classList.add('correct');
    if (i === idx && i !== q.answer) o.classList.add('wrong');
  });
  if (idx === q.answer) {
    fb.textContent = '✓ ' + q.fb;
    fb.className = 'quiz-feedback show correct';
  } else {
    fb.textContent = '✗ Not quite. The correct answer is: ' + q.opts[q.answer];
    fb.className = 'quiz-feedback show wrong';
  }
};

window.nextFormulaQuiz = function() {
  formulaQuizIdx = (formulaQuizIdx + 1) % formulaQuizData.length;
  var q = formulaQuizData[formulaQuizIdx];
  document.getElementById('formulaQuizQ').textContent = q.q;
  var opts = document.querySelectorAll('#formulaQuizOpts .quiz-opt');
  opts.forEach(function(o, i) {
    o.textContent = q.opts[i];
    o.classList.remove('correct', 'wrong');
    o.disabled = false;
  });
  var fb = document.getElementById('formulaQuizFb');
  fb.className = 'quiz-feedback';
  fb.textContent = '';
};

/* ============ SECTION 6: FORCE SIM ============ */
window.updateForceSim = function() {
  var f = parseFloat(document.getElementById('appliedForceSlider').value);
  var fr = parseFloat(document.getElementById('frictionForceSlider').value);
  var m = parseFloat(document.getElementById('massForceSlider').value);
  document.getElementById('appliedForceVal').textContent = f;
  document.getElementById('frictionForceVal').textContent = fr;
  document.getElementById('massForceVal').textContent = m;
  document.getElementById('forceBoxMass').textContent = m + 'kg';
  var net = f - fr;
  var a = m > 0 ? net / m : 0;
  document.getElementById('netForceVal').textContent = net + ' N';
  document.getElementById('forceAccelVal').textContent = a.toFixed(2) + ' m/s²';
  var arrow = document.getElementById('appliedArrow');
  var len = Math.max(20, f * 4);
  arrow.setAttribute('x2', 210 + len);
  document.getElementById('appliedLabel').setAttribute('x', 210 + len/2);
};

window.playForceSim = function() {
  var f = parseFloat(document.getElementById('appliedForceSlider').value);
  var fr = parseFloat(document.getElementById('frictionForceSlider').value);
  var m = parseFloat(document.getElementById('massForceSlider').value);
  var net = f - fr;
  if (net <= 0) { showToast('Net force is zero or negative — box will not accelerate!'); return; }
  var a = net / m;
  var box = document.getElementById('forceBox');
  var btn = document.getElementById('forcePlayBtn');
  btn.textContent = 'Moving...';
  btn.disabled = true;
  var fromX = 160, maxDist = 180;
  var startT = null;
  function step(ts) {
    if (!startT) startT = ts;
    var t = (ts - startT) / 1000;
    var s = 0.5 * a * t * t * 10;
    var x = fromX + Math.min(s, maxDist);
    box.setAttribute('x', x);
    if (s < maxDist && t < 5) requestAnimationFrame(step);
    else {
      btn.textContent = 'Reset';
      btn.disabled = false;
      btn.onclick = function() {
        box.setAttribute('x', 160);
        btn.textContent = 'Animate Box';
        btn.onclick = window.playForceSim;
      };
    }
  }
  requestAnimationFrame(step);
};

/* ============ SECTION 7: NEWTON'S LAWS ============ */
// Inertia bus demo
var inertiaPlaying = false;
window.playInertia = function(type) {
  if (inertiaPlaying) return;
  inertiaPlaying = true;
  var bus = document.getElementById('busBody');
  var passenger = document.getElementById('busPassenger');
  var note = document.getElementById('inertiaNote');
  var label = document.getElementById('inertiaLabel');

  if (type === 'start') {
    note.textContent = 'Bus starts moving forward → passenger leans BACKWARD (body tends to stay at rest).';
    label.textContent = 'INERTIA: Body resists motion';
    var startT = null;
    function step(ts) {
      if (!startT) startT = ts;
      var p = Math.min((ts - startT) / 2000, 1);
      var busX = 50 + 100 * p;
      bus.setAttribute('transform', 'translate(' + busX + ',70)');
      var passX = 110 + 100 * p - (1 - p) * 30;
      passenger.setAttribute('cx', Math.max(80, passX));
      if (p < 1) requestAnimationFrame(step);
      else { inertiaPlaying = false; }
    }
    requestAnimationFrame(step);
  } else {
    note.textContent = 'Bus suddenly stops → passenger leans FORWARD (body tends to keep moving).';
    label.textContent = 'INERTIA: Body resists stopping';
    var startT2 = null;
    var initBusX = 150;
    bus.setAttribute('transform', 'translate(' + initBusX + ',70)');
    passenger.setAttribute('cx', 210);
    function step2(ts) {
      if (!startT2) startT2 = ts;
      var p = Math.min((ts - startT2) / 2000, 1);
      var busX = initBusX + (250 - initBusX) * (1 - Math.pow(1 - p, 3));
      bus.setAttribute('transform', 'translate(' + busX + ',70)');
      var passX = 210 + p * 60;
      passenger.setAttribute('cx', Math.min(270, passX));
      if (p < 1) requestAnimationFrame(step2);
      else { inertiaPlaying = false; }
    }
    requestAnimationFrame(step2);
  }
};

window.resetInertia = function() {
  document.getElementById('busBody').setAttribute('transform', 'translate(50,70)');
  document.getElementById('busPassenger').setAttribute('cx', 110);
  document.getElementById('inertiaNote').textContent = 'Click a scenario to see how inertia affects the passenger.';
  document.getElementById('inertiaLabel').textContent = 'INERTIA';
};

// Newton's Second Law sim
window.updateNewtonSim = function() {
  var m = parseFloat(document.getElementById('newtonMassSlider').value);
  var f = parseFloat(document.getElementById('newtonForceSlider').value);
  document.getElementById('newtonMassVal').textContent = m;
  document.getElementById('newtonForceVal').textContent = f;
  document.getElementById('newtonBoxMass').textContent = m + 'kg';
  document.getElementById('newtonMassDisp').textContent = m + ' kg';
  document.getElementById('newtonForceDisp').textContent = f + ' N';
  var a = m > 0 ? f / m : 0;
  document.getElementById('newtonAccelDisp').textContent = a.toFixed(2) + ' m/s²';
  drawNewtonGraph();
};

window.playNewtonSim = function() {
  var m = parseFloat(document.getElementById('newtonMassSlider').value);
  var f = parseFloat(document.getElementById('newtonForceSlider').value);
  var a = m > 0 ? f / m : 0;
  if (a <= 0) { showToast('Set a non-zero force to animate!'); return; }
  var box = document.getElementById('newtonBox');
  var btn = document.getElementById('newtonPlayBtn');
  btn.textContent = 'Moving...';
  btn.disabled = true;
  var fromX = 150, maxDist = 180;
  var startT = null;
  function step(ts) {
    if (!startT) startT = ts;
    var t = (ts - startT) / 1000;
    var s = 0.5 * a * t * t * 8;
    var x = fromX + Math.min(s, maxDist);
    box.setAttribute('x', x);
    if (s < maxDist && t < 5) requestAnimationFrame(step);
    else {
      btn.textContent = 'Reset';
      btn.disabled = false;
      btn.onclick = function() {
        box.setAttribute('x', 150);
        btn.textContent = 'Animate';
        btn.onclick = window.playNewtonSim;
      };
    }
  }
  requestAnimationFrame(step);
};

// Newton's graph
var newtonChart = null;
function drawNewtonGraph() {
  var canvas = document.getElementById('newtonGraph');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  var m = parseFloat(document.getElementById('newtonMassSlider').value);
  var styles = getComputedStyle(document.documentElement);
  var textColor = styles.getPropertyValue('--text-muted').trim();
  var borderColor = styles.getPropertyValue('--border').trim();
  var primaryColor = styles.getPropertyValue('--primary').trim();
  var bgAlt = styles.getPropertyValue('--bg-alt').trim();

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1;
  for (var i = 0; i <= 5; i++) {
    var y = h - 30 - (i / 5) * (h - 50);
    ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(w - 10, y); ctx.stroke();
  }
  ctx.fillStyle = textColor;
  ctx.font = '11px sans-serif';
  ctx.fillText('a (m/s²)', 5, 15);
  ctx.fillText('F (N)', w - 40, h - 5);
  ctx.fillText('0', 20, h - 25);
  ctx.fillText('50', 15, 35);

  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  var maxF = 50;
  for (var f = 0; f <= maxF; f++) {
    var a = m > 0 ? f / m : 0;
    var px = 40 + (f / maxF) * (w - 50);
    var py = h - 30 - Math.min(a / 25, 1) * (h - 50);
    if (f === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  var curF = parseFloat(document.getElementById('newtonForceSlider').value);
  var curA = m > 0 ? curF / m : 0;
  var dotX = 40 + (curF / maxF) * (w - 50);
  var dotY = h - 30 - Math.min(curA / 25, 1) * (h - 50);
  ctx.fillStyle = '#dc2626';
  ctx.beginPath(); ctx.arc(dotX, dotY, 5, 0, Math.PI * 2); ctx.fill();
}
window.drawNewtonGraph = drawNewtonGraph;

// Action-reaction quiz
window.answerARQuiz = function(idx) {
  var opts = document.querySelectorAll('#arQuizOpts .quiz-opt');
  var fb = document.getElementById('arQuizFb');
  var correct = 3;
  opts.forEach(function(o, i) {
    o.disabled = true;
    if (i === correct) o.classList.add('correct');
    if (i === idx && i !== correct) o.classList.add('wrong');
  });
  if (idx === correct) {
    fb.textContent = '✓ Correct! Both B (Earth-Moon) and C (box-table) are true action-reaction pairs. Weight & normal (A) act on the SAME object, so they are NOT an action-reaction pair.';
    fb.className = 'quiz-feedback show correct';
  } else {
    fb.textContent = '✗ The correct answer is D. Both B and C are action-reaction pairs. Option A (weight & normal) act on the same book, so they are NOT a Newton\'s 3rd law pair.';
    fb.className = 'quiz-feedback show wrong';
  }
};

/* ============ SECTION 8: WEIGHT & FRICTION ============ */
var currentPlanet = 'earth';
window.setPlanet = function(planet) {
  currentPlanet = planet;
  document.getElementById('toggleEarth').classList.toggle('active', planet === 'earth');
  document.getElementById('toggleMoon').classList.toggle('active', planet === 'moon');
  var body = document.getElementById('planetBody');
  var name = document.getElementById('planetName');
  if (planet === 'earth') {
    body.setAttribute('fill', '#2563eb');
    name.textContent = 'EARTH';
  } else {
    body.setAttribute('fill', '#94a3b8');
    name.textContent = 'MOON';
  }
  updateWeight();
};

window.updateWeight = function() {
  var m = parseFloat(document.getElementById('weightMassSlider').value);
  var g = currentPlanet === 'earth' ? 9.8 : 1.6;
  document.getElementById('weightMassVal').textContent = m;
  document.getElementById('weightMassDisp').textContent = m + ' kg';
  document.getElementById('weightGDisp').textContent = g + ' m/s²';
  document.getElementById('weightDisp').textContent = (m * g).toFixed(1) + ' N';
};

// Friction sim
window.updateFriction = function() {
  var applied = parseFloat(document.getElementById('fricAppliedSlider').value);
  var staticLimit = parseFloat(document.getElementById('fricStaticSlider').value);
  document.getElementById('fricAppliedVal').textContent = applied;
  document.getElementById('fricStaticVal').textContent = staticLimit;
  document.getElementById('fricAppliedDisp').textContent = applied + ' N';
  var actualFric, status;
  if (applied < staticLimit) {
    actualFric = applied;
    status = 'Static (not moving)';
  } else {
    actualFric = staticLimit * 0.7;
    status = 'Kinetic (sliding)';
  }
  document.getElementById('fricActualDisp').textContent = actualFric.toFixed(1) + ' N';
  document.getElementById('fricStatusDisp').textContent = status;
  document.getElementById('fricStatus').textContent = status === 'Static (not moving)' ? 'Static — box not moving' : 'Kinetic — box is sliding';
};

window.playFriction = function() {
  var applied = parseFloat(document.getElementById('fricAppliedSlider').value);
  var staticLimit = parseFloat(document.getElementById('fricStaticSlider').value);
  var box = document.getElementById('fricBox');
  var btn = document.getElementById('fricPlayBtn');
  if (applied < staticLimit) { showToast('Applied force must exceed static friction to move the box!'); return; }
  btn.textContent = 'Sliding...';
  btn.disabled = true;
  var fromX = 150, maxDist = 180;
  var startT = null;
  function step(ts) {
    if (!startT) startT = ts;
    var t = (ts - startT) / 1000;
    var net = applied - staticLimit * 0.7;
    var s = net * t * t * 3;
    var x = fromX + Math.min(s, maxDist);
    box.setAttribute('x', x);
    if (s < maxDist && t < 4) requestAnimationFrame(step);
    else {
      btn.textContent = 'Reset';
      btn.disabled = false;
      btn.onclick = function() {
        box.setAttribute('x', 150);
        btn.textContent = 'Animate';
        btn.onclick = window.playFriction;
      };
    }
  }
  requestAnimationFrame(step);
};

// FBD toggles
window.toggleFBD = function(force, checkbox) {
  var el = document.getElementById('fbd' + force);
  if (el) el.setAttribute('opacity', checkbox.checked ? '1' : '0');
};

/* ============ SECTION 9: MOMENTUM ============ */
window.updateMomentum = function() {
  var m = parseFloat(document.getElementById('momMassSlider').value);
  var v = parseFloat(document.getElementById('momVelSlider').value);
  document.getElementById('momMassVal').textContent = m;
  document.getElementById('momVelVal').textContent = v;
  document.getElementById('momMassDisp').textContent = m + ' kg';
  document.getElementById('momVelDisp').textContent = v + ' m/s';
  document.getElementById('momVal').textContent = (m * v) + ' kg·m/s';
};

// Collision sim
window.updateCollision = function() {
  var m1 = parseFloat(document.getElementById('collM1Slider').value);
  var u1 = parseFloat(document.getElementById('collU1Slider').value);
  var m2 = parseFloat(document.getElementById('collM2Slider').value);
  var u2 = parseFloat(document.getElementById('collU2Slider').value);
  document.getElementById('collM1Val').textContent = m1;
  document.getElementById('collU1Val').textContent = u1;
  document.getElementById('collM2Val').textContent = m2;
  document.getElementById('collU2Val').textContent = u2;
  var initP = m1 * u1 + m2 * u2;
  document.getElementById('collInitP').textContent = initP + ' kg·m/s';
  document.getElementById('collFinalP').textContent = initP + ' kg·m/s';
};

var collPlaying = false;
window.playCollision = function() {
  if (collPlaying) return;
  collPlaying = true;
  var cart1 = document.getElementById('cart1');
  var cart2 = document.getElementById('cart2');
  var btn = document.getElementById('collPlayBtn');
  btn.textContent = 'Colliding...';
  btn.disabled = true;

  var m1 = parseFloat(document.getElementById('collM1Slider').value);
  var u1 = parseFloat(document.getElementById('collU1Slider').value);
  var m2 = parseFloat(document.getElementById('collM2Slider').value);
  var u2 = parseFloat(document.getElementById('collU2Slider').value);
  var totalP = m1 * u1 + m2 * u2;
  // After perfectly inelastic collision: v = totalP / (m1+m2)
  var v = totalP / (m1 + m2);

  var startT = null;
  var phase = 'approach';
  function step(ts) {
    if (!startT) startT = ts;
    var t = (ts - startT) / 1000;
    if (phase === 'approach') {
      var x1 = 40 + u1 * t * 15;
      var x2 = 280 + u2 * t * 15;
      if (x1 + 50 >= x2) {
        phase = 'together';
        startT = ts;
        showToast('Collision! Momentum conserved: ' + totalP + ' kg·m/s');
      } else {
        cart1.setAttribute('transform', 'translate(' + x1 + ',90)');
        cart2.setAttribute('transform', 'translate(' + x2 + ',90)');
      }
    }
    if (phase === 'together') {
      var t2 = (ts - startT) / 1000;
      var x = 150 + v * t2 * 15;
      cart1.setAttribute('transform', 'translate(' + x + ',90)');
      cart2.setAttribute('transform', 'translate(' + (x + 50) + ',90)');
      if (x > 280) {
        collPlaying = false;
        btn.textContent = 'Reset';
        btn.disabled = false;
        btn.onclick = function() {
          cart1.setAttribute('transform', 'translate(40,90)');
          cart2.setAttribute('transform', 'translate(280,90)');
          btn.textContent = 'Play Collision';
          btn.onclick = window.playCollision;
        };
        return;
      }
    }
    if (collPlaying) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
};

window.resetCollision = function() {
  collPlaying = false;
  document.getElementById('cart1').setAttribute('transform', 'translate(40,90)');
  document.getElementById('cart2').setAttribute('transform', 'translate(280,90)');
  var btn = document.getElementById('collPlayBtn');
  btn.textContent = 'Play Collision';
  btn.disabled = false;
  btn.onclick = window.playCollision;
};

/* ============ SECTION 10: CIRCULAR MOTION ============ */
var circAnimId = null;
var circAngle = 0;

window.updateCircular = function() {
  var m = parseFloat(document.getElementById('circMassSlider').value);
  var v = parseFloat(document.getElementById('circVelSlider2').value);
  var r = parseFloat(document.getElementById('circRadSlider').value);
  document.getElementById('circMassVal').textContent = m;
  document.getElementById('circVelSliderVal').textContent = v;
  document.getElementById('circRadVal').textContent = r;
  document.getElementById('circMassDisp').textContent = m + ' kg';
  document.getElementById('circVelDisp').textContent = v + ' m/s';
  document.getElementById('circRadDisp').textContent = r + ' m';
  var fc = (m * v * v) / r;
  document.getElementById('circFcDisp').textContent = fc.toFixed(1) + ' N';
};

window.toggleCircularAnim = function() {
  var btn = document.getElementById('circPlayBtn');
  if (circAnimId) {
    cancelAnimationFrame(circAnimId);
    circAnimId = null;
    btn.textContent = 'Start Animation';
    return;
  }
  btn.textContent = 'Stop Animation';
  var v = parseFloat(document.getElementById('circVelSlider2').value);
  var speed = v * 0.01;
  var cx = 150, cy = 150, r = 80;
  function animate() {
    circAngle += speed;
    var x = cx + r * Math.cos(circAngle);
    var y = cy + r * Math.sin(circAngle);
    var obj = document.getElementById('circObj');
    obj.setAttribute('cx', x);
    obj.setAttribute('cy', y);
    // velocity tangent (perpendicular to radius, in direction of motion)
    var velLine = document.getElementById('circVel');
    var velLabel = document.getElementById('circVelLabel');
    var tx = x + 40 * -Math.sin(circAngle);
    var ty = y + 40 * Math.cos(circAngle);
    velLine.setAttribute('x1', x); velLine.setAttribute('y1', y);
    velLine.setAttribute('x2', tx); velLine.setAttribute('y2', ty);
    velLabel.setAttribute('x', (x + tx) / 2);
    velLabel.setAttribute('y', (y + ty) / 2 - 5);
    // centripetal force (toward center)
    var forceLine = document.getElementById('circForce');
    var forceLabel = document.getElementById('circForceLabel');
    var fx = x + (cx - x) * 0.5;
    var fy = y + (cy - y) * 0.5;
    forceLine.setAttribute('x1', x); forceLine.setAttribute('y1', y);
    forceLine.setAttribute('x2', fx); forceLine.setAttribute('y2', fy);
    forceLabel.setAttribute('x', (x + fx) / 2);
    forceLabel.setAttribute('y', (y + fy) / 2 + 12);
    circAnimId = requestAnimationFrame(animate);
  }
  animate();
};

/* ============ FORMULA COPY ============ */
window.copyFormula = function(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      showToast('Copied: ' + text);
    }).catch(function() {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
};
function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showToast('Copied: ' + text); } catch(e) { showToast('Copy failed'); }
  document.body.removeChild(ta);
}

/* ============ NUMERICALS ============ */
var numericals = [
  { q: 'A car starts from rest and accelerates at 3 m/s² for 5 seconds. Find its final velocity.', given: 'u = 0, a = 3 m/s², t = 5 s', req: 'v = ?', formula: 'v = u + at', sub: 'v = 0 + 3(5) = 15', ans: '15 m/s' },
  { q: 'A train decelerates from 20 m/s to 0 m/s in 4 seconds. Find its acceleration.', given: 'u = 20 m/s, v = 0, t = 4 s', req: 'a = ?', formula: 'a = (v - u) / t', sub: 'a = (0 - 20) / 4 = -5', ans: '-5 m/s²' },
  { q: 'A ball is dropped from a height of 20 m. Find the time to reach the ground (g = 10 m/s²).', given: 'u = 0, s = 20 m, a = g = 10 m/s²', req: 't = ?', formula: 's = ut + ½at²', sub: '20 = 0 + ½(10)t² → t² = 4 → t = 2', ans: '2 s' },
  { q: 'A 1000 kg car experiences a net force of 5000 N. Find its acceleration.', given: 'm = 1000 kg, F = 5000 N', req: 'a = ?', formula: 'a = F / m', sub: 'a = 5000 / 1000 = 5', ans: '5 m/s²' },
  { q: 'Find the weight of a 15 kg object on Earth (g = 9.8 m/s²).', given: 'm = 15 kg, g = 9.8 m/s²', req: 'W = ?', formula: 'W = mg', sub: 'W = 15 × 9.8 = 147', ans: '147 N' },
  { q: 'A 3 kg ball moves at 4 m/s. Find its momentum.', given: 'm = 3 kg, v = 4 m/s', req: 'p = ?', formula: 'p = mv', sub: 'p = 3 × 4 = 12', ans: '12 kg·m/s' },
  { q: 'A 2 kg object moves in a circle of radius 4 m at 6 m/s. Find the centripetal force.', given: 'm = 2 kg, r = 4 m, v = 6 m/s', req: 'Fc = ?', formula: 'Fc = mv²/r', sub: 'Fc = 2(36)/4 = 18', ans: '18 N' },
  { q: 'A car travels 100 m in 5 s from rest with uniform acceleration. Find the acceleration.', given: 'u = 0, s = 100 m, t = 5 s', req: 'a = ?', formula: 's = ut + ½at²', sub: '100 = 0 + ½a(25) → a = 100/12.5 = 8', ans: '8 m/s²' }
];

function renderNumericals() {
  var grid = document.getElementById('numericalsGrid');
  grid.innerHTML = numericals.map(function(n, i) {
    return '<div class="num-full">' +
      '<h4>Q' + (i+1) + '. ' + n.q + '</h4>' +
      '<div class="num-given"><strong>Given:</strong> ' + n.given + '<br><strong>Required:</strong> ' + n.req + '</div>' +
      '<button class="btn btn-small" onclick="revealNumSol(' + i + ')">Show Solution</button>' +
      '<div class="num-sol" id="numSol' + i + '">' +
      '<p><strong>Formula:</strong> ' + n.formula + '</p>' +
      '<p><strong>Substitution:</strong> ' + n.sub + '</p>' +
      '<p class="num-ans">Answer: ' + n.ans + '</p>' +
      '</div></div>';
  }).join('');
}
window.revealNumSol = function(i) {
  var el = document.getElementById('numSol' + i);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
};

/* ============ MCQs ============ */
var mcqs = [
  { q: 'An object moves 5 m east, then 5 m west. What is its displacement?', opts: ['10 m', '5 m', '0 m', '7 m'], ans: 2, exp: 'Displacement is the straight-line distance from start to end. Since the object returns to its starting point, displacement is 0 m.' },
  { q: 'Which of the following is a vector quantity?', opts: ['Speed', 'Distance', 'Velocity', 'Time'], ans: 2, exp: 'Velocity has both magnitude and direction, making it a vector. Speed, distance, and time are scalars.' },
  { q: 'A car moves at constant velocity. Its acceleration is:', opts: ['Positive', 'Zero', 'Negative', 'Increasing'], ans: 1, exp: 'Constant velocity means no change in velocity, so acceleration is zero. Zero acceleration does NOT mean zero velocity.' },
  { q: 'The SI unit of force is:', opts: ['kg', 'N', 'm/s', 'J'], ans: 1, exp: 'Force is measured in Newtons (N), where 1 N = 1 kg·m/s².' },
  { q: 'Newton\'s first law is also called the law of:', opts: ['Gravity', 'Inertia', 'Momentum', 'Energy'], ans: 1, exp: 'The first law states objects resist changes to their motion — this property is called inertia.' },
  { q: 'If the net force on an object is zero, the object will:', opts: ['Speed up', 'Slow down', 'Maintain constant velocity', 'Change direction'], ans: 2, exp: 'With zero net force, the object maintains its current state — at rest or constant velocity (Newton\'s first law).' },
  { q: 'A 10 kg object has a weight of approximately (g = 10 m/s²):', opts: ['1 N', '10 N', '100 N', '1000 N'], ans: 2, exp: 'W = mg = 10 × 10 = 100 N.' },
  { q: 'Action and reaction forces:', opts: ['Cancel each other', 'Act on the same object', 'Act on different objects', 'Are always zero'], ans: 2, exp: 'Action-reaction pairs act on DIFFERENT objects, so they do not cancel. This is Newton\'s third law.' },
  { q: 'Which equation gives displacement when u, a, and t are known?', opts: ['v = u + at', 's = ut + ½at²', 'v² = u² + 2as', 's = ½(u + v)t'], ans: 1, exp: 's = ut + ½at² uses initial velocity, acceleration, and time to find displacement.' },
  { q: 'An object in circular motion at constant speed is:', opts: ['Not accelerating', 'Accelerating', 'At rest', 'Decelerating'], ans: 1, exp: 'Even at constant speed, the direction of velocity changes continuously, so the object IS accelerating.' },
  { q: 'The momentum of a 4 kg object moving at 3 m/s is:', opts: ['7 kg·m/s', '12 kg·m/s', '1.33 kg·m/s', '0.75 kg·m/s'], ans: 1, exp: 'p = mv = 4 × 3 = 12 kg·m/s.' },
  { q: 'In an isolated system, total momentum is:', opts: ['Always zero', 'Always increasing', 'Conserved', 'Always decreasing'], ans: 2, exp: 'The law of conservation of momentum states that in an isolated system, total momentum remains constant.' },
  { q: 'The centripetal force is directed:', opts: ['Tangent to the circle', 'Away from center', 'Toward the center', 'Along the velocity'], ans: 2, exp: 'Centripetal force always points toward the center of the circular path, causing the direction change.' },
  { q: 'Friction always acts ___ relative motion.', opts: ['In the direction of', 'Opposite to', 'Perpendicular to', 'Independent of'], ans: 1, exp: 'Friction opposes relative motion or the tendency of relative motion between surfaces in contact.' },
  { q: 'Which has greater inertia?', opts: ['A feather', 'A tennis ball', 'A bowling ball', 'A car'], ans: 3, exp: 'Greater mass means greater inertia. A car has the most mass, so it has the greatest inertia.' },
  { q: 'A rocket works on which principle?', opts: ['Newton\'s 1st law', 'Newton\'s 3rd law', 'Conservation of energy', 'Archimedes\' principle'], ans: 1, exp: 'Rocket propulsion is based on Newton\'s third law — exhaust gases pushed down, rocket pushed up.' },
  { q: 'If mass doubles while force stays constant, acceleration:', opts: ['Doubles', 'Halves', 'Stays same', 'Quadruples'], ans: 1, exp: 'From F = ma, if F is constant and m doubles, a = F/m halves.' },
  { q: 'The SI unit of acceleration is:', opts: ['m/s', 'm/s²', 'N', 'kg·m/s'], ans: 1, exp: 'Acceleration is change in velocity per time, so its unit is (m/s)/s = m/s².' },
  { q: 'A body moves with velocity 10 m/s for 5 s. Its displacement is:', opts: ['2 m', '5 m', '50 m', '15 m'], ans: 2, exp: 's = v × t = 10 × 5 = 50 m (uniform motion, no acceleration).' },
  { q: 'Weight and mass are:', opts: ['The same quantity', 'Different; mass is constant, weight varies with g', 'Both vectors', 'Both measured in kg'], ans: 1, exp: 'Mass is the amount of matter (constant everywhere). Weight = mg changes with gravitational field strength.' },
  { q: 'Static friction is ___ kinetic friction.', opts: ['Always less than', 'Always greater than', 'Always equal to', 'Unrelated to'], ans: 1, exp: 'Static friction is generally greater than kinetic friction — it takes more force to start motion than to maintain it.' },
  { q: 'A 5 kg object accelerates at 2 m/s². The net force is:', opts: ['2.5 N', '7 N', '10 N', '25 N'], ans: 2, exp: 'F = ma = 5 × 2 = 10 N.' },
  { q: 'The momentum of a heavy slow truck can be similar to a light fast bullet because:', opts: ['They have the same mass', 'They have the same velocity', 'p = mv depends on both mass and velocity', 'Momentum is always constant'], ans: 2, exp: 'Momentum = mass × velocity. A large mass with small velocity can equal a small mass with large velocity.' },
  { q: 'Which is NOT an equation of motion?', opts: ['v = u + at', 's = ut + ½at²', 'F = ma', 'v² = u² + 2as'], ans: 2, exp: 'F = ma is Newton\'s second law, not one of the kinematic equations of motion.' }
];

var mcqAnswers = new Array(mcqs.length).fill(-1);
var mcqSubmitted = false;

function renderMCQs() {
  var list = document.getElementById('mcqList');
  list.innerHTML = mcqs.map(function(m, i) {
    var letters = ['A','B','C','D'];
    return '<div class="mcq-card" id="mcq' + i + '">' +
      '<div class="mcq-num">Question ' + (i+1) + '</div>' +
      '<div class="mcq-question">' + m.q + '</div>' +
      '<div class="mcq-opts">' + m.opts.map(function(o, j) {
        return '<div class="mcq-opt" data-mcq="' + i + '" data-opt="' + j + '" onclick="selectMCQ(' + i + ',' + j + ')">' +
          '<span class="mcq-opt-letter">' + letters[j] + '</span>' +
          '<span>' + o + '</span></div>';
      }).join('') + '</div>' +
      '<div class="mcq-explanation" id="mcqExp' + i + '">' + m.exp + '</div>' +
      '</div>';
  }).join('');
}

window.selectMCQ = function(qIdx, optIdx) {
  if (mcqSubmitted) return;
  mcqAnswers[qIdx] = optIdx;
  var card = document.getElementById('mcq' + qIdx);
  var opts = card.querySelectorAll('.mcq-opt');
  opts.forEach(function(o, j) {
    o.classList.remove('selected');
    if (j === optIdx) o.classList.add('selected');
  });
};

window.submitMCQs = function() {
  mcqSubmitted = true;
  var correct = 0, incorrect = 0, unanswered = 0;
  mcqs.forEach(function(m, i) {
    var card = document.getElementById('mcq' + i);
    var opts = card.querySelectorAll('.mcq-opt');
    var exp = document.getElementById('mcqExp' + i);
    opts.forEach(function(o, j) {
      o.classList.remove('selected');
      if (j === m.ans) o.classList.add('correct');
      if (j === mcqAnswers[i] && j !== m.ans) o.classList.add('wrong');
    });
    if (mcqAnswers[i] === -1) unanswered++;
    else if (mcqAnswers[i] === m.ans) correct++;
    else incorrect++;
    exp.classList.add('show');
  });

  var total = mcqs.length;
  var pct = Math.round((correct / total) * 100);
  document.getElementById('statScore').textContent = correct + '/' + total;
  document.getElementById('statPct').textContent = pct + '%';
  document.getElementById('statCorrect').textContent = correct;
  document.getElementById('statIncorrect').textContent = incorrect;

  var msg;
  if (pct >= 90) msg = 'Outstanding! You have mastered Force & Motion. Ready for the MDCAT!';
  else if (pct >= 75) msg = 'Great work! You understand the concepts well. Review a few tricky topics.';
  else if (pct >= 50) msg = 'Good start. Go through the notes again and retry the MCQs.';
  else msg = 'Keep practicing! Revisit the interactive sections above and try again.';
  document.getElementById('resultMsg').textContent = msg;

  var result = document.getElementById('mcqResult');
  result.style.display = 'block';
  result.scrollIntoView({ behavior: 'smooth' });

  var best = parseInt(localStorage.getItem('fm-best-score') || '0');
  if (correct > best) {
    localStorage.setItem('fm-best-score', correct);
    showToast('New best score: ' + correct + '/' + total + '!');
  }
  document.getElementById('bestScore').textContent = localStorage.getItem('fm-best-score') + '/' + total;
  document.getElementById('mcqScoreDisplay').style.display = 'flex';
};

window.resetMCQs = function() {
  mcqSubmitted = false;
  mcqAnswers.fill(-1);
  renderMCQs();
  document.getElementById('mcqResult').style.display = 'none';
  showToast('MCQs reset. Good luck!');
};

/* ============ INIT ============ */
renderNumericals();
renderMCQs();
updateProgress();

var best = localStorage.getItem('fm-best-score');
if (best) {
  document.getElementById('bestScore').textContent = best + '/' + mcqs.length;
  document.getElementById('mcqScoreDisplay').style.display = 'flex';
}

// Initial updates
window.updateForceSim();
window.updateNewtonSim();
window.updateWeight();
window.updateFriction();
window.updateMomentum();
window.updateCollision();
window.updateCircular();
drawNewtonGraph();

})();
