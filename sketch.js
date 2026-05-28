let dustParticles = [];
let uiCanvas, uiCtx;
let ghostCursor = [];

let isDoorOpen = false;
let currentDoorAngle = 0;
let isLaptopOpen = true;
let currentLaptopAngle = -0.3;
let isLaptopScreenOn = false;
let isMainScreensOn = false;
let chairRotation = 0;
let isLampOn = true;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ortho(-width / 2, width / 2, -height / 2, height / 2, -2000, 2000);
  for (let i = 0; i < 80; i++) {
    dustParticles.push({
      x: random(-180, 180),
      y: random(-250, 0),
      z: random(-180, 180),
      speed: random(0.1, 0.3),
      offset: random(1000),
    });
  }

  let uic = document.getElementById("ui-canvas");
  if (uic) {
    uic.width = windowWidth;
    uic.height = windowHeight;
    uiCtx = uic.getContext("2d");
  }
}

function draw() {
  background("#1a181c");
  noStroke();
  let swayX = map(mouseX, 0, width, -0.02, 0.02);
  let swayY = map(mouseY, 0, height, -0.02, 0.02);
  rotateX(-0.615 + swayY);
  rotateY(-QUARTER_PI + swayX);
  scale(1.4);
  translate(0, 130, 0);
  ambientLight(90, 90, 95);
  directionalLight(180, 180, 170, 0.5, 1, -0.5);

  if (isMainScreensOn) {
    let monitorGlow = 150 + sin(frameCount * 0.05) * 30;
    pointLight(monitorGlow, monitorGlow, monitorGlow + 50, -10, -120, -140);
  }
  pointLight(0, 120, 200, 80, -120, -150);
  if (isLampOn) {
    pointLight(255, 230, 150, -170, -140, -100);
  }

  pointLight(0, 120, 200, 80, -120, -150);
  drawRoomBase();
  drawFurniture();
  drawDecorations();
  drawDetails();
  drawDust();
  drawUI();
}

function drawRoomBase() {
  push();
  fill("#2A2B2E");
  box(390, 10, 390);
  pop();
  push();
  fill("#EAEAEA");
  push();
  translate(-195, -150, -72.5);
  box(10, 300, 255);
  pop();
  push();
  translate(-195, -150, 172.5);
  box(10, 300, 55);
  pop();
  push();
  translate(-195, -260, 100);
  box(10, 80, 90);
  pop();
  pop();

  push();
  translate(-195, -110, 55);
  currentDoorAngle = lerp(currentDoorAngle, isDoorOpen ? -1.5 : 0, 0.1);
  rotateY(currentDoorAngle);
  translate(0, 0, 45);
  fill("#D0D0D0");
  box(6, 220, 90);
  translate(6, 10, 30);
  fill(60);
  box(5, 5, 15);
  pop();
  push();
  fill("#E0E0E0");
  translate(0, -150, -195);
  box(400, 300, 10);
  pop();
}

function drawFurniture() {
  push();
  fill("#F0F0F0");
  translate(-40, -80, -155);
  box(300, 5, 80);
  pop();
  push();
  fill("#F0F0F0");
  translate(-155, -80, -40);
  box(80, 5, 150);
  pop();
  push();
  fill("#E5E5E5");
  translate(80, -40, -155);
  box(60, 75, 75);
  fill(50);
  translate(0, -20, 38);
  box(40, 2, 2);
  translate(0, 20, 0);
  box(40, 2, 2);
  translate(0, 20, 0);
  box(40, 2, 2);
  pop();
  push();
  fill("#E5E5E5");
  translate(-155, -40, 10);
  box(75, 75, 60);
  fill(50);
  translate(38, -20, 0);
  box(2, 2, 40);
  translate(0, 20, 0);
  box(2, 2, 40);
  translate(0, 20, 0);
  box(2, 2, 40);
  pop();

  push();
  translate(-10, -30, -70);
  rotateY(chairRotation);
  fill("#505050");
  cylinder(3, 30);
  translate(0, 15, 0);
  box(40, 4, 4);
  box(4, 4, 40);
  translate(0, -35, 0);
  fill("#858585");
  box(45, 5, 45);
  translate(0, -25, 20);
  fill("#B0B0B0");
  box(40, 45, 4);
  pop();
}

function drawDecorations() {
  // books
  push();
  translate(20, -82.5, -165);
  fill("#8B4513");
  box(25, 5, 35);
  translate(2, -4, 2);
  fill("#2E8B57");
  box(22, 4, 32);
  translate(-4, -4, -3);
  rotateY(0.15);
  fill("#B22222");
  box(24, 4.5, 33);
  pop();

  // coffee cup
  push();
  translate(-125, -85, -20);
  fill(240);
  cylinder(4, 10);
  translate(0, -5.1, 0);
  fill("#3C2A21");
  cylinder(3.5, 0.5);
  pop();

  // lamp
  push();
  translate(-170, -82.5, -100);
  rotateY(1.2);

  fill(40);
  cylinder(12, 4);

  translate(0, -2, 0);
  rotateZ(0.4);
  translate(0, -15, 0);
  fill(70);
  cylinder(2, 30);

  translate(0, -15, 0);
  fill(30);
  sphere(3.5);

  rotateZ(-1.8);
  translate(0, -15, 0);
  fill(70);
  cylinder(2, 30);

  translate(0, -15, 0);
  fill(30);
  sphere(3.5);

  rotateZ(1.4);
  translate(0, 10, 0);
  fill(40);
  cone(12, 16);

  if (isLampOn) {
    translate(0, 8, 0);
    emissiveMaterial(255, 240, 180);
    sphere(4);
  }
  pop();
}

