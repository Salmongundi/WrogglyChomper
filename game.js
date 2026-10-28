
import { drawMouth, drawWormTooth } from "./drawing.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WORLD = { width: 800, height: 600 };
const SEGMENTS = 48;

const ROOT = { x: 391, y: 222 };

const TOTAL_TEETH = 5;
const FIRST_TOOTH_LENGTH = 30;
const REGROWTH_INCREMENT = 25;
const FIRST_PULL_LIMIT = 320;
const PULL_INCREMENT = 100;

const REGROWTH_DURATION = 650;
const POP_DURATION = 1100;

let scale = 1;
let offsetX = 0;
let offsetY = 0;

let toothNumber = 1;
let baseLength = FIRST_TOOTH_LENGTH;
let pullLimit = FIRST_PULL_LIMIT;

let points = [];
let oldPoints = [];
let segmentLengths = [];

let dragging = false;
let grabIndex = -1;
let grabOffset = { x: 0, y: 0 };
let grabTarget = null;
let lastPointer = null;
let dragStartPoint = null;
let pullDirection = { x: 0, y: 1 };
let pointerVelocity = { x: 0, y: 0 };

let phase = "playing";
let phaseStarted = 0;
let lastFrameTime = 0;

let popPoints = [];
let popOldPoints = [];
let popSegmentLengths = [];
let popLaunchVelocity = { x: 0, y: -4.5 };

const CONFETTI_COLORS = [
  "#ff4f87",
  "#ffd166",
  "#8cff98",
  "#64d9ff",
  "#d5a0ff",
  "#fff4e5",
  "#ff8a45"
];

let confetti = [];
let confettiEmission = 0;

function burstConfetti(time, amount = 100) {
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;

    confetti.push({
      x: ROOT.x + (Math.random() - 0.5) * 24,
      y: ROOT.y + 8 + (Math.random() - 0.5) * 12,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      gravity: 0.08 + Math.random() * 0.12,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      width: 4 + Math.random() * 6,
      height: 5 + Math.random() * 9,
      color: CONFETTI_COLORS[
        Math.floor(Math.random() * CONFETTI_COLORS.length)
      ],
      life: 100 + Math.random() * 100
    });
  }
}

function updateConfetti(deltaTime) {
  const dt = Math.min(deltaTime, 32) / 16.67;

  if (phase === "complete") {
    confettiEmission += dt * 4;

    while (confettiEmission >= 1) {
      burstConfetti(performance.now(), 1);
      confettiEmission--;
    }
  }

  for (const piece of confetti) {
    piece.x += piece.vx * dt;
    piece.y += piece.vy * dt;
    piece.vy += piece.gravity * dt;
    piece.vx *= Math.pow(0.995, dt);
    piece.rotation += piece.spin * dt;
    piece.life -= dt;
  }

  confetti = confetti.filter(piece => piece.life > 0);

  if (confetti.length > 1800) {
    confetti.splice(0, confetti.length - 1800);
  }
}

function drawConfetti(ctx) {
  for (const piece of confetti) {
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(
      -piece.width / 2,
      -piece.height / 2,
      piece.width,
      piece.height
    );
    ctx.restore();
  }
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.round(innerWidth * dpr);
  canvas.height = Math.round(innerHeight * dpr);

  scale = Math.min(
    canvas.width / WORLD.width,
    canvas.height / WORLD.height
  );

  offsetX = (canvas.width - WORLD.width * scale) / 2;
  offsetY = (canvas.height - WORLD.height * scale) / 2;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getPointer(event) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: (event.clientX - rect.left) * canvas.width / rect.width,
    y: (event.clientY - rect.top) * canvas.height / rect.height
  };
}

function toWorld(point) {
  return {
    x: (point.x - offsetX) / scale,
    y: (point.y - offsetY) / scale
  };
}

function getTotalLength() {
  return segmentLengths.reduce((sum, length) => sum + length, 0);
}

