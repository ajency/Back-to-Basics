
// Gulp include call
var gulp = require('gulp');
// cssmin plugin
var cssmin = require('gulp-cssmin');
// concat to combine multiple files
var concat = require('gulp-concat');
// Autoprefixer for generated css files
var autoprefixer = require('gulp-autoprefixer');
// File rename auto
var rename = require('gulp-rename'); 
// Minify Js files
var uglify = require('gulp-uglify');


// 1) Minify Css file

gulp.task('minify-css', function () {
	// Please change the source to whatever required
	gulp.src('../assets/less/Generic/jquery.fullpage.css')
	// minify call
    .pipe(cssmin())
    // Renaming file when minifed(Default .min)
    .pipe(rename({suffix: '.min'}))
    // Autoprefixer
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
	// Provide destionation path
    .pipe(gulp.dest('../assets/less/Generic/'));
});


// 2) Minify Js files

gulp.task('uglify-js', function(){
    // Please change the source to whatever required
    return gulp.src('../assets/js/jquery.easing.minn.js')
        // minify call
        .pipe(uglify())
        // Renaming file when minifed(Default .min)
        .pipe(rename({suffix: '.min'}))
        //Provide destionation path
        .pipe(gulp.dest('../assets/js/'));
});

