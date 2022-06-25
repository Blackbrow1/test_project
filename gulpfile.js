const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const htmlMin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const include = require('gulp-file-include');
const del = require('del');
const libsquoosh = require('gulp-libsquoosh');
const newer = require('gulp-newer');
const webp = require('gulp-webp');

// const ftp = require('vinyl-ftp');
// const log = require('gulp-util');

function server() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        },
        notify: false,
    });
}

function scripts() {
    return src([
        'src/js/script.js'
        // Здесь можно добавить еще файлы, например JQuery
    ]).pipe(concat('script.min.js'))
    .pipe(terser({
        format: {
            comments: false,
        },
    }))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

function watchFiles() {
    watch(['src/js/**/*.js'], scripts);
    watch(['src/scss/**/*.scss'], style);
    watch(['src/**/*.html']).on('change', series(html, browserSync.reload));
    watch(['src/images/**/*'], image);
    watch(['src/fonts/*'], fonts)
}

function style() {
    return src('src/scss/main.scss') // Можно добавить еще файлы sass
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer({
        cascade: false,
        overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(cleanCss())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function html() {
    return src('src/**/*.html', {
        ignore: 'src/parts/**/*'
    })
    .pipe(include({
        prefix: '@@',
        basepath: '@file',
    }))
    .pipe(dest('dist/nominifi/'))
    .pipe(htmlMin({ collapseWhitespace: true, removeComments: true }))
    .pipe(newer('dist/'))
    .pipe(dest('dist/'));
}

function fonts() {
  return src('src/fonts/*')
  .pipe(dest('dist/fonts/'))
}

function clear() {
    return del('dist');
}

function image() {
    return src('src/images/**/*', {base: 'src'})
    .pipe(newer('dist/'))
    .pipe(libsquoosh())
    .pipe(dest('dist/'))
    .pipe(webp())
    .pipe(dest('dist/'));
}


// function deploy() {
//     const connect = ftp.create( {
//         host:     'mywebsite.tld',
//         user:     'me',
//         password: 'mypass',
//         parallel: 10,
//         log:      util.log
//     } );
//     return src('dist/**/*', {base: 'dist'})
//     .pipe(connect.dest('/'));
// }

exports.default = parallel(series(clear, html, style, fonts, scripts, image, server), watchFiles);
exports.build = series(clear, html, style, fonts, scripts, image);

//exports.deploy = deploy;