function createTooth() {
  points = [];
  oldPoints = [];
  segmentLengths = [];

  const segmentLength = baseLength / SEGMENTS;

  for (let i = 0; i <= SEGMENTS; i++) {
    const point = {
      x: ROOT.x,
      y: ROOT.y + segmentLength * i
    };

    points.push({ ...point });
    oldPoints.push({ ...point });

    if (i < SEGMENTS) {
      segmentLengths.push(segmentLength);
    }
  }

  dragging = false;
  grabIndex = -1;
  grabTarget = null;
  lastPointer = null;
  dragStartPoint = null;
  pointerVelocity = { x: 0, y: 0 };
}

createTooth();

function distanceToSegment(p, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSquared = dx * dx + dy * dy;

  const t = lengthSquared === 0
    ? 0
    : Math.max(
        0,
        Math.min(
          1,
          ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSquared
        )
      );

  const closest = {
    x: a.x + dx * t,
    y: a.y + dy * t
  };

  return {
    distance: distance(p, closest),
    index: t >= 0.5 ? 1 : 0
  };
}

function findGrabIndex(pointer) {
  let bestDistance = Infinity;
  let bestIndex = -1;

  // Point 0 is attached to the mouth and must never be grabbed.
  for (let i = 2; i < SEGMENTS; i++) {
    const result = distanceToSegment(
      pointer,
      points[i],
      points[i + 1]
    );

    if (result.distance < bestDistance) {
      bestDistance = result.distance;
      bestIndex = i + result.index;
    }
  }

  return bestDistance < 42 ? bestIndex : -1;
}

function setTotalLength(newLength) {
  const currentLength = getTotalLength();

  newLength = Math.max(
    baseLength,
    Math.min(pullLimit, newLength)
  );

  const difference = newLength - currentLength;
  if (Math.abs(difference) < 0.01) return;

  const changePerSegment = difference / SEGMENTS;

  for (let i = 0; i < SEGMENTS; i++) {
    segmentLengths[i] = Math.max(
      0.5,
      segmentLengths[i] + changePerSegment
    );
  }
}

function beginDrag(pointer, index, event) {
  dragging = true;
  grabIndex = index;

  grabOffset = {
    x: points[index].x - pointer.x,
    y: points[index].y - pointer.y
  };

  grabTarget = { ...points[index] };
  lastPointer = { ...pointer };
  dragStartPoint = { ...points[index] };

  // Use the tooth's local direction, so grabbing near the base
  // still gives a reliable outward pulling direction.
  const previous = points[Math.max(0, index - 1)];
  const next = points[Math.min(SEGMENTS, index + 1)];

  let dx = next.x - previous.x;
  let dy = next.y - previous.y;
  let length = Math.hypot(dx, dy);

  if (length < 0.001) {
    dx = points[index].x - ROOT.x;
    dy = points[index].y - ROOT.y;
    length = Math.hypot(dx, dy) || 1;
  }

  pullDirection = {
    x: dx / length,
    y: dy / length
  };

  pointerVelocity = { x: 0, y: 0 };

  canvas.setPointerCapture(event.pointerId);
  canvas.style.cursor = "grabbing";
}
canvas.addEventListener("pointerdown", event => {
  if (phase !== "playing" || event.button !== 0) return;

  const pointer = toWorld(getPointer(event));
  const index = findGrabIndex(pointer);

  if (index < 0) return;

  event.preventDefault();
  beginDrag(pointer, index, event);
});

canvas.addEventListener("pointermove", event => {
  if (!dragging || !lastPointer || !dragStartPoint) return;

  const pointer = toWorld(getPointer(event));

  pointerVelocity = {
    x: pointer.x - lastPointer.x,
    y: pointer.y - lastPointer.y
  };

  grabTarget = {
    x: pointer.x + grabOffset.x,
    y: pointer.y + grabOffset.y
  };

  // Measure displacement of the grabbed point from its starting
  // position, projected onto the outward pulling direction.
  const dx = grabTarget.x - dragStartPoint.x;
  const dy = grabTarget.y - dragStartPoint.y;

  const pulledDistance =
    dx * pullDirection.x +
    dy * pullDirection.y;

  setTotalLength(baseLength + Math.max(0, pulledDistance));

  lastPointer = { ...pointer };
});

