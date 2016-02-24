

// Gulp include call
var gulp = require('gulp');

// cssmin plugin
var cssmin = require('gulp-cssmin');

// concat to combine multiple files
var concat = require('gulp-concat');

// Autoprefixer for generated css files
var autoprefixer = require('gulp-autoprefixer');

// File rename 
var rename = require('gulp-rename'); 

// Minify Js files
var uglify = require('gulp-uglify');



// Tasks

// 1) Minify Css file

// Command- gulp minify-css

// Custom variable for changing css source(Please change here to minify css)
var css_source = '';

// Output destionation file
var css_dest = '' ;

gulp.task('minify-css', function () {
	// Source path
	gulp.src(css_source)
	// minify call
    .pipe(cssmin())
    // Renaming file when minifed(Default .min)
    .pipe(rename({suffix: '.min'}))
    // Autoprefixer
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
	// Provide destionation path
    .pipe(gulp.dest(css_dest));
});


// 2) Minify Js files

// Command- gulp uglify-css

// Custom variable for changing css source(Please change here to minify JS)
var js_source = '';

// Output destionation file
var js_dest = '' ;

gulp.task('uglify-js', function(){
    // Please change the source to whatever required
    return gulp.src(js_source)
        // minify call
        .pipe(uglify())
        // Renaming file when minifed(Default .min)
        .pipe(rename({suffix: '.min'}))
        //Provide destionation path
        .pipe(gulp.dest(js_dest));
});

