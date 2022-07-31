import { Button, Group, Stack, Tabs } from "@mantine/core";
import { SavegameDeserialized, serializeSavegame } from "../../lib/savegames";
import SavegameGraphs from "./SavegameGraphs";
import SavegameMeta from "./SavegameMeta";
import SavegameProgress from "./SavegameProgress";
import SavegameTeams from "./SavegameTeams";
import SavegameWielders from "./SavegameWielders";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { CheckIcon, SyncIcon } from "@primer/octicons-react";

type Props = {
  savegame: SavegameDeserialized;
  onReload: () => void;
  // eslint-disable-next-line no-unused-vars
  onSave: (fileContent: string) => void;
};
const Savegame = ({ savegame, onReload, onSave }: Props) => {
  const form = useForm<SavegameDeserialized>({
    initialValues: savegame,
  });

  useEffect(() => {
    form.setValues(savegame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savegame]);

  console.log(savegame);

  const handleSubmit = (values: SavegameDeserialized) => {
    const fileContent = JSON.stringify(serializeSavegame(values));
    onSave(fileContent);
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" align="start">
          <SavegameMeta savegame={savegame} />
          <Group>
            <Button
              leftIcon={<SyncIcon />}
              variant="outline"
              color="gray"
              onClick={onReload}
            >
              Reload
            </Button>
            <Button
              type="submit"
              leftIcon={<CheckIcon />}
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
            >
              Save
            </Button>
          </Group>
        </Group>
        <Tabs defaultValue="wielders">
          <Tabs.List grow>
            <Tabs.Tab value="wielders">Wielders</Tabs.Tab>
            <Tabs.Tab value="teams">Teams</Tabs.Tab>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="graphs">Graphs</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="wielders" pt="xs">
            <SavegameWielders savegame={savegame} form={form} />
          </Tabs.Panel>
          <Tabs.Panel value="teams" pt="xs">
            <SavegameTeams savegame={savegame} />
          </Tabs.Panel>
          <Tabs.Panel value="overview" pt="xs">
            <SavegameProgress savegame={savegame} />
          </Tabs.Panel>
          <Tabs.Panel value="graphs" pt="xs">
            <SavegameGraphs savegame={savegame} />
          </Tabs.Panel>
        </Tabs>
      </form>
    </Stack>
  );
};

export default Savegame;
