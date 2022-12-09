import { types } from "mobx-state-tree";

const Pixel = types.model("Pixel", {
  id: types.identifier,
  color: types.number,
})

const PixelGrid = types
  .model("SpriteMap", {
    lines: types.optional(types.array(types.array(Pixel)), []),
  })
  .views((self) =>({
    getPixel({ x, y }) {
      return self.lines[y][x];
    }
  }))
  .actions((self) => {
    function init({ width, height}) {
      for(let y = 0; y < height; y++) {
        self.lines.push([]);
        for(let x = 0; x < width; x++) {
          self.lines[y].push({ color: 0, id: `${x},${y}` });
        }
      }
    }

    function setPixel({ x, y, color }) {
      self.lines[y][x].color = color;
    }

    return {
      init,
      setPixel,
    };
  });

export default PixelGrid;