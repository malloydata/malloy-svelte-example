<script lang="ts">
  import { getMalloyModel } from './malloy';
  import { filterStore, toggleFilter } from './filter-store';

  export let field: string;

  type Item = { value: string; isSelected: boolean };

  const model = getMalloyModel('malloy-model');
  let data: string[] = [];

  $: {
    model.runQuery(`run: example -> { group_by: ${field} }`).then((r) => {
      data = [];
      for (const row of r.data) {
        const value = row.cell(field).value as string;
        data.push(value);
      }
    });
  }

  let augmentedData: Item[] = [];
  $: {
    const filters = $filterStore[field] ?? [];
    augmentedData = data.map((value) => ({
      value,
      isSelected: filters.includes(value)
    }));
  }

  const getButtonClass = (item: Item) => {
    let style = 'text-sm hover:bg-gray-100 h-full w-full text-left px-2';
    if (item.isSelected) {
      style += ' font-bold text-malloy-blue';
    } else if (($filterStore[field] ?? []).length > 0) {
      style += ' text-gray-400';
    } else style += ' text-gray-900';
    return style;
  };
</script>

<div>
  <div class="font-medium text-sm text-gray-500 mb-1">
    {field}
  </div>
  <ul class="border rounded">
    {#each augmentedData as item}
      <li>
        <button class={getButtonClass(item)} on:click={() => toggleFilter(field, item.value)}
          >{item.value}</button
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  ul {
    max-height: 200px;
    overflow: auto;
    padding: 0px;
  }
</style>