function drawDetails() {
  // Laptop
  push();
  translate(-155, -82.5, -40);
  rotateY(HALF_PI - 0.2);
  fill(200);
  box(35, 3, 25);
  translate(0, -1.5, -12.5);
  currentLaptopAngle = lerp(
    currentLaptopAngle,
    isLaptopOpen ? -0.3 : HALF_PI,
    0.15,
  );
  rotateX(currentLaptopAngle);
  translate(0, -12.5, 0);
  fill(20);
  box(35, 25, 3);
  if (isLaptopScreenOn && isLaptopOpen) {
    push();
    translate(0, 0, 1.6);
    emissiveMaterial(0, 200, 255);
    box(32, 22, 0.5);
    pop();
  }
  pop();
  push();
  translate(80, -120, -165);
  fill(245, 245, 250);
  box(50, 75, 50);
  emissiveMaterial(0, 150, 255);
  translate(-26, 0, 0);
  box(3, 20, 20);
  pop();
  push();
  translate(-10, -125, -170);
  fill(15, 15, 18);
  box(70, 45, 5);
  if (isMainScreensOn) {
    push();
    translate(0, 0, 2.6);
    emissiveMaterial(230, 240, 255);
    box(66, 41, 0.5);
    pop();
  }
  translate(0, 30, 10);
  fill(40);
  box(15, 20, 15);
  pop();
  push();
  translate(-60, -135, -165);
  rotateY(0.3);
  fill(15, 15, 18);
  box(45, 80, 5);
  if (isMainScreensOn) {
    push();
    translate(0, 0, 2.6);
    emissiveMaterial(255, 100, 200);
    box(41, 76, 0.5);
    pop();
  }
  pop();
  push();
  translate(-10, -82.5, -135);
  emissiveMaterial(255, 60, 150);
  box(50, 3, 18);
  translate(40, 0, 0);
  box(8, 4, 12);
  pop();
}

function drawDust() {
  push();
  emissiveMaterial(255, 255, 255);
  for (let p of dustParticles) {
    p.y -= p.speed;
    p.x += map(noise(p.offset), 0, 1, -0.3, 0.3);
    p.offset += 0.01;
    if (p.y < -300) p.y = 0;
    push();
    translate(p.x, p.y, p.z);
    sphere(0.6);
    pop();
  }
  pop();
}

function drawUI() {
  if (!uiCtx) return;
  uiCtx.clearRect(0, 0, windowWidth, windowHeight);
  ghostCursor.push({ x: mouseX, y: mouseY });
  if (ghostCursor.length > 50) ghostCursor.shift();
  for (let i = 0; i < ghostCursor.length; i++) {
    if (i % 6 === 0) {
      let alpha = (i / ghostCursor.length) * 0.3;
      uiCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      uiCtx.beginPath();
      uiCtx.arc(ghostCursor[i].x, ghostCursor[i].y, 3, 0, Math.PI * 2);
      uiCtx.fill();
    }
  }
}

function mouseClicked() {
  let laptopPos = getScreenPos(-155, -82.5, -40);
  let chairPos = getScreenPos(-10, -30, -70);
  let screenPos = getScreenPos(-10, -125, -170);
  let doorPos = getScreenPos(-195, -110, 55);
  let lampPos = getScreenPos(-155, -115, -75);

  let dL = dist(mouseX, mouseY, laptopPos.x, laptopPos.y);
  let dC = dist(mouseX, mouseY, chairPos.x, chairPos.y);
  let dS = dist(mouseX, mouseY, screenPos.x, screenPos.y);
  let dDoor = dist(mouseX, mouseY, doorPos.x, doorPos.y);
  let dLamp = dist(mouseX, mouseY, lampPos.x, lampPos.y);

  if (dL < 35) {
    isLaptopScreenOn = !isLaptopScreenOn;
    if (beepSound) beepSound.play();
  } else if (dLamp < 40) {
    isLampOn = !isLampOn;
    if (switchSound) switchSound.play();
  } else if (dC < 55) {
    chairRotation += QUARTER_PI / 2;
  } else if (dS < 60) {
    isMainScreensOn = !isMainScreensOn;
    if (beepSound) beepSound.play();
  } else if (dDoor < 80) {
    isDoorOpen = !isDoorOpen;
    if (doorSound) doorSound.play();
  }
}

function getScreenPos(tx, ty, tz) {
  let x = tx;
  let y = ty + 130;
  let z = tz;

  x *= 1.4;
  y *= 1.4;
  z *= 1.4;

  let swayX = map(mouseX, 0, width, -0.02, 0.02);
  let swayY = map(mouseY, 0, height, -0.02, 0.02);
  let angleY = -QUARTER_PI + swayX;
  let angleX = -0.615 + swayY;

  let x1 = x * cos(angleY) + z * sin(angleY);
  let z1 = -x * sin(angleY) + z * cos(angleY);
  let y1 = y;

  let x2 = x1;
  let y2 = y1 * cos(angleX) - z1 * sin(angleX);

  return createVector(width / 2 + x2, height / 2 + y2);
}

function isMouseOverObject(tx, ty, tz, threshold) {
  let v = createVector(tx, ty, tz);
  let pos = applyCurrentTransform(v);
  return dist(mouseX, mouseY, pos.x, pos.y) < threshold;
}

function applyCurrentTransform(v) {
  let swayX = map(mouseX, 0, width, -0.02, 0.02);
  let swayY = map(mouseY, 0, height, -0.02, 0.02);

  let x = v.x;
  let y = v.y + 130;

  return createVector(width / 2 + x * 1.4, height / 2 + y * 1.4);
}

function keyPressed() {
  if (key === "l" || key === "L") {
    isLaptopOpen = !isLaptopOpen;
  }
  if (key === "1") isDoorOpen = !isDoorOpen;
}
