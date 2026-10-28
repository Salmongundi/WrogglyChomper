
export const COLORS = {
  background: "#171116",
  lip: "#74394d",
  lipLight: "#a85d72",
  lipShadow: "#3b1928",
  mouth: "#080609",
  mouthDeep: "#020204",
  gum: "#a84f6b",
  gumLight: "#d17b91",
  tooth: "#e5d9c5",
  toothShade: "#b7a99a",
  toothHighlight: "#fff3df",
  text: "#d7bac5",
  muted: "#bba4ae"
};

function makeGradient(ctx, x1, y1, x2, y2, stops) {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);

  for (const [position, color] of stops) {
    gradient.addColorStop(position, color);
  }

  return gradient;
}

function drawTooth(
  ctx,
  x,
  y,
  width,
  height,
  tilt = 0,
  lower = false
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);

  const direction = lower ? -1 : 1;

  ctx.beginPath();
  ctx.moveTo(-width * 0.5, 0);

  ctx.bezierCurveTo(
    -width * 0.52, direction * height * 0.2,
    -width * 0.35, direction * height * 0.83,
    -width * 0.15, direction * height
  );

  ctx.bezierCurveTo(
    -width * 0.05, direction * height * 1.05,
    width * 0.05, direction * height * 1.05,
    width * 0.15, direction * height
  );

  ctx.bezierCurveTo(
    width * 0.35, direction * height * 0.83,
    width * 0.52, direction * height * 0.2,
    width * 0.5, 0
  );

  ctx.closePath();

  ctx.fillStyle = makeGradient(
    ctx,
    x - width * 0.5,
    y,
    x + width * 0.5,
    y,
    [
      [0, "#8e8178"],
      [0.18, COLORS.toothShade],
      [0.42, COLORS.toothHighlight],
      [0.72, COLORS.tooth],
      [1, "#97887d"]
    ]
  );

  ctx.fill();

  ctx.strokeStyle = "rgba(35, 15, 24, 0.65)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-width * 0.24, direction * height * 0.12);
  ctx.quadraticCurveTo(
    -width * 0.2,
    direction * height * 0.48,
    -width * 0.08,
    direction * height * 0.75
  );

  ctx.strokeStyle = "rgba(255, 243, 223, 0.45)";
  ctx.lineWidth = Math.max(1, width * 0.045);
  ctx.stroke();

  ctx.restore();
}

