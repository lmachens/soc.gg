import { SavegameDeserialized } from "../../lib/savegames";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ColorHash from "color-hash";
import { useState } from "react";
import { Select, Stack } from "@mantine/core";

const borderColorHash = new ColorHash();
const backgroundColorHash = new ColorHash({ lightness: 0.5 });

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

type Props = {
  savegame: SavegameDeserialized;
};
const SavegameProgress = ({ savegame }: Props) => {
  const [filter, setFilter] = useState("armyValue");

  const labels = Array(savegame.Metadata.Round)
    .fill(null)
    .map((_, index) => `Round ${index + 1}`);

  const data = {
    labels,
    datasets: savegame.File._teamsSerializable.map((team) => {
      let data: number[] = [];
      switch (filter) {
        case "armyValue":
          data = team._statistics._roundStatistics.map(
            (roundStatistic) => roundStatistic.ArmyValue
          );
          break;
        case "lostBattles":
          data = team._statistics._roundStatistics.map(
            (roundStatistic) => roundStatistic.LostBattles
          );
          break;
        case "wonBattles":
          data = team._statistics._roundStatistics.map(
            (roundStatistic) => roundStatistic.WonBattles
          );
          break;
        case "gold":
          data = team._statistics._roundStatistics.map(
            (roundStatistic) =>
              roundStatistic.Income.find((income) => income.Type === 0)
                ?._amount ?? 0
          );
          break;
        case "wood":
          data = team._statistics._roundStatistics.map(
            (roundStatistic) =>
              roundStatistic.Income.find((income) => income.Type === 1)
                ?._amount ?? 0
          );
          break;
        case "stone":
          data = team._statistics._roundStatistics.map(
            (roundStatistic) =>
              roundStatistic.Income.find((income) => income.Type === 2)
                ?._amount ?? 0
          );
          break;
        case "ancientAmber":
          data = team._statistics._roundStatistics.map(
            (roundStatistic) =>
              roundStatistic.Income.find((income) => income.Type === 3)
                ?._amount ?? 0
          );
          break;
        case "glimmerweave":
          data = team._statistics._roundStatistics.map(
            (roundStatistic) =>
              roundStatistic.Income.find((income) => income.Type === 4)
                ?._amount ?? 0
          );
          break;
        case "celestialOre":
          data = team._statistics._roundStatistics.map(
            (roundStatistic) =>
              roundStatistic.Income.find((income) => income.Type === 5)
                ?._amount ?? 0
          );
          break;
      }
      return {
        label: team._name,
        data: data,
        borderColor: borderColorHash.hex(team._name),
        backgroundColor: backgroundColorHash.hex(team._name),
      };
    }),
  };

  return (
    <Stack sx={{ maxWidth: 1200 }}>
      <Select
        value={filter}
        onChange={(filter) => setFilter(filter!)}
        data={[
          { value: "armyValue", label: "Army Value" },
          { value: "lostBattles", label: "Lost Battles" },
          { value: "wonBattles", label: "Won Battles" },
          { value: "gold", label: "Gold" },
          { value: "wood", label: "Wood" },
          { value: "stone", label: "Stone" },
          { value: "ancientAmber", label: "Ancient Amber" },
          { value: "celestialOre", label: "Celestial Ore" },
        ]}
      />
      <Line options={options} data={data} />
    </Stack>
  );
};

export default SavegameProgress;
