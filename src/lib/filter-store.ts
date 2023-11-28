import { derived, writable } from 'svelte/store';

export const filterStore = writable<{
	filters: Record<string, string[]>;
}>({
	filters: {}
});

export const toggleFilter = (field: string, value: string) => {
	filterStore.update((s) => {
		const existingFilters = s.filters[field] ?? [];
		const idx = existingFilters.indexOf(value);

		s.filters[field] =
			idx < 0
				? [...existingFilters, value]
				: [...existingFilters.slice(0, idx), ...existingFilters.slice(idx + 1)];
		return s;
	});
};

export const whereClause = derived(filterStore, (s) => {
	const clauses: string[] = [];
	for (const [field, values] of Object.entries(s.filters)) {
		if (values.length > 0) {
			clauses.push(`(${field} ? ${values.map((v) => `'${v}'`).join(' | ')})`);
		}
	}
	return clauses.join(' and ');
});
