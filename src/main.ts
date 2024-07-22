import { getData } from "./api.ts";
import { parseData } from "./parse.ts";

const date = new Temporal.PlainYearMonth(2024, 7);

const data = await getData(date);
const result = parseData(data);
