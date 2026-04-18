const sketch = (p) => {
  let points = [];
  const palette = {
    bg: '#F5F5F5',
    main: '#EF3B39',
    point: '#7ACDDE',
    sub: '#E8F0C3',
    text: '#2C2C2C'
  };

  p.setup = () => {
    const target = document.getElementById('p5-hero-canvas');
    const canvas = p.createCanvas(target.offsetWidth, target.offsetHeight);
    canvas.parent('p5-hero-canvas');
    p.pixelDensity(1);
    buildPoints();
  };

  function buildPoints() {
    points = [];
    const cols = 7;
    const rows = 5;
    const marginX = p.width * 0.11;
    const marginY = p.height * 0.16;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = p.map(x, 0, cols - 1, marginX, p.width - marginX);
        const py = p.map(y, 0, rows - 1, marginY, p.height - marginY);

        points.push({
          x: px,
          y: py,
          seed: p.random(1000),
          size: p.random(6, 14)
        });
      }
    }
  }

  function motion(node) {
    const t = p.frameCount * 0.012 + node.seed;
    return {
      x: node.x + p.sin(t) * 10,
      y: node.y + p.cos(t * 1.1) * 12
    };
  }

  p.draw = () => {
    p.background(palette.bg);

    p.strokeWeight(1);

    for (let i = 0; i < points.length; i++) {
      const a = motion(points[i]);

      for (let j = i + 1; j < points.length; j++) {
        const b = motion(points[j]);
        const d = p.dist(a.x, a.y, b.x, b.y);

        if (d < 135) {
          p.stroke(44, 44, 44, 32);
          p.line(a.x, a.y, b.x, b.y);
        }
      }
    }

    points.forEach((node, index) => {
      const n = motion(node);
      const color =
        index % 6 === 0 ? palette.main :
        index % 3 === 0 ? palette.point :
        palette.sub;

      p.noStroke();
      p.fill(color);
      p.rectMode(p.CENTER);
      p.rect(n.x, n.y, node.size, node.size);

      p.noFill();
      p.stroke(44, 44, 44, 45);
      p.rect(n.x, n.y, node.size + 18, node.size + 18);
    });

    p.stroke(palette.main);
    p.line(p.width * 0.1, p.height * 0.82, p.width * 0.9, p.height * 0.82);
  };

  p.windowResized = () => {
    const target = document.getElementById('p5-hero-canvas');
    p.resizeCanvas(target.offsetWidth, target.offsetHeight);
    buildPoints();
  };
};

new p5(sketch);