import { useCallback } from "react";
import { Animated, View, Pressable } from "react-native";
import { pico8PaletteColors } from "../config/constants";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

function Pixel({ color, boxSize, x, y }) {
  return (
    <View
      style={{
        width: boxSize,
        height: boxSize,
        backgroundColor: color,
      }}
    />
  );
}

export default function SpriteCanvas({ canvas, onPressPixel, isEditable = true, boxSize = 40 }) {
  const dragGesture = Gesture.Pan().onUpdate((e) => {
    const x = e.x;
    const y = e.y;
    onPressPixel({ x: Math.floor(x/40), y: Math.floor(y/40) });
    //console.log(`dragGesture: ${e.x}, ${e.y}`);
  });

  const tapGesture = Gesture.Tap().onTouchesDown((e) => {
    const x = e.allTouches[0].x;
    const y = e.allTouches[0].y;
    onPressPixel({ x: Math.floor(x/40), y: Math.floor(y/40) });
    //console.log(`tapGesture: ${e.allTouches[0].x}, ${e.allTouches[0].y}`);
  });

  const composed = Gesture.Race(tapGesture, dragGesture);

  return (
    <GestureDetector gesture={isEditable ? composed : null}>
      <View>
        {canvas.grid.map((row, yIndex) => (
          <View key={yIndex.toString()} style={{ flexDirection: "row" }}>
            {row.map((colorIndex, xIndex) => (
              <View key={xIndex.toString()}>
                <Pixel
                  boxSize={boxSize}
                  color={
                    pico8PaletteColors.find((c) => c.index === colorIndex).color
                  }
                  x={xIndex}
                  y={yIndex}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
    </GestureDetector>
  );
}
