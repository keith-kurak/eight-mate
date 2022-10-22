import { View, Text, Pressable } from "react-native";
import Colors from "./Colors";
import SpriteCanvas from "./SpriteCanvas";

const emptyFn = () => {};

export default function SpriteEditor({
  onPressColor = () => {},
  selectedColorIndex,
  canvas,
  onPressCanvasPixel,
  sprites,
  addSprite,
}) {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
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
        <View
          style={{ alignSelf: "center", borderColor: "black", borderWidth: 4 }}
        >
          <SpriteCanvas canvas={canvas} onPressPixel={onPressCanvasPixel} />
        </View>
      </View>
      <View style={{ margin: 10, minHeight: 96, flexDirection: 'row' }}>
        {sprites.map((sprite, index) => (
          <SpriteCanvas
            key={index.toString()}
            canvas={sprite}
            onPressPixel={emptyFn}
            isEditable={false}
            boxSize={6}
          />
        ))}
        <Pressable style={{ margin: 10 }} onPress={addSprite}>
          <Text style={{ color: 'white'}}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}
