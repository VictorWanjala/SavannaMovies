export function convertBigIntToString(obj: any): any {
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
    const result: Record<string, any> = {};
    for (const key in obj) {
      if (key === "password") {
        continue; 
      }
      result[key] = convertBigIntToString(obj[key]);
    }
    return result;
  }

  return obj;
}
