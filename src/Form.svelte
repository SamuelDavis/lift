<script lang="ts">
  import type { Exercise } from "./types";
  import { toDateTimeLocaleString } from "./util";
  import { createEventDispatcher } from "svelte";

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
  {#if key}
    <div>
      <label for="key">Key</label>
      <input type="number" value={key} id="key" name="key" disabled />
    </div>
  {/if}
  <div>
    <label for="name">Name</label>
    <input bind:value={name} type="text" id="name" name="name" required />
  </div>
  <div>
    <label for="modality">Modality</label>
    <input bind:value={modality} type="text" id="modality" name="modality" />
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
