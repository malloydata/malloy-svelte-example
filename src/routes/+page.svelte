<script lang="ts">
	import Card from '$lib/card.svelte';
	import { whereClause } from '$lib/filter-store';
	import Kpi from '$lib/kpi.svelte';
	import ListBox from '$lib/list-box.svelte';
	import MalloyProvider from '$lib/malloy-provider.svelte';
	import Renderer from '$lib/renderer.svelte';
	import script from '../model.malloy?raw';
	import logo from '$lib/logo.png';
	import LegacyRenderer from '$lib/legacy-renderer.svelte';

	$: sourceQuery = `run: example -> records + { where: ${$whereClause || true}} + { limit: 100 }`;
	$: topProducts = `run: example -> top_products + { where: ${$whereClause || true}}`;
	$: topSources = `run: example -> nested + { where: ${$whereClause || true}}`;

	// Render bar with legacy renderer
	$: topProductsBar = `
	# bar_chart
	run: example ->	top_products + { where: ${$whereClause || true}};
	`;
</script>

<MalloyProvider {script}>
	<div class="grid grid-cols-[200px_minmax(0,_1fr)] h-screen">
		<div class=" h-full border-r border-gray-200 p-4 flex flex-col gap-2">
			<img src={logo} alt="Malloy" class="h-8 w-fit" />
			<div class="font-medium text-gray-700 mb-8">Svelte Dashboard</div>
			<div class="flex flex-col gap-4">
				<ListBox field="category" />
				<ListBox field="state" />
			</div>
		</div>
		<div class="p-16 bg-gray-100 overflow-auto flex flex-col gap-8">
			<div class="flex gap-8 h-[480px]">
				<Card title="Total Revenue" cardClass="h-fit"
					><Kpi source="example" measure="total_revenue"></Kpi></Card
				>
				<Card title="Top Products"><Renderer query={topProducts}></Renderer></Card>
				<Card title="Top Sources"><Renderer query={topSources}></Renderer></Card>
				<Card title="Top Products Bar"
					><LegacyRenderer query={topProductsBar}></LegacyRenderer></Card
				>
			</div>

			<Card title="Source Data" cardClass="col-span-3"
				><Renderer query={sourceQuery}></Renderer></Card
			>
		</div>
	</div>
</MalloyProvider>