function stopDragging() {
  if (!dragging) return;

  dragging = false;
  grabIndex = -1;
  grabTarget = null;
  lastPointer = null;
  dragStartPoint = null;

  canvas.style.cursor = "grab";
}

canvas.addEventListener("pointerup", stopDragging);
canvas.addEventListener("pointercancel", stopDragging);

canvas.addEventListener("lostpointercapture", () => {
  if (dragging) stopDragging();
});

function isFixed(index) {
  return index === 0 || (dragging && index === grabIndex);
}

function applyFixedPoints() {
  points[0].x = ROOT.x;
  points[0].y = ROOT.y;

  if (dragging && grabTarget) {
    points[grabIndex].x = grabTarget.x;
    points[grabIndex].y = grabTarget.y;
  }
}

function solveStrand(
  pointSet,
  lengths,
  fixedRoot,
  dt,
  time,
  iterations = 8
) {
  for (let i = 0; i < pointSet.length; i++) {
    if (fixedRoot && i === 0) continue;
    if (fixedRoot && dragging && i === grabIndex) continue;

    const p = pointSet[i];
    const old = fixedRoot ? oldPoints[i] : popOldPoints[i];

    const vx = (p.x - old.x) * 0.94;
    const vy = (p.y - old.y) * 0.94;

    old.x = p.x;
    old.y = p.y;

    const t = i / SEGMENTS;

    const wiggle =
      Math.sin(time * 0.009 - t * 13) * 0.42 * t +
      Math.sin(time * 0.015 - t * 22) * 0.20 * t;

    p.x += vx * dt + wiggle * dt;
    p.y += vy * dt + (fixedRoot ? 0.08 : 0.22) * dt * dt;
  }

  for (let pass = 0; pass < iterations; pass++) {
    if (fixedRoot) {
      pointSet[0].x = ROOT.x;
      pointSet[0].y = ROOT.y;

      if (dragging && grabTarget) {
        pointSet[grabIndex].x = grabTarget.x;
        pointSet[grabIndex].y = grabTarget.y;
      }
    }

    for (let i = 0; i < SEGMENTS; i++) {
      const a = pointSet[i];
      const b = pointSet[i + 1];

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 0.001;
      const correction = (d - lengths[i]) / d;

      const aFixed = fixedRoot && isFixed(i);
      const bFixed = fixedRoot && isFixed(i + 1);

      if (aFixed && bFixed) continue;

      if (aFixed) {
        b.x -= dx * correction;
        b.y -= dy * correction;
      } else if (bFixed) {
        a.x += dx * correction;
        a.y += dy * correction;
      } else {
        a.x += dx * correction * 0.5;
        a.y += dy * correction * 0.5;
        b.x -= dx * correction * 0.5;
        b.y -= dy * correction * 0.5;
      }
    }
  }

  if (fixedRoot) {
    pointSet[0].x = ROOT.x;
    pointSet[0].y = ROOT.y;

    if (dragging && grabTarget) {
      pointSet[grabIndex].x = grabTarget.x;
      pointSet[grabIndex].y = grabTarget.y;
    }
  }
}

function popTooth(time) {
  if (phase !== "playing" || !dragging) return;

  phase = "popping";
  phaseStarted = time;

  burstConfetti(time, 130);

  popPoints = points.map(point => ({ ...point }));
  popSegmentLengths = segmentLengths.slice();

  popLaunchVelocity = {
    x: Math.max(-7, Math.min(7, pointerVelocity.x * 0.12)),
    y: -4.5 + Math.max(-2, Math.min(2, pointerVelocity.y * 0.06))
  };

  popOldPoints = popPoints.map((point, i) => ({
    x: point.x - popLaunchVelocity.x - Math.sin(i * 0.4) * 0.7,
    y: point.y - popLaunchVelocity.y
  }));

  dragging = false;
  grabIndex = -1;
  grabTarget = null;
  lastPointer = null;
  dragStartPoint = null;

  canvas.style.cursor = "grab";
}

