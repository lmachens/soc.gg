import { BacteriaDTO, getLocaleBacteria } from "./bacterias";
import wieldersCollection from "./collections/wielders.json";
import { SpriteDTO } from "./sprites";
import { getTerm } from "./terms";
import unitsCollection from "./collections/units.json";
import { getSkills, SkillSimpleDTO } from "./skills";
import sheets from "./collections/sheets.json";

export const getWielders = (locale: string): WielderSimpleDTO[] => {
  const wielders = wieldersCollection.map((wielder) => ({
    type: wielder.type,
    stats: wielder.stats,
    portrait: wielder.portrait,
    factionName: getTerm(`Factions/${wielder.faction}/Name`, locale),
    name: getTerm(`${wielder.faction}/${wielder.type}/Name`, locale),
    description: getTerm(
      `${wielder.faction}/${wielder.type}/Description`,
      locale
    ),
  }));
  return wielders;
};

export const getWielder = (type: string, locale: string): WielderDTO | null => {
  const wielderSrc = wieldersCollection.find(
    (wielder) => wielder.type === type
  );
  if (!wielderSrc) {
    return null;
  }
  const skills = getSkills(locale);

  const wielder: WielderDTO = {
    type: wielderSrc.type,
    faction: wielderSrc.faction,
    factionName: getTerm(`Factions/${wielderSrc.faction}/Name`, locale),
    portrait: wielderSrc.portrait,
    stats: wielderSrc.stats,
    name: getTerm(`${wielderSrc.faction}/${wielderSrc.type}/Name`, locale),
    description: getTerm(
      `${wielderSrc.faction}/${wielderSrc.type}/Description`,
      locale
    ),
    units: wielderSrc.units.map((unit) => {
      const unitSrc = unitsCollection.find(
        (unitSrc) =>
          unitSrc.faction === wielderSrc.faction &&
          (unitSrc.vanilla.languageKey === unit.languageKey ||
            unitSrc.upgraded?.languageKey === unit.languageKey)
      );
      const sprite =
        unitSrc!.vanilla.languageKey === unit.languageKey
          ? unitSrc!.vanilla.sprite
          : unitSrc!.upgraded!.sprite;

      return {
        languageKey: unit.languageKey,
        name: getTerm(`${wielderSrc.faction}/${unit.languageKey}/Name`, locale),
        description: getTerm(
          `${wielderSrc.faction}/${unit.languageKey}/Description`,
          locale
        ),
        size: unit.size,
        sprite: sprite,
      };
    }),
    startingSkills: wielderSrc.startingSkills.map((skill) => ({
      ...skills.find((skillSrc) => skillSrc.type === skill.type)!,
      level: skill.level,
    })),
    skillPools: wielderSrc.skillPools.map((skillPool) => ({
      name: skillPool.name,
      evaluationType: skillPool.evaluationType,
      levelRange: skillPool.levelRange,
      levelIntervalStartLevel: skillPool.levelIntervalStartLevel,
      levelInterval: skillPool.levelInterval,
      skills: skillPool.skills.map((skill) => ({
        ...skills.find((skillSrc) => skillSrc.type === skill.type)!,
        requiresSkill: skill.requiresSkill || null,
        requirementType:
          (skill.requirementType as "RequireAny" | "RequireAll" | undefined) ||
          null,
        requiredSkills:
          skill.requiredSkills?.map((requiredSkill) => ({
            ...skills.find((skillSrc) => skillSrc.type === requiredSkill.type)!,
            level: requiredSkill.level,
          })) || null,
      })),
    })),
    specializations: wielderSrc.specializations.map((specialization) =>
      getLocaleBacteria(specialization, locale)
    ),
  };

  const sheet = sheets.find((sheet) => sheet.wielderType === wielderSrc.type);
  if (sheet) {
    wielder.sheetSrc = sheet.src;
  }
  return wielder;
};

export type WielderSimpleDTO = {
  type: string;
  factionName: string;
  portrait: SpriteDTO;
  name: string;
  description: string;
  stats: {
    defense: number;
    offense: number;
    movement: number;
    viewRadius: number;
    command: number;
  };
};

export type SkillPoolSkillDTO = SkillSimpleDTO & {
  requiresSkill: boolean | null;
  requirementType: "RequireAny" | "RequireAll" | null;
  requiredSkills: (SkillSimpleDTO & {
    level: number;
  })[];
};

export type SkillPoolDTO = {
  name: string;
  evaluationType: string;
  levelRange: {
    min: number;
    max: number;
  };
  levelIntervalStartLevel: number;
  levelInterval: number;
  skills: SkillPoolSkillDTO[];
};

export type WielderDTO = {
  type: string;
  faction: string;
  factionName: string;
  portrait: SpriteDTO;
  name: string;
  description: string;
  stats: {
    defense: number;
    offense: number;
    movement: number;
    viewRadius: number;
    command: number;
  };
  startingSkills: (SkillSimpleDTO & { level: number })[];
  skillPools: SkillPoolDTO[];
  units: {
    name: string;
    description: string;
    languageKey: string;
    size: number;
    sprite: SpriteDTO;
  }[];
  specializations: BacteriaDTO[];
  sheetSrc?: string;
};
