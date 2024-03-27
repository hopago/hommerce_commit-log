export function isFieldsFulfilled<T>(
  obj: T,
  requiredFields: (keyof T)[]
): boolean {
  for (const field of requiredFields) {
    const value = obj[field];

    if (value === undefined || value === null) {
      return false;
    }

    if (typeof value === "string" && value.trim() === "") {
      return false;
    }
  }

  return true;
}
