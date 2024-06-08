// https://kit.svelte.dev/docs/configuration
// https://svelte.dev/docs/svelte-compiler#types-compileoptions

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    dev: true,
    discloseVersion: false,
    hydratable: true
  }
};

export default config;
