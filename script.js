
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
  // Resize canvas to full screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fill background
  ctx.fillStyle = '#555';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Compute scale and frame size
  const padding = 20;
  const scaleX = (canvas.width - 2 * padding) / (widthMM + 2 * extrusionWidth);
  const scaleY = (canvas.height - 2 * padding) / (heightMM + 2 * extrusionWidth);
  const scale = Math.min(scaleX, scaleY);

  const frameW = widthMM * scale;
  const frameH = heightMM * scale;
  const ext = extrusionWidth * scale;

  // Center the frame
  const startX = (canvas.width - frameW) / 2;
  const startY = (canvas.height - frameH) / 2;

  // Draw extrusions with visual realism
  ctx.fillStyle = 'black';
  if (jointType === 'mitred') {
    // Top
    ctx.fillRect(startX - ext, startY - ext, frameW + 2 * ext, ext);
    // Bottom
    ctx.fillRect(startX - ext, startY + frameH, frameW + 2 * ext, ext);
    // Left
    ctx.fillRect(startX - ext, startY, ext, frameH);
    // Right
    ctx.fillRect(startX + frameW, startY, ext, frameH);
  } else {
    // Butt joints
    ctx.fillRect(startX, startY, ext, frameH); // Left
    ctx.fillRect(startX + frameW - ext, startY, ext, frameH); // Right
    ctx.fillRect(startX + ext, startY, frameW - 2 * ext, ext); // Top
    ctx.fillRect(startX + ext, startY + frameH - ext, frameW - 2 * ext, ext); // Bottom
  }

  // Draw the internal white rectangle
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.strokeRect(startX, startY, frameW, frameH);

  // Draw width label 
  ctx.fillStyle = 'white';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${widthMM} mm`, startX + frameW / 2, startY - 10);

  // Draw height label
  ctx.save();
  ctx.translate(startX - 10, startY + frameH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText(`${heightMM} mm`, 0, 0);
  ctx.restore();

  // Perimeter calculations
  const innerPerimeter = 2 * (widthMM + heightMM);
  const outerPerimeter = 2 * (widthMM + heightMM + 2 * extrusionWidth);

  // Section lengths based on joint type
  let topBottomLen, leftRightLen;
  if (jointType === 'mitred') {
    topBottomLen = widthMM + 2 * extrusionWidth;
    leftRightLen = heightMM + 2 * extrusionWidth;
  } else {
    topBottomLen = widthMM - 2 * extrusionWidth;
    leftRightLen = heightMM;
  }

  // Output details
  details.innerHTML = `
    <strong>Joint Type:</strong> ${jointType}<br>
    <strong>Inner Perimeter:</strong> ${innerPerimeter} mm<br>
    <strong>Outer Perimeter:</strong> ${outerPerimeter} mm<br><br>
    <strong>Section Lengths:</strong><br>
    Top: ${topBottomLen} mm<br>
    Bottom: ${topBottomLen} mm<br>
    Left: ${leftRightLen} mm<br>
    Right: ${leftRightLen} mm<br>
  `;
}

  


