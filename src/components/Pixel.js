import { View } from "react-native";
import { observer } from "mobx-react-lite";
import { colorMap } from "../config/constants";

const Pixel = observer(({ pixel, size }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: colorMap[pixel.color],
      }}
    />
  );
});

export default Pixel;
