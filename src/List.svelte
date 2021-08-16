<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { sets } from "./stores";

  import type { Set } from "./types";

  const dispatch = createEventDispatcher();

  function onNewSet() {
    dispatch("new-set");
  }

  function onEditSet(id: Set["id"]) {
    dispatch("edit-set", id);
  }
</script>

<button on:click={onNewSet}>Lift</button>
<ol>
  {#each Object.values($sets) as set (set.id)}
    <li>
      <pre>{JSON.stringify(set, null, 2)}</pre>
      <button on:click={onEditSet.bind(null, set.id)}>Edit</button>
    </li>
  {/each}
</ol>
