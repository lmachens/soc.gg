import siteTermMap from "./collections/siteTermMap.json";
import termMap from "./collections/termMap.json";

export type TermsDTO = {
  [key: string]: string;
};

const siteTerms = siteTermMap as unknown as {
  [term: string]: {
    [locale: string]: string;
  };
};

const terms = termMap as unknown as {
  [term: string]: {
    [locale: string]: string;
  };
};

export const PERCENTAGE_BASED_MODIFIERS = [
  "TroopMeleeAttackResistance",
  "TroopRangedAttackResistance",
  "TroopSpellDamageResistance",
  "CommanderSpellDamagePower",
  "CommanderPillageBonus",
  "CommanderXPMultiplier",
  "CommanderDiplomacyBonus",
  "CommanderTutorPercent",
  "TroopDamageMultiplier",
];

export const getSiteTerm = (term: string, locale: string) => {
  let value = siteTerms[term]?.[locale] || siteTerms[term]?.en;
  if (!value) {
    console.warn(`Can not find ${term} - ${locale}`);
    value = "";
  }
  return value;
};

export const getTerm = (
  term: string,
  locale: string,
  placeholder?: number | string | string[] | { [key: string]: any },
  showPercentage?: boolean
) => {
  let result: string | undefined;
  if (placeholder && typeof placeholder === "number") {
    const pluralForm = getPluralForm(locale, placeholder);
    result = (terms[`${term}_${pluralForm}`] || terms[term])?.[locale];
  } else {
    result = terms[term]?.[locale];
  }

  if (!result) {
    console.warn(`Can not find ${term} - ${locale}`);
    result = "";
  }

  if (placeholder) {
    if (typeof placeholder === "number") {
      result = result.replace(
        "{0}",
        `<span class="${placeholder > 0 ? "positive" : "negative"}">${
          placeholder > 0 ? "+" : "-"
        }${placeholder}${showPercentage ? "%" : ""}</span>`
      );
    } else if (typeof placeholder === "string") {
      result = result.replace("{0}", placeholder.toString());
    } else if (Array.isArray(placeholder)) {
      for (let i = 0; i < placeholder.length; i++) {
        result = result.replaceAll(`{${i.toString()}}`, placeholder[i]);
      }
    } else {
      Object.entries(placeholder).forEach(([key, value]) => {
        result = result!
          .replaceAll(`{${key}}`, value)
          .replaceAll(new RegExp(`{${key}:plural[^}]*{}[^}]*}`, "g"), value);
      });
    }
  }
  result = result
    .replaceAll("<negative>", '<span class="negative">')
    .replaceAll("</negative>", "</span>")
    .replaceAll("<positive>", '<span class="positive">')
    .replaceAll("</positive>", "</span>");
  return result;
};

