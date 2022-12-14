import { useState, useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SpriteEditor from "../src/components/SpriteEditor";
import DrawGrid from "../src/data/DrawGrid";

const allSprites = [];
for (let i = 0; i < 24; i++) {
  allSprites.push(new DrawGrid(8, 8));
}

export default function Index() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [sprites, setSprites] = useState(allSprites);
  const [canvas, setCanvas] = useState(sprites[0]);
  const [selectedSpriteIndex, setSelectedSpriteIndex] = useState(0);
  const { top, bottom } = useSafeAreaInsets();

  const setCanvasPixel = useCallback(
    (pixel) => {
      //console.log(pixel);
      // avoid setting the pixel if it's already set to the same color
      // cause that will cause a re-render
      if (canvas.checkPixelColor(pixel) === selectedColorIndex) {
        return;
      }
      canvas.setPixel({
        x: pixel.x,
        y: pixel.y,
        colorIndex: selectedColorIndex,
      });
      // stupid hack to force a re-render
      setCanvas(canvas.clone());
    },
    [canvas, selectedColorIndex]
  );

  const setSprite = useCallback((index) => {
    setSelectedSpriteIndex(index);
    setCanvas(allSprites[index]);
  });

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
        paddingBottom: bottom,
        backgroundColor: "#5F574F",
      }}
    >
      <SpriteEditor
        onPressColor={setSelectedColorIndex}
        selectedColorIndex={selectedColorIndex}
        canvas={canvas}
        onPressCanvasPixel={setCanvasPixel}
        sprites={sprites}
        onPressSprite={setSprite}
        selectedSpriteIndex={selectedSpriteIndex}
      />
    </View>
  );
}
