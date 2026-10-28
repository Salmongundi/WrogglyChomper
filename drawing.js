
const COLORS = {
  lip: "#713344",
  lipLight: "#a75b6c",
  lipShadow: "#35141f",
  mouth: "#080508",
  mouthDeep: "#020103",
  gum: "#87394f",
  gumLight: "#b65d72",
  tooth: "#e5d9c5",
  toothShade: "#a99b8a",
  toothHighlight: "#fff0d9"
};

function makeGradient(ctx, x1, y1, x2, y2, stops) {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  for (const [position, color] of stops) {
    gradient.addColorStop(position, color);
  }
  return gradient;
}

function drawTooth(ctx, tooth, lower = false) {
  const { x, y, w, h, tilt = 0, shade = 0 } = tooth;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);

  // Soft shadow makes the crown sit into the gum rather than float.
  ctx.beginPath();
  if (!lower) {
    ctx.moveTo(-w * 0.56, -3);
    ctx.quadraticCurveTo(-w * 0.55, h * 0.46, -w * 0.23, h * 0.86);
    ctx.quadraticCurveTo(0, h * 1.02, w * 0.27, h * 0.80);
    ctx.quadraticCurveTo(w * 0.55, h * 0.38, w * 0.52, -3);
  } else {
    ctx.moveTo(-w * 0.53, 3);
    ctx.quadraticCurveTo(-w * 0.55, -h * 0.42, -w * 0.22, -h * 0.82);
    ctx.quadraticCurveTo(0, -h * 0.99, w * 0.25, -h * 0.79);
    ctx.quadraticCurveTo(w * 0.54, -h * 0.40, w * 0.52, 3);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.62)";
  ctx.fill();

  // One continuous crown shape, with slightly uneven sides.
  ctx.beginPath();
  if (!lower) {
    ctx.moveTo(-w * 0.51, -4);
    ctx.bezierCurveTo(
      -w * 0.59, h * 0.18,
      -w * 0.43, h * 0.69,
      -w * 0.20, h * 0.88
    );
    ctx.quadraticCurveTo(w * 0.04, h * 1.04, w * 0.28, h * 0.81);
    ctx.bezierCurveTo(
      w * 0.50, h * 0.57,
      w * 0.57, h * 0.17,
      w * 0.47, -4
    );
  } else {
    ctx.moveTo(-w * 0.51, 4);
    ctx.bezierCurveTo(
      -w * 0.59, -h * 0.18,
      -w * 0.43, -h * 0.69,
      -w * 0.20, -h * 0.88
    );
    ctx.quadraticCurveTo(w * 0.04, -h * 1.04, w * 0.28, -h * 0.81);
    ctx.bezierCurveTo(
      w * 0.50, -h * 0.57,
      w * 0.57, -h * 0.17,
      w * 0.47, 4
    );
  }
  ctx.closePath();

  ctx.fillStyle = makeGradient(
    ctx,
    -w * 0.45, 0,
    w * 0.45, 0,
    [
      [0, "#9e907f"],
      [0.20, COLORS.tooth],
      [0.53, shade ? "#d2c3ad" : COLORS.toothHighlight],
      [0.78, COLORS.tooth],
      [1, "#b2a18e"]
    ]
  );
  ctx.fill();

  ctx.strokeStyle = "rgba(65, 43, 40, 0.72)";
  ctx.lineWidth = 1.3;
  ctx.stroke();

  // Shading follows the shape instead of using a bright cartoon shine.
  ctx.beginPath();
  if (!lower) {
    ctx.moveTo(-w * 0.30, 4);
    ctx.quadraticCurveTo(-w * 0.30, h * 0.40, -w * 0.10, h * 0.70);
  } else {
    ctx.moveTo(-w * 0.30, -4);
    ctx.quadraticCurveTo(-w * 0.30, -h * 0.40, -w * 0.10, -h * 0.70);
  }
  ctx.strokeStyle = "rgba(255, 245, 221, 0.48)";
  ctx.lineWidth = Math.max(1, w * 0.08);
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  if (!lower) {
    ctx.moveTo(w * 0.27, 3);
    ctx.quadraticCurveTo(w * 0.33, h * 0.36, w * 0.15, h * 0.65);
  } else {
    ctx.moveTo(w * 0.27, -3);
    ctx.quadraticCurveTo(w * 0.33, -h * 0.36, w * 0.15, -h * 0.65);
  }
  ctx.strokeStyle = "rgba(92, 64, 54, 0.27)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