function updateTooth(time, deltaTime) {
  if (phase !== "playing") return;

  const dt = Math.min(deltaTime, 32) / 16.67;

  applyFixedPoints();
  solveStrand(points, segmentLengths, true, dt, time);

  if (dragging && getTotalLength() >= pullLimit - 0.5) {
    popTooth(time);
  }
}

function updatePopping(time, deltaTime) {
  const dt = Math.min(deltaTime, 32) / 16.67;

  for (let i = 0; i < popPoints.length; i++) {
    const p = popPoints[i];
    const old = popOldPoints[i];

    const vx = (p.x - old.x) * 0.985;
    const vy = (p.y - old.y) * 0.985;

    old.x = p.x;
    old.y = p.y;

    p.x += vx + Math.sin(time * 0.018 + i * 0.38) * 0.5 * dt;
    p.y += vy + 0.24 * dt * dt;
  }

  for (let pass = 0; pass < 5; pass++) {
    for (let i = 0; i < SEGMENTS; i++) {
      const a = popPoints[i];
      const b = popPoints[i + 1];

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 0.001;
      const correction = (d - popSegmentLengths[i]) / d;

      a.x += dx * correction * 0.5;
      a.y += dy * correction * 0.5;
      b.x -= dx * correction * 0.5;
      b.y -= dy * correction * 0.5;
    }
  }
}

function startNextRound(time) {
  if (toothNumber >= TOTAL_TEETH) {
    phase = "complete";
    return;
  }

  toothNumber++;

  baseLength =
    FIRST_TOOTH_LENGTH +
    (toothNumber - 1) * REGROWTH_INCREMENT;

  pullLimit =
    FIRST_PULL_LIMIT +
    (toothNumber - 1) * PULL_INCREMENT;

  createTooth();

  phase = "regrowing";
  phaseStarted = time;
}

function getInstruction() {
  if (phase === "popping") return "IT'S COMING OUT!!!";
  if (phase === "regrowing") return "Oh no. It's growing back.";
  if (phase === "complete") return "FIVE TEETH EXTRACTED. YOU WIN.";

  return `Tooth ${toothNumber} of ${TOTAL_TEETH}: grab it and PULL.`;
}

function draw(time) {
  const deltaTime = lastFrameTime
    ? time - lastFrameTime
    : 16.67;

  lastFrameTime = time;

  if (phase === "playing") {
    updateTooth(time, deltaTime);
  } else if (phase === "popping") {
    updatePopping(time, deltaTime);

    if (time - phaseStarted >= POP_DURATION) {
      startNextRound(time);
    }
  }

  updateConfetti(deltaTime);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

  ctx.fillStyle = "#171116";
  ctx.fillRect(0, 0, WORLD.width, WORLD.height);

  drawMouth(ctx);

  if (phase === "popping") {
    drawWormTooth(ctx, popPoints);
  } else if (phase !== "complete") {
    let renderPoints = points;

    if (phase === "regrowing") {
      const progress = Math.min(
        1,
        (time - phaseStarted) / REGROWTH_DURATION
      );

      renderPoints = points.map(point => ({
        x: ROOT.x + (point.x - ROOT.x) * progress,
        y: ROOT.y + (point.y - ROOT.y) * progress
      }));

      if (progress >= 1) {
        phase = "playing";
      }
    }

    drawWormTooth(ctx, renderPoints);
  }

  drawConfetti(ctx);

  ctx.textAlign = "center";
  ctx.fillStyle = "#d7bac5";
  ctx.font = "bold 18px monospace";
  ctx.fillText("WROGGLYCHOMPER", 400, 55);

  ctx.font = "13px monospace";
  ctx.fillStyle = "#bba4ae";
  ctx.fillText(getInstruction(), 400, 82);

  ctx.font = "12px monospace";
  ctx.fillStyle = "#74394d";

  const progressDots =
    "● ".repeat(toothNumber - 1) +
    "○ ".repeat(TOTAL_TEETH - toothNumber + 1);

  ctx.fillText(progressDots, 400, 107);

  requestAnimationFrame(draw);
}

canvas.style.cursor = "grab";
requestAnimationFrame(draw);
