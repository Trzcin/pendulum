import Vector2 from "./Vector2.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let r1 = 300;
let a1 = Math.PI / 2;
let m1 = 20;
let pos1 = new Vector2(0, 0);
let a1_v = 0;
let a1_a = 0;
let r2 = 300;
let a2 = Math.PI / 3;
let m2 = 20;
let pos2 = new Vector2(0, 0);
let pos2_prev = new Vector2(0, 0);
let a2_v = 0;
let a2_a = 0;
let g = 1;
let paused = true;
let lineThiccness = 5;
let massSizeMultiplyer = 0.8;
const backgroundColor = "#192734";
const ballColor = "#1167b1";
const topOffset = 200;
let leftOffset = 0;
const minDragDist = 200;
updatePositions();
pos2_prev.x = pos2.x;
pos2_prev.y = pos2.y;
let trajectoryPath = new Path2D();
trajectoryPath.moveTo(pos2_prev.x, pos2_prev.y);
ctx.lineJoin = "round";
ctx.lineCap = "round";
const r1Input = document.getElementById("r1");
r1Input.value = r1.toString();
r1Input.onchange = () => r1 = parseFloat(r1Input.value);
const m1Input = document.getElementById("m1");
m1Input.value = m1.toString();
m1Input.onchange = () => m1 = parseFloat(m1Input.value);
const a1Input = document.getElementById("a1");
a1Input.value = radToDeg(a1).toString();
a1Input.onchange = () => {
  a1 = degToRad(parseFloat(a1Input.value));
};
const r2Input = document.getElementById("r2");
r2Input.value = r2.toString();
r2Input.onchange = () => r2 = parseFloat(r2Input.value);
const m2Input = document.getElementById("m2");
m2Input.value = m2.toString();
m2Input.onchange = () => m2 = parseFloat(m2Input.value);
const a2Input = document.getElementById("a2");
a2Input.value = radToDeg(a2).toString();
a2Input.onchange = () => {
  a2 = degToRad(parseFloat(a2Input.value));
};
const gInput = document.getElementById("g");
gInput.value = g.toString();
gInput.onchange = () => g = parseFloat(gInput.value);
const bSInput = document.getElementById("bs");
bSInput.value = massSizeMultiplyer.toString();
bSInput.onchange = () => massSizeMultiplyer = parseFloat(bSInput.value);
const lWInput = document.getElementById("lw");
lWInput.value = lineThiccness.toString();
lWInput.onchange = () => lineThiccness = parseFloat(lWInput.value);
const playBtn = document.getElementById("play-btn");
playBtn.onclick = () => {
  paused = !paused;
  updatePlayIcon();
};
const restartBtn = document.getElementById("restart-btn");
restartBtn.onclick = restart;
function updatePlayIcon() {
  if (paused) {
    playBtn.children[0].src = "./icons/play.svg";
  } else {
    playBtn.children[0].src = "./icons/pause.svg";
  }
}
function restart() {
  r1 = 300;
  a1 = Math.PI / 2;
  m1 = 20;
  pos1 = new Vector2(0, 0);
  a1_v = 0;
  a1_a = 0;
  r2 = 300;
  a2 = Math.PI / 3;
  m2 = 20;
  pos2 = new Vector2(0, 0);
  pos2_prev = new Vector2(0, 0);
  a2_v = 0;
  a2_a = 0;
  g = 1;
  paused = true;
  lineThiccness = 5;
  massSizeMultiplyer = 0.8;
  updatePlayIcon();
  r1Input.value = r1.toString();
  m1Input.value = m1.toString();
  a1Input.value = radToDeg(a1).toString();
  r2Input.value = r2.toString();
  m2Input.value = m2.toString();
  a2Input.value = radToDeg(a2).toString();
  gInput.value = g.toString();
  bSInput.value = massSizeMultiplyer.toString();
  lWInput.value = lineThiccness.toString();
  updatePositions();
  pos2_prev.x = pos2.x;
  pos2_prev.y = pos2.y;
  trajectoryPath = new Path2D();
  trajectoryPath.moveTo(pos2_prev.x, pos2_prev.y);
  dragging = 0;
  playBtn.blur();
  restartBtn.blur();
}
const mousePos = new Vector2(0, 0);
let dragging = 0;
canvas.onmousedown = (e) => {
  if (e.buttons === 1) {
    if (Vector2.distance(mousePos, pos1) < minDragDist) {
      dragging = 1;
    } else if (Vector2.distance(mousePos, pos2) < minDragDist) {
      dragging = 2;
    }
  }
};
canvas.onmouseup = () => dragging = 0;
function drag() {
  if (dragging === 1) {
    a1 = -Math.atan2(mousePos.y, mousePos.x) + Math.PI / 2;
    a1_v = 0;
    a1_a = 0;
    a1Input.value = radToDeg(a1).toString();
  } else if (dragging === 2) {
    const dir = new Vector2(mousePos.x - pos1.x, mousePos.y - pos1.y);
    a2 = -Math.atan2(dir.y, dir.x) + Math.PI / 2;
    a2_v = 0;
    a2_a = 0;
    a2Input.value = radToDeg(a2).toString();
  }
}
function setup() {
  canvas.width = window.innerWidth - 250;
  canvas.height = window.innerHeight;
  leftOffset = Math.round(canvas.width / 2);
  ctx.translate(leftOffset, topOffset);
  canvas.onmousemove = (e) => {
    mousePos.x = e.pageX - leftOffset;
    mousePos.y = e.pageY - topOffset;
  };
}
setup();
window.onresize = () => {
  if (isMobile())
    return;
  setup();
};
function isMobile() {
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
function update() {
  if (!paused) {
    calculateAcceleration();
    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;
    a1Input.value = radToDeg(a1).toString();
    a2Input.value = radToDeg(a2).toString();
  }
  if (dragging !== 0)
    drag();
  updatePositions();
  clearCanvas();
  if (pos2_prev.x !== pos2.x || pos2_prev.y !== pos2.y) {
    if (paused) {
      trajectoryPath.moveTo(pos2.x, pos2.y);
    } else {
      trajectoryPath.lineTo(pos2.x, pos2.y);
    }
  }
  ctx.strokeStyle = "#0da2ff";
  ctx.lineWidth = 2;
  ctx.stroke(trajectoryPath);
  drawPendulums();
  requestAnimationFrame(update);
}
update();
function clearCanvas() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(-leftOffset, -topOffset, canvas.width, canvas.height);
}
function drawPendulums() {
  ctx.fillStyle = ballColor;
  ctx.lineWidth = lineThiccness;
  ctx.strokeStyle = "#a9a9a9";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(pos1.x, pos1.y);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(pos1.x, pos1.y);
  ctx.lineTo(pos2.x, pos2.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(pos1.x, pos1.y, m1 * massSizeMultiplyer, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(pos2.x, pos2.y, m2 * massSizeMultiplyer, 0, Math.PI * 2);
  ctx.fill();
}
function updatePositions() {
  pos1.x = Math.round(Math.sin(a1) * r1);
  pos1.y = Math.round(Math.cos(a1) * r1);
  pos2_prev.x = pos2.x;
  pos2_prev.y = pos2.y;
  pos2.x = Math.round(pos1.x + Math.sin(a2) * r2);
  pos2.y = Math.round(pos1.y + Math.cos(a2) * r2);
}
function calculateAcceleration() {
  const acc1_p1 = -g * (2 * m1 + m2) * Math.sin(a1) - m2 * g * Math.sin(a1 - 2 * a2) - 2 * Math.sin(a1 - a2) * m2 * (Math.pow(a2_v, 2) * r2 + Math.pow(a1_v, 2) * r1 * Math.cos(a1 - a2));
  const acc1_p2 = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  a1_a = acc1_p1 / acc1_p2;
  const acc2_p1 = 2 * Math.sin(a1 - a2) * (Math.pow(a1_v, 2) * r1 * (m1 + m2) + g * (m1 + m2) * Math.cos(a1) + Math.pow(a2_v, 2) * r2 * m2 * Math.cos(a1 - a2));
  const acc2_p2 = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  a2_a = acc2_p1 / acc2_p2;
}
window.onkeydown = (e) => {
  if (e.key === " ") {
    paused = !paused;
    playBtn.blur();
    updatePlayIcon();
  }
};
function radToDeg(radians) {
  return Math.round(radians * (180 / Math.PI));
}
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}
