import { View } from "react-native";
import { Link, Stack } from "expo-router";
import Colors from '../../../src/components/Colors';

export default function TutorialScreen({ route }) {
  let tutorial;

  if (route.params.id === 'colors') {
    tutorial = <Colors />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Colors" }} />
      {tutorial}
    </View>
  );
}