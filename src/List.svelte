<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { Exercise } from "./types";
  import { createEventDispatcher } from "svelte";

  export let exercises: Writable<Exercise[]>;

  const dispatch = createEventDispatcher();
</script>

<ol>
  {#each $exercises as exercise}
    <li on:click={() => dispatch("select", exercise)}>
      <pre>{JSON.stringify(exercise, null, 2)}</pre>
    </li>
  {/each}
</ol>
