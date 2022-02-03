<script lang="ts">
  import Form from "./Form.svelte";
  import { onMount } from "svelte";
  import { createDb, DAO, openDb, Store } from "./db";
  import type { Exercise } from "./types";
  import { writable } from "svelte/store";
  import List from "./List.svelte";

  let dao: DAO<Exercise> = null;
  let selected: Exercise;

  const exercises = writable<Exercise[]>([]);

  onMount(async () => {
    const db = await createDb();
    dao = new DAO(db, Store.EXERCISES);
    exercises.set(await dao.readAll());
  });

  async function onSubmit({ detail: exercise }: { detail: Exercise }) {
    let { key, ...value } = exercise;
    key = key ? await dao.put(value, key) : await dao.add(value);
    await exercises.update((exercises) => {
      const index = exercises.findIndex((searchEl) => searchEl.key === key);
      return index in exercises
        ? [
            ...exercises.slice(0, index),
            { ...exercise, key },
            ...exercises.slice(index + 1),
          ]
        : [...exercises, { ...exercise, key }];
    });
    selected = { ...exercise, key };
  }

  function onSelect({ detail: exercise }: { detail: Exercise }) {
    selected = exercise;
  }

  function onClick() {
    selected = undefined;
  }

  async function onDelete({ detail: key }: { detail: Exercise["key"] }) {
    await dao.delete(key);
    exercises.update((exercises) =>
      exercises.filter((exercise) => exercise.key !== key)
    );
    selected = { ...selected, key: null };
  }
</script>

<main>
  <aside>
    <button on:click={onClick}>New</button>
    <List {exercises} on:select={onSelect} />
  </aside>
  <hr />
  <Form on:submit={onSubmit} on:delete={onDelete} {...selected} />
</main>

<style lang="css">
  main {
    display: grid;
    grid-template-columns: 3.4fr 0.1fr 6.5fr;
  }

  aside {
    max-height: calc(100vh - 16px);
    overflow-y: scroll;
  }
</style>
