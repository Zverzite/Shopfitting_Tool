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

function drawFrame(width, height, thickness, jointType) {
  const canvas = document.getElementById('frameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Scale and position
  const scale = 2;
  const offsetX = 50;
  const offsetY = 50;

  const outerW = width * scale;
  const outerH = height * scale;
  const t = thickness * scale;

  // Clamp
  if (outerW <= 2 * t || outerH <= 2 * t) {
    alert("Width and Height must be greater than " + (2 * thickness) + "mm");
    return;
  }

  ctx.fillStyle = "#000"; // Black frame

  // Draw sides as rectangles
  // Top
  ctx.fillRect(offsetX, offsetY, outerW, t);
  // Bottom
  ctx.fillRect(offsetX, offsetY + outerH - t, outerW, t);
  // Left
  ctx.fillRect(offsetX, offsetY + t, t, outerH - 2 * t);
  // Right
  ctx.fillRect(offsetX + outerW - t, offsetY + t, t, outerH - 2 * t);
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
