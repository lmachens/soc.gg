import { Stack, Table } from "@mantine/core";
import { AI_MODES, FACTIONS, SavegameDeserialized } from "../../lib/savegames";

type Props = {
  savegame: SavegameDeserialized;
};
const SavegameTeams = ({ savegame }: Props) => {
  const rows = savegame.File._teamsSerializable.map((team) => {
    const exploration = savegame.File._level._exploration.find(
      (exploration) => exploration._teamId === team._teamID
    );

    return (
      <tr key={team._teamID}>
        <td>{team._name}</td>
        <td>{FACTIONS[team._factionIndex]}</td>
        <td>{AI_MODES[team._aiMode]}</td>
        <td>{team._isAlive ? "True" : "False"}</td>
        <td>
          {exploration?._exploredTiles.filter((tile) => tile).length ?? 0} /{" "}
          {exploration?._exploredTiles.length ?? 0}
        </td>
      </tr>
    );
  });

  return (
    <Stack spacing="xs">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Faction</th>
            <th>AI Mode</th>
            <th>Is Alive</th>
            <th>Tiles explored</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  );
};

export default SavegameTeams;
