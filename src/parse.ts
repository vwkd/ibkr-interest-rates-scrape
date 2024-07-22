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
  return list.map((entry) =>
    Object.fromEntries(
      Object.entries(entry).map(([key, value]) => {
        if (key == "Date") {
          // todo: what happens if date is invalid?
          const dateValue = Temporal.PlainDate.from(value);
          return [key, dateValue];
        } else {
          const numberValue = parseFloat(
            value
              .replace(/\*$/, "")
              .replace(/^\((.+)\)$/, "-$1"),
          );
          return [key, numberValue];
        }
      }),
    )
  );
}
