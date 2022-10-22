export default class DrawGrid {
  grid = [ ];

  constructor(width, height) {
    for (let y = 0; y < height; y++) {
      this.grid.push([]);
      for (let x = 0; x < width; x++) {
        this.grid[y].push(0);
      }
    }
  }

  setPixel({ x, y, colorIndex }) {
    this.grid[y][x] = colorIndex;
  }

  clone() {
    const newGrid = new DrawGrid(0,0);
    newGrid.grid = this.grid;
    return newGrid;
  }
}