<script lang="ts">
  import '@malloydata/render';
  import { getMalloyModel } from './malloy';
  import { HTMLView } from '@malloydata/render';

  export let query: string;
  let el: HTMLDivElement;

  const model = getMalloyModel('malloy-model');

  $: {
    model
      .runQuery(query)
      .then((result) => {
        const view = new HTMLView(document);
        return view.render(result, { dataStyles: {} });
      })
      .then((resultEl) => el.replaceChildren(resultEl));
  }
</script>

<div bind:this={el}></div>
