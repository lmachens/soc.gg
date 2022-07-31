import { ActionIcon, Group, Stack, Text, TextInput } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { CopyIcon } from "@primer/octicons-react";
import { useCallback, useEffect, useState } from "react";
import { deserializeSavegame, SavegameDeserialized } from "../lib/savegames";
import { withStaticBase } from "../lib/staticProps";
import { useClipboard } from "@mantine/hooks";
import Savegame from "../components/Savegame/Savegame";

const Savegames = () => {
  const [file, setFile] = useState<File | null>(null);
  const [savegame, setSavegame] = useState<SavegameDeserialized | null>(null);
  const clipboard = useClipboard({ timeout: 500 });

  const loadSavegame = useCallback(() => {
    if (file) {
      file
        .text()
        .then((fileContent) => deserializeSavegame(fileContent))
        .then(setSavegame);
    }
  }, [file]);

  useEffect(() => {
    loadSavegame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      <Stack>
        <Text>
          This tool is in development and analyzes your Songs of Conquest
          savegames.
        </Text>
        <TextInput
          label="Windows savegames path (paste in your Windows Explorer)"
          value="%appdata%\..\LocalLow\Lavapotion\SongsOfConquest\Savegames"
          disabled
          styles={{
            input: {
              ":disabled": {
                cursor: "text",
              },
            },
          }}
          rightSection={
            <ActionIcon
              onClick={() =>
                clipboard.copy(
                  "%appdata%\\..\\LocalLow\\Lavapotion\\SongsOfConquest\\Savegames"
                )
              }
            >
              <CopyIcon />
            </ActionIcon>
          }
        />
        <Dropzone
          onDrop={(files) => setFile(files[0])}
          onReject={() => setFile(null)}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: "none" }}
          >
            <Text size="xl">Drag savegame here or click to select file</Text>
          </Group>
        </Dropzone>
        {savegame && <Savegame savegame={savegame} onReload={loadSavegame} />}
      </Stack>
    </>
  );
};

export default Savegames;

export const getStaticProps = withStaticBase(async () => {
  return {
    props: {
      terms: {},
    },
    revalidate: false,
  };
});
