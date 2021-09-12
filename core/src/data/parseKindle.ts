import { parse } from "date-fns";
import { enUS, it } from "date-fns/locale";
import fs from "fs";
import { groupBy } from "ramda";
import { ClipType } from "./clip";

export class KindleClip {
  book: string;
  content: string;
  location: string;
  page: string;
  type: ClipType;
  date: string;
  raw: string;
  parsed: boolean;
}

//TODO: merge all things related to locales to one single object so it's easier to add/remove them

const KINDLE_REG_EXPS = {
  // https://regex101.com/r/sFrlfK/4
  "it-IT":
    /- +(?:la tua) +(nota|evidenziazione) (?:a pagina)? ?(\d+(?:-\d+)?)? ?(?:alla|\|)? ?(?:posizione)? ?(\d+(?:-\d+)?)? \| (?:aggiunto in data) (.*)/im,
  // https://regex101.com/r/sFrlfK/5
  "en-US":
    /- +(?:your) +(highlight|note) (?:on page)? ?(\d+(?:-\d+)?)? ?(?:at|\|)? ?(?:location)? ?(\d+(?:-\d+)?)? \| (?:added on) (.*)/im,
};

type SupportedLocale = keyof typeof KINDLE_REG_EXPS;

export const parseMyClippingsContents = (contents: string) => {
  const split = contents.split("==========");
  return split.map(parseKindleClip);
};

// export const getNotesFromKindle = async ({
//   filePath,
// }: {
//   filePath: string;
// }) => {
//   try {
//     const fileContents = fs.readFileSync(filePath, { encoding: "utf-8" });

//     const splitted = fileContents.split("==========");

//     const raws = splitted.map((text) => parseClip(text));

//     const byBook = groupBy((raw: RawKindleClip) => raw.book, raws);

//     return { byBook };
//   } catch (ex) {
//     return ex;
//   }
// };

export const parseKindleClip = (clip: string): Partial<KindleClip> => {
  try {
    const raw = clip.trim();
    const lines = raw.split("\n");
    const book = lines[0].trim();

    let parts: string[];
    let locale: SupportedLocale;

    for (const [_locale, regexp] of Object.entries(KINDLE_REG_EXPS)) {
      const results = regexp.exec(lines[1]);
      if (results) {
        parts = results;
        locale = _locale as SupportedLocale;
        break;
      }
    }

    const type = getClipTypeEnum(parts[1]);
    const page = parts[2];
    const position = parts[3];
    const date = parseDate(parts[4], locale);

    const content = lines[3].trim();

    // console.log({
    //   book,
    //   content,
    //   location: position,
    //   page,
    //   type,
    //   date,
    //   raw,
    //   parsed: true,
    // });

    return {
      book,
      content,
      location: position,
      page,
      type,
      date,
      raw,
      parsed: true,
    };
  } catch (ex) {
    console.error(ex);
    return {
      parsed: false,
      raw: clip,
    };
  }
};

// returns ISO string
const parseDate = (
  date: string,
  locale: keyof typeof KINDLE_REG_EXPS
): string => {
  const locales = {
    "en-US": enUS,
    "it-IT": it,
  };
  const formats = {
    "en-US": "EEEE, dd MMMM yyyy HH:mm:ss",
    "it-IT": "EEEE dd MMMM yyyy HH:mm:ss",
  };

  return parse(date, formats[locale], new Date(), {
    locale: locales[locale],
  }).toISOString();
};

export const getClipTypeEnum = (type: string) => {
  switch (type) {
    case "evidenziazione":
    case "Highlight":
      return ClipType.HIGHLIGHT;

    case "nota":
    case "Note":
      return ClipType.NOTE;

    default:
      throw new Error("unknown clip type");
  }
};
