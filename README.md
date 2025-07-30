# Shopfitting_Tool
Extrusion Frame Drawing Tool
* This web-based tool visually simulates a custom-sized extrusion frame with adjustable dimensions and joint types.
*  It displays both a rendered frame on canvas and calculated measurements like perimeters and section lengths.

# Features
* Dynamic input for width, height, and joint type (mitred or butt)
* Real-time rendering of the frame in HTML5 Canvas
* Clean white background with a grey inner box for clarity
* Measurement labels placed outside the extrusion to match professional diagrams
* Automatic perimeter and section length calculation
* Shadowed black text for readability over dark backgrounds

# Project Structure
* ├── index.html        # The HTML modal, input fields, and canvas layout
* ├── style.css         # Styling for modal, layout, canvas, and tables
* ├── script.js         # JavaScript logic for rendering and calculations

# Assumptions
* Extrusion width is hardcoded to 5 mm.
* The canvas is fixed at 600x600 pixels.
* Measurements are assumed to be in millimeters.
* Padding is adjusted so labels never collide with the frame or go out of bounds.

# Trade-offs
* Labels were moved outside the extrusion to avoid visual conflict, sacrificing some compactness.
* Instead of drawing labels over dark bars I chose to set the inner rectangle color to a grey color.
* Used black text with white shadow for clarity
* Canvas size is static, which may limit rendering accuracy for large frames.