function drawLipShape(ctx, upper = true) {
  ctx.beginPath();

  if (upper) {
    ctx.moveTo(145, 245);

    ctx.bezierCurveTo(
      185, 194, 230, 167, 284, 161
    );

    ctx.bezierCurveTo(
      327, 155, 351, 174, 378, 181
    );

    ctx.bezierCurveTo(
      394, 185, 406, 185, 422, 180
    );

    ctx.bezierCurveTo(
      450, 170, 478, 155, 520, 162
    );

    ctx.bezierCurveTo(
      573, 170, 619, 198, 655, 245
    );

    ctx.bezierCurveTo(
      605, 222, 560, 222, 510, 235
    );

    ctx.bezierCurveTo(
      466, 247, 433, 255, 400, 255
    );

    ctx.bezierCurveTo(
      365, 255, 331, 247, 287, 235
    );

    ctx.bezierCurveTo(
      237, 222, 190, 222, 145, 245
    );
  } else {
    ctx.moveTo(145, 382);

    ctx.bezierCurveTo(
      197, 405, 242, 414, 291, 410
    );

    ctx.bezierCurveTo(
      337, 406, 368, 398, 400, 398
    );

    ctx.bezierCurveTo(
      433, 398, 466, 406, 511, 410
    );

    ctx.bezierCurveTo(
      560, 414, 606, 405, 655, 382
    );

    ctx.bezierCurveTo(
      623, 431, 577, 465, 523, 480
    );

    ctx.bezierCurveTo(
      473, 495, 437, 496, 400, 491
    );

    ctx.bezierCurveTo(
      361, 496, 324, 495, 275, 480
    );

    ctx.bezierCurveTo(
      222, 465, 176, 431, 145, 382
    );
  }

  ctx.closePath();

  ctx.fillStyle = makeGradient(
    ctx,
    0,
    upper ? 155 : 380,
    0,
    upper ? 260 : 500,
    [
      [0, COLORS.lipLight],
      [0.45, COLORS.lip],
      [1, COLORS.lipShadow]
    ]
  );

  ctx.fill();

  ctx.strokeStyle = "rgba(10, 4, 9, 0.8)";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawGumRidge(ctx, upper = true) {
  ctx.beginPath();

  if (upper) {
    ctx.moveTo(178, 234);

    ctx.bezierCurveTo(
      230, 211, 274, 214, 320, 229
    );

    ctx.bezierCurveTo(
      350, 238, 372, 247, 400, 246
    );

    ctx.bezierCurveTo(
      428, 247, 450, 238, 480, 229
    );

    ctx.bezierCurveTo(
      526, 214, 570, 211, 622, 234
    );

    ctx.lineTo(622, 256);

    ctx.bezierCurveTo(
      555, 246, 514, 260, 470, 267
    );

    ctx.bezierCurveTo(
      438, 272, 423, 275, 400, 275
    );

    ctx.bezierCurveTo(
      377, 275, 362, 272, 330, 267
    );

    ctx.bezierCurveTo(
      286, 260, 245, 246, 178, 256
    );
  } else {
    ctx.moveTo(175, 375);

    ctx.bezierCurveTo(
      235, 399, 282, 395, 326, 389
    );

    ctx.bezierCurveTo(
      358, 384, 379, 380, 400, 380
    );

    ctx.bezierCurveTo(
      421, 380, 442, 384, 474, 389
    );

    ctx.bezierCurveTo(
      518, 395, 565, 399, 625, 375
    );

    ctx.lineTo(617, 399);

    ctx.bezierCurveTo(
      561, 418, 516, 411, 471, 404
    );

    ctx.bezierCurveTo(
      438, 399, 421, 395, 400, 395
    );

    ctx.bezierCurveTo(
      379, 395, 362, 399, 329, 404
    );

    ctx.bezierCurveTo(
      284, 411, 239, 418, 183, 399
    );
  }

  ctx.closePath();
  ctx.fillStyle = COLORS.gum;
  ctx.fill();

  ctx.strokeStyle = "rgba(45, 12, 27, 0.75)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();

  if (upper) {
    ctx.moveTo(184, 238);
    ctx.bezierCurveTo(
      270, 222, 335, 259, 400, 258
    );
    ctx.bezierCurveTo(
      465, 259, 530, 222, 616, 238
    );
  } else {
    ctx.moveTo(184, 390);
    ctx.bezierCurveTo(
      270, 408, 335, 386, 400, 386
    );
    ctx.bezierCurveTo(
      465, 386, 530, 408, 616, 390
    );
  }

  ctx.strokeStyle = "rgba(239, 143, 169, 0.42)";
  ctx.lineWidth = 3;
  ctx.stroke();
}

export function drawMouth(ctx) {
  // Dark background
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, 800, 600);

  // Soft surrounding shadow
  const shadow = ctx.createRadialGradient(
    400, 310, 70,
    400, 310, 340
  );

  shadow.addColorStop(0, "rgba(0, 0, 0, 0)");
  shadow.addColorStop(1, "rgba(0, 0, 0, 0.7)");

  ctx.fillStyle = shadow;
  ctx.fillRect(0, 0, 800, 600);

  // Open mouth cavity
  ctx.beginPath();
  ctx.moveTo(145, 245);

  ctx.bezierCurveTo(
    210, 219, 280, 235, 330, 251
  );

  ctx.bezierCurveTo(
    360, 260, 378, 266, 400, 266
  );

  ctx.bezierCurveTo(
    422, 266, 440, 260, 470, 251
  );

  ctx.bezierCurveTo(
    520, 235, 590, 219, 655, 245
  );

  ctx.bezierCurveTo(
    639, 314, 641, 353, 655, 382
  );

  ctx.bezierCurveTo(
    590, 411, 522, 414, 470, 403
  );

  ctx.bezierCurveTo(
    440, 397, 422, 392, 400, 392
  );

  ctx.bezierCurveTo(
    378, 392, 360, 397, 330, 403
  );

  ctx.bezierCurveTo(
    278, 414, 210, 411, 145, 382
  );

  ctx.bezierCurveTo(
    159, 353, 161, 314, 145, 245
  );

  ctx.closePath();

  ctx.fillStyle = makeGradient(
    ctx,
    0, 245, 0, 410,
    [
      [0, "#170711"],
      [0.42, COLORS.mouth],
      [1, COLORS.mouthDeep]
    ]
  );

  ctx.fill();

  ctx.strokeStyle = "rgba(4, 2, 5, 0.9)";
  ctx.lineWidth = 5;
  ctx.stroke();

  // Upper lip
  drawLipShape(ctx, true);

  // Upper gum
  drawGumRidge(ctx, true);

  // Upper teeth, irregular and slightly crooked
  const upperTeeth = [
    [204, 241, 36, 46, -0.08],
    [237, 239, 35, 54, 0.04],
    [269, 239, 34, 61, -0.05],
    [300, 243, 32, 66, 0.06],
    [328, 248, 29, 68, -0.08],
    [351, 253, 27, 66, 0.08],
    [449, 253, 27, 66, -0.08],
    [472, 248, 29, 68, 0.08],
    [500, 243, 32, 66, -0.06],
    [531, 239, 34, 61, 0.05],
    [563, 239, 35, 54, -0.04],
    [596, 241, 36, 46, 0.08]
  ];

  for (const [x, y, w, h, tilt] of upperTeeth) {
    drawTooth(ctx, x, y, w, h, tilt, false);
  }

  // Lower gum and lower teeth are anchored to the lower jaw
  drawGumRidge(ctx, false);

  const lowerTeeth = [
    [205, 389, 34, 39, 0.08],
    [238, 397, 33, 45, -0.04],
    [270, 400, 32, 49, 0.06],
    [301, 399, 30, 51, -0.05],
    [330, 395, 28, 53, 0.06],
    [355, 391, 26, 54, -0.04],
    [445, 391, 26, 54, 0.04],
    [470, 395, 28, 53, -0.06],
    [499, 399, 30, 51, 0.05],
    [530, 400, 32, 49, -0.06],
    [562, 397, 33, 45, 0.04],
    [595, 389, 34, 39, -0.08]
  ];

  for (const [x, y, w, h, tilt] of lowerTeeth) {
    drawTooth(ctx, x, y, w, h, tilt, true);
  }

  // Lower lip drawn last to give the jaw a rounded edge
  drawLipShape(ctx, false);

  // Lip highlights
  ctx.beginPath();
  ctx.moveTo(190, 213);
  ctx.bezierCurveTo(
    245, 178, 292, 174, 340, 191
  );

  ctx.strokeStyle = "rgba(232, 151, 174, 0.45)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(460, 191);
  ctx.bezierCurveTo(
    508, 174, 555, 178, 610, 213
  );

  ctx.strokeStyle = "rgba(232, 151, 174, 0.45)";
  ctx.lineWidth = 3;
  ctx.stroke();
}

