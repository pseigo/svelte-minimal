import autoprefixer from "autoprefixer";
import esbuild from "esbuild";
//import esbuildSassPlugin from "esbuild-sass-plugin"
//const { esbuildSass } = esbuildSassPlugin;
import { sassPlugin } from "esbuild-sass-plugin"
import esbuildSvelte from "esbuild-svelte";
import fs from "fs";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";
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
const built_common_relpath = `${build_assets_relpath}/common`;
const built_components_relpath = `${build_assets_relpath}/components`;
const built_pages_relpath = build_relpath;

const build_relpaths = [
  build_relpath,
  build_assets_relpath,
  built_common_relpath,
  `${built_common_relpath}/styles`,
  built_components_relpath,
  `${built_pages_relpath}/devices`,
  `${built_pages_relpath}/devices/show`
];

build_relpaths.forEach(relpath => {
  if (!fs.existsSync(relpath)) {
    fs.mkdirSync(relpath);
  }
});

/*
esbuild.build({
  entryPoints: [`${src_common_relpath}/styles/global.css`],
  bundle: true,
  outdir: `${built_common_relpath}/styles`,
  minify: false,
  sourcemap: "inline",
  splitting: true,
  write: true,
  format: "esm",
  plugins: [
    sassPlugin({
      async transform(source, resolveDir) {
        const {css} = await postcss([autoprefixer, postcssPresetEnv({stage: 0})]).process(source, {from: undefined})
        return css
      }
    })
  ],
})
.catch((error, location) => {
  console.warn(`Errors: `, error, location);
  process.exit(1);
});
*/

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
      })
      /*
      sassPlugin({
        async transform(source, resolveDir) {
          const {css} = await postcss([autoprefixer, postcssPresetEnv({stage: 0})]).process(source, {from: undefined})
          return css
        }
      })
      */
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

