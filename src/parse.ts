import { type Entries, type Entry, type EntryRaw } from "./types.ts";

/**
 * Parse raw entries
 *
 * - parse `Date` field into Temporal date, e.g. `20240719`
 * - parse other fields into number
 *   - remove star, doesn't distinguish preliminary rates, e.g. `6.014*`
 *   - replace wrapping parentheses with minus sign, e.g. `(0.018)`
 *   - filter out invalid values, e.g. `N/A`
 * @param list list of raw entries
 * @returns list of parsed entries
 */
export function parseData(list: EntryRaw[]): Entry[] {
  return list.flatMap((entry) => {
    const { "Date": dateString, ...rest } = entry;

    // todo: what happens if date is invalid?
    const date = Temporal.PlainDate.from(dateString);

    console.debug(`Parsing date ${date}`);

    return (Object.entries(rest) as Entries<typeof rest>)
      .reduce((arr, [kind, valueString]) => {
        const value = parseFloat(
          valueString
            .replace(/\*$/, "")
            .replace(/^\((.+)\)$/, "-$1"),
        );

        if (Number.isNaN(value)) {
          return arr;
        } else {
          return [...arr, {
            date,
            value,
            kind,
          }];
        }
      }, [] as Entry[]);
  });
}