export const getPluralForm = (locale: string, count: number) => {
  switch (locale) {
    case "ar":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }
    case "bg":
      return count != 1 ? 1 : 0;

    case "ca":
      return count != 1 ? 1 : 0;
    case "zh-CHS":
      return 0;
    case "cs":
      switch (count) {
        default:
          return 2;
        case 2:
        case 3:
        case 4:
          return 1;
        case 1:
          return 0;
      }
    case "da":
      return count != 1 ? 1 : 0;
    case "de":
      return count != 1 ? 1 : 0;
    case "el":
      return count != 1 ? 1 : 0;
    case "en":
      return count != 1 ? 1 : 0;
    case "es":
      return count != 1 ? 1 : 0;
    case "fi":
      return count != 1 ? 1 : 0;
    case "fr":
      return count > 1 ? 1 : 0;
    case "he":
      return count != 1 ? 1 : 0;
    case "hu":
      return count != 1 ? 1 : 0;
    case "is":
      return count % 10 != 1 || count % 100 == 11 ? 1 : 0;
    case "it":
      return count != 1 ? 1 : 0;
    case "ja":
      return 0;
    case "ko":
      return 0;
    case "nl":
      return count != 1 ? 1 : 0;
    case "no":
      return count != 1 ? 1 : 0;
    case "pl":
      return count != 1
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;
    case "pt":
      return count != 1 ? 1 : 0;
    case "ro":
      return count != 1
        ? count == 0 || (count % 100 > 0 && count % 100 < 20)
          ? 1
          : 2
        : 0;
    case "ru":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "hr":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "sk":
      switch (count) {
        default:
          return 2;
        case 2:
        case 3:
        case 4:
          return 1;
        case 1:
          return 0;
      }
    case "sq":
      return count != 1 ? 1 : 0;
    case "sv":
      return count != 1 ? 1 : 0;

    case "th":
      return 0;

    case "tr":
      return count > 1 ? 1 : 0;

    case "id":
      return 0;

    case "uk":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "be":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "sl":
      return count % 100 == 1
        ? 1
        : count % 100 != 2
        ? count % 100 == 3 || count % 100 == 4
          ? 3
          : 0
        : 2;

    case "et":
      return count != 1 ? 1 : 0;

    case "lv":
      return count % 10 != 1 || count % 100 == 11 ? (count != 0 ? 1 : 2) : 0;

    case "lt":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 && (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "fa":
      return 0;

    case "vi":
      return 0;

    case "hy":
      return count != 1 ? 1 : 0;

    case "eu":
      return count != 1 ? 1 : 0;

    case "mk":
      return count == 1 || count % 10 == 1
        ? 1
        : count == 2 || count % 10 == 2
        ? 2
        : 0;

    case "af":
      return count != 1 ? 1 : 0;

    case "ka":
      return 0;

    case "fo":
      return count != 1 ? 1 : 0;

    case "hi":
      return count != 1 ? 1 : 0;

    case "sw":
      return count != 1 ? 1 : 0;

    case "gu":
      return count != 1 ? 1 : 0;

    case "ta":
      return count != 1 ? 1 : 0;

    case "te":
      return count != 1 ? 1 : 0;

    case "kn":
      return count != 1 ? 1 : 0;

    case "mr":
      return count != 1 ? 1 : 0;

    case "gl":
      return count != 1 ? 1 : 0;

    case "kok":
      return count != 1 ? 1 : 0;

    case "ar-SA":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }
    case "bg-BG":
      return count != 1 ? 1 : 0;

    case "ca-ES":
      return count != 1 ? 1 : 0;

    case "zh-TW":
      return 0;

    case "cs-CZ":
      switch (count) {
        default:
          return 2;
        case 2:
        case 3:
        case 4:
          return 1;
        case 1:
          return 0;
      }

    case "da-DK":
      return count != 1 ? 1 : 0;

    case "de-DE":
      return count != 1 ? 1 : 0;

    case "el-GR":
      return count != 1 ? 1 : 0;

    case "en-US":
      return count != 1 ? 1 : 0;

    case "fi-FI":
      return count != 1 ? 1 : 0;

    case "fr-FR":
      return count > 1 ? 1 : 0;

    case "he-IL":
      return count != 1 ? 1 : 0;

    case "hu-HU":
      return count != 1 ? 1 : 0;

    case "is-IS":
      return count % 10 != 1 || count % 100 == 11 ? 1 : 0;

    case "it-IT":
      return count != 1 ? 1 : 0;

    case "ja-JP":
      return 0;

    case "ko-KR":
      return 0;

    case "nl-NL":
      return count != 1 ? 1 : 0;

    case "nb-NO":
      return count != 1 ? 1 : 0;

    case "pl-PL":
      return count != 1
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "pt-BR":
      return count > 1 ? 1 : 0;

    case "ro-RO":
      return count != 1
        ? count == 0 || (count % 100 > 0 && count % 100 < 20)
          ? 1
          : 2
        : 0;

    case "ru-RU":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "hr-HR":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "sk-SK":
      switch (count) {
        default:
          return 2;
        case 2:
        case 3:
        case 4:
          return 1;
        case 1:
          return 0;
      }

    case "sq-AL":
      return count != 1 ? 1 : 0;

    case "sv-SE":
      return count != 1 ? 1 : 0;

    case "th-TH":
      return 0;

    case "tr-TR":
      return count > 1 ? 1 : 0;

    case "id-ID":
      return 0;

    case "uk-UA":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "be-BY":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "sl-SI":
      return count % 100 == 1
        ? 1
        : count % 100 != 2
        ? count % 100 == 3 || count % 100 == 4
          ? 3
          : 0
        : 2;

    case "et-EE":
      return count != 1 ? 1 : 0;

    case "lv-LV":
      return count % 10 != 1 || count % 100 == 11 ? (count != 0 ? 1 : 2) : 0;

    case "lt-LT":
      return count % 10 != 1 || count % 100 == 11
        ? count % 10 >= 2 && (count % 100 < 10 || count % 100 >= 20)
          ? 1
          : 2
        : 0;

    case "fa-IR":
      return 0;

    case "vi-VN":
      return 0;

    case "hy-AM":
      return count != 1 ? 1 : 0;

    case "eu-ES":
      return count != 1 ? 1 : 0;

    case "mk-MK":
      return count == 1 || count % 10 == 1
        ? 1
        : count == 2 || count % 10 == 2
        ? 2
        : 0;

    case "af-ZA":
      return count != 1 ? 1 : 0;

    case "ka-GE":
      return 0;

    case "fo-FO":
      return count != 1 ? 1 : 0;

    case "hi-IN":
      return count != 1 ? 1 : 0;

    case "sw-KE":
      return count != 1 ? 1 : 0;

    case "gu-IN":
      return count != 1 ? 1 : 0;

    case "ta-IN":
      return count != 1 ? 1 : 0;

    case "te-IN":
      return count != 1 ? 1 : 0;

    case "kn-IN":
      return count != 1 ? 1 : 0;

    case "mr-IN":
      return count != 1 ? 1 : 0;

    case "gl-ES":
      return count != 1 ? 1 : 0;

    case "kok-IN":
      return count != 1 ? 1 : 0;

    case "ar-IQ":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "zh-CN":
      return 0;

    case "de-CH":
      return count != 1 ? 1 : 0;

    case "en-GB":
      return count != 1 ? 1 : 0;

    case "es-MX":
      return count != 1 ? 1 : 0;

    case "fr-BE":
      return count > 1 ? 1 : 0;

    case "it-CH":
      return count != 1 ? 1 : 0;

    case "nl-BE":
      return count != 1 ? 1 : 0;

    case "nn-NO":
      return count != 1 ? 1 : 0;

    case "pt-PT":
      return count != 1 ? 1 : 0;

    case "sv-FI":
      return count != 1 ? 1 : 0;

    case "ar-EG":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "zh-HK":
      return 0;

    case "de-AT":
      return count != 1 ? 1 : 0;

    case "en-AU":
      return count != 1 ? 1 : 0;

    case "es-ES":
      return count != 1 ? 1 : 0;

    case "fr-CA":
      return count > 1 ? 1 : 0;

    case "ar-LY":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "zh-SG":
      return 0;

    case "de-LU":
      return count != 1 ? 1 : 0;

    case "en-CA":
      return count != 1 ? 1 : 0;

    case "es-GT":
      return count != 1 ? 1 : 0;

    case "fr-CH":
      return count > 1 ? 1 : 0;

    case "ar-DZ":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "zh-MO":
      return 0;

    case "en-NZ":
      return count != 1 ? 1 : 0;

    case "es-CR":
      return count != 1 ? 1 : 0;

    case "fr-LU":
      return count > 1 ? 1 : 0;

    case "ar-MA":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "en-IE":
      return count != 1 ? 1 : 0;

    case "es-PA":
      return count != 1 ? 1 : 0;

    case "ar-TN":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "en-ZA":
      return count != 1 ? 1 : 0;

    case "es-DO":
      return count != 1 ? 1 : 0;

    case "ar-OM":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "es-VE":
      return count != 1 ? 1 : 0;

    case "ar-YE":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "es-CO":
      return count != 1 ? 1 : 0;

    case "ar-SY":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "es-PE":
      return count != 1 ? 1 : 0;

    case "ar-JO":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "en-TT":
      return count != 1 ? 1 : 0;

    case "es-AR":
      return count != 1 ? 1 : 0;

    case "ar-LB":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "en-ZW":
      return count != 1 ? 1 : 0;

    case "es-EC":
      return count != 1 ? 1 : 0;

    case "ar-KW":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "en-PH":
      return count != 1 ? 1 : 0;

    case "es-CL":
      return count != 1 ? 1 : 0;

    case "ar-AE":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "es-UY":
      return count != 1 ? 1 : 0;

    case "ar-BH":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "es-PY":
      return count != 1 ? 1 : 0;

    case "ar-QA":
      switch (count) {
        default:
          if (count % 100 < 3 || count % 100 > 10) {
            if (count % 100 < 11) {
              return 5;
            }
            return 4;
          }
          return 3;
        case 2:
          return 2;
        case 1:
          return 1;
        case 0:
          return 0;
      }

    case "es-BO":
      return count != 1 ? 1 : 0;

    case "es-SV":
      return count != 1 ? 1 : 0;

    case "es-HN":
      return count != 1 ? 1 : 0;

    case "es-NI":
      return count != 1 ? 1 : 0;

    case "es-PR":
      return count != 1 ? 1 : 0;

    case "zh-CHT":
      return 0;

    case "ms":
      return 0;
  }
};
