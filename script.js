
// Reference to DOM elements
const widthInput = document.getElementById('inputWidth');
const heightInput = document.getElementById('inputHeight');
const jointSelect = document.getElementById('jointType');
const canvas = document.getElementById('frameCanvas');
const ctx = canvas.getContext('2d');
const detailsDiv = document.getElementById('details');

function startDrawing() {
  const widthMM = parseFloat(widthInput.value);
  const heightMM = parseFloat(heightInput.value);
  const jointType = jointSelect.value;

  if (isNaN(widthMM) || isNaN(heightMM) || widthMM <= 0 || heightMM <= 0) {
    alert('Please enter valid positive dimensions.');
    return;
  }

  const scale = 5; // 1 mm = 5 pixels for example
  const frameW = widthMM * scale;
  const frameH = heightMM * scale;
  const thickness = 5 * scale; // 5 mm thickness on all sides

  canvas.width = frameW + 100;
  canvas.height = frameH + 100;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const startX = (canvas.width - frameW) / 2;
  const startY = (canvas.height - frameH) / 2;

  // Outer Rectangle 
  ctx.fillStyle = 'black';
  ctx.fillRect(startX, startY, frameW, frameH);

  // Inner Rectangle 
  if (jointType === 'butt') {
    const innerX = startX + thickness;
    const innerY = startY + thickness;
    const innerW = frameW - 2 * thickness;
    const innerH = frameH - 2 * thickness;

    if (innerW > 0 && innerH > 0) {
      ctx.clearRect(innerX, innerY, innerW, innerH);
    }
  }

  updateDetails(widthMM, heightMM, jointType);
}

function updateDetails(width, height, jointType) {
  const thickness = 5;
  const innerPerimeter = 2 * (width - 2 * thickness + height - 2 * thickness);
  const outerPerimeter = 2 * (width + height);
  const top = width;
  const bottom = width;
  const left = height;
  const right = height;

  detailsDiv.innerHTML = `
    <table style="border-collapse: collapse; width: 300px;">
      <tr><th style="text-align: left;" colspan="2">Joint Type:</th><td>${jointType}</td></tr>
      <tr><th style="text-align: left;" colspan="2">Inner Perimeter:</th><td>${innerPerimeter} mm</td></tr>
      <tr><th style="text-align: left;" colspan="2">Outer Perimeter:</th><td>${outerPerimeter} mm</td></tr>
      <tr><th colspan="3" style="text-align: left; padding-top: 10px;">Section Lengths:</th></tr>
      <tr><td>Top</td><td colspan="2">${top} mm</td></tr>
      <tr><td>Bottom</td><td colspan="2">${bottom} mm</td></tr>
      <tr><td>Left</td><td colspan="2">${left} mm</td></tr>
      <tr><td>Right</td><td colspan="2">${right} mm</td></tr>
    </table>
  `;
}

