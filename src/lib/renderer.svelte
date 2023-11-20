<script lang="ts">
	import type { Result } from '@malloydata/malloy';
	import '@malloydata/render';
	import { runQuery } from './malloy';

	let data: Result;

	const malloyScript = `
    ## renderer_next

    source: example is duckdb.sql('select * from "https://raw.githubusercontent.com/malloydata/malloy-svelte-example/main/data/customers-100.csv"') extend {}
    `;

	runQuery(malloyScript, 'run: example -> { select: * }').then((result) => {
		data = result;
	});
</script>

{#if data}
	<malloy-render result={data}></malloy-render>
{/if}
