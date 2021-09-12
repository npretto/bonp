import { format } from "date-fns";
import { it as localeIT } from "date-fns/locale";
import { parseISO } from "date-fns";
import { ClipType, parseKindleClip } from ".";

describe("kindle parsing", () => {
  //ITALIAN HIGHLIGHT
  it("should parse an italian highlight with position correctly", () => {
    const clip = parseKindleClip(`

  So Good They Can't Ignore You (Newport, Cal)
  -  La tua evidenziazione alla posizione 626-628 | Aggiunto in data sabato 25 maggio 2019 13:46:14

  that the traits that make a great job great are rare and valuable, and therefore, if you want a great job, you need to build up rare and valuable skills—which I call career capital—to offer in return.

  `);
    expect(clip).toMatchObject({
      book: "So Good They Can't Ignore You (Newport, Cal)",
      location: "626-628",
      page: undefined,
      content:
        "that the traits that make a great job great are rare and valuable, and therefore, if you want a great job, you need to build up rare and valuable skills—which I call career capital—to offer in return.",
      type: ClipType.HIGHLIGHT,
    });

    expect(
      format(parseISO(clip.date), "EEEE dd MMMM yyyy HH:mm:ss", {
        locale: localeIT,
      })
    ).toBe("sabato 25 maggio 2019 13:46:14");
  });

  // ENGLISH NOTE
  it("should parse an english note correctly", () => {
    const clip = parseKindleClip(`
05 - Metodi Sperimentali in Psicologia 1
- Your Note on page 5 | Added on Monday, 12 January 2015 15:44:10

esperimento: correttore di pensiero
`);

    expect(clip).toMatchObject({
      book: "05 - Metodi Sperimentali in Psicologia 1",
      location: undefined,
      page: "5",
      content: "esperimento: correttore di pensiero",
      type: ClipType.NOTE,
    });

    expect(format(parseISO(clip.date), "EEEE, dd MMMM yyyy HH:mm:ss")).toBe(
      "Monday, 12 January 2015 15:44:10"
    );
  });
});
