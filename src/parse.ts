import { type Entry, type EntryRaw } from "./types.ts";

/**
 * Parse raw entries
 *
 * - parse `Date` field into Temporal date, e.g. `20240719`
 * - parse other fields into number
 *   - remove star, doesn't distinguish preliminary rates, e.g. `6.014*`
 *   - replace wrapping parentheses with minus sign, e.g. `(0.018)`
 * @param list list of raw entries
 * @returns list of parsed entries
 */
export function parseData(list: EntryRaw[]): Entry[] {
  const listNew: Entry[] = [];

  for (const entry of list) {
    const entryNew = {} as Entry;

    const date = entry["Date"];
    // todo: what happens if date is invalid?
    const dateNew = Temporal.PlainDate.from(date);

    console.debug(`Parsing date ${dateNew}`);

    for (const [key, value] of Object.entries(entry)) {
      if (key == "Date") {
        entryNew["Date"] = dateNew;
      } else {
        const numberValue = parseFloat(
          value
            .replace(/\*$/, "")
            .replace(/^\((.+)\)$/, "-$1"),
        );
        if (Number.isNaN(numberValue)) {
          console.warn(`Couldn't parse currency '${key}' value '${value}'`);
        }

        entryNew[key] = numberValue;
      }
    }
  }

  return listNew;
}
