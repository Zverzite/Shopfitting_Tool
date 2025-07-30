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
