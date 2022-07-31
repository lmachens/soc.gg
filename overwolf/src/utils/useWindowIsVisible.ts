import { useEffect, useState } from "react";
import { SONGS_OF_CONQUEST_CLASS_ID } from "./games";
import { getCurrentWindow } from "./windows";

function useWindowIsVisible() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function handleWindowStateChanged(
      state: overwolf.windows.WindowStateChangedEvent
    ) {
      const currentWindow = await getCurrentWindow();
      if (currentWindow.id !== state.window_id) {
        return;
      }
      if (
        state.window_state_ex === "minimized" ||
        state.window_state_ex === "hidden"
      ) {
        setIsVisible(false);
      } else if (
        (state.window_previous_state_ex === "minimized" ||
          state.window_previous_state_ex === "hidden") &&
        (state.window_state_ex === "normal" ||
          state.window_state_ex === "maximized")
      ) {
        setIsVisible(true);
      }
    }

    async function handleGameInfoUpdated(
      res: overwolf.games.GameInfoUpdatedEvent
    ) {
      const currentWindow = await getCurrentWindow();
      if (currentWindow.name !== "overlay") {
        return;
      }
      const { gameInfo, focusChanged } = res;
      if (
        gameInfo &&
        gameInfo.classId === SONGS_OF_CONQUEST_CLASS_ID &&
        focusChanged
      ) {
        if (
          gameInfo.isInFocus &&
          (currentWindow.stateEx === "normal" ||
            currentWindow.stateEx === "maximized")
        ) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    }

    overwolf.windows.onStateChanged.addListener(handleWindowStateChanged);
    overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);

    return () => {
      overwolf.windows.onStateChanged.removeListener(handleWindowStateChanged);
      overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
    };
  }, []);

  return isVisible;
}

export default useWindowIsVisible;
