import { StatusBar } from "expo-status-bar";
import Route from "./screens";
import useCachedResources from "./hooks/useCachedResources";
import ContextWrapper from "./context/ContextWrapper";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { store } from "./app/store";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <ContextWrapper>
        <Route />
        <FlashMessage
          titleStyle={{ fontFamily: "Bold" }}
          hideStatusBar={true}
          textStyle={{ fontFamily: "Medium" }}
          duration={2000}
          position="top"
        />
      </ContextWrapper>
    </Provider>
  );
}
