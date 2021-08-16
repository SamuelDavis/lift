import { writable } from "svelte/store";
import type { Dict, Set } from "./types";

export const sets = writable(readSetsFromLocalStorage());
sets.subscribe(writeSetsToLocalStorage);

function readSetsFromLocalStorage(): Dict<Set> {
  const json = localStorage.getItem("sets") || "{}";
  return JSON.parse(json);
}

function writeSetsToLocalStorage(sets: Dict<Set>): void {
  const json = JSON.stringify(sets);
  localStorage.setItem("sets", json);
}

export const set = writable(readSetFromLocalStorage());
set.subscribe(writeSetToLocalStorage);

function readSetFromLocalStorage(): Set {
  const json = localStorage.getItem("set") || "null";
  return JSON.parse(json);
}

function writeSetToLocalStorage(set: Set): void {
  const json = JSON.stringify(set);
  localStorage.setItem("set", json);
}
