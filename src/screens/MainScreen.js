import { useState, useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import SpriteEditor from "../components/SpriteEditor";
import { useStore } from '../data/RootStore';

const MainScreen = observer(() => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSpriteIndex, setSelectedSpriteIndex] = useState(0);
  const { top, bottom } = useSafeAreaInsets();

  const { pixelGrid, focusedGrid, setPixelRelativeToFocus } = useStore();

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

  const setSprite = useCallback((index) => {
    setSelectedSpriteIndex(index);
    // TODO: fix
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
        onPressFocusedSpritePixel={setPixel}
        spriteSheetGrid={pixelGrid}
        onPressSprite={() => {}}
        selectedSpriteIndex={selectedSpriteIndex}
      />
    </View>
  );
});

export default MainScreen;
