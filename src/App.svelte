<script lang="ts">
  import Form from "./Form.svelte";
  import List from "./List.svelte";
  import { set, sets } from "./stores";
  import type { Set } from "./types";

  let id: string = $set?.id;
  $: $set = id === null ? null : $set;

  function onNewSet() {
    id = `${new Date().getTime()}.${Math.random()}`;
  }

  function onEditSet(e: CustomEvent<Set["id"]>) {
    id = e.detail;
  }

  function onSubmit(e: CustomEvent<Set>) {
    $sets[e.detail.id] = e.detail;
    id = null;
  }

  function onCancel() {
    id = null;
  }

  function onDelete(e: CustomEvent<Set["id"]>) {
    const { [e.detail]: _, ...rest } = $sets;
    $sets = rest;
    id = null;
  }
</script>

<main>
  {#if id}
    <Form {id} on:submit={onSubmit} on:cancel={onCancel} on:delete={onDelete} />
  {:else}
    <List on:new-set={onNewSet} on:edit-set={onEditSet} />
  {/if}
</main>
