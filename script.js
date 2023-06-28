//immediately-invoked function expression (IIFE) to create a private scope.

(function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  let isDrawing = false;
  let circles = [];
  let currentCircle = null;

  initializeCanvas();

  // Function to initialize the canvas and attach event listeners
  function initializeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("dblclick", handleDoubleClick);
  }

  // Event handler for mouse down
  function handleMouseDown(event) {
    if (!document.getElementById("colorPicker").value) {
      showColorPickerPrompt();
      return;
    }

    isDrawing = true;
    const { offsetX: x, offsetY: y } = event;
    const radius = 0;
    const color = document.getElementById("colorPicker").value;
    currentCircle = { x, y, radius, color };
  }

  // Event handler for mouse click
  function handleMouseClick(event) {
    const { offsetX: x, offsetY: y } = event;
    const circle = findCircle(x, y);

    if (circle) {
      console.log("Hit");
    } else {
      console.log("Miss");
    }
  }

  // Event handler for mouse up
  function handleMouseUp() {
    if (isDrawing) {
      isDrawing = false;
      circles.push(currentCircle);
      currentCircle = null;
    }
  }

  // Event handler for mouse move
  function handleMouseMove(event) {
    if (isDrawing) {
      const { offsetX: x, offsetY: y } = event;
      const distance = Math.sqrt(
        (x - currentCircle.x) ** 2 + (y - currentCircle.y) ** 2
      );
      currentCircle.radius = distance;
      drawCanvas();
      drawCircle(currentCircle);
    }
  }

  // Event handler for double click
  function handleDoubleClick(event) {
    const { offsetX: x, offsetY: y } = event;
    const index = findCircleIndex(x, y);

    if (index !== -1) {
      circles.splice(index, 1);
      drawCanvas();
    }
  }

  // Function to draw a circle on the canvas
  function drawCircle(circle) {
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    context.fillStyle = circle.color;
    context.fill();
    context.closePath();
  }

  // Function to check if a circle exists at the given coordinates
  function findCircle(x, y) {
    return circles.find((circle) => {
      const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
      return distance <= circle.radius;
    });
  }

  // Function to find the index of a circle at the given coordinates
  function findCircleIndex(x, y) {
    return circles.findIndex((circle) => {
      const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
      return distance <= circle.radius;
    });
  }

  // Function to draw all circles on the canvas
  function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle) => {
      drawCircle(circle);
    });
  }

  const resetButton = document.getElementById("resetbutton");
  resetButton.addEventListener("click", () => {
    circles = [];
    drawCanvas();
  });
})();
