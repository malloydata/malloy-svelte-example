<script lang="ts">
	import type { Result } from '@malloydata/malloy';
	import '@malloydata/render';
	import { runQuery } from './malloy';

	let data: Result;

	const malloyScript = `
    ## renderer_next

    source: example is duckdb.sql('select * from "https://media.githubusercontent.com/media/datablist/sample-csv-files/main/files/customers/customers-100.csv"') extend {}
    `;

	runQuery(malloyScript, 'run: example -> { select: * }').then((result) => {
		data = result;
	});
</script>

{#if data}
	<malloy-render result={data}></malloy-render>
{/if}
