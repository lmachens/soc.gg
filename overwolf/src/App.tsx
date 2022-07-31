import { AppShell, LoadingOverlay, ScrollArea } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import Savegame from "../../components/Savegame/Savegame";
import { deserializeSavegame, SavegameDeserialized } from "../../lib/savegames";
import Mantine from "../../components/Mantine/Mantine";
import AppHeader from "./components/AppHeader/AppHeader";
import AppAside from "./components/AppAside/AppAside";
import AvailableSavegames from "./components/AvailableSavegames/AvailableSavegames";
import Ads from "./components/Ads/Ads";
import { File, readFile, writeFile } from "./utils/io";
import { showNotification } from "@mantine/notifications";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [savegame, setSavegame] = useState<SavegameDeserialized | null>(null);

  useEffect(() => {
    loadSavegame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const loadSavegame = useCallback(() => {
    if (file) {
      readFile(file.path)
        .then((fileContent) => deserializeSavegame(fileContent))
        .then(setSavegame);
    }
  }, [file]);

  const saveSavegame = useCallback(
    async (fileContent: string) => {
      if (file) {
        try {
          await writeFile(file.path, fileContent);
          showNotification({
            title: "Saved!",
            message: "Please reload in Songs of Conquest 🤘",
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Could not save file";
          showNotification({
            title: "Error!",
            message: message,
            color: "red",
          });
        }
      }
    },
    [file]
  );

  return (
    <Mantine>
      <AppShell
        header={<AppHeader />}
        fixed
        aside={
          <AppAside>
            <AvailableSavegames onFileClick={setFile} selectedFile={file} />
            <Ads />
          </AppAside>
        }
        styles={(theme) => ({
          root: {
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            userSelect: "none",
          },
          main: {
            backgroundColor: theme.colors.dark[8],
            display: "grid",
            overflow: "hidden",
            height:
              "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))",
          },
        })}
      >
        <ScrollArea
          styles={{
            viewport: {
              "> div": {
                // Override 'display: table' to fix resizing charts
                display: "block !important",
              },
            },
          }}
          offsetScrollbars
        >
          {savegame ? (
            <Savegame
              savegame={savegame}
              onReload={loadSavegame}
              onSave={saveSavegame}
            />
          ) : (
            <LoadingOverlay visible overlayOpacity={0} />
          )}
        </ScrollArea>
      </AppShell>
    </Mantine>
  );
}

export default App;
