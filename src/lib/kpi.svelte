<script lang="ts">
  import '@malloydata/render';
  import { getMalloyModel } from './malloy';
  import { whereClause } from './filter-store';

  export let measure: string;
  export let source: string;

  let data: number;

  const model = getMalloyModel('malloy-model');

  $: {
    model
      .runQuery(`run: ${source} -> { aggregate: ${measure} } + { where: ${$whereClause || true}}`)
      .then((result) => {
        data = result.data.row(0).cell(measure).value as number;
      });
  }
</script>

{#if typeof data !== 'undefined'}
  <div class="text-2xl">{data.toLocaleString()}</div>
{/if}
