/* eslint-disable @typescript-eslint/no-explicit-any */

export default function convertBigintToString(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (_key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}
