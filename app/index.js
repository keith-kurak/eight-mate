import { useState, useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SpriteEditor from "../src/components/SpriteEditor";
import DrawGrid from "../src/data/DrawGrid";

export default function Index() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [canvas, setCanvas] = useState(new DrawGrid(8, 8));
  const { top, bottom } = useSafeAreaInsets();

  const setCanvasPixel = useCallback((pixel) => {
    canvas.setPixel({x: pixel.x, y: pixel.y, colorIndex: selectedColorIndex});
    setCanvas(canvas.clone());
  }, [canvas, selectedColorIndex]);

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
      />
    </View>
  );
}
