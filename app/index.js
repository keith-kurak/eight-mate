import { StoreProvider } from "../src/data/RootStore";
import MainScreen from "../src/screens/MainScreen";

export default function Index() {
  return (
    <StoreProvider>
      <MainScreen />
    </StoreProvider>
  );
}
