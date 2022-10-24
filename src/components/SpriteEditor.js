import { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { sizes } from "../config/styles";
import Colors from "./Colors";
import SpriteCanvas from "./SpriteCanvas";

const emptyFn = () => {};

function PressableMiniSprite({ sprite, index, onPressSprite, isSelected }) {
  const onPress = useCallback(() => {
    onPressSprite(index);
  }, [onPressSprite, index]);
  return (
    <Pressable index={index.toString()} onPress={onPress}>
      <View>
        <SpriteCanvas
          key={index.toString()}
          canvas={sprite}
          onPressPixel={emptyFn}
          isEditable={false}
          boxSize={5}
        />
        {isSelected && (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              borderColor: "#FFF1E8",
              borderWidth: sizes.border,
            }}
          />
        )}
      </View>
    </Pressable>
  );
}

function SpriteSheet({ sprites, onPressSprite, selectedSpriteIndex }) {
  return (
    <View
      style={{
        width: 40 * 8 + 8,
        flexDirection: "row",
        borderColor: "#000000",
        borderWidth: 4,
        flexWrap: "wrap",
      }}
    >
      {sprites.map((sprite, index) => (
        <PressableMiniSprite
          key={index.toString()}
          sprite={sprite}
          index={index}
          onPressSprite={onPressSprite}
          isSelected={selectedSpriteIndex === index}
        />
      ))}
    </View>
  );
}

export default function SpriteEditor({
  onPressColor = () => {},
  selectedColorIndex,
  canvas,
  onPressCanvasPixel,
  sprites,
  onPressSprite,
  selectedSpriteIndex,
}) {
  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      <View style={{ borderColor: "black", borderWidth: 4 }}>
        <Colors
          layout="2row"
          boxSize={40}
          fontSize={15}
          onPressColor={onPressColor}
          selectedColorIndex={selectedColorIndex}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            alignSelf: "center",
            borderColor: "black",
            borderWidth: 4,
          }}
        >
          <SpriteCanvas canvas={canvas} onPressPixel={onPressCanvasPixel} />
        </View>
      </View>
      <SpriteSheet
        sprites={sprites}
        selectedSpriteIndex={selectedSpriteIndex}
        onPressSprite={onPressSprite}
      />
    </View>
  );
}
