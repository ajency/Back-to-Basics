

// Gulp include call
    var gulp = require('gulp');

// File rename 
    var rename = require('gulp-rename'); 

// Minify Js files
    var uglify = require('gulp-uglify');

//Concat files
    var concat = require('gulp-concat');


// Tasks(Command - gulp)


// Minify Js files

// Custom variable for theme JS file path
    var js_source = ['../assets/js/typical.js','../assets/js/left-column.js'];

// Output destionation file
    var js_dest = '../assets/js' ;

    gulp.task('uglify-js', function(){
            return gulp.src(js_source)
                .pipe(uglify())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(js_dest));
    });


//To combine and minify js files.


// Custom variable for combining all JS assests and combining it into one.
    var js_source1 = [
        '../assets/js/plugins/jquery.easing.min.js',
        '../assets/js/plugins/masonry.pkgd.min.js',
        '../assets/js/plugins/imagesloaded.pkgd.js',
        '../assets/js/plugins/animsition.min.js',
        '../assets/js/plugins/jquery.mousewheel.min.js',
        '../assets/js/plugins/photoswipe.min.js',
        '../assets/js/plugins/photoswipe-ui-default.min.js',
        '../assets/js/plugins/Responsive-Timeline.js'
    ];

// Output destionation file
    var js_dest1 = '../assets/js/plugins';

    gulp.task('combine-js', function(){
            return gulp.src(js_source1)
                .pipe(uglify())
                .pipe(concat('plugins.js'))
                .pipe(rename('plugins.min.js'))
                .pipe(gulp.dest(js_dest1));
    });



// Default gulp task

gulp.task('default', ['uglify-js','combine-js'] , function() {

// to watch files add tasks here

});




















