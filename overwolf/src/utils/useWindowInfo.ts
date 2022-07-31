import { useEffect, useState } from "react";
import { getCurrentWindow, WindowName } from "./windows";

interface WindowInfo extends overwolf.windows.WindowInfo {
  name: WindowName;
}

function useWindowInfo() {
  const [windowInfo, setWindowInfo] = useState<WindowInfo | null>(null);

  useEffect(() => {
    async function handleWindowStateChanged(
      state: overwolf.windows.WindowStateChangedEvent
    ) {
      const currentWindow = await getCurrentWindow();
      if (currentWindow.id !== state.window_id) {
        return;
      }
      if (state.window_previous_state_ex !== state.window_state_ex) {
        setWindowInfo(currentWindow as WindowInfo);
      }
    }

    overwolf.windows.onStateChanged.addListener(handleWindowStateChanged);

    getCurrentWindow().then((currentWindow) =>
      setWindowInfo(currentWindow as WindowInfo)
    );
    return () => {
      overwolf.windows.onStateChanged.removeListener(handleWindowStateChanged);
    };
  }, []);

  return windowInfo;
}

export default useWindowInfo;
