import { View, Text, Pressable } from "react-native";
import { colorRows, pico8PaletteColors } from "../config/constants";
import { take, takeRight } from "lodash";
import { sizes } from "../config/styles";

function ColorBox({ color, boxSize, fontSize, onPress, isSelected }) {
  const borderWidth = sizes.border;

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: boxSize,
          height: boxSize,
          backgroundColor: color.color,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 0,
        }}
      >
        <Text
          style={{
            color: color.isLight ? "black" : "white",
            fontSize: fontSize,
          }}
        >
          {color.index}
        </Text>
        <View
          style={[
            { position: "absolute", top: 0, right: 0, left: 0, bottom: 0 },
            isSelected && { borderColor: "#FFF1E8", borderWidth: borderWidth },
          ]}
        />
        <View
          style={[
            { position: "absolute", top: borderWidth, right: borderWidth, left: borderWidth, bottom: borderWidth },
            isSelected && { borderColor: "#000000", borderWidth: borderWidth },
          ]}
        />
      </View>
    </Pressable>
  );
}

export default function Colors({
  boxSize = 70,
  fontSize = 20,
  layout = "4row",
  onPressColor = () => {},
  selectedColorIndex,
}) {
  if (layout === "2row") {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          {take(pico8PaletteColors, 8).map((color) => (
            <View key={color.index.toString()}>
              <ColorBox
                boxSize={boxSize}
                fontSize={fontSize}
                color={color}
                onPress={() => onPressColor(color.index)}
                isSelected={color.index === selectedColorIndex}
              />
            </View>
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          {takeRight(pico8PaletteColors, 8).map((color) => (
            <View key={color.index.toString()}>
              <ColorBox
                boxSize={boxSize}
                fontSize={fontSize}
                color={color}
                onPress={() => onPressColor(color.index)}
                isSelected={color.index === selectedColorIndex}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View>
      {colorRows.map((colorRow, index) => (
        <View key={index.toString()} style={{ flexDirection: "row" }}>
          {colorRow.map((color) => (
            <View key={color.index.toString()}>
              <ColorBox
                boxSize={boxSize}
                fontSize={fontSize}
                color={color}
                onPress={() => onPressColor(color.index)}
                isSelected={color.index === selectedColorIndex}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
