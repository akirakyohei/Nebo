import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import styles from "rollup-plugin-styles";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/**
 * @type {import('rollup').RollupOptions}
 * */
const config = [
  // {
  //   input: "src/editor.ts",
  //   plugins: [
  //     commonjs(),
  //     nodeResolve({ extensions, preferBuiltins: false }),
  //     terser(),
  //     typescript(),
  //     postcss({
  //       extensions: [".css"],
  //       modules: true,
  //       extract: path.resolve("dist/style.css"),
  //     }),
  //     babel({
  //       exclude: "node_modules/**",
  //       babelHelpers: "bundled",
  //     }),
  //     styles({ mode: "extract", modules: true, dts: true }),
  //   ],
  //   // external: [/\.css$/],
  //   output: [
  //     {
  //       file: "dist/WebEditor.min.js",
  //       format: "cjs",
  //       name: "WebEditor",
  //       sourceMap: true,
  //       // assetFileNames: "[name]-[hash][extname]",
  //     },
  //   ],
  // },
  // {
  //   input: "src/editor.js",
  //   plugins: [
  //     nodeResolve({ extensions }),
  //     babel({
  //       targets: {
  //         node: "18",
  //       },
  //       exclude: "node_modules/**",
  //       extensions,
  //       presets: ["@babel/preset-react"],
  //       babelHelpers: "bundled",
  //     }),
  //     commonjs(),
  //     resolve(),
  //     peerDepsExternal(),
  //     postcss({
  //       inject: true,
  //     }),
  //   ],
  //   moduleContext: (id) => {
  //     return "editor";
  //   },
  //   external: [/\.css$/],
  //   output: [
  //     {
  //       dir: "dist",
  //       format: "cjs",
  //       sourcemap: true,
  //     },
  //     {
  //       dir: "dist/esm",
  //       format: "esm",
  //       sourcemap: true,
  //       preserveModules: true,
  //     },
  //   ],
  // },
  {
    input: "src/index.ts",
    plugins: [
      nodeResolve({
        extensions,
        jsnext: true,
        main: true,
        browser: true,
        // preferBuiltins: false,
      }),
      babel({
        targets: {
          node: "18",
        },
        exclude: "node_modules/**",
        extensions,
        babelHelpers: "bundled",
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
      }),
      peerDepsExternal(),
      postcss({
        extensions: [".css"],
        extract: path.resolve("dist/style.css"),
        sourceMap: true,
      }),
      terser(),
      // styles({ mode: "extract", dts: true, modules: true, sourceMap: true }),
    ],
    output: [
      // {
      //   dir: "dist",
      //   format: "esm",
      //   preserveModules: true,
      // },
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
        preserveModules: true,
        exports: "named",
      },
      {
        dir: "dist", // Directory where rollup.js will put the built files
        sourcemap: true, // We want a source map to trace the original code
        format: "esm", // Built files will follow ES Module format
        preserveModules: true, // This one is important for treeshaking features of our library
        exports: "named",
      },
      // {
      //   dir: "dist/esm",
      //   format: "esm",
      //   sourcemap: true,
      //   preserveModules: true,
      //   preserveModulesRoot: "src",
      // },
    ],
  },
];
export default config;
