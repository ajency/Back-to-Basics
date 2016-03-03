

// Gulp include call
    var gulp = require('gulp');

// File rename 
    var rename = require('gulp-rename'); 

// Minify Js files
    var uglify = require('gulp-uglify');



// Tasks


// Minify Js files

// Command- gulp uglify-js

// Custom variable for changing css source(Please change here to minify JS)
    var js_source = ['../assets/js/typical.js','../assets/js/left-column.js'];

// Output destionation file
    var js_dest = '../assets/js' ;

    gulp.task('uglify-js', function(){
            return gulp.src(js_source)
                .pipe(uglify())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(js_dest));
    });



// Default gulp task

gulp.task('default', ['uglify-js'], function() {

// to watch files add tasks here

});




















