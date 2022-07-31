import { useState, useEffect } from "react";
import { SONGS_OF_CONQUEST_CLASS_ID } from "./games";

export function useHotkeyBinding(name: string): string {
  const [hotkeyBinding, setHotkeyBinding] = useState<string>("");

  useEffect(() => {
    overwolf.settings.hotkeys.get((result) => {
      if (result.games) {
        const hotkey = result.games[SONGS_OF_CONQUEST_CLASS_ID].find(
          (hotkey) => hotkey.name === name
        );
        if (hotkey) {
          setHotkeyBinding(hotkey.binding);
        }
      }
    });

    const handleChange = (event: overwolf.settings.hotkeys.OnChangedEvent) => {
      if (event.name === name) {
        setHotkeyBinding(event.binding);
      }
    };
    overwolf.settings.hotkeys.onChanged.addListener(handleChange);

    return () => {
      overwolf.settings.hotkeys.onChanged.removeListener(handleChange);
    };
  }, []);

  return hotkeyBinding;
}
