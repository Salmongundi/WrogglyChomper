
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
  ctx.save();
  ctx.translate(400, 265);

  ctx.save();
  ctx.filter = "blur(12px)";
  ctx.fillStyle = "#10090d";
  ctx.beginPath();
  ctx.ellipse(0, 0, 226, 126, -0.025, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(-214, -5);
  ctx.bezierCurveTo(-196, -49, -145, -82, -91, -79);
  ctx.bezierCurveTo(-55, -77, -30, -94, 0, -87);
  ctx.bezierCurveTo(30, -94, 61, -74, 99, -78);
  ctx.bezierCurveTo(158, -78, 200, -43, 215, -8);
  ctx.bezierCurveTo(205, 29, 158, 69, 99, 83);
  ctx.bezierCurveTo(51, 94, 22, 82, -5, 86);
  ctx.bezierCurveTo(-46, 91, -83, 76, -124, 66);
  ctx.bezierCurveTo(-177, 51, -207, 24, -214, -5);
  ctx.closePath();

  const lip = ctx.createLinearGradient(0, -95, 0, 95);
  lip.addColorStop(0, "#684047");
  lip.addColorStop(0.32, "#48252d");
  lip.addColorStop(0.65, "#30171e");
  lip.addColorStop(1, "#75454a");
  ctx.fillStyle = lip;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-190, -8);
  ctx.bezierCurveTo(-150, -43, -96, -48, -47, -42);
  ctx.bezierCurveTo(-20, -38, -11, -47, 4, -43);
  ctx.bezierCurveTo(47, -49, 100, -42, 151, -25);
  ctx.bezierCurveTo(174, -15, 182, -4, 174, 12);
  ctx.bezierCurveTo(148, 42, 94, 54, 48, 51);
  ctx.bezierCurveTo(15, 48, -9, 59, -42, 51);
  ctx.bezierCurveTo(-96, 48, -155, 33, -183, 14);
  ctx.closePath();

  const cavity = ctx.createLinearGradient(0, -45, 0, 58);
  cavity.addColorStop(0, "#170b10");
  cavity.addColorStop(0.55, "#080609");
  cavity.addColorStop(1, "#291017");
  ctx.fillStyle = cavity;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-174, -13);
  ctx.bezierCurveTo(-126, -40, -78, -38, -40, -32);
  ctx.bezierCurveTo(-18, -28, -7, -35, 5, -31);
  ctx.bezierCurveTo(53, -38, 113, -31, 164, -18);
  ctx.lineTo(154, -4);
  ctx.bezierCurveTo(103, -13, 61, -13, 28, -8);
  ctx.lineTo(8, -5);
  ctx.lineTo(-8, -8);
  ctx.bezierCurveTo(-65, -5, -119, -10, -165, 0);
  ctx.closePath();

  const gum = ctx.createLinearGradient(0, -40, 0, 1);
  gum.addColorStop(0, "#9a5b60");
  gum.addColorStop(1, "#593039");
  ctx.fillStyle = gum;
  ctx.fill();

  const upperTeeth = [
    { x: -151, y: -15, w: 25, h: 28, r: -0.17 },
    { x: -126, y: -22, w: 27, h: 35, r: -0.10 },
    { x: -98, y: -25, w: 30, h: 38, r: -0.05 },
    { x: -66, y: -25, w: 29, h: 38, r: 0.03 },
    { x: -35, y: -24, w: 24, h: 36, r: 0.08 },
    { x: 18, y: -25, w: 25, h: 36, r: -0.04 },
    { x: 46, y: -26, w: 29, h: 38, r: -0.02 },
    { x: 77, y: -24, w: 29, h: 36, r: 0.06 },
    { x: 108, y: -20, w: 27, h: 32, r: 0.11 },
    { x: 136, y: -14, w: 24, h: 26, r: 0.16 }
  ];

  for (const t of upperTeeth) {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate(t.r);

    ctx.beginPath();
    ctx.moveTo(-t.w / 2, -t.h / 2);
    ctx.quadraticCurveTo(-t.w * 0.45, -t.h * 0.58, -t.w * 0.12, -t.h / 2);
    ctx.quadraticCurveTo(t.w * 0.34, -t.h * 0.55, t.w / 2, -t.h * 0.36);
    ctx.lineTo(t.w * 0.43, t.h * 0.20);
    ctx.quadraticCurveTo(t.w * 0.32, t.h * 0.57, t.w * 0.05, t.h / 2);
    ctx.quadraticCurveTo(-t.w * 0.31, t.h * 0.53, -t.w * 0.42, t.h * 0.19);
    ctx.closePath();

    const enamel = ctx.createLinearGradient(-t.w / 2, 0, t.w / 2, 0);
    enamel.addColorStop(0, "#93877b");
    enamel.addColorStop(0.24, "#ded4bd");
    enamel.addColorStop(0.65, "#c9bea8");
    enamel.addColorStop(1, "#786b64");
    ctx.fillStyle = enamel;
    ctx.fill();

    ctx.strokeStyle = "rgba(40, 23, 25, 0.65)";
    ctx.lineWidth = 1.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-t.w * 0.22, -t.h * 0.30);
    ctx.quadraticCurveTo(-t.w * 0.04, -t.h * 0.40, t.w * 0.12, -t.h * 0.27);
    ctx.strokeStyle = "rgba(255, 244, 218, 0.32)";
    ctx.lineWidth = 1.3;
    ctx.stroke();

    ctx.restore();
  }

  ctx.beginPath();
  ctx.moveTo(-174, 14);
  ctx.bezierCurveTo(-125, 38, -72, 42, -33, 39);
  ctx.bezierCurveTo(6, 46, 39, 40, 78, 37);
  ctx.bezierCurveTo(119, 33, 154, 23, 174, 10);
  ctx.bezierCurveTo(155, 42, 104, 53, 54, 53);
  ctx.bezierCurveTo(16, 57, -14, 56, -48, 51);
  ctx.bezierCurveTo(-104, 49, -151, 35, -174, 14);
  ctx.closePath();
  ctx.fillStyle = "#48232c";
  ctx.fill();

  const lowerTeeth = [
    [-137, 18, 24, 19, -0.12],
    [-111, 24, 25, 20, -0.07],
    [-84, 28, 26, 19, -0.03],
    [-55, 29, 25, 18, 0.04],
    [-27, 30, 22, 17, 0.07],
    [4, 30, 24, 17, -0.04],
    [32, 28, 25, 18, 0.02],
    [60, 26, 25, 18, 0.08],
    [88, 23, 24, 19, 0.11],
    [115, 18, 23, 18, 0.14]
  ];

  for (const [x, y, tw, th, rotation] of lowerTeeth) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.moveTo(-tw / 2, -th / 2);
    ctx.quadraticCurveTo(0, -th * 0.68, tw / 2, -th / 2);
    ctx.lineTo(tw * 0.39, th * 0.20);
    ctx.quadraticCurveTo(0, th * 0.45, -tw * 0.41, th * 0.18);
    ctx.closePath();

    ctx.fillStyle = "#a99b87";
    ctx.fill();
    ctx.strokeStyle = "rgba(24, 13, 16, 0.8)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  ctx.beginPath();
  ctx.moveTo(-162, -43);
  ctx.quadraticCurveTo(-117, -69, -77, -66);
  ctx.strokeStyle = "rgba(210, 151, 150, 0.28)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(81, 72);
  ctx.quadraticCurveTo(130, 62, 159, 37);
  ctx.strokeStyle = "rgba(198, 129, 132, 0.2)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}




