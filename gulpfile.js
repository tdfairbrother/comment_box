var gulp = require('gulp')
    , replace = require('gulp-replace')
    , gulpReact = require('gulp-react')
    , plumber = require('gulp-plumber');

var assets = {
    compile: function(){
        gulp.src('./src/**/*.js')
            .pipe(gulp.dest('./lib'))

        return gulp.src('./src/**/*.jsx')
            .pipe(plumber())
            .pipe(gulpReact({ harmony: true }))
            .pipe(replace(/.jsx/g, ''))
            .pipe(gulp.dest('./lib'));

    }
};

gulp.task('lib-clean',     assets.clean);
gulp.task('lib-compile',   ['lib-clean'], assets.compile);

gulp.task('build',     [ 'lib-compile']);