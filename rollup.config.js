import babel from 'rollup-plugin-babel';

let pluginOptions = [
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