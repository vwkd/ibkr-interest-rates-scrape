const DATE_HEADER = "Date" as const;
const CURRENCY_HEADERS = [
  "AED",
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNH",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "ILS",
  "INR",
  "JPY",
  "KRW",
  "MXN",
  "NOK",
  "NZD",
  "PLN",
  "RON",
  "RUB",
  "SAR",
  "SEK",
  "SGD",
  "TRY",
  "USD",
  "ZAR",
] as const;
export const COLUMN_HEADERS = [DATE_HEADER, ...CURRENCY_HEADERS] as const;

export type EntryRaw = Record<typeof COLUMN_HEADERS[number], string>;
export interface Entry {
  date: Temporal.PlainDate;
  value: number;
  kind: typeof CURRENCY_HEADERS[number];
}

// note: patch for TypeScript types of Object.entries from https://stackoverflow.com/a/60142095/2607891
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
