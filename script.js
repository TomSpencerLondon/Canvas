var canvas = document.getElementById("scene");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particles = [];
var pointSpeed = 0.5;
var mouseSpeed = 5;
var pSize = 5; //points size
var startingPoint = 10; //from top left
var mouseMoveRadius = 50;

// Image
var png = new Image();
png.onload = drawScene;
png.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAlCAYAAACgXxA5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF3mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDEtMjNUMDA6Mjk6MzRaIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wMS0yM1QwMDo0MjoxMFoiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMDEtMjNUMDA6NDI6MTBaIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExMTAxZTAzLTdkNTEtNDU3Ni05MDBhLTc4OWVi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"


// image colors
function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

function drawScene() {

  ctx.drawImage(png, 0, 0);
  var data = ctx.getImageData(0, 0, png.width, png.height);

  for (var y = 0, y2 = data.height; y < y2; y++) {
    for (var x = 0, x2 = data.width; x < x2; x++) {
      if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) { // check each pixel

        // point color
        var p = ctx.getImageData(x, y, 1, 1).data;
        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

        // main data
        function particle() {
          this.xf = (x+startingPoint) * pSize,
            this.yf = (y+startingPoint) * pSize,
            this.xs = (png.width * pSize) / 2,
            this.ys = (png.height * pSize) / 2,
            this.color = hex;
        }
        // each point animation
        particle.prototype.draw = function () {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.xs, this.ys, 2, 2);

          // X
          if (this.xs !== this.xf) {
            if (this.xs < this.xf) {// right
              this.xs += ( pointSpeed);
            } else {// left
              this.xs -= ( pointSpeed);
            }
          }

          // Y
          if (this.ys !== this.yf) {
            if (this.ys < this.yf) {// down
              this.ys += ( pointSpeed);
            } else {// up
              this.ys -= ( pointSpeed);
            }
          }

          // Mouse Radius animation
          if (
            mouse.x - this.xs < mouseMoveRadius &&
            mouse.x - this.xs > -mouseMoveRadius &&
            mouse.y - this.ys < mouseMoveRadius &&
            mouse.y - this.ys > -mouseMoveRadius
          ) {
            this.xs += (Math.random() * (pointSpeed*mouseSpeed));
            this.xs -= (Math.random() * (pointSpeed*mouseSpeed));
            this.ys += (Math.random() * (pointSpeed*mouseSpeed));
            this.ys -= (Math.random() * (pointSpeed*mouseSpeed));
          }
        }
        particles.push(new particle());
      }
    }
  }

  requestAnimationFrame(render);
}

// Mouse
addEventListener("mousemove", evt => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;

});
const mouse = {
  x: -1000,
  y: -1000
};

// Render
var render = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw();
  }
  requestAnimationFrame(render);
};
