import { View, Text } from "react-native";

const colorRows = [
  [
    { index: 0, color: "red" },
    { index: 1, color: "orange" },
    { index: 2, color: "yellow" },
    { index: 3, color: "green" },
  ],
  [
    { index: 4, color: "red" },
    { index: 5, color: "orange" },
    { index: 6, color: "yellow" },
    { index: 7, color: "green" },
  ],
  [
    { index: 8, color: "red" },
    { index: 9, color: "orange" },
    { index: 10, color: "yellow" },
    { index: 11, color: "green" },
  ],
  [
    { index: 12, color: "red" },
    { index: 13, color: "orange" },
    { index: 14, color: "yellow" },
    { index: 15, color: "green" },
  ],
];

function ColorBox({ color }) {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: color.color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>{color.index}</Text>
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
