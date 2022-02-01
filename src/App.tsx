import type { Component } from "solid-js";
import { createResource, For } from "solid-js";
import { exerciseRepository } from "./db";

const App: Component = () => {
  async function onSubmit(e: SubmitEvent & { currentTarget: HTMLFormElement }) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input = {
      name: data.get("name")!.toString(),
      modality: data.get("modality")?.toString(),
      repetitions: parseInt(data.get("repetitions")!.toString(), 10),
      workload: parseFloat(data.get("workload")!.toString()),
      exertion: parseInt(data.get("exertion")!.toString()),
      start: new Date(data.get("start")!.toString()),
      end: new Date(data.get("end")!.toString()),
    };
    const key = await exerciseRepository.write(input);
    mutate((values) => [...values, { key, ...input }]);
  }

  const [records, { mutate }] = createResource(exerciseRepository.readAll, {
    initialValue: [],
  });

  return (
    <main>
      <aside>
        <ol>
          <For each={records()}>
            {(record) => (
              <li>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </li>
            )}
          </For>
        </ol>
      </aside>
      <hr />
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="modality">Modality</label>
          <input type="text" id="modality" name="modality" />
        </div>
        <div>
          <label htmlFor="repetitions">Repetitions</label>
          <input
            type="number"
            id="repetitions"
            name="repetitions"
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="workload">Workload</label>
          <input type="number" id="workload" name="workload" min="0" required />
        </div>
        <div>
          <label htmlFor="exertion">Exertion</label>
          <input
            type="number"
            id="exertion"
            name="exertion"
            min="0"
            max="10"
            required
          />
        </div>
        <div>
          <label htmlFor="start">Start</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            step="1"
            required
          />
        </div>
        <div>
          <label htmlFor="end">End</label>
          <input type="datetime-local" id="end" name="end" step="1" required />
        </div>
        <input type="submit" />
      </form>
    </main>
  );
};

export default App;
