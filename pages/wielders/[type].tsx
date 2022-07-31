import { GetStaticPaths, NextPage } from "next";
import { withStaticBase } from "../../lib/staticProps";

import { Box, Group, Stack, Text, Title } from "@mantine/core";
import SpriteSheet from "../../components/SpriteSheet/SpriteSheet";
import { getWielder, getWielders, WielderDTO } from "../../lib/wielders";
import { getSiteTerm, getTerm, TermsDTO } from "../../lib/terms";
import PopoverLink from "../../components/PopoverLink/PopoverLink";
import { useTerms } from "../../components/Terms/Terms";
import Lore from "../../components/Lore/Lore";
import WielderStats from "../../components/WielderStats/WielderStats";
import { Fragment } from "react";
import { getWielderStatsIcons, IconsDTO } from "../../lib/icons";
import PageHead from "../../components/PageHead/PageHead";
import SkillPopover from "../../components/Skills/SkillPopover";
import SkillPoolsTable from "../../components/Skills/SkillPoolsTable";
import Image from "next/image";

const Wielder: NextPage<{ wielder: WielderDTO; icons: IconsDTO }> = ({
  wielder,
  icons,
}) => {
  const terms = useTerms();

  return (
    <>
      <PageHead
        title={`${wielder.name} - SoC.gg`}
        description={`${wielder.description} - ${wielder.name} (Songs of Conquest)`}
      />
      <Stack align="flex-start">
        <Group>
          <SpriteSheet spriteSheet={wielder.portrait} folder="wielders" />
          <Stack spacing="xs">
            <Title order={2}>{wielder.name}</Title>
            <Text>{wielder.faction}</Text>
            <Lore text={wielder.description} />
          </Stack>
        </Group>
        <WielderStats wielder={wielder} icons={icons} />
        <Title order={3}>{terms.startingTroops}</Title>
        <Group>
          {wielder.units.map((unit, index) => (
            <PopoverLink
              key={`${wielder.name}-${unit.name}-${index}`}
              href={`/units/${wielder.faction}/${unit.languageKey}`}
              popover={
                <Stack>
                  <Title order={4}>{unit.name}</Title>
                  <Lore text={unit.description} />
                </Stack>
              }
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateRows: "110px 1fr",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <SpriteSheet spriteSheet={unit.sprite} />
                <Text>
                  <Text
                    sx={(theme) => ({
                      color: theme.colors[theme.primaryColor][5],
                    })}
                    component="span"
                  >
                    {unit.size}
                  </Text>{" "}
                  {unit.name}
                </Text>
              </Box>
            </PopoverLink>
          ))}
        </Group>
        <Title order={3}>{terms.specializations}</Title>
        {wielder.specializations.map((specialization) => (
          <Fragment key={`${wielder.name}-${specialization.bacteriaType}`}>
            {specialization.modifierData.map((modifier) => (
              <Text
                key={modifier.type}
                dangerouslySetInnerHTML={{ __html: modifier.description }}
              />
            ))}
            {specialization.resourcesIncome.map((resourceIncome) => (
              <Text key={resourceIncome.type}>
                {`${terms.production} +${resourceIncome.amount} ${resourceIncome.name}`}
              </Text>
            ))}
          </Fragment>
        ))}

        {wielder.sheetSrc && (
          <>
            <Title order={3}>{terms.visualGuide}</Title>
            <Image
              src={wielder.sheetSrc}
              width={640}
              height={960}
              alt="Wielder sheet by MindGames"
              title="Wielder sheet by MindGames"
            />
          </>
        )}

        <Title order={3}>{terms.startingSkills}</Title>
        <Group spacing="lg">
          {wielder.startingSkills.map((skill) => (
            <SkillPopover key={`${wielder.name}-${skill.type}`} skill={skill}>
              <Group>
                <SpriteSheet folder="skills" spriteSheet={skill.icon} />
                <div>
                  <Text>{skill.name}</Text>
                  <Text>
                    {terms.level} {skill.level}
                  </Text>
                </div>
              </Group>
            </SkillPopover>
          ))}
        </Group>
        <Title order={3}>Skill pool</Title>

        <Text size="sm" sx={{ fontStyle: "italic" }}>
          The requirements are based on the wielder level. Some skills have
          requirements on first levels, but not on higher levels.
        </Text>
        <SkillPoolsTable skillPools={wielder.skillPools} />
      </Stack>
    </>
  );
};

export default Wielder;

export const getStaticProps = withStaticBase(async (context) => {
  const type = context.params!.type as string;
  const locale = context.locale!;

  const wielder = getWielder(type, context.locale!);
  if (!wielder) {
    return {
      notFound: true,
    };
  }

  const terms: TermsDTO = {
    offense: getTerm("Commanders/Details/CommanderStat/Offense", locale),
    defense: getTerm("Commanders/Details/CommanderStat/Defense", locale),
    movement: getTerm("Commanders/Details/CommanderStat/Movement", locale),
    viewRadius: getTerm("Commanders/Details/CommanderStat/View", locale),
    startingTroops: getTerm(
      "Adventure/PurchaseWielderMenu/TroopsAtStartHeader",
      locale
    ),
    specializations: getTerm("Commanders/Tooltip/Specializations", locale),
    production: getTerm("Common/Details/GeneratesResources", locale),
    level: getTerm("Common/Stats/Level/Header", locale),
    defenseDescription: getTerm(
      "Commanders/Details/CommanderStat/Description/Defense",
      locale
    ),
    movementDescription: getTerm(
      "Commanders/Details/CommanderStat/Description/Movement",
      locale
    ),
    offenseDescription: getTerm(
      "Commanders/Details/CommanderStat/Description/Offense",
      locale
    ),
    viewDescription: getTerm(
      "Commanders/Details/CommanderStat/Description/View",
      locale
    ),
    commandDescription: getTerm("Skills/Command/Level3/Description", locale),
    and: getSiteTerm("And", locale),
    or: getSiteTerm("Or", locale),
    startingSkills: getSiteTerm("StartingSkills", locale),
    requiredSkills: getTerm(
      "Tutorial/Codex/Spells/RequiredSkillMultiple",
      locale
    ),
    visualGuide: getSiteTerm("VisualGuide", locale),
  };

  const icons = getWielderStatsIcons();
  return {
    props: {
      wielder,
      terms,
      icons,
    },
    revalidate: false,
  };
});

export const getStaticPaths: GetStaticPaths = async () => {
  const wielders = getWielders("en").map((wielder) => ({
    params: {
      type: wielder.type,
    },
  }));

  return {
    paths: wielders,
    fallback: "blocking",
  };
};
