import { parse } from "@std/csv";
import { COLUMN_HEADERS, type EntryRaw } from "./types.ts";

/**
 * Get benchmark interest rates from API
 *
 * @param date year and month to fetch interest rates for
 * @returns array of interest rates
 */
export async function getData(
  date: Temporal.PlainYearMonth,
): Promise<EntryRaw[]> {
  const year = date.year.toString();
  const month = date.month.toString().padStart(2, "0");

  console.debug(`Fetching interest rates for ${year}/${month}`);

  const url =
    `https://www.interactivebrokers.com/en/accounts/fees/monthlyInterestRates.php?date=${year}${month}&cvs=1&ib_entity=llc`;
  const res = await fetch(url);

  const text = await res.text();

  const csv = text
    .trim()
    .replaceAll(/ +/g, ",");

  // todo: what happens if different columns?
  const obj = parse(csv, { skipFirstRow: true, columns: COLUMN_HEADERS });

  return obj;
}
