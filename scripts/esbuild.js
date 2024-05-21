import fs from "fs";
import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

const src_relpath = "src";
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
const built_components_relpath = `${build_assets_relpath}/components`;
const built_pages_relpath = build_relpath;

const build_relpaths = [
  build_relpath,
  build_assets_relpath,
  built_components_relpath,
  `${built_pages_relpath}/devices`,
  `${built_pages_relpath}/devices/show`
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
    outdir: built_components_relpath,
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
        preprocess: sveltePreprocess({
          typescript: true,
//          scss: true,
//          postcss: true
        })
      }),
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

