import { useCallback } from "react";
import { Animated, View, Pressable } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { observer } from "mobx-react-lite";
import Pixel from './Pixel';

function positionToPixel({x, y}) {
  const maxIndex = 7;
  let xfin = Math.floor(x / pixelSize);
  let yfin = Math.floor(y / pixelSize);
  if (yfin > maxIndex) {
    yfin = maxIndex;
  }
  if (xfin > maxIndex) {
    xfin = maxIndex;
  }
  return {
    x: xfin,
    y: yfin,
  }
}

const pixelSize = 40;

const PixelLine = observer(({ pixels }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {pixels.map((pixel) => (
        <Pixel key={pixel.id} size={pixelSize} pixel={pixel} />
      ))}
    </View>
  );
});

const SpriteCanvas = observer(({ spriteGrid, onPressPixel, isEditable = true }) => {
  const dragGesture = Gesture.Pan().onUpdate((e) => {
    const x = e.x;
    const y = e.y;
    onPressPixel(positionToPixel({x, y}));
    //console.log(`dragGesture: ${e.x}, ${e.y}`);
  });

  const tapGesture = Gesture.Tap().onTouchesDown((e) => {
    const x = e.allTouches[0].x;
    const y = e.allTouches[0].y;
    onPressPixel(positionToPixel({x, y}));
    //console.log(`tapGesture: ${e.allTouches[0].x}, ${e.allTouches[0].y}`);
  });

  const composed = Gesture.Race(tapGesture, dragGesture);

  const MaybeGestureDetector = isEditable ? GestureDetector : View;

  return (
    <MaybeGestureDetector gesture={composed}>
      <View>
        {spriteGrid.lines.map((line, yIndex) => (
          <PixelLine key={yIndex.toString()} pixels={line} />
        ))}
      </View>
    </MaybeGestureDetector>
  );
});

export default SpriteCanvas;
