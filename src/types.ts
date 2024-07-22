export const COLUMN_HEADERS = [
  "Date",
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

export type EntryRaw = Record<typeof COLUMN_HEADERS[number], string>;
export type Entry =
  & Record<"Date", Temporal.PlainDate>
  & Record<typeof COLUMN_HEADERS[number], number>;
