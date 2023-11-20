import { DuckDBWASMConnection } from '@malloydata/db-duckdb/wasm';
import { SingleConnectionRuntime } from '@malloydata/malloy';

const connection = new DuckDBWASMConnection('duckdb', null, undefined, {
	rowLimit: 1000
});

async function runQuery(script: string, query: string) {
	await connection.connecting;
	const runtime = new SingleConnectionRuntime(connection);
	const model = runtime.loadModel(script);
	const runner = model.loadQuery(query);
	return await runner.run();
}

export { connection, runQuery };
