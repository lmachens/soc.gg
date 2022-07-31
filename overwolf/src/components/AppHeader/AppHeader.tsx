import {
  ActionIcon,
  Anchor,
  Badge,
  Group,
  Header,
  Image,
  Text,
} from "@mantine/core";

import {
  closeMainWindow,
  dragMoveWindow,
  maximizeCurrentWindow,
  minimizeCurrentWindow,
  restoreCurrentWindow,
  togglePreferedWindow,
} from "../../utils/windows";
import LogoSmall from "../../../../public/logo_small.png";
import {
  DashIcon,
  ScreenFullIcon,
  ScreenNormalIcon,
  TabIcon,
  XIcon,
} from "@primer/octicons-react";
import useStyles from "./AppHeader.styles";
import useWindowInfo from "../../utils/useWindowInfo";
import useRunningGameInfo from "../../utils/useRunningGameInfo";
import { useHotkeyBinding } from "../../utils/hotkeys";
import { SONGS_OF_CONQUEST_CLASS_ID } from "../../utils/games";

function AppHeader() {
  const { classes } = useStyles();
  const windowInfo = useWindowInfo();
  const runningGameInfo = useRunningGameInfo();
  const showHideAppHotkeyBinding = useHotkeyBinding("show_hide_app");

  return (
    <Header
      height={28}
      className={classes.header}
      onMouseDown={dragMoveWindow}
      onDoubleClick={
        windowInfo?.stateEx === "maximized"
          ? restoreCurrentWindow
          : maximizeCurrentWindow
      }
    >
      <Group>
        <Image src={LogoSmall} alt="SOC.GG" height={16} width="auto" p="xs" />
        <Badge>
          <Anchor
            size="xs"
            href="https://www.soc.gg"
            title="Open https://www.soc.gg database"
            target="_blank"
            color="dimmed"
          >
            open database
          </Anchor>
        </Badge>
      </Group>
      <Group spacing="xs">
        <Text size="xs">Show/Hide</Text>
        <Badge>
          <Anchor
            size="xs"
            href={`overwolf://settings/games-overlay?hotkey=show_hide_app&gameId=${SONGS_OF_CONQUEST_CLASS_ID}`}
            title="Change hotkey"
          >
            {showHideAppHotkeyBinding.toUpperCase() || "Hotkey"}
          </Anchor>
        </Badge>
      </Group>
      <Group spacing={0}>
        <ActionIcon
          onClick={togglePreferedWindow}
          disabled={runningGameInfo?.classId !== SONGS_OF_CONQUEST_CLASS_ID}
          title="Switch between overlay and second screen mode"
        >
          <TabIcon />
        </ActionIcon>
        <ActionIcon onClick={minimizeCurrentWindow} title="Minimize window">
          <DashIcon />
        </ActionIcon>
        <ActionIcon
          onClick={
            windowInfo?.stateEx === "maximized"
              ? restoreCurrentWindow
              : maximizeCurrentWindow
          }
          title={
            windowInfo?.stateEx === "maximized"
              ? "Restore window"
              : "Maximize window"
          }
        >
          {windowInfo?.stateEx === "maximized" ? (
            <ScreenNormalIcon />
          ) : (
            <ScreenFullIcon />
          )}
        </ActionIcon>
        <ActionIcon onClick={closeMainWindow} title="Close app">
          <XIcon />
        </ActionIcon>
      </Group>
    </Header>
  );
}

export default AppHeader;
