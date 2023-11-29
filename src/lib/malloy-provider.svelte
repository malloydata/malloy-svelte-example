<script lang="ts">
  import { MalloyModel, setMalloyModel } from './malloy';
  export let key = 'malloy-model';
  export let script: string;

  const model = new MalloyModel(script);
  setMalloyModel(key, model);
</script>

<slot />
