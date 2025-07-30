const extrusionWidth = 5; // mm
const canvas = document.getElementById('frameCanvas');
const ctx = canvas.getContext('2d');
const details = document.getElementById('details');

function startDrawing() {
  const width = parseFloat(document.getElementById('inputWidth').value);
  const height = parseFloat(document.getElementById('inputHeight').value);
  const jointType = document.getElementById('jointType').value;

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    alert('Please enter valid positive numbers.');
    return;
  }

  document.getElementById('modal').style.display = 'none';
  drawFrame(width, height, jointType);
}

function drawFrame(widthMM, heightMM, jointType) {
  // Resize canvas to fit window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 20;
  const scaleX = (canvas.width - 2 * padding) / (widthMM + 2 * extrusionWidth);
  const scaleY = (canvas.height - 2 * padding) / (heightMM + 2 * extrusionWidth);
  const scale = Math.min(scaleX, scaleY);

  const frameW = widthMM * scale;
  const frameH = heightMM * scale;
  const ext = extrusionWidth * scale;

  const startX = (canvas.width - frameW) / 2;
  const startY = (canvas.height - frameH) / 2;

  ctx.fillStyle = 'black';
  if (jointType === 'mitred') {
    ctx.fillRect(startX - ext, startY - ext, frameW + 2 * ext, ext); // Top
    ctx.fillRect(startX - ext, startY + frameH, frameW + 2 * ext, ext); // Bottom
    ctx.fillRect(startX - ext, startY, ext, frameH); // Left
    ctx.fillRect(startX + frameW, startY, ext, frameH); // Right
  } else {
    ctx.fillRect(startX, startY, ext, frameH); // Left
    ctx.fillRect(startX + frameW - ext, startY, ext, frameH); // Right
    ctx.fillRect(startX + ext, startY, frameW - 2 * ext, ext); // Top
    ctx.fillRect(startX + ext, startY + frameH - ext, frameW - 2 * ext, ext); // Bottom
  }

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.strokeRect(startX, startY, frameW, frameH);

  ctx.fillStyle = 'white';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${widthMM} mm`, startX + frameW / 2, startY - 10);

  ctx.save();
  ctx.translate(startX - 10, startY + frameH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText(`${heightMM} mm`, 0, 0);
  ctx.restore();

  const innerPerimeter = 2 * (widthMM + heightMM);
  const outerPerimeter = 2 * (widthMM + heightMM + 2 * extrusionWidth);

  let topBottomLen, leftRightLen;
  if (jointType === 'mitred') {
    topBottomLen = widthMM + 2 * extrusionWidth;
    leftRightLen = heightMM + 2 * extrusionWidth;
  } else {
    topBottomLen = widthMM - 2 * extrusionWidth;
    leftRightLen = heightMM;
  }

  details.innerHTML = `
  <table>
    <tr><th colspan="2">Joint Details</th></tr>
    <tr><td>Joint Type:</td><td>${jointType}</td></tr>
    <tr><td>Inner Perimeter:</td><td>${innerPerimeter} mm</td></tr>
    <tr><td>Outer Perimeter:</td><td>${outerPerimeter} mm</td></tr>
    <tr><th colspan="2" style="padding-top: 10px;">Section Lengths</th></tr>
    <tr><td>Top:</td><td>${topBottomLen} mm</td></tr>
    <tr><td>Bottom:</td><td>${topBottomLen} mm</td></tr>
    <tr><td>Left:</td><td>${leftRightLen} mm</td></tr>
    <tr><td>Right:</td><td>${leftRightLen} mm</td></tr>
  </table>
`;

}
