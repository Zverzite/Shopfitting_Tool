const extrusionWidth = 5; // mm
const canvas = document.getElementById('frameCanvas');
const ctx = canvas.getContext('2d');
const details = document.getElementById('details');

function startDrawing() {
  const width = parseFloat(document.getElementById('inputWidth').value);
  const height = parseFloat(document.getElementById('inputHeight').value);
  const jointType = document.getElementById('jointType').value;

  // Validate input
  if (
    isNaN(width) || isNaN(height) ||
    width < extrusionWidth * 2 + 1 ||
    height < extrusionWidth * 2 + 1
  ) {
    alert(`Width and Height must be at least ${extrusionWidth * 2 + 1} mm to fit 5mm extrusions and have visible inner space.`);
    return;
  }

  document.getElementById('modal').style.display = 'none';
  drawFrame(width, height, jointType);
}

function drawFrame(widthMM, heightMM, jointType) {
  canvas.width = 600;
  canvas.height = 600;
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

  // Inner white rectangle
  ctx.fillStyle = 'white';
  const innerW = Math.max(frameW - 2 * ext, 0);
  const innerH = Math.max(frameH - 2 * ext, 0);
  ctx.fillRect(startX + ext, startY + ext, innerW, innerH);

 // Labels
  ctx.fillStyle = 'black';
  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const labelOffset = ext + 10; 
  
  // Width label above top bar
  ctx.fillText(`${widthMM} mm`, startX + frameW / 2, startY - labelOffset);

  // Height label to the left of left bar
  ctx.save();
  ctx.translate(startX - labelOffset, startY + frameH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(`${heightMM} mm`, 0, 0);
  ctx.restore();


  const innerPerimeter = 2 * (widthMM + heightMM);
  const outerPerimeter = 2 * (widthMM + heightMM + 2 * extrusionWidth);

  let topBottomLen, leftRightLen;
if (jointType === 'mitred') {
  topBottomLen = widthMM;
  leftRightLen = heightMM;
} else {
  topBottomLen = widthMM - 2 * extrusionWidth;
  leftRightLen = heightMM;
}


  details.innerHTML = `
    <table>
      <tr><th colspan="2">Joint Details</th></tr>
      <tr><td>Joint Type:</td><td>${jointType}</td></tr>
      <tr><td>Inner Perimeter:</td><td>${innerPerimeter.toFixed(1)} mm</td></tr>
      <tr><td>Outer Perimeter:</td><td>${outerPerimeter.toFixed(1)} mm</td></tr>
      <tr><th colspan="2" style="padding-top: 10px;">Section Lengths</th></tr>
      <tr><td>Top:</td><td>${topBottomLen.toFixed(1)} mm</td></tr>
      <tr><td>Bottom:</td><td>${topBottomLen.toFixed(1)} mm</td></tr>
      <tr><td>Left:</td><td>${leftRightLen.toFixed(1)} mm</td></tr>
      <tr><td>Right:</td><td>${leftRightLen.toFixed(1)} mm</td></tr>
    </table>
  `;
}

document.getElementById('submitBtn').addEventListener('click', startDrawing);
