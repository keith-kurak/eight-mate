import { View, Text } from "react-native";

const colorRows = [
  [
    { index: 0, color: "#000000" },
    { index: 1, color: "#1D2B53" },
    { index: 2, color: "#7E2553" },
    { index: 3, color: "#008751" },
  ],
  [
    { index: 4, color: "#AB5236" },
    { index: 5, color: "#5F574F" },
    { index: 6, color: "#C2C3C7" },
    { index: 7, color: "#FFF1E8" },
  ],
  [
    { index: 8, color: "#FF004D" },
    { index: 9, color: "#FFA300" },
    { index: 10, color: "#FFEC27" },
    { index: 11, color: "#00E436" },
  ],
  [
    { index: 12, color: "#29ADFF" },
    { index: 13, color: "#83769C" },
    { index: 14, color: "#FF77A8" },
    { index: 15, color: "#FFCCAA" },
  ],
];

function ColorBox({ color }) {
  return (
    <View
      style={{
        width: 70,
        height: 70,
        backgroundColor: color.color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: color.index === 7 ? "black" : "white", fontSize: 20 }}>{color.index}</Text>
    </View>
  );
}

export default function Colors() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {colorRows.map((colorRow, index) => (
        <View key={index.toString()} style={{ flexDirection: "row" }}>
          {colorRow.map((color) => (
            <View key={color.index.toString()}>
              <ColorBox color={color} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
