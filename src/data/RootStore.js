import { types } from "mobx-state-tree";
import React from "react";
import PixelGrid from './PixelGrid';

const FocusedArea = types.model("FocusedArea", {
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number,
})

// create a RootStore that keeps all the state for the app
const RootStore = types
  .model("RootStore", {
    pixelGrid: types.optional(PixelGrid,{}),
    focus: types.optional(FocusedArea, { x: 0, y: 0, width: 8, height: 8}),
    spriteSize: types.optional(types.number, 8),
  })
  .views(self => ({
    get focusedGrid() {
      const focusedArea = self.focus;
      const grid = { lines: [] };
      for(let y = focusedArea.y; y < focusedArea.y + focusedArea.height; y++) {
        grid.lines.push([]);
        for(let x = focusedArea.x; x < focusedArea.x + focusedArea.width; x++) {
          grid.lines[y - focusedArea.y].push(self.pixelGrid.lines[y][x]);
        }
      }
      return grid;
    },
    get focusedSprite() {
      return {x: self.focus.x / self.spriteSize, y: self.focus.y / self.spriteSize}
    }
  }))
  .actions((self) => {
    function setPixelRelativeToFocus({ x, y, color }) {
      //console.log(`${x},${y}`)
      if (x >= 0 && x < self.focus.width && y >= 0 && y < self.focus.height) {
        self.pixelGrid.setPixel({ x: x + self.focus.x, y: y + self.focus.y, color });
      }
    }
    function init({ width, height }) {
      self.pixelGrid.init({ width, height });
    }
    function setFocusedSprite({ x, y }) {
      self.focus.x = x * self.spriteSize;
      self.focus.y = y * self.spriteSize;
    }
    return {
      init,
      setPixelRelativeToFocus,
      setFocusedSprite,
    };
  });

// Create a Provider that creates a singleton for the RootStore, wrap it in a Provider component, and create a custom hook to make it easy to use

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const store = RootStore.create({});
  store.init({ width: 8 * 8, height: 8 * 4 });
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// We'll use this this to use the store in screen components
export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    // not likely, but sure
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
