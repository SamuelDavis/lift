export type SubmitEvent = Event & {
  target: HTMLFormElement;
  currentTarget: HTMLFormElement;
  submitter: HTMLElement;
};
export type Dict<T> = Object & { [key: string]: T };
export type Set = {
  id: string;
  exercise: string;
  modality: string;
  repetitions: number;
  workload: number;
  exertion: number;
  timestamps: number[];
};
export type Duration = {
  text: string;
  description: string;
};
