import { GetStaticPaths, NextPage } from "next";
import { withStaticBase } from "../../../lib/staticProps";

import { Group, Stack, Table, Text, Title } from "@mantine/core";
import SpriteSheet from "../../../components/SpriteSheet/SpriteSheet";
import Head from "next/head";
import { getTerm, TermsDTO } from "../../../lib/terms";
import { BuildingDTO, getBuilding, getBuildings } from "../../../lib/buildings";
import Lore from "../../../components/Lore/Lore";
import { useTerms } from "../../../components/Terms/Terms";
import AppLink from "../../../components/AppLink/AppLink";

const Building: NextPage<{ building: BuildingDTO }> = ({ building }) => {
  const terms = useTerms();

  return (
    <>
      <Head>
        <title>{building.name} - SoC.gg</title>
        <meta
          name="description"
          content={`${building.description} - ${building.name} (Songs of Conquest)`}
        />
      </Head>
      <Stack align="flex-start">
        <Group>
          <SpriteSheet spriteSheet={building.portraits[0]} folder="buildings" />
          <Stack spacing="xs">
            <Title order={2}>{building.name}</Title>
            <Lore text={building.description} />
          </Stack>
        </Group>
        <Title order={2}>{terms.requirements}</Title>
        <Table>
          <tbody>
            <tr>
              <td>{terms.cost}</td>
              <td>
                {building.requirements.costEntries
                  .map((value) => `${value.amount} ${value.type}`)
                  .join(", ")}
                {building.levelUpgrades
                  ?.filter((levelUpgrade) => levelUpgrade.costEntries.length)
                  .map((levelUpgrade, index) => (
                    <div key={index + 2}>
                      <span>
                        {terms.level} {index + 2}:{" "}
                      </span>
                      {levelUpgrade.costEntries
                        .map((value) => `${value.amount} ${value.type}`)
                        .join(", ")}
                    </div>
                  ))}
              </td>
            </tr>
            <tr>
              <td>{terms.requiredBuildings}</td>
              <td>
                {building.requirements.requiredBuildings.length === 0 && "-"}
                {building.requirements.requiredBuildings.join(", ")}
                {building.levelUpgrades
                  ?.filter(
                    (levelUpgrade) => levelUpgrade.requiredBuildings.length
                  )
                  .map((levelUpgrade, index) => (
                    <div key={index + 2}>
                      <span>
                        {terms.level} {index + 2}:{" "}
                      </span>
                      {levelUpgrade.requiredBuildings.join(", ")}
                    </div>
                  ))}
              </td>
            </tr>
            <tr>
              <td>{terms.viewRadius}</td>
              <td>{building.baseViewRadius}</td>
            </tr>
            {building.incomePerLevel && (
              <tr>
                <td colSpan={2}>
                  <Text
                    sx={(theme) => ({
                      color: theme.colors[theme.primaryColor][5],
                    })}
                  >
                    {terms.income} / {terms.troopIncome}
                  </Text>
                </td>
              </tr>
            )}
            {building.incomePerLevel?.map((incomePerLevel) => (
              <tr key={incomePerLevel.level}>
                <td>
                  {terms.level} {incomePerLevel.level}
                </td>
                <td>
                  {incomePerLevel.resources.map((resource, index) => (
                    <Text key={resource.type} size="sm">
                      {resource.amount} {resource.type} {incomePerLevel.resources.length>index+1? ", " : ""}
                    </Text>
                  ))}
                  {incomePerLevel.troopIncomes.map((troopIncome, index ) => (
                    <AppLink
                      key={troopIncome.name}
                      href={`/units/${troopIncome.factionKey}/${troopIncome.unitKey}`}
                    >
                      {troopIncome.size} {troopIncome.name} {incomePerLevel.troopIncomes.length>index+1? ", " : ""}
                    </AppLink>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </>
  );
};

export default Building;

export const getStaticProps = withStaticBase(async (context) => {
  const locale = context.locale!;
  const faction = context.params!.faction as string;
  const name = context.params!.name as string;
  const building = getBuilding(`${faction}/${name}`, locale);
  if (!building) {
    return {
      notFound: true,
    };
  }

  const terms: TermsDTO = {
    requirements: getTerm("Adventure/BuildMenu/Requirements", locale),
    requiredBuildings: getTerm("Units/Tooltip/BuildingsThatProduce", locale),
    cost: getTerm("Common/Resource/Cost", locale),
    income: getTerm("Adventure/BuildMenu/Income", locale),
    troopIncome: getTerm("Adventure/MapEntityHUD/TroopIncome/Header", locale),
    level: getTerm("Common/Stats/Level/Header", locale),
    viewRadius: getTerm("Commanders/Details/CommanderStat/View", locale),
  };

  return {
    props: {
      building,
      terms,
    },
    revalidate: false,
  };
});

export const getStaticPaths: GetStaticPaths = async () => {
  const buildings = getBuildings("en").map((building) => {
    const [faction, name] = building.type.split("/");
    return {
      params: {
        faction,
        name,
      },
    };
  });

  return {
    paths: buildings,
    fallback: "blocking",
  };
};
