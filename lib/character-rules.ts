export type InputFieldType =
  | "personName"
  | "email"
  | "password"
  | "slug"
  | "title"
  | "shortText"
  | "longText"
  | "url"
  | "phone"
  | "year"
  | "techName"
  | "techStack"
  | "iconKey"
  | "number"
  | "metricLine"
  | "hexColor"
  | "keywordList"
  | "urlList"
  | "path"
  | "metricsBlock";

const MAX_LENGTH: Partial<Record<InputFieldType, number>> = {
  personName: 80,
  email: 120,
  password: 128,
  slug: 80,
  title: 120,
  shortText: 160,
  longText: 5000,
  url: 500,
  phone: 20,
  year: 4,
  techName: 40,
  techStack: 500,
  iconKey: 32,
  number: 12,
  metricLine: 120,
  hexColor: 7,
  keywordList: 500,
  urlList: 2000,
  path: 120,
  metricsBlock: 1000,
};

export function sanitizeInput(type: InputFieldType, value: string): string {
  let result = value;
  const max = MAX_LENGTH[type];

  switch (type) {
    case "personName":
      result = value.replace(/[^a-zA-Z\s.'-]/g, "");
      break;
    case "email":
      result = value.replace(/[^a-zA-Z0-9@._+-]/g, "");
      break;
    case "password":
      result = value.replace(/[\u0000-\u001F\u007F]/g, "");
      break;
    case "slug":
      result = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
      break;
    case "title":
      result = value.replace(/[^a-zA-Z0-9\s.'(),/&+-]/g, "");
      break;
    case "shortText":
      result = value.replace(/[^a-zA-Z0-9\s.'(),/&+-:?]/g, "");
      break;
    case "longText":
      result = value.replace(/[<>{}[\]\\`]/g, "");
      break;
    case "url":
      result = value.replace(/[^a-zA-Z0-9:/?#@!$&'()*+,;=%._~-]/g, "");
      break;
    case "phone":
      result = value.replace(/[^0-9+\s()-]/g, "");
      break;
    case "year":
      result = value.replace(/[^0-9]/g, "").slice(0, 4);
      break;
    case "techName":
      result = value.replace(/[^a-zA-Z0-9\s.+#\/,-]/g, "");
      break;
    case "techStack":
      result = value.replace(/[^a-zA-Z0-9\s.+#\/,-]/g, "");
      break;
    case "iconKey":
      result = value.toLowerCase().replace(/[^a-z-]/g, "");
      break;
    case "number":
      result = value.replace(/[^0-9.]/g, "");
      break;
    case "metricLine":
      result = value.replace(/[^a-zA-Z0-9\s.%+|\/-]/g, "");
      break;
    case "hexColor":
      result = value.replace(/[^#0-9a-fA-F]/g, "");
      break;
    case "keywordList":
      result = value.replace(/[^a-zA-Z0-9\s,+-]/g, "");
      break;
    case "urlList":
      result = value
        .split("\n")
        .map((line) => line.replace(/[^a-zA-Z0-9:/?#@!$&'()*+,;=%._~-]/g, ""))
        .join("\n");
      break;
    case "path":
      result = value.replace(/[^a-zA-Z0-9/_.-]/g, "");
      break;
    case "metricsBlock":
      result = value
        .split("\n")
        .map((line) => line.replace(/[^a-zA-Z0-9\s.%+|\/-]/g, ""))
        .join("\n");
      break;
  }

  if (max !== undefined) {
    result = result.slice(0, max);
  }

  return result;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function sanitizeRecord<T extends Record<string, string>>(
  fields: { key: keyof T; type: InputFieldType }[],
  data: T
): T {
  const out = { ...data };
  for (const { key, type } of fields) {
    if (typeof out[key] === "string") {
      out[key] = sanitizeInput(type, out[key] as string) as T[keyof T];
    }
  }
  return out;
}
