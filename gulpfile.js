var gulp = require('gulp')
var mocha = require('gulp-mocha')
var eslint = require('gulp-eslint')

gulp.task('test', function () {
    gulp.src([
        './test/parser/getToken_test.js',
        './test/parser/parser_test.js',
        './test/core/accessor_test.js',
        './test/core/creator_test.js',
        './test/core/mutator_test.js',
        './test/helpers/pathNormalizer_test.js',
        './test/obj-path_test.js'
    ])
    .pipe(mocha())
})

gulp.task('lint', function () {
    return gulp.src('./**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
})
