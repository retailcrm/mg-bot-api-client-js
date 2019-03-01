import babel from 'rollup-plugin-babel';
// import builtins from 'rollup-plugin-node-builtins';

let pluginOptions = [
    // builtins(),
    babel({
        exclude: 'node_modules/**',
    }),
];

export default [{
    input: 'index.js',
    output: {
        name: 'main',
        file: 'dist/index.js',
        format: 'umd',
    },
    plugins: pluginOptions,
}];