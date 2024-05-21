import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import fs from "fs";
import sveltePreprocess from "svelte-preprocess";

const src_relpath = "src";
const src_common_relpath = `${src_relpath}/common`;
const src_components_relpath = `${src_relpath}/components`;
const src_component_relpaths = [
  `${src_components_relpath}/thermostat.svelte`
];
const src_pages_relpath = `${src_relpath}/pages`;
//const src_page_relpaths = [
//  `${src_pages_relpath}/devices/show/index.html`
//];

const build_relpath = "build";
const build_assets_relpath = `${build_relpath}/assets`;
const build_common_relpath = `${build_assets_relpath}/common`;
const build_components_relpath = `${build_assets_relpath}/components`;
const build_pages_relpath = build_relpath;

const build_relpaths = [
  build_relpath,
  build_assets_relpath,
  build_common_relpath,
  `${build_common_relpath}/styles`,
  build_components_relpath,
  `${build_pages_relpath}/devices`,
  `${build_pages_relpath}/devices/show`
];

build_relpaths.forEach(relpath => {
  if (!fs.existsSync(relpath)) {
    fs.mkdirSync(relpath);
  }
});

src_component_relpaths.forEach(src_component_relpath => {
  esbuild.build({
    entryPoints: [src_component_relpath],
    bundle: true,
    outdir: build_components_relpath,
    mainFields: ["svelte", "browser", "module", "main"],
    conditions: ["svelte", "browser"],
    // logLevel: `info`,
    minify: false,
    sourcemap: "inline",
    splitting: true,
    write: true,
    format: "esm",
    plugins: [
      esbuildSvelte({
        // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#auto-preprocessing-options
        preprocess: sveltePreprocess({
          // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#typescript
          typescript: true,

          // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#scss-sass
          //scss: true,

          // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#postcss-sugarss
          postcss: true
        })
      })
    ],
  })
  .catch((error, location) => {
    console.warn(`Errors: `, error, location);
    process.exit(1);
  });
});

fs.copyFileSync(
  `${src_pages_relpath}/devices/show/index.html`,
  `${build_relpath}/devices/show/index.html`);
