import { useState, useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import SpriteEditor from "../components/SpriteEditor";
import { useStore } from '../data/RootStore';

const MainScreen = observer(() => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { top, bottom } = useSafeAreaInsets();

  const { pixelGrid, focusedGrid, setPixelRelativeToFocus, focusedSprite, setFocusedSprite } = useStore();

  const setPixel = useCallback(
    (pixel) => {
      setPixelRelativeToFocus({
        x: pixel.x,
        y: pixel.y,
        color: selectedColorIndex,
      });
    },
    [setPixelRelativeToFocus, selectedColorIndex]
  );

  const setSprite = useCallback(({ x, y }) => {
     setFocusedSprite({ x, y })
  });

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
        paddingBottom: bottom,
        backgroundColor: "#5F574F",
      }}
    >
      <SpriteEditor
        onPressColor={setSelectedColorIndex}
        selectedColorIndex={selectedColorIndex}
        focusedSpriteGrid={focusedGrid}
        focusedSprite={focusedSprite}
        onPressFocusedSpritePixel={setPixel}
        spriteSheetGrid={pixelGrid}
        onPressSprite={setSprite}
      />
    </View>
  );
});

export default MainScreen;
