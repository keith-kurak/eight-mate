import { View, Text, Pressable } from "react-native";
import Colors from "./Colors";
import SpriteCanvas from "./SpriteCanvas";

export default function SpriteEditor({
  onPressColor = () => {},
  selectedColorIndex,
  canvas,
  onPressCanvasPixel,
}) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ borderColor: "black", borderWidth: 4, alignSelf: "center" }}
      >
        <Colors
          layout="2row"
          boxSize={40}
          fontSize={15}
          onPressColor={onPressColor}
          selectedColorIndex={selectedColorIndex}
        />
      </View>
      <View style={{ marginTop: 20 }} />
        <View style={{ alignSelf: 'center', borderColor: "black", borderWidth: 4,}}>
          <SpriteCanvas canvas={canvas} onPressPixel={onPressCanvasPixel} />
        </View>
    </View>
  );
}
