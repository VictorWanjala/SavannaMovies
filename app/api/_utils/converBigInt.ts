type JSONValue =
  | string
  | number
  | boolean
  | null
  | Date
  | bigint
  | JSONObject
  | JSONArray;

interface JSONObject {
  [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export function convertBigIntToString<T extends JSONValue>(obj: T): T | string | JSONObject | JSONArray {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "bigint") {
    return obj.toString();
  }

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      return obj.map(convertBigIntToString);
    }

    const result: JSONObject = {};
    for (const key in obj as JSONObject) {
      if (key === "password") continue;
      result[key] = convertBigIntToString((obj as JSONObject)[key]);
    }
    return result;
  }

  return obj;
}
