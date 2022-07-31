import { Group, NumberInput, Stack, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Fragment } from "react";
import { SavegameDeserialized } from "../../lib/savegames";
type Props = {
  savegame: SavegameDeserialized;
  form: UseFormReturnType<SavegameDeserialized>;
};
const SavegameWielders = ({ savegame, form }: Props) => {
  return (
    <Stack>
      {savegame.File._commandersSerializable.map((commander, index) => {
        if (commander._reference.Name === "Ghost") {
          return <Fragment key={commander._id} />;
        }
        return (
          <Stack key={commander._id}>
            <Title order={4}>
              {commander._reference.Name} (
              {
                savegame.File._teamsSerializable.find(
                  (team) => team._teamID === commander._teamId
                )?._name
              }
              )
            </Title>
            <Group>
              <NumberInput
                label="Offense"
                {...form.getInputProps(
                  `File._commandersSerializable.${index}._stats._offense`
                )}
              />
              <NumberInput
                label="Defense"
                {...form.getInputProps(
                  `File._commandersSerializable.${index}._stats._defense`
                )}
              />
              <NumberInput
                label="Movement"
                {...form.getInputProps(
                  `File._commandersSerializable.${index}._stats._movement`
                )}
              />
              <NumberInput
                label="View Radius"
                {...form.getInputProps(
                  `File._commandersSerializable.${index}._stats._viewRadius`
                )}
              />
            </Group>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default SavegameWielders;
