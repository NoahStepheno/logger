import path from "node:path";
import fs from "node:fs";
import dayjs from "dayjs";

export type Types = "JS_ERROR" | "API" | "RESOURCE" | "PV" | "PERFORMANCE";

export interface WritePayload {
  date: string;
  type: Types;
  uid: string;
  p1?: string;
  p2?: string;
  p3?: string;
  p4?: string;
  p5?: string;
  p6?: string;
  p7?: string;
  p8?: string;
  p9?: string;
  p10?: string;
  p11?: string;
}

export const WRITE_KEYS: (keyof WritePayload)[] = [
  "date",
  "type",
  "uid",
  "p1",
  "p2",
  "p3",
  "p4",
  "p5",
  "p6",
  "p7",
  "p8",
  "p9",
  "p10",
  "p11",
];

export const writeLogger = (payload: WritePayload) => {
  if (!payload.type) {
    return;
  }
  const values = WRITE_KEYS.map((key) => payload[key]);
  const filePath = path.join(
    "./data",
    payload.type,
    dayjs().format("YYYY-MM-DD")
  );

  console.log(filePath);
  fs.appendFileSync(
    filePath,
    `${Object.values(values).join(" ")}\r\n`,
    "utf-8"
  );
};
