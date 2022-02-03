<script lang="ts">
  import type { Exercise } from "./types";
  import { toDateTimeLocaleString } from "./util";
  import { createEventDispatcher, onMount } from "svelte";
  import { createDb, DAO, Store } from "./db";

  export let key: Exercise["key"] = null;
  export let name: Exercise["name"] = "z";
  export let modality: Exercise["modality"] = "z";
  export let repetitions: Exercise["repetitions"] = 1;
  export let workload: Exercise["workload"] = 2;
  export let exertion: Exercise["exertion"] = 3;
  export let start: Exercise["start"] = new Date();
  export let end: Exercise["end"] = new Date();
  $: startDateTimeLocale = toDateTimeLocaleString(start);
  $: endDateTimeLocale = toDateTimeLocaleString(end);

  const dispatch = createEventDispatcher();

  let dao: DAO<Exercise>;
  let nameOptions = [];
  let modalityOptions = [];
  $: {
    if (name && dao instanceof DAO)
      dao
        .readIndex("name")
        .then(
          (values) =>
            (nameOptions = [
              ...new Set(
                values
                  .map((value) => value.name)
                  .filter((value) => value.includes(name))
              ),
            ])
        );
    if (name && modality && dao instanceof DAO)
      dao
        .readIndex("modality")
        .then(
          (values) =>
            (modalityOptions = [
              ...new Set(
                values
                  .map((value) => value.modality)
                  .filter((value) => value.includes(modality))
              ),
            ])
        );
  }

  onMount(async () => {
    const db = await createDb();
    dao = new DAO(db, Store.EXERCISES);
  });

  function onSubmit() {
    dispatch("submit", {
      key,
      name,
      modality,
      repetitions,
      workload,
      exertion,
      start,
      end,
    });
  }

  function onDelete() {
    dispatch("delete", key);
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <pre>{JSON.stringify({ nameOptions, modalityOptions })}</pre>
  <datalist id="name-options">
    {#each nameOptions as value}
      <option {value}>{value}</option>
    {/each}
  </datalist>
  <datalist id="modality-options">
    {#each modalityOptions as value}
      <option {value}>{value}</option>
    {/each}
  </datalist>
  {#if key}
    <div>
      <label for="key">Key</label>
      <input type="number" value={key} id="key" name="key" disabled />
    </div>
  {/if}
  <div>
    <label for="name">Name</label>
    <input
      bind:value={name}
      type="text"
      id="name"
      name="name"
      list="name-options"
      required
    />
  </div>
  <div>
    <label for="modality">Modality</label>
    <input
      bind:value={modality}
      type="text"
      id="modality"
      name="modality"
      list="modality-options"
    />
  </div>
  <div>
    <label for="repetitions">Repetitions</label>
    <input
      bind:value={repetitions}
      type="number"
      id="repetitions"
      name="repetitions"
      min="1"
      required
    />
  </div>
  <div>
    <label for="workload">Workload</label>
    <input
      bind:value={workload}
      type="number"
      id="workload"
      name="workload"
      min="0"
      required
    />
  </div>
  <div>
    <label for="exertion">Exertion {exertion}</label>
    <input
      bind:value={exertion}
      id="exertion"
      name="exertion"
      type="range"
      min="0"
      max="10"
      required
    />
  </div>
  <div>
    <label for="start">Start</label>
    <input
      bind:value={startDateTimeLocale}
      on:input={(e) => (start = new Date(e.currentTarget.value))}
      type="datetime-local"
      id="start"
      name="start"
      step="1"
      required
    />
  </div>
  <div>
    <label for="end">End</label>
    <input
      bind:value={endDateTimeLocale}
      on:input={(e) => (end = new Date(e.currentTarget.value))}
      type="datetime-local"
      id="end"
      name="end"
      step="1"
      required
    />
  </div>
  <input type="submit" value={key ? "update" : "save"} />
  {#if key} <button on:click={onDelete} type="button">Delete</button> {/if}
</form>

<style lang="css">
  form div {
    display: grid;
    grid-template-columns: 1fr 4fr;
  }
</style>
