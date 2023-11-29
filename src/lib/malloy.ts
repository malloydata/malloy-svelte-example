import { DuckDBWASMConnection } from '@malloydata/db-duckdb/wasm';
import type { ModelMaterializer } from '@malloydata/malloy';
import { SingleConnectionRuntime } from '@malloydata/malloy';
import { getContext, setContext } from 'svelte';

export class MalloyModel {
  private connection: DuckDBWASMConnection;
  private runtime: SingleConnectionRuntime;
  private model: ModelMaterializer;

  constructor(script: string) {
    this.connection = new DuckDBWASMConnection('duckdb', null, undefined, {
      rowLimit: 1000
    });
    this.runtime = new SingleConnectionRuntime(this.connection);
    this.model = this.runtime.loadModel(script);
  }

  async runQuery(query: string) {
    await this.connection.connecting;
    const runner = this.model.loadQuery(query);
    return await runner.run();
  }
}

export function setMalloyModel(key: string | symbol, model: MalloyModel) {
  setContext(key, model);
  return model;
}

export function getMalloyModel(key: string | symbol) {
  return getContext(key) as MalloyModel;
}
