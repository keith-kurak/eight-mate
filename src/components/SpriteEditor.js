import { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { observer } from "mobx-react-lite";
import Colors from "./Colors";
import SpriteCanvas from "./SpriteCanvas";
import Pixel from "./Pixel";
import { sizes } from "../config/styles";

const emptyFn = () => {};

const borderWidth = 4;
const pixelSize = 40 / 8;
const spriteSize = pixelSize * 8;

const PressableSpriteOverlay = observer(
  ({ x, y, onPressSprite, focusedSprite }) => {
    const onPress = useCallback(() => {
      onPressSprite({ x, y });
    }, [onPressSprite, x, y]);

    const isSelected = focusedSprite.x === x && focusedSprite.y === y;

    return (
      <Pressable onPress={onPress}>
        <View style={{ height: spriteSize, width: spriteSize }}>
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
);

const PixelLine = observer(({ pixels }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {pixels.map((pixel) => (
        <Pixel key={pixel.id} size={pixelSize} pixel={pixel} />
      ))}
    </View>
  );
});

const SpriteSheetLine = observer(({ yIndex, onPressSprite, focusedSprite }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(8).keys()].map((xIndex) => (
        <PressableSpriteOverlay
          key={`${xIndex},${yIndex}`}
          x={xIndex}
          y={yIndex}
          focusedSprite={focusedSprite}
          onPressSprite={onPressSprite}
        />
      ))}
    </View>
  );
});

const SpriteSheet = observer(
  ({ spriteSheetGrid, onPressSprite, focusedSprite }) => {
    return (
      <View
        style={{
          width: spriteSize * 8 + borderWidth * 2,
          flexDirection: "row",
          borderColor: "#000000",
          borderWidth,
          flexWrap: "wrap",
        }}
      >
        {spriteSheetGrid.lines.map((line, index) => (
          <PixelLine pixels={line} key={index.toString()} />
        ))}
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {[...Array(4).keys()].map((yIndex) => (
            <SpriteSheetLine
              yIndex={yIndex}
              focusedSprite={focusedSprite}
              onPressSprite={onPressSprite}
            />
          ))}
        </View>
      </View>
    );
  }
);

const SpriteEditor = observer(
  ({
    onPressColor = () => {},
    selectedColorIndex,
    focusedSpriteGrid,
    onPressFocusedSpritePixel,
    spriteSheetGrid,
    focusedSprite,
    onPressSprite,
  }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 4,
            }}
          >
            <SpriteCanvas
              spriteGrid={focusedSpriteGrid}
              onPressPixel={onPressFocusedSpritePixel}
            />
          </View>
        </View>
        <SpriteSheet
          spriteSheetGrid={spriteSheetGrid}
          focusedSprite={focusedSprite}
          onPressSprite={onPressSprite}
        />
      </View>
    );
  }
);

export default SpriteEditor;
