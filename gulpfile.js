//All dependences
var gulp 		  	= require('gulp'), //gulp
	pump 			= require('pump'), //show js errors
	babel			= require('gulp-babel'), //compile es6 js

	sass 			= require('gulp-sass'), //to compile sass
    concat 			= require('gulp-concat'), //to concat
    rename 			= require('gulp-rename'), //to rename
    uglify 			= require('gulp-uglify'), //to uglify js
    minify			= require('gulp-minify-css'), //to minify css
    autoprefixer 	= require('gulp-autoprefixer'); //auto prefix(no use)

//paths
var path = {
	js 		: './core/simpleToast.js',
	sass 	: './core/simpleToast.scss',
	build 	: './build'
}

//SASS task. Compile css, concat all in 1 and minify
gulp.task('sass', function(){
	gulp.src(path.sass)
		.pipe(sass())
		.pipe(concat('simpleToast.min.css'))
		.pipe(minify())
		.pipe(gulp.dest(path.build))
})

//JS task. Compile es6 JS, concat all files in 1, uglify and rename to .min
gulp.task('js', function(cb) {
	pump([
	    gulp.src(path.js)
	    .pipe(babel({
	        presets: ['env']
	    }))
		.pipe(concat('simpleToast.js'))
		.pipe(uglify())
		.pipe(rename('simpleToast.min.js')),
		gulp.dest(path.build)
	], cb );
})

//execute sass and js
gulp.task('all', ['sass', 'js'])

//watch to save
gulp.task('watch', function() {
	gulp.watch(path.sass, ['sass']);
	gulp.watch(path.js, ['js']);
})