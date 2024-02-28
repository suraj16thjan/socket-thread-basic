const socket = io("http://localhost:5000");

socket.on("connection", (message) => {
  console.log(message);
  const mouseMoveInfo = document.getElementById("mousemove-info");

  // Function to handle mouse move event
  function handleMouseMove(event) {
    // Extract mouse cursor coordinates from the event
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Update the content of the div with mouse coordinates
    socket.emit("event", { x: mouseX, y: mouseY });
  }

  // Add event listener for mouse move event
  document.addEventListener("mousemove", handleMouseMove);
});