function drawMouth(ctx) {
  ctx.save();

  // Outer lips. The irregular outline avoids a perfect cartoon oval.
  ctx.beginPath();
  ctx.moveTo(104, 252);
  ctx.bezierCurveTo(129, 212, 171, 174, 230, 161);
  ctx.bezierCurveTo(285, 147, 330, 171, 370, 178);
  ctx.quadraticCurveTo(400, 184, 430, 178);
  ctx.bezierCurveTo(470, 171, 515, 147, 570, 161);
  ctx.bezierCurveTo(629, 174, 671, 212, 696, 252);
  ctx.bezierCurveTo(680, 298, 645, 334, 601, 363);
  ctx.bezierCurveTo(555, 393, 510, 414, 459, 421);
  ctx.quadraticCurveTo(400, 430, 341, 421);
  ctx.bezierCurveTo(290, 414, 245, 393, 199, 363);
  ctx.bezierCurveTo(155, 334, 120, 298, 104, 252);
  ctx.closePath();

  ctx.fillStyle = makeGradient(
    ctx, 0, 155, 0, 435,
    [
      [0, "#4d1e2c"],
      [0.22, COLORS.lip],
      [0.57, "#582332"],
      [0.83, "#3b1722"],
      [1, "#241018"]
    ]
  );
  ctx.fill();

  // Mouth opening. The top and bottom recede toward the back.
  ctx.beginPath();
  ctx.moveTo(135, 250);
  ctx.bezierCurveTo(179, 216, 246, 202, 303, 214);
  ctx.quadraticCurveTo(356, 225, 400, 219);
  ctx.quadraticCurveTo(444, 225, 497, 214);
  ctx.bezierCurveTo(554, 202, 621, 216, 665, 250);
  ctx.bezierCurveTo(645, 294, 604, 333, 553, 353);
  ctx.bezierCurveTo(503, 375, 451, 383, 400, 382);
  ctx.bezierCurveTo(349, 383, 297, 375, 247, 353);
  ctx.bezierCurveTo(196, 333, 155, 294, 135, 250);
  ctx.closePath();

  ctx.fillStyle = makeGradient(
    ctx, 0, 210, 0, 382,
    [
      [0, "#10080e"],
      [0.40, COLORS.mouth],
      [0.78, "#130911"],
      [1, "#29101b"]
    ]
  );
  ctx.fill();

  // Darkness at the back of the throat.
  const throat = ctx.createRadialGradient(400, 275, 5, 400, 278, 155);
  throat.addColorStop(0, COLORS.mouthDeep);
  throat.addColorStop(0.72, "#080408");
  throat.addColorStop(1, "rgba(34, 10, 21, 0.2)");

  ctx.fillStyle = throat;
  ctx.beginPath();
  ctx.ellipse(400, 279, 194, 101, 0, 0, Math.PI * 2);
  ctx.fill();

  // Upper gum: curved, irregular, and behind the upper teeth.
  ctx.beginPath();
  ctx.moveTo(145, 237);
  ctx.bezierCurveTo(208, 208, 265, 210, 313, 222);
  ctx.lineTo(335, 230);
  ctx.lineTo(357, 221);
  ctx.lineTo(378, 231);
  ctx.lineTo(400, 225);
  ctx.lineTo(422, 231);
  ctx.lineTo(443, 221);
  ctx.lineTo(465, 230);
  ctx.lineTo(487, 222);
  ctx.bezierCurveTo(535, 210, 592, 208, 655, 237);
  ctx.bezierCurveTo(599, 253, 546, 250, 494, 245);
  ctx.lineTo(452, 250);
  ctx.lineTo(400, 243);
  ctx.lineTo(348, 250);
  ctx.lineTo(306, 245);
  ctx.bezierCurveTo(254, 250, 201, 253, 145, 237);
  ctx.closePath();

  ctx.fillStyle = makeGradient(
    ctx, 0, 210, 0, 254,
    [
      [0, "#b76178"],
      [0.55, COLORS.gum],
      [1, "#5a1e31"]
    ]
  );
  ctx.fill();

  const upperTeeth = [
    { x: 165, y: 235, w: 30, h: 45, tilt: -0.32 },
    { x: 196, y: 229, w: 33, h: 54, tilt: -0.23 },
    { x: 230, y: 224, w: 35, h: 61, tilt: -0.16 },
    { x: 267, y: 223, w: 39, h: 67, tilt: -0.09 },
    { x: 307, y: 225, w: 37, h: 61, tilt: 0.05 },
    { x: 345, y: 225, w: 34, h: 56, tilt: 0.08 },
    { x: 369, y: 224, w: 28, h: 53, tilt: -0.04 },
    { x: 431, y: 224, w: 28, h: 53, tilt: 0.05 },
    { x: 455, y: 225, w: 34, h: 56, tilt: -0.07 },
    { x: 493, y: 225, w: 37, h: 61, tilt: -0.05 },
    { x: 533, y: 223, w: 39, h: 67, tilt: 0.11 },
    { x: 570, y: 224, w: 35, h: 61, tilt: 0.18 },
    { x: 604, y: 229, w: 33, h: 54, tilt: 0.24 },
    { x: 635, y: 235, w: 30, h: 45, tilt: 0.32 }
  ];

  for (const tooth of upperTeeth) {
    drawTooth(ctx, tooth, false);
  }

  // The central gap is the socket where the stretchy tooth begins.
  // No second crown is drawn here: drawWormTooth supplies the one tooth.

  // Lower gum ridge, following the near edge of the jaw.
  ctx.beginPath();
  ctx.moveTo(151, 326);
  ctx.bezierCurveTo(208, 353, 262, 365, 309, 366);
  ctx.lineTo(345, 358);
  ctx.lineTo(374, 368);
  ctx.lineTo(400, 361);
  ctx.lineTo(426, 368);
  ctx.lineTo(455, 358);
  ctx.lineTo(491, 366);
  ctx.bezierCurveTo(538, 365, 592, 353, 649, 326);
  ctx.bezierCurveTo(623, 372, 573, 399, 516, 408);
  ctx.bezierCurveTo(471, 415, 436, 411, 400, 406);
  ctx.bezierCurveTo(364, 411, 329, 415, 284, 408);
  ctx.bezierCurveTo(227, 399, 177, 372, 151, 326);
  ctx.closePath();

  ctx.fillStyle = makeGradient(
    ctx, 0, 345, 0, 414,
    [
      [0, "#5b2034"],
      [0.35, COLORS.gum],
      [0.72, "#a74d65"],
      [1, "#541b2d"]
    ]
  );
  ctx.fill();

  const lowerTeeth = [
    { x: 175, y: 352, w: 32, h: 40, tilt: 0.31 },
    { x: 207, y: 361, w: 34, h: 43, tilt: 0.22 },
    { x: 242, y: 367, w: 36, h: 45, tilt: 0.16 },
    { x: 279, y: 371, w: 39, h: 47, tilt: 0.11 },
    { x: 319, y: 371, w: 37, h: 43, tilt: 0.07 },
    { x: 356, y: 369, w: 34, h: 42, tilt: 0.03 },
    { x: 391, y: 368, w: 29, h: 40, tilt: -0.02 },
    { x: 421, y: 368, w: 29, h: 40, tilt: 0.02 },
    { x: 451, y: 369, w: 34, h: 42, tilt: -0.03 },
    { x: 488, y: 371, w: 37, h: 43, tilt: -0.07 },
    { x: 528, y: 371, w: 39, h: 47, tilt: -0.11 },
    { x: 565, y: 367, w: 36, h: 45, tilt: -0.16 },
    { x: 600, y: 361, w: 34, h: 43, tilt: -0.22 },
    { x: 632, y: 352, w: 32, h: 40, tilt: -0.31 }
  ];

  for (const tooth of lowerTeeth) {
    drawTooth(ctx, tooth, true);
  }

  // Slight gum folds and natural shadows, not decorative cartoon lines.
  ctx.strokeStyle = "rgba(38, 8, 22, 0.48)";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(190, 245);
  ctx.quadraticCurveTo(230, 257, 270, 250);
  ctx.moveTo(530, 250);
  ctx.quadraticCurveTo(570, 257, 610, 245);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(210, 350);
  ctx.quadraticCurveTo(260, 378, 306, 378);
  ctx.moveTo(494, 378);
  ctx.quadraticCurveTo(540, 378, 590, 350);
  ctx.stroke();

  // Moist lip highlights are subdued and uneven.
  ctx.beginPath();
  ctx.moveTo(119, 248);
  ctx.bezierCurveTo(165, 195, 229, 174, 285, 185);
  ctx.quadraticCurveTo(330, 196, 363, 196);
  ctx.strokeStyle = "rgba(205, 121, 139, 0.45)";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(436, 196);
  ctx.quadraticCurveTo(470, 196, 515, 185);
  ctx.bezierCurveTo(571, 174, 635, 195, 681, 248);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(166, 346);
  ctx.bezierCurveTo(229, 397, 284, 412, 331, 411);
  ctx.moveTo(469, 411);
  ctx.bezierCurveTo(516, 412, 571, 397, 634, 346);
  ctx.strokeStyle = "rgba(194, 105, 126, 0.35)";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.restore();
}

