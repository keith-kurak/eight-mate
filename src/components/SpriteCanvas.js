import { useCallback } from 'react';
import { View, Pressable } from "react-native";
import { pico8PaletteColors } from "../config/constants";

function Pixel({ color, boxSize, onPressPixel, x, y }) {
  const onPress = useCallback(() => {
    onPressPixel({ x, y });
  }, [onPressPixel, x, y]);

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: boxSize,
          height: boxSize,
          backgroundColor: color,
        }}
      />
    </Pressable>
  );
}

export default function SpriteCanvas({
  canvas,
  onPressPixel
}) {
  return (
    <View>
      {canvas.grid.map((row, yIndex) => (
        <View key={yIndex.toString()} style={{ flexDirection: "row" }}>
          {row.map((colorIndex, xIndex) => (
            <View key={xIndex.toString()}>
              <Pixel
                boxSize={40}
                color={pico8PaletteColors.find(c => c.index === colorIndex).color}
                x={xIndex}
                y={yIndex}
                onPressPixel={onPressPixel}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
