import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      fallback: 'index.html' // may differ from host to host
    }),
    paths: {
      base: '/asset/6cbeeb38-b73b-5610-8562-a6d111883456',
      relative: true
    }
  }
};

export default config;
