import type { Duration, Set } from "./types";

export function* validate(set: Set): string[] {
  let errors = [];

  // exercise
  let invalidCharacters = deriveInvalidCharacters(/[\w ]+/g, set.exercise);
  if (invalidCharacters.length)
    yield `Exercise may not include the following characters: ${invalidCharacters}.`,
      (errors = [...errors]);

  // modality
  invalidCharacters = deriveInvalidCharacters(/[\w ]+/g, set.modality);
  if (invalidCharacters.length)
    errors = [
      ...errors,
      `Modality may not include the following characters: ${invalidCharacters}.`,
    ];

  // timestamps
  if (set.timestamps.length < 1) errors = [...errors, `Timestamps missing.`];
  if (set.timestamps.length % 2 === 1) {
    errors = [...errors, `Final timestamp missing.`];
  } else {
    for (let i = 0; i < set.timestamps.length; i += 2) {
      const [a, b] = set.timestamps.slice(i, i + 2);
      if (b - a < 0) {
        errors = [
          ...errors,
          `Timestamps disordered after ${deriveDateTimeString(new Date(a))}`,
        ];
        break;
      }
    }
  }

  return errors;
}

export function deriveDuration(timestamps: Date[]): Duration {
  if (timestamps.length < 1)
    return {
      text: "00:00",
      description: "no time elapsed",
    };

  let duration = 0;
  for (let i = 0; i < timestamps.length; i += 2) {
    const [a, b] = timestamps.slice(i, i + 2);
    const delta = (b ?? a).getTime() - a.getTime();
    if (delta < 0) {
      return {
        text: `timestamps disordered after ${a.toLocaleString()}`,
        description: "",
      };
    }
    duration += delta;
  }
  duration = Math.floor(duration / 1000);

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return {
    text: [minutes, seconds]
      .map((n) => n.toString().padStart(2, "0"))
      .join(":"),
    description: `${minutes} minutes and ${seconds} seconds`,
  };
}

export function deriveDateTimeString(date = new Date()) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -5);
}

export function deriveInvalidCharacters(regex: RegExp, text: string): string[] {
  return [...new Set(text.replaceAll(regex, "").split(""))];
}
