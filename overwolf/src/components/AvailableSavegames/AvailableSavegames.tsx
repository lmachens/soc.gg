import { ActionIcon, Group, List, ScrollArea, Text } from "@mantine/core";
import { HubotIcon, SyncIcon } from "@primer/octicons-react";
import { useEffect } from "react";
import { File } from "../../utils/io";
import useListFolder from "../../utils/useListFolder";
import useStyles from "./AvailableSavegames.styles";

const SAVEGAMES_FOLDER_PATH = `${overwolf.io.paths.localAppData}\\..\\LocalLow\\Lavapotion\\SongsOfConquest\\Savegames`;

type Props = {
  selectedFile: File | null;
  // eslint-disable-next-line no-unused-vars
  onFileClick: (file: File) => void;
};
const AvailableSavegames = ({ selectedFile, onFileClick }: Props) => {
  const { classes, cx } = useStyles();
  const [files, refresh] = useListFolder(SAVEGAMES_FOLDER_PATH);

  useEffect(() => {
    if (files) {
      onFileClick(files[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <>
      <Group position="apart">
        <Text size="lg" transform="uppercase">
          Savegames
        </Text>
        <ActionIcon onClick={refresh}>
          <SyncIcon />
        </ActionIcon>
      </Group>
      <ScrollArea offsetScrollbars>
        <List spacing="xs" listStyleType="none">
          {files?.map((file) => (
            <List.Item
              key={file.path}
              className={cx(
                classes.listItem,
                selectedFile?.path === file.path && classes.selected
              )}
              p="xs"
              onClick={() => onFileClick(file)}
            >
              {file.name}
            </List.Item>
          ))}
          {files?.length === 0 && (
            <Text color="dimmed" align="center">
              No files found <HubotIcon />
            </Text>
          )}
        </List>
      </ScrollArea>
    </>
  );
};

export default AvailableSavegames;
