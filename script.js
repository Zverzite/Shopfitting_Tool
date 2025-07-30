
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill background
      ctx.fillStyle = '#555';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const padding = 20;
      const scaleX = (canvas.width - 2 * padding) / (widthMM + 2 * extrusionWidth);
      const scaleY = (canvas.height - 2 * padding) / (heightMM + 2 * extrusionWidth);
      const scale = Math.min(scaleX, scaleY);

      const startX = padding;
      const startY = padding;
      const frameW = widthMM * scale;
      const frameH = heightMM * scale;
      const ext = extrusionWidth * scale;

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
        // Butt joints: Top/Bottom go between Left/Right
        // Left vertical
        ctx.fillRect(startX, startY, ext, frameH);
        // Right vertical
        ctx.fillRect(startX + frameW - ext, startY, ext, frameH);
        // Top horizontal
        ctx.fillRect(startX + ext, startY, frameW - 2 * ext, ext);
        // Bottom horizontal
        ctx.fillRect(startX + ext, startY + frameH - ext, frameW - 2 * ext, ext);
      }
      // Center interal rectangle
      const startX = (canvas.width - frameW) / 2;
      const startY = (canvas.height - frameH) / 2;

      // Draw internal rectangle
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX, startY, frameW, frameH);

     // Labels
      ctx.fillStyle = 'white';
      ctx.font = '14px sans-serif';
      ctx.fillText(`${widthMM} mm`, startX + frameW / 2 - 20, startY - 10); // top label
      ctx.save();
      ctx.translate(Math.max(10, startX - 60), startY + frameH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(`${heightMM} mm`, 0, 0); // side label
      ctx.restore();

      // Perimeters
      const innerPerimeter = 2 * (widthMM + heightMM);
      const outerPerimeter = 2 * (widthMM + heightMM + 2 * extrusionWidth);

      let topBottomLen, leftRightLen;
      if (jointType === 'mitred') {
        topBottomLen = widthMM + 2 * extrusionWidth;
        leftRightLen = heightMM + 2 * extrusionWidth;
      } else {
        topBottomLen = widthMM - 2 * extrusionWidth; // adjusted for overlap
        leftRightLen = heightMM;
      }

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
  


