<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

  import { set, sets } from "./stores";

  import type { Set, SubmitEvent } from "./types";
  import { deriveDateTimeString, deriveDuration, validate } from "./util";

  onMount(() => {
    clearInterval(timer);
    timer = setInterval(() => (currentTime = new Date()), 250);
  });

  onDestroy(() => {
    clearInterval(timer);
    timer = null;
  });

  export let id: Set["id"];

  const dispatch = createEventDispatcher();

  let timer: NodeJS.Timer = null;
  let currentTime = new Date();

  $set =
    id === $set?.id
      ? $set
      : $sets[id] ?? {
          id,
          exercise: "exercise",
          modality: "modality",
          repetitions: 0,
          workload: 0,
          exertion: 0,
          timestamps: [],
        };

  let timestamps = ($set.timestamps ?? []).map((n) =>
    deriveDateTimeString(new Date(n))
  );
  $: $set.timestamps = timestamps.map((ts) => new Date(ts).getTime());
  $: duration = deriveDuration([
    ...timestamps.map((ts) => new Date(ts)),
    currentTime,
  ]);
  $: timerRunning = timestamps.length > 0 && timestamps.length % 2 === 1;

  function onSubmit(e: SubmitEvent) {
    const type = e.submitter.getAttribute("name");
    switch (type) {
      case "submit":
        const errors = validate($set);
        if (errors.length) {
          alert(errors.join("\n"));
          return;
        }
        dispatch("submit", $set);
        break;
      case "cancel":
        dispatch("cancel");
        break;
      case "delete":
        if (confirm(`Really delete set ${$set.id}?`))
          dispatch("delete", $set.id);
        break;
      default:
        throw Error(`Unhandled submission type: ${type}`);
    }
  }

  function onToggleTimer() {
    timestamps = [...timestamps, deriveDateTimeString()];
  }

  function onRemoveInterval(i: number) {
    timestamps = [...timestamps.slice(0, i), ...timestamps.slice(i + 2)];
  }
</script>

<form {id} on:submit|preventDefault={onSubmit}>
  <div>
    <label for="exercise">Exercise</label>
    <input
      bind:value={$set.exercise}
      type="text"
      id="exercise"
      name="exercise"
      required
    />
  </div>
  <div>
    <label for="modality">Modality</label>
    <input
      bind:value={$set.modality}
      type="text"
      id="modality"
      name="modality"
    />
  </div>
  <div>
    <label for="repetitions">Repetitions</label>
    <input
      bind:value={$set.repetitions}
      type="number"
      id="repetitions"
      name="repetitions"
      min="0"
      max="9999"
      step="1"
      required
    />
  </div>
  <div>
    <label for="workload">Workload</label>
    <input
      bind:value={$set.workload}
      type="number"
      id="workload"
      name="workload"
      min="0"
      max="9999"
      required
    />
  </div>
  <div>
    <label for="exertion">Exertion <span>({$set.exertion})</span></label>
    <input
      bind:value={$set.exertion}
      type="range"
      id="exertion"
      name="exertion"
      min="0"
      max="10"
      required
    />
  </div>
  <div>
    <details>
      <summary>
        <span title={duration.description}>{duration.text}</span>
        <button on:click={onToggleTimer} type="button">
          {timerRunning ? "Stop" : "Start"} Timer
        </button>
      </summary>

      <ol>
        {#each timestamps as value, i}
          <li>
            <input
              type="datetime-local"
              bind:value
              id={`timestamps[${i}]`}
              name="timestamps[]"
              step="1"
              required
            />
            {#if i % 2 === 0}
              <button on:click={onRemoveInterval.bind(null, i)} type="button">
                &times;
              </button>
            {/if}
          </li>
        {/each}
        {#if timerRunning}
          <li>
            <input
              readonly
              type="datetime-local"
              value={deriveDateTimeString(currentTime)}
              step="1"
            />
          </li>
        {/if}
      </ol>
    </details>
  </div>
  <input type="hidden" bind:value={$set.id} />
  {#if $set.id in $sets}
    <input type="submit" name="submit" value="Done" />
    <input type="submit" name="delete" value="Delete" />
  {:else}
    <input type="submit" name="submit" value="Save" />
    <input type="submit" name="cancel" value="Cancel" />
  {/if}
</form>
