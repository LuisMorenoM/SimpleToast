var gulp 			= require('gulp'),
	pump 			= require('pump'),
	babel			= require('gulp-babel'),

	sass 			= require('gulp-sass'),
	concat 			= require('gulp-concat'),
	rename 			= require('gulp-rename'),
	uglify 			= require('gulp-uglify'),
	minify			= require('gulp-minify-css'),
	autoprefixer 	= require('gulp-autoprefixer');
	
var path = {
	js 		: './core/simpleToast.js',
	sass 	: './core/simpleToast.scss',
	build 	: './build'
}

gulp.task('styles', function(){
	gulp.src(path.sass)
		.pipe(sass())
		.pipe(concat('simpleToast.min.css'))
		.pipe(minify())
		.pipe(gulp.dest(path.build))
})

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

gulp.task('all', ['styles', 'js'])

gulp.task('watch', function() {
	gulp.watch(path.sass, ['styles']);
	gulp.watch(path.js, ['js']);
})