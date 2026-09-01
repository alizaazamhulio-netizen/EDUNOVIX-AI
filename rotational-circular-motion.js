/* ==========================================================================
   MDCAT Rotational & Circular Motion Mastery Suite - Core Engine
   File: rotational-circular-motion.js
   ========================================================================== */

(function () {
  'use strict';

  // --- STATE STORES ---
  const state = {
    // Banking Simulation
    banking: {
      radius: 50, // meters
      speed: 20, // m/s
      angleDeg: 25, // degrees
      frictionMu: 0.2,
      mass: 1200, // kg
      isPlaying: true,
      carAngle: 0,
      animId: null
    },
    // Rolling Motion Simulation
    rolling: {
      shape: 'sphere', // sphere (0.4), disk (0.5), ring (1.0), hollowSphere (0.667)
      velocity: 3.0, // m/s
      radius: 0.5, // m
      mass: 2.0, // kg
      posX: 80,
      angle: 0,
      isPlaying: true,
      animId: null
    },
    // Vertical Circle Simulation
    verticalCircle: {
      radius: 2.0, // m
      mass: 1.0, // kg
      bottomSpeed: 10.0, // m/s
      currentAngle: 0, // radians from bottom
      isPlaying: true,
      animId: null
    },
    // Angular Momentum Lab
    angularMomentum: {
      armRadius: 1.2, // m (0.4 to 1.5)
      baseInertia: 1.5, // kg m^2
      pointMasses: 3.0, // kg
      initialAngularVelocity: 4.0, // rad/s
      currentAngle: 0,
      isPlaying: true,
      animId: null
    },
    // Quiz State
    quiz: {
      currentFilter: 'all',
      answered: {},
      score: 0
    }
  };

  const g = 9.8; // m/s^2

  // --- UTILITY VECTOR DRAWING ---
  function drawArrow(ctx, fromX, fromY, toX, toY, color, width = 2, headLen = 8) {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  // =========================================================================
  // 1. BANKING OF ROAD SIMULATOR
  // =========================================================================
  function initBankingSimulator() {
    const canvas = document.getElementById('bankingCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const radiusInput = document.getElementById('bankRadius');
    const speedInput = document.getElementById('bankSpeed');
    const angleInput = document.getElementById('bankAngle');
    const muInput = document.getElementById('bankMu');
    const playBtn = document.getElementById('bankPlayBtn');
    const resetBtn = document.getElementById('bankResetBtn');

    function updateParams() {
      if (radiusInput) state.banking.radius = parseFloat(radiusInput.value);
      if (speedInput) state.banking.speed = parseFloat(speedInput.value);
      if (angleInput) state.banking.angleDeg = parseFloat(angleInput.value);
      if (muInput) state.banking.frictionMu = parseFloat(muInput.value);

      // Update UI displays
      const valRadius = document.getElementById('valBankRadius');
      const valSpeed = document.getElementById('valBankSpeed');
      const valAngle = document.getElementById('valBankAngle');
      const valMu = document.getElementById('valBankMu');

      if (valRadius) valRadius.textContent = `${state.banking.radius.toFixed(0)} m`;
      if (valSpeed) valSpeed.textContent = `${state.banking.speed.toFixed(1)} m/s (${(state.banking.speed * 3.6).toFixed(0)} km/h)`;
      if (valAngle) valAngle.textContent = `${state.banking.angleDeg.toFixed(1)}°`;
      if (valMu) valMu.textContent = state.banking.frictionMu.toFixed(2);

      // Calculations
      const theta = (state.banking.angleDeg * Math.PI) / 180;
      const vOptimum = Math.sqrt(state.banking.radius * g * Math.tan(theta));
      const centripetalAcc = Math.pow(state.banking.speed, 2) / state.banking.radius;
      const centripetalForce = state.banking.mass * centripetalAcc;

      // Safe speed with friction
      const mu = state.banking.frictionMu;
      let vMax = Math.sqrt(state.banking.radius * g * ((Math.tan(theta) + mu) / (1 - mu * Math.tan(theta))));
      if (isNaN(vMax) || 1 - mu * Math.tan(theta) <= 0) vMax = 999;

      // Update telemetry
      const outOpt = document.getElementById('outBankOptimum');
      const outMax = document.getElementById('outBankMax');
      const outFc = document.getElementById('outBankFc');
      const outStatus = document.getElementById('outBankStatus');

      if (outOpt) outOpt.textContent = `${vOptimum.toFixed(1)} m/s (${(vOptimum * 3.6).toFixed(1)} km/h)`;
      if (outMax) outMax.textContent = vMax > 200 ? 'No Upper Limit' : `${vMax.toFixed(1)} m/s (${(vMax * 3.6).toFixed(1)} km/h)`;
      if (outFc) outFc.textContent = `${(centripetalForce / 1000).toFixed(2)} kN`;

      if (outStatus) {
        if (state.banking.speed > vMax) {
          outStatus.textContent = 'DANGER: Car Skids Outward (v > v_max)!';
          outStatus.className = 'val text-rose-400';
          outStatus.style.color = '#f43f5e';
        } else if (Math.abs(state.banking.speed - vOptimum) < 0.8) {
          outStatus.textContent = 'IDEAL: Zero Lateral Friction Needed (v = v_ideal)';
          outStatus.style.color = '#10b981';
        } else if (state.banking.speed < vOptimum) {
          outStatus.textContent = 'SAFE: Friction acts upward to prevent slip down';
          outStatus.style.color = '#38bdf8';
        } else {
          outStatus.textContent = 'STABLE: Inward friction provides extra grip';
          outStatus.style.color = '#f59e0b';
        }
      }
    }

    [radiusInput, speedInput, angleInput, muInput].forEach(el => {
      if (el) el.addEventListener('input', updateParams);
    });

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        state.banking.isPlaying = !state.banking.isPlaying;
        playBtn.innerHTML = state.banking.isPlaying ? '<span>⏸ Pause</span>' : '<span>▶ Play</span>';
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (radiusInput) radiusInput.value = '50';
        if (speedInput) speedInput.value = '20';
        if (angleInput) angleInput.value = '25';
        if (muInput) muInput.value = '0.2';
        updateParams();
      });
    }

    updateParams();

    let lastTime = performance.now();
    function render(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, w, h);

      const theta = (state.banking.angleDeg * Math.PI) / 180;
      const roadOriginX = 70;
      const roadOriginY = h - 60;
      const roadLength = 360;

      const endX = roadOriginX + roadLength * Math.cos(theta);
      const endY = roadOriginY - roadLength * Math.sin(theta);

      // Draw Ground Baseline
      ctx.beginPath();
      ctx.moveTo(0, roadOriginY);
      ctx.lineTo(w, roadOriginY);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Banked Incline Wedge
      ctx.beginPath();
      ctx.moveTo(roadOriginX, roadOriginY);
      ctx.lineTo(endX, endY);
      ctx.lineTo(endX, roadOriginY);
      ctx.closePath();
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Angle indicator arc
      ctx.beginPath();
      ctx.arc(roadOriginX, roadOriginY, 40, -theta, 0);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.font = '12px JetBrains Mono, monospace';
      ctx.fillText(`θ = ${state.banking.angleDeg}°`, roadOriginX + 48, roadOriginY - 12);

      // Car position on incline
      const carDist = roadLength * 0.55;
      const carCenterX = roadOriginX + carDist * Math.cos(theta);
      const carCenterY = roadOriginY - carDist * Math.sin(theta);

      // Draw Car (Cross-section view from rear)
      ctx.save();
      ctx.translate(carCenterX, carCenterY);
      ctx.rotate(-theta);

      // Car chassis
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-35, -28, 70, 24);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(-35, -28, 70, 24);

      // Wheels
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-32, -4, 16, 8);
      ctx.fillRect(16, -4, 16, 8);

      // Taillights
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(-30, -22, 10, 6);
      ctx.fillRect(20, -22, 10, 6);

      ctx.restore();

      // Force Vectors from center of car
      const originX = carCenterX;
      const originY = carCenterY - 15;

      // 1. Gravity Vector (mg, straight down)
      const mgLen = 65;
      drawArrow(ctx, originX, originY, originX, originY + mgLen, '#f43f5e', 2.5);
      ctx.fillStyle = '#fca5a5';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText('mg (Gravity)', originX - 45, originY + mgLen + 14);

      // 2. Normal Force (Perpendicular to banked incline)
      const normLen = 85;
      const normAngle = Math.PI / 2 + theta;
      const normToX = originX - normLen * Math.cos(normAngle);
      const normToY = originY - normLen * Math.sin(normAngle);
      drawArrow(ctx, originX, originY, normToX, normToY, '#10b981', 2.5);
      ctx.fillStyle = '#6ee7b7';
      ctx.fillText('Normal Force (N)', normToX - 20, normToY - 8);

      // 3. Normal Components (N cos theta, N sin theta)
      drawArrow(ctx, originX, originY, originX, originY - normLen * Math.cos(theta), 'rgba(52, 211, 153, 0.4)', 1.5);
      ctx.fillText('N cos θ', originX + 6, originY - normLen * Math.cos(theta) * 0.5);

      const nSinLen = normLen * Math.sin(theta);
      drawArrow(ctx, originX, originY, originX - nSinLen, originY, '#38bdf8', 2.5);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('N sin θ (Fc)', originX - nSinLen - 75, originY - 4);

      if (state.banking.isPlaying) {
        state.banking.animId = requestAnimationFrame(render);
      }
    }

    state.banking.animId = requestAnimationFrame(render);
  }

  // =========================================================================
  // 2. ROLLING MOTION WITHOUT SLIPPING SIMULATOR
  // =========================================================================
  function initRollingSimulator() {
    const canvas = document.getElementById('rollingCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const vInput = document.getElementById('rollVel');
    const shapeBtns = document.querySelectorAll('.btn-shape');
    const playBtn = document.getElementById('rollPlayBtn');
    const resetBtn = document.getElementById('rollResetBtn');

    function updateRollingTelemetry() {
      const shape = state.rolling.shape;
      const v = state.rolling.velocity;
      const r = state.rolling.radius;
      const m = state.rolling.mass;

      const omega = v / r;
      // Moment factor k where I = k m r^2
      let k = 0.4;
      if (shape === 'disk') k = 0.5;
      if (shape === 'ring') k = 1.0;
      if (shape === 'hollowSphere') k = 2 / 3;

      const inertiaI = k * m * Math.pow(r, 2);
      const keTrans = 0.5 * m * Math.pow(v, 2);
      const keRot = 0.5 * inertiaI * Math.pow(omega, 2);
      const totalKE = keTrans + keRot;

      const transPct = Math.round((keTrans / totalKE) * 100);
      const rotPct = Math.round((keRot / totalKE) * 100);

      const valV = document.getElementById('valRollVel');
      const valOmega = document.getElementById('valRollOmega');
      const barTrans = document.getElementById('barTransKE');
      const barRot = document.getElementById('barRotKE');
      const outTransPct = document.getElementById('outTransPct');
      const outRotPct = document.getElementById('outRotPct');
      const outTransJ = document.getElementById('outTransJ');
      const outRotJ = document.getElementById('outRotJ');
      const outTotalJ = document.getElementById('outTotalJ');

      if (valV) valV.textContent = `${v.toFixed(1)} m/s`;
      if (valOmega) valOmega.textContent = `${omega.toFixed(2)} rad/s`;

      if (barTrans) barTrans.style.width = `${transPct}%`;
      if (barRot) barRot.style.width = `${rotPct}%`;
      if (outTransPct) outTransPct.textContent = `Translational (${transPct}%)`;
      if (outRotPct) outRotPct.textContent = `Rotational (${rotPct}%)`;

      if (outTransJ) outTransJ.textContent = `${keTrans.toFixed(1)} J`;
      if (outRotJ) outRotJ.textContent = `${keRot.toFixed(1)} J`;
      if (outTotalJ) outTotalJ.textContent = `Total: ${totalKE.toFixed(1)} J`;
    }

    if (vInput) {
      vInput.addEventListener('input', (e) => {
        state.rolling.velocity = parseFloat(e.target.value);
        updateRollingTelemetry();
      });
    }

    shapeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        shapeBtns.forEach(b => b.classList.remove('active-shape'));
        btn.classList.add('active-shape');
        state.rolling.shape = btn.getAttribute('data-shape') || 'sphere';
        updateRollingTelemetry();
      });
    });

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        state.rolling.isPlaying = !state.rolling.isPlaying;
        playBtn.innerHTML = state.rolling.isPlaying ? '<span>⏸ Pause</span>' : '<span>▶ Play</span>';
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.rolling.posX = 80;
        state.rolling.angle = 0;
      });
    }

    updateRollingTelemetry();

    let lastTime = performance.now();
    function render(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const w = canvas.width;
      const h = canvas.height;
      const scale = 130;
      const radiusPx = state.rolling.radius * scale;
      const groundY = h - 60;
      const centerY = groundY - radiusPx;

      const omega = state.rolling.velocity / state.rolling.radius;

      if (state.rolling.isPlaying) {
        state.rolling.posX += state.rolling.velocity * scale * 0.35 * dt;
        state.rolling.angle += omega * 0.35 * dt;

        if (state.rolling.posX - radiusPx > w) {
          state.rolling.posX = -radiusPx;
        }
      }

      ctx.fillStyle = '#06090f';
      ctx.fillRect(0, 0, w, h);

      // Draw Ground
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(w, groundY);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Road Hatch Marks
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < w; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x - 12, groundY + 12);
        ctx.stroke();
      }

      const centerX = state.rolling.posX;
      const curAngle = state.rolling.angle;

      // Draw Wheel (Rotated)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(curAngle);

      // Body circle
      ctx.beginPath();
      ctx.arc(0, 0, radiusPx, 0, Math.PI * 2);
      if (state.rolling.shape === 'sphere') {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.strokeStyle = '#38bdf8';
      } else if (state.rolling.shape === 'disk') {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.25)';
        ctx.strokeStyle = '#a855f7';
      } else if (state.rolling.shape === 'hollowSphere') {
        ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
        ctx.strokeStyle = '#f43f5e';
      } else {
        ctx.fillStyle = 'transparent';
        ctx.strokeStyle = '#f59e0b';
      }
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.stroke();

      // Spokes
      const spokes = 8;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 2;
      for (let i = 0; i < spokes; i++) {
        const a = (i * Math.PI * 2) / spokes;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radiusPx * Math.cos(a), radiusPx * Math.sin(a));
        ctx.stroke();
      }

      // Hub
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();

      // Instantaneous Velocity Vectors Overlay (Fixed Lab Frame)
      const v = state.rolling.velocity;

      // 1. Top Point (v = 2 v_cm)
      const topX = centerX;
      const topY = centerY - radiusPx;
      const arrow2vLen = Math.min(85, v * 18);
      drawArrow(ctx, topX, topY, topX + arrow2vLen, topY, '#10b981', 3);
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText(`v_top = 2v_cm (${(v * 2).toFixed(1)} m/s)`, topX + arrow2vLen + 8, topY + 4);

      // 2. Axle Point (v = v_cm)
      const arrowVLen = arrow2vLen / 2;
      drawArrow(ctx, centerX, centerY, centerX + arrowVLen, centerY, '#38bdf8', 3);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`v_cm = ${(v).toFixed(1)} m/s`, centerX + arrowVLen + 8, centerY + 4);

      // 3. Contact Point (v = 0, instantaneous rest)
      const botX = centerX;
      const botY = groundY;
      ctx.beginPath();
      ctx.arc(botX, botY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#fca5a5';
      ctx.fillText('v_contact = 0 (Pure Roll)', botX + 12, botY + 4);

      if (state.rolling.isPlaying) {
        state.rolling.animId = requestAnimationFrame(render);
      }
    }

    state.rolling.animId = requestAnimationFrame(render);
  }

  // =========================================================================
  // 3. VERTICAL CIRCULAR MOTION SIMULATOR
  // =========================================================================
  function initVerticalCircleSimulator() {
    const canvas = document.getElementById('vertCircleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const speedInput = document.getElementById('vertSpeed');
    const radiusInput = document.getElementById('vertRadius');
    const playBtn = document.getElementById('vertPlayBtn');

    function updateVertTelemetry() {
      const r = state.verticalCircle.radius;
      const m = state.verticalCircle.mass;
      const vBottom = state.verticalCircle.bottomSpeed;

      const vCritBottom = Math.sqrt(5 * g * r);
      const vCritTop = Math.sqrt(g * r);

      const valSpeed = document.getElementById('valVertSpeed');
      const valRadius = document.getElementById('valVertRadius');
      const outCrit = document.getElementById('outVertCrit');
      const outStatus = document.getElementById('outVertStatus');

      if (valSpeed) valSpeed.textContent = `${vBottom.toFixed(1)} m/s`;
      if (valRadius) valRadius.textContent = `${r.toFixed(1)} m`;
      if (outCrit) outCrit.textContent = `Bottom: ≥ ${vCritBottom.toFixed(1)} m/s | Top: ≥ ${vCritTop.toFixed(1)} m/s`;

      if (outStatus) {
        if (vBottom >= vCritBottom) {
          outStatus.textContent = 'COMPLETE LOOP: Tension > 0 at all points';
          outStatus.style.color = '#10b981';
        } else if (vBottom > Math.sqrt(2 * g * r)) {
          outStatus.textContent = 'SLACK STRING: String goes slack before top';
          outStatus.style.color = '#f59e0b';
        } else {
          outStatus.textContent = 'OSCILLATION: Pendulum oscillates without loop';
          outStatus.style.color = '#38bdf8';
        }
      }
    }

    if (speedInput) {
      speedInput.addEventListener('input', (e) => {
        state.verticalCircle.bottomSpeed = parseFloat(e.target.value);
        updateVertTelemetry();
      });
    }

    if (radiusInput) {
      radiusInput.addEventListener('input', (e) => {
        state.verticalCircle.radius = parseFloat(e.target.value);
        updateVertTelemetry();
      });
    }

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        state.verticalCircle.isPlaying = !state.verticalCircle.isPlaying;
        playBtn.innerHTML = state.verticalCircle.isPlaying ? '<span>⏸ Pause</span>' : '<span>▶ Play</span>';
      });
    }

    updateVertTelemetry();

    let lastTime = performance.now();
    function render(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const w = canvas.width;
      const h = canvas.height;
      const centerCircleX = w / 2;
      const centerCircleY = h / 2;
      const radiusPx = 100;
      const r = state.verticalCircle.radius;
      const m = state.verticalCircle.mass;
      const vBottom = state.verticalCircle.bottomSpeed;

      // Calculate instantaneous height and speed from conservation of energy
      // v^2 = v_bottom^2 - 2g(h)
      // h = r(1 - cos(theta)) where theta=0 is bottom
      const theta = state.verticalCircle.currentAngle;
      const heightAboveBottom = r * (1 - Math.cos(theta));
      const vSq = Math.pow(vBottom, 2) - 2 * g * heightAboveBottom;

      let vCurrent = 0;
      let tension = 0;

      if (vSq > 0) {
        vCurrent = Math.sqrt(vSq);
        // Tension T = m v^2 / r + m g cos(theta)
        tension = (m * vSq) / r + m * g * Math.cos(theta);
        if (tension < 0) tension = 0;
      }

      const omegaInst = vCurrent / r;

      if (state.rolling.isPlaying && vSq > 0) {
        state.verticalCircle.currentAngle += omegaInst * 0.35 * dt;
        if (state.verticalCircle.currentAngle > Math.PI * 2) {
          state.verticalCircle.currentAngle -= Math.PI * 2;
        }
      }

      ctx.fillStyle = '#06090f';
      ctx.fillRect(0, 0, w, h);

      // Trajectory Circle
      ctx.beginPath();
      ctx.arc(centerCircleX, centerCircleY, radiusPx, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Pivot
      ctx.beginPath();
      ctx.arc(centerCircleX, centerCircleY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Bob Position (theta=0 is bottom, theta=PI is top)
      // Screen angle: Math.PI/2 - theta
      const bobX = centerCircleX + radiusPx * Math.sin(theta);
      const bobY = centerCircleY + radiusPx * Math.cos(theta);

      // String
      ctx.beginPath();
      ctx.moveTo(centerCircleX, centerCircleY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = tension > 0 ? '#38bdf8' : '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Bob
      ctx.beginPath();
      ctx.arc(bobX, bobY, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Vectors at Bob
      // Tension Arrow (towards center)
      if (tension > 0) {
        const tLen = Math.min(60, tension * 2.5);
        const tAngle = Math.atan2(centerCircleY - bobY, centerCircleX - bobX);
        drawArrow(ctx, bobX, bobY, bobX + tLen * Math.cos(tAngle), bobY + tLen * Math.sin(tAngle), '#10b981', 2.5);
      }

      // Velocity Arrow (tangential)
      if (vCurrent > 0) {
        const vLen = Math.min(50, vCurrent * 4);
        const tanAngle = Math.PI / 2 + Math.atan2(bobY - centerCircleY, bobX - centerCircleX);
        drawArrow(ctx, bobX, bobY, bobX + vLen * Math.cos(tanAngle), bobY + vLen * Math.sin(tanAngle), '#f59e0b', 2.5);
      }

      // Live Readouts on Canvas
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px JetBrains Mono, monospace';
      ctx.fillText(`Speed: ${vCurrent.toFixed(1)} m/s`, 15, 25);
      ctx.fillStyle = tension > 0 ? '#34d399' : '#f43f5e';
      ctx.fillText(`Tension: ${tension.toFixed(1)} N`, 15, 45);

      if (state.verticalCircle.isPlaying) {
        state.verticalCircle.animId = requestAnimationFrame(render);
      }
    }

    state.verticalCircle.animId = requestAnimationFrame(render);
  }

  // =========================================================================
  // 4. CONSERVATION OF ANGULAR MOMENTUM LAB
  // =========================================================================
  function initAngularMomentumSimulator() {
    const canvas = document.getElementById('angMomCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const armInput = document.getElementById('angArmRadius');
    const playBtn = document.getElementById('angPlayBtn');

    function updateAngMomTelemetry() {
      const r = state.angularMomentum.armRadius;
      const I_base = state.angularMomentum.baseInertia;
      const mPoint = state.angularMomentum.pointMasses;

      // Total I = I_base + 2 * m * r^2
      const currentInertia = I_base + 2 * mPoint * Math.pow(r, 2);

      // Initial state reference with arms extended at r=1.5
      const initialInertia = I_base + 2 * mPoint * Math.pow(1.5, 2);
      const initialL = initialInertia * state.angularMomentum.initialAngularVelocity;

      // L is conserved: omega = L / currentInertia
      const currentOmega = initialL / currentInertia;
      const currentKE = 0.5 * currentInertia * Math.pow(currentOmega, 2);

      const valArm = document.getElementById('valAngArm');
      const outOmega = document.getElementById('outAngOmega');
      const outInertia = document.getElementById('outAngInertia');
      const outKE = document.getElementById('outAngKE');

      if (valArm) valArm.textContent = `${r.toFixed(2)} m`;
      if (outOmega) outOmega.textContent = `${currentOmega.toFixed(2)} rad/s (${(currentOmega / (2 * Math.PI) * 60).toFixed(0)} RPM)`;
      if (outInertia) outInertia.textContent = `${currentInertia.toFixed(2)} kg·m²`;
      if (outKE) outKE.textContent = `${currentKE.toFixed(1)} J (Work done pulling in)`;
    }

    if (armInput) {
      armInput.addEventListener('input', (e) => {
        state.angularMomentum.armRadius = parseFloat(e.target.value);
        updateAngMomTelemetry();
      });
    }

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        state.angularMomentum.isPlaying = !state.angularMomentum.isPlaying;
        playBtn.innerHTML = state.angularMomentum.isPlaying ? '<span>⏸ Pause</span>' : '<span>▶ Play</span>';
      });
    }

    updateAngMomTelemetry();

    let lastTime = performance.now();
    function render(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      const r = state.angularMomentum.armRadius;
      const I_base = state.angularMomentum.baseInertia;
      const mPoint = state.angularMomentum.pointMasses;
      const currentInertia = I_base + 2 * mPoint * Math.pow(r, 2);
      const initialInertia = I_base + 2 * mPoint * Math.pow(1.5, 2);
      const initialL = initialInertia * state.angularMomentum.initialAngularVelocity;
      const omega = initialL / currentInertia;

      if (state.angularMomentum.isPlaying) {
        state.angularMomentum.currentAngle += omega * 0.4 * dt;
      }

      ctx.fillStyle = '#06090f';
      ctx.fillRect(0, 0, w, h);

      // Draw Rotating Platform / Turntable
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(state.angularMomentum.currentAngle);

      // Base Disk
      ctx.beginPath();
      ctx.arc(0, 0, 90, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Arms (Bar)
      const armPx = r * 65;
      ctx.beginPath();
      ctx.moveTo(-armPx, 0);
      ctx.lineTo(armPx, 0);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Hand Weights (Point masses)
      ctx.beginPath();
      ctx.arc(-armPx, 0, 10, 0, Math.PI * 2);
      ctx.arc(armPx, 0, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center figure body
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      ctx.restore();

      // Central Axis Arrow (L vector pointing out / up)
      drawArrow(ctx, cx, cy, cx, cy - 70, '#a855f7', 3);
      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText('L = Iω (Constant)', cx + 8, cy - 50);

      if (state.angularMomentum.isPlaying) {
        state.angularMomentum.animId = requestAnimationFrame(render);
      }
    }

    state.angularMomentum.animId = requestAnimationFrame(render);
  }

  // =========================================================================
  // 5. LIVE CALCULATORS ENGINE
  // =========================================================================
  function initCalculators() {
    // 1. Centripetal Force Calc
    function calcFc() {
      const m = parseFloat(document.getElementById('calcFc_m')?.value || 0);
      const v = parseFloat(document.getElementById('calcFc_v')?.value || 0);
      const r = parseFloat(document.getElementById('calcFc_r')?.value || 1);

      if (r <= 0) return;
      const ac = Math.pow(v, 2) / r;
      const fc = m * ac;
      const omega = v / r;

      const out = document.getElementById('calcFc_out');
      if (out) {
        out.innerHTML = `
          <div class="telemetry-row"><span class="label">Centripetal Force (Fc):</span> <span class="val text-cyan-400">${fc.toFixed(2)} N</span></div>
          <div class="telemetry-row"><span class="label">Centripetal Acceleration (ac):</span> <span class="val">${ac.toFixed(2)} m/s²</span></div>
          <div class="telemetry-row"><span class="label">Angular Speed (ω = v/r):</span> <span class="val">${omega.toFixed(2)} rad/s</span></div>
        `;
      }
    }

    // 2. Optimum Road Banking Calc
    function calcBank() {
      const v = parseFloat(document.getElementById('calcBank_v')?.value || 0);
      const r = parseFloat(document.getElementById('calcBank_r')?.value || 1);

      if (r <= 0) return;
      const tanTheta = Math.pow(v, 2) / (r * g);
      const thetaRad = Math.atan(tanTheta);
      const thetaDeg = (thetaRad * 180) / Math.PI;

      const out = document.getElementById('calcBank_out');
      if (out) {
        out.innerHTML = `
          <div class="telemetry-row"><span class="label">Optimum Banking Angle (θ):</span> <span class="val text-emerald-400 font-bold">${thetaDeg.toFixed(2)}°</span></div>
          <div class="telemetry-row"><span class="label">tan(θ) = v² / (rg):</span> <span class="val">${tanTheta.toFixed(4)}</span></div>
          <div class="telemetry-row"><span class="label">Safe Speed (v = √(rg tan θ)):</span> <span class="val">${v.toFixed(1)} m/s</span></div>
        `;
      }
    }

    // 3. Incline Rolling Race Calc
    function calcIncline() {
      const h = parseFloat(document.getElementById('calcInc_h')?.value || 5);
      const shape = document.getElementById('calcInc_shape')?.value || 'sphere';

      let k = 0.4;
      let label = 'Solid Sphere (I = 2/5 mr²)';
      if (shape === 'disk') { k = 0.5; label = 'Solid Cylinder/Disk (I = 1/2 mr²)'; }
      if (shape === 'ring') { k = 1.0; label = 'Thin Hoop/Ring (I = mr²)'; }
      if (shape === 'hollowSphere') { k = 2 / 3; label = 'Hollow Sphere (I = 2/3 mr²)'; }

      // v = sqrt(2gh / (1 + k))
      const v = Math.sqrt((2 * g * h) / (1 + k));
      const vSlide = Math.sqrt(2 * g * h); // frictionless slider

      const out = document.getElementById('calcInc_out');
      if (out) {
        out.innerHTML = `
          <div class="telemetry-row"><span class="label">Rolling Body:</span> <span class="val">${label}</span></div>
          <div class="telemetry-row"><span class="label">Incline Bottom Speed (v):</span> <span class="val text-amber-400 font-bold">${v.toFixed(2)} m/s</span></div>
          <div class="telemetry-row"><span class="label">Frictionless Sliding (v_slide = √(2gh)):</span> <span class="val">${vSlide.toFixed(2)} m/s</span></div>
          <div class="telemetry-row"><span class="label">Speed Fraction (v / v_slide):</span> <span class="val text-sky-400">${((v / vSlide) * 100).toFixed(1)}%</span></div>
        `;
      }
    }

    // 4. Moment of Inertia Calc
    function calcMOI() {
      const shape = document.getElementById('calcMOI_shape')?.value || 'solid_sphere';
      const m = parseFloat(document.getElementById('calcMOI_m')?.value || 1);
      const r = parseFloat(document.getElementById('calcMOI_r')?.value || 0.5);

      let I = 0;
      let formula = '';
      switch (shape) {
        case 'solid_sphere':
          I = (2 / 5) * m * Math.pow(r, 2);
          formula = 'I = 2/5 M R² = 0.40 M R²';
          break;
        case 'solid_cylinder':
          I = (1 / 2) * m * Math.pow(r, 2);
          formula = 'I = 1/2 M R² = 0.50 M R²';
          break;
        case 'thin_ring':
          I = m * Math.pow(r, 2);
          formula = 'I = M R² = 1.00 M R²';
          break;
        case 'hollow_sphere':
          I = (2 / 3) * m * Math.pow(r, 2);
          formula = 'I = 2/3 M R² = 0.67 M R²';
          break;
        case 'rod_center':
          I = (1 / 12) * m * Math.pow(r, 2);
          formula = 'I = 1/12 M L² (Center axis)';
          break;
        case 'rod_end':
          I = (1 / 3) * m * Math.pow(r, 2);
          formula = 'I = 1/3 M L² (End axis)';
          break;
      }

      const out = document.getElementById('calcMOI_out');
      if (out) {
        out.innerHTML = `
          <div class="telemetry-row"><span class="label">Governing Formula:</span> <span class="val text-purple-400">${formula}</span></div>
          <div class="telemetry-row"><span class="label">Moment of Inertia (I):</span> <span class="val text-cyan-400 font-bold">${I.toFixed(4)} kg·m²</span></div>
          <div class="telemetry-row"><span class="label">Radius of Gyration (k = √(I/M)):</span> <span class="val">${Math.sqrt(I / m).toFixed(3)} m</span></div>
        `;
      }
    }

    // Attach Event Listeners to inputs
    ['calcFc_m', 'calcFc_v', 'calcFc_r'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', calcFc);
    });
    ['calcBank_v', 'calcBank_r'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', calcBank);
    });
    ['calcInc_h', 'calcInc_shape'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', calcIncline);
    });
    ['calcMOI_shape', 'calcMOI_m', 'calcMOI_r'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', calcMOI);
    });

    calcFc();
    calcBank();
    calcIncline();
    calcMOI();
  }

  // =========================================================================
  // 6. PRACTICE MCQ TEST BANK DATA & INTERACTION
  // =========================================================================
  const mcqQuestions = [
    {
      id: 1,
      topic: 'centripetal',
      question: 'A particle moves with uniform speed v in a circle of radius r. What is the work done by the centripetal force in completing one full revolution?',
      options: [
        { letter: 'A', text: '2πr · (mv²/r)' },
        { letter: 'B', text: 'Zero', correct: true },
        { letter: 'C', text: 'mv²' },
        { letter: 'D', text: '1/2 mv²' }
      ],
      solution: 'Work W = F · d · cos(θ). Since the centripetal force is always directed radially inward and displacement is tangential (θ = 90°), cos(90°) = 0. Hence, the work done by centripetal force is always strictly ZERO.'
    },
    {
      id: 2,
      topic: 'rolling',
      question: 'A wheel of radius R rolls without slipping along a horizontal road with translational velocity v_cm. What is the instantaneous velocity of the highest point on the wheel rim?',
      options: [
        { letter: 'A', text: '0' },
        { letter: 'B', text: 'v_cm' },
        { letter: 'C', text: '2 v_cm', correct: true },
        { letter: 'D', text: '√2 v_cm' }
      ],
      solution: 'In pure rolling: v_top = v_translation + v_rotation = v_cm + (R·ω) = v_cm + v_cm = 2 v_cm. The bottom point has v = 0 (instantaneous rest).'
    },
    {
      id: 3,
      topic: 'rolling',
      question: 'A solid sphere, a solid cylinder, and a thin circular hoop are released simultaneously from the top of an inclined plane. Which object reaches the bottom FIRST?',
      options: [
        { letter: 'A', text: 'Thin Hoop' },
        { letter: 'B', text: 'Solid Cylinder' },
        { letter: 'C', text: 'Solid Sphere', correct: true },
        { letter: 'D', text: 'All arrive at the same time' }
      ],
      solution: 'Speed at bottom v = √(2gh / (1 + k)). The object with the smallest inertia factor k wins. Sphere (k = 2/5 = 0.4) < Cylinder (k = 0.5) < Hoop (k = 1.0). Therefore, the Solid Sphere has the highest acceleration and reaches the bottom first.'
    },
    {
      id: 4,
      topic: 'angularMomentum',
      question: 'A spinning figure skater pulls her outstretched arms inward. Which of the following statements is TRUE regarding her motion?',
      options: [
        { letter: 'A', text: 'Moment of inertia increases, angular velocity decreases' },
        { letter: 'B', text: 'Angular momentum increases' },
        { letter: 'C', text: 'Moment of inertia decreases, rotational kinetic energy increases', correct: true },
        { letter: 'D', text: 'Both angular momentum and kinetic energy remain constant' }
      ],
      solution: 'External torque = 0, so Angular Momentum L = Iω is conserved. Pulling arms in decreases I (since I = Σmr²), so ω increases. Kinetic energy K = L²/(2I); as I decreases with constant L, kinetic energy INCREASES due to the internal muscular work done pulling the arms in.'
    },
    {
      id: 5,
      topic: 'banking',
      question: 'For safe negotiation of an unbanked circular curve of radius r on a level road with coefficient of static friction μ, the maximum permissible speed of the vehicle is:',
      options: [
        { letter: 'A', text: 'v = √(μ r g)', correct: true },
        { letter: 'B', text: 'v = μ r g' },
        { letter: 'C', text: 'v = √(r g / μ)' },
        { letter: 'D', text: 'v = √(μ g / r)' }
      ],
      solution: 'Centripetal force is supplied entirely by static friction: f_s ≤ μ N = μ m g. Thus, m v² / r ≤ μ m g ⇒ v_max = √(μ r g).'
    },
    {
      id: 6,
      topic: 'verticalCircle',
      question: 'What is the minimum critical speed required at the highest point of a vertical circle of radius r to ensure the string does not go slack (tension T ≥ 0)?',
      options: [
        { letter: 'A', text: 'v = √(5 g r)' },
        { letter: 'B', text: 'v = √(g r)', correct: true },
        { letter: 'C', text: 'v = √(3 g r)' },
        { letter: 'D', text: 'v = √(2 g r)' }
      ],
      solution: 'At top: T + mg = m v² / r. For string not to slack, T ≥ 0 ⇒ mg ≤ m v² / r ⇒ v_crit = √(g r).'
    },
    {
      id: 7,
      topic: 'verticalCircle',
      question: 'For a body executing a complete vertical circular loop of radius r, what is the difference between the tension at the lowest point and the highest point (T_bottom - T_top)?',
      options: [
        { letter: 'A', text: '2 mg' },
        { letter: 'B', text: '4 mg' },
        { letter: 'C', text: '6 mg', correct: true },
        { letter: 'D', text: '8 mg' }
      ],
      solution: 'T_bottom = mg + m(v_bot)²/r. T_top = -mg + m(v_top)²/r. By conservation of energy, (v_bot)² - (v_top)² = 4gr. Thus T_bottom - T_top = 2mg + m(4gr)/r = 6 mg.'
    },
    {
      id: 8,
      topic: 'momentOfInertia',
      question: 'The moment of inertia of a uniform thin rod of mass M and length L about an axis perpendicular to its length and passing through its center is:',
      options: [
        { letter: 'A', text: '1/3 M L²' },
        { letter: 'B', text: '1/12 M L²', correct: true },
        { letter: 'C', text: '1/2 M L²' },
        { letter: 'D', text: '2/5 M L²' }
      ],
      solution: 'For axis through center: I = 1/12 M L². For axis through one end: I = 1/3 M L² (by parallel axis theorem I_end = 1/12 M L² + M(L/2)² = 1/3 M L²).'
    }
  ];

  function initQuiz() {
    const listContainer = document.getElementById('quizQuestionsList');
    const filterChips = document.querySelectorAll('.quiz-filters .filter-chip');
    const scoreVal = document.getElementById('quizScoreVal');
    const totalVal = document.getElementById('quizTotalVal');
    const resetQuizBtn = document.getElementById('resetQuizBtn');

    if (!listContainer) return;

    function renderQuestions() {
      listContainer.innerHTML = '';
      const filtered = mcqQuestions.filter(q => state.quiz.currentFilter === 'all' || q.topic === state.quiz.currentFilter);

      if (totalVal) totalVal.textContent = filtered.length;

      filtered.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = `qCard_${q.id}`;

        const isAnswered = state.quiz.answered[q.id] !== undefined;
        const selectedLetter = state.quiz.answered[q.id];

        let optionsHtml = '';
        q.options.forEach(opt => {
          let btnClass = 'opt-btn';
          if (isAnswered) {
            if (opt.correct) btnClass += ' correct';
            else if (selectedLetter === opt.letter) btnClass += ' incorrect';
          }

          optionsHtml += `
            <button class="${btnClass}" data-qid="${q.id}" data-letter="${opt.letter}" ${isAnswered ? 'disabled' : ''}>
              <span class="opt-letter">${opt.letter}</span>
              <span>${opt.text}</span>
            </button>
          `;
        });

        card.innerHTML = `
          <div class="q-meta">
            <span class="q-number">Question #${idx + 1}</span>
            <span class="q-topic">${q.topic.toUpperCase()}</span>
          </div>
          <div class="q-text">${q.question}</div>
          <div class="q-options">${optionsHtml}</div>
          <div class="q-solution ${isAnswered ? 'show' : ''}">
            <strong>✓ Detailed Solution:</strong>
            ${q.solution}
          </div>
        `;

        listContainer.appendChild(card);
      });

      // Attach option click listeners
      const optionButtons = listContainer.querySelectorAll('.opt-btn');
      optionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const qid = parseInt(btn.getAttribute('data-qid') || '0');
          const letter = btn.getAttribute('data-letter') || '';
          handleAnswer(qid, letter);
        });
      });
    }

    function handleAnswer(qid, selectedLetter) {
      if (state.quiz.answered[qid] !== undefined) return;

      const qObj = mcqQuestions.find(q => q.id === qid);
      if (!qObj) return;

      state.quiz.answered[qid] = selectedLetter;
      const isCorrect = qObj.options.find(o => o.letter === selectedLetter)?.correct;

      if (isCorrect) {
        state.quiz.score += 1;
      }

      if (scoreVal) scoreVal.textContent = state.quiz.score;
      renderQuestions();
    }

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.quiz.currentFilter = chip.getAttribute('data-filter') || 'all';
        renderQuestions();
      });
    });

    if (resetQuizBtn) {
      resetQuizBtn.addEventListener('click', () => {
        state.quiz.answered = {};
        state.quiz.score = 0;
        if (scoreVal) scoreVal.textContent = '0';
        renderQuestions();
      });
    }

    renderQuestions();
  }

  // =========================================================================
  // 7. REAL-TIME SEARCH & TAB SWITCHING
  // =========================================================================
  function initTabsAndSearch() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('data-tab');
        tabLinks.forEach(l => l.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        link.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    // Global Search Bar Filter
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const rows = document.querySelectorAll('.physics-table tbody tr');
        const trapCards = document.querySelectorAll('.trap-card');

        rows.forEach(r => {
          const text = r.textContent.toLowerCase();
          r.style.display = text.includes(query) ? '' : 'none';
        });

        trapCards.forEach(c => {
          const text = c.textContent.toLowerCase();
          c.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }
  }

  // --- BOOTSTRAP ALL MODULES ---
  document.addEventListener('DOMContentLoaded', () => {
    initBankingSimulator();
    initRollingSimulator();
    initVerticalCircleSimulator();
    initAngularMomentumSimulator();
    initCalculators();
    initQuiz();
    initTabsAndSearch();
  });

})();