function smoothClosedPath(ctx, left, right) {
  if (left.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(left[0].x, left[0].y);

  for (let i = 1; i < left.length - 1; i++) {
    const midX = (left[i].x + left[i + 1].x) / 2;
    const midY = (left[i].y + left[i + 1].y) / 2;
    ctx.quadraticCurveTo(left[i].x, left[i].y, midX, midY);
  }

  const lastLeft = left[left.length - 1];
  ctx.lineTo(lastLeft.x, lastLeft.y);

  for (let i = right.length - 1; i > 0; i--) {
    const midX = (right[i].x + right[i - 1].x) / 2;
    const midY = (right[i].y + right[i - 1].y) / 2;
    ctx.quadraticCurveTo(right[i].x, right[i].y, midX, midY);
  }

  ctx.lineTo(right[0].x, right[0].y);
  ctx.closePath();
}

export function drawWormTooth(ctx, points, options = {}) {
  const { showTooth = true } = options;
  if (points.length < 2 || !showTooth) return;

  const left = [];
  const right = [];

  const startWidth = 8;
  const crownWidth = 24;

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const previous = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];

    const dx = next.x - previous.x;
    const dy = next.y - previous.y;
    const length = Math.hypot(dx, dy) || 1;

    const nx = -dy / length;
    const ny = dx / length;
    const t = i / (points.length - 1);

    const toothProfile = Math.sin(Math.PI * Math.pow(t, 0.8));
    const width = startWidth + crownWidth * toothProfile;

    left.push({
      x: p.x + nx * width / 2,
      y: p.y + ny * width / 2
    });

    right.push({
      x: p.x - nx * width / 2,
      y: p.y - ny * width / 2
    });
  }

  smoothClosedPath(ctx, left, right);

  ctx.fillStyle = COLORS.tooth;
  ctx.fill();

  ctx.strokeStyle = COLORS.toothShade;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();

  for (let i = 0; i < points.length; i++) {
    const p = points[i];

    if (i === 0) {
      ctx.moveTo(p.x - 2, p.y);
    } else {
      const previous = points[i - 1];
      ctx.lineTo(
        (previous.x + p.x) / 2 - 2,
        (previous.y + p.y) / 2
      );
    }
  }

  ctx.strokeStyle = COLORS.toothHighlight;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.stroke();
}

export { COLORS };
