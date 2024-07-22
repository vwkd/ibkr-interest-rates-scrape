import { getData } from "./api.ts";
import { parseData } from "./parse.ts";
import { type Entry } from "./types.ts";

const DATE_START = new Temporal.PlainYearMonth(2023, 11);
const DATE_END = new Temporal.PlainYearMonth(2024, 7);
const ONE_MONTH = Temporal.Duration.from({ months: 1 });
const OUTPUT_FILE = "out/data.json";

const results: Entry[] = [];

for (
  let date = DATE_START;
  !date.equals(DATE_END);
  date = date.add(ONE_MONTH)
) {
  const data = await getData(date);

  if (data.length == 0) {
    if (results.length == 0) {
      throw new Error(`No data found. Check if valid start date.`);
    } else {
      console.warn(`No data found. Check if valid end date.`);
      break;
    }
  }

  const entries = parseData(data);
  results.push(...entries);
}

await Deno.mkdir("out", { recursive: true });
await Deno.writeTextFile(OUTPUT_FILE, JSON.stringify(results));
