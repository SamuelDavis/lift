export type Exercise = {
  key?: IDBValidKey;
  name: string;
  modality: string | undefined;
  repetitions: number;
  workload: number;
  exertion: number;
  start: Date;
  end: Date;
};
