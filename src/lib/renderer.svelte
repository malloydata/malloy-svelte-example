<script lang="ts">
	import type { Result } from '@malloydata/malloy';
	import '@malloydata/render';
	import { getMalloyModel } from './malloy';

	export let query: string;

	let data: Result;

	const model = getMalloyModel('malloy-model');

	$: {
		model.runQuery(query).then((result) => {
			data = result;
		});
	}
</script>

{#if data}
	<malloy-render result={data}></malloy-render>
{/if}
