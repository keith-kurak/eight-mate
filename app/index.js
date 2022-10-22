import { useState, useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SpriteEditor from "../src/components/SpriteEditor";
import DrawGrid from "../src/data/DrawGrid";

export default function Index() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [canvas, setCanvas] = useState(new DrawGrid(8, 8));
  const [sprites, setSprites] = useState([canvas]);
  const { top, bottom } = useSafeAreaInsets();

  const setCanvasPixel = useCallback(
    (pixel) => {
      console.log(pixel);
      canvas.setPixel({
        x: pixel.x,
        y: pixel.y,
        colorIndex: selectedColorIndex,
      });
      setCanvas(canvas.clone());
    },
    [canvas, selectedColorIndex]
  );

  const addSprite = useCallback(() => {
    const newSprite = new DrawGrid(8, 8);
    setSprites([...sprites, newSprite]);
    setCanvas(newSprite);
  })

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
        addSprite={addSprite}
      />
    </View>
  );
}