export function drawWormTooth(ctx, points, options = {}) {
  const {
    showTooth = true,
    startWidth = 8,
    crownWidth = 24
  } = options;

  if (!showTooth || !points || points.length < 2) {
    return;
  }

  const leftSide = [];
  const rightSide = [];

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const previous = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];

    const dx = next.x - previous.x;
    const dy = next.y - previous.y;
    const length = Math.hypot(dx, dy) || 1;

    const normalX = -dy / length;
    const normalY = dx / length;
    const t = i / (points.length - 1);

    // Keep the original continuous, tapered strand shape.
    const width =
      startWidth +
      crownWidth * Math.pow(Math.sin(Math.PI * t), 0.8);

    leftSide.push({
      x: point.x + normalX * width * 0.5,
      y: point.y + normalY * width * 0.5
    });

    rightSide.push({
      x: point.x - normalX * width * 0.5,
      y: point.y - normalY * width * 0.5
    });
  }

  ctx.beginPath();
  ctx.moveTo(leftSide[0].x, leftSide[0].y);

  for (let i = 1; i < leftSide.length; i++) {
    ctx.lineTo(leftSide[i].x, leftSide[i].y);
  }

  for (let i = rightSide.length - 1; i >= 0; i--) {
    ctx.lineTo(rightSide[i].x, rightSide[i].y);
  }

  ctx.closePath();

  ctx.fillStyle = makeGradient(
    ctx,
    350, 0, 450, 0,
    [
      [0, COLORS.toothShade],
      [0.35, COLORS.tooth],
      [0.5, COLORS.toothHighlight],
      [0.7, COLORS.tooth],
      [1, COLORS.toothShade]
    ]
  );

  ctx.fill();

  ctx.strokeStyle = "rgba(45, 29, 31, 0.85)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Narrow highlight follows the strand without creating another tooth.
  ctx.beginPath();

  for (let i = 0; i < leftSide.length; i++) {
    const point = leftSide[i];

    if (i === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }

  ctx.strokeStyle = "rgba(255, 243, 223, 0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();
}
