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
  const bgImage = new Image();
  bgImage.src = 'Background.png'; // or whatever name you saved it as

  bgImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image to fit canvas
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    // Then continue with drawing the rectangle...
    const padding = 20;
    const scaleX = (canvas.width - 2 * padding) / (widthMM + 2 * extrusionWidth);
    const scaleY = (canvas.height - 2 * padding) / (heightMM + 2 * extrusionWidth);
    const scale = Math.min(scaleX, scaleY);

    const outerW = (widthMM + 2 * extrusionWidth) * scale;
    const outerH = (heightMM + 2 * extrusionWidth) * scale;
    const startX = (canvas.width - outerW) / 2;
    const startY = (canvas.height - outerH) / 2;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, outerW, outerH);

    ctx.fillStyle = 'black';
    ctx.font = '14px sans-serif';
    ctx.fillText(`${widthMM} mm`, startX + outerW / 2 - 20, startY - 10);
    ctx.save();
    ctx.translate(startX - 40, startY + outerH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${heightMM} mm`, 0, 0);
    ctx.restore();

    const innerPerimeter = 2 * (widthMM + heightMM);
    const outerPerimeter = 2 * (widthMM + heightMM + 2 * extrusionWidth);

    let topBottomLen, leftRightLen;
    if (jointType === 'mitred') {
      topBottomLen = widthMM + 2 * extrusionWidth;
      leftRightLen = heightMM + 2 * extrusionWidth;
    } else {
      topBottomLen = widthMM;
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
  };
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