export function drawWormTooth(ctx, points) {
  if (!points || points.length < 3) return;

  const startWidth = 5;
  const crownWidth = 15;
  const count = points.length;

  const widths = points.map((_, i) => {
    const t = i / (count - 1);
    return startWidth + crownWidth * Math.pow(Math.sin(Math.PI * t), 0.8);
  });

  const left = [];
  const right = [];

  for (let i = 0; i < count; i++) {
    const p = points[i];
    const previous = points[Math.max(0, i - 1)];
    const next = points[Math.min(count - 1, i + 1)];

    const dx = next.x - previous.x;
    const dy = next.y - previous.y;
    const length = Math.hypot(dx, dy) || 1;

    const nx = -dy / length;
    const ny = dx / length;
    const halfWidth = widths[i] / 2;

    left.push({
      x: p.x + nx * halfWidth,
      y: p.y + ny * halfWidth
    });

    right.push({
      x: p.x - nx * halfWidth,
      y: p.y - ny * halfWidth
    });
  }

  // Draw a smooth outline through the strand's width points.
  function traceSmoothSide(side) {
    ctx.moveTo(side[0].x, side[0].y);

    for (let i = 1; i < side.length - 1; i++) {
      const midpointX = (side[i].x + side[i + 1].x) / 2;
      const midpointY = (side[i].y + side[i + 1].y) / 2;

      ctx.quadraticCurveTo(
        side[i].x,
        side[i].y,
        midpointX,
        midpointY
      );
    }

    const last = side[side.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const gradient = ctx.createLinearGradient(
    points[0].x - 10,
    points[0].y,
    points[count - 1].x + 10,
    points[count - 1].y
  );

  gradient.addColorStop(0, "#fff0d5");
  gradient.addColorStop(0.35, "#e7cda8");
  gradient.addColorStop(0.7, "#c5a17e");
  gradient.addColorStop(1, "#f2dfbd");

  ctx.beginPath();
  traceSmoothSide(left);

  // Round the tip instead of making a sharp folded corner.
  const tip = points[count - 1];
  ctx.quadraticCurveTo(
    tip.x,
    tip.y,
    right[count - 1].x,
    right[count - 1].y
  );

  for (let i = right.length - 2; i >= 0; i--) {
    const current = right[i];
    const previous = right[Math.max(0, i - 1)];

    if (i === 0) {
      ctx.lineTo(current.x, current.y);
    } else {
      ctx.quadraticCurveTo(
        current.x,
        current.y,
        (current.x + previous.x) / 2,
        (current.y + previous.y) / 2
      );
    }
  }

  // Close the root with a rounded curve.
  ctx.quadraticCurveTo(
    points[0].x,
    points[0].y,
    left[0].x,
    left[0].y
  );

  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.strokeStyle = "rgba(74, 42, 37, 0.3)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.restore();
}

