const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.browserSync({
    proxy:'https://assos-inscription.test',
    browser: "chrome"
})
mix.js('resources/js/index.jsx', 'public/js')
    .react()
    .postCss('resources/css/index.css', 'public/css', [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ])
    .alias({
        '@': 'resources/js',
        '#': 'resources/css',
    });

    if (mix.inProduction()) {
        mix.version();
    }

