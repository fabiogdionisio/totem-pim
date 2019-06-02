var gulp = require(`gulp`);
var sass = require(`gulp-sass`);
var inject = require(`gulp-inject`);
var connect = require(`gulp-connect`);
var concat = require(`gulp-concat`);
var imagemin = require(`gulp-imagemin`);
var minifyCss = require(`gulp-minify-css`);
var terser = require(`gulp-terser`);


gulp.task(`sass`, function() {
	return gulp.src('src/scss/*.scss')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('src/css'))

});

gulp.task('vendors', function() {
	return gulp.src('src/js/vendors/*.js')
	.pipe(concat('0-vendors.js'))
	.pipe(gulp.dest('src/js/'))

});

gulp.task('inject', function () {
	var target = gulp.src('./src/**/*.html');
	var sources = gulp.src(['./src/js/*.js', './src/css/*.css'], {read: false});
	 
	return target.pipe(inject(sources, {relative: true}))
	.pipe(gulp.dest('./src'))

});

gulp.task('build-css', ['sass'], function(){
	return gulp.src('src/css/style.css')
	.pipe(gulp.dest('dist/css'));

});

gulp.task('build-js', ['vendors'], function() {
	return gulp.src('src/js/*.js')
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('dist/js/'));

})

gulp.task('build-img', function(){
	return gulp.src('src/img/**/*')
	.pipe(gulp.dest('dist/img'));

});

gulp.task('build-html', function(){
	return gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist/'));

});

gulp.task('build', ['build-css', 'build-js', 'build-img', 'build-html'], function(){
	var target = gulp.src('./dist/**/*.html');
 	var sources = gulp.src(['./dist/js/*.js', './dist/css/*.css'], {read: false});

  	return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./dist'));

})

gulp.task('minify-css', function() {
	return gulp.src('dist/css/*.css')
	.pipe(minifyCss())
	.pipe(gulp.dest('dist/css'))
})

gulp.task('minify-js', function() {
	return gulp.src('dist/js/*.js')
	.pipe(terser())
	.pipe(gulp.dest('dist/js'))
})

gulp.task('minify-img', function() {
	return gulp.src('dist/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))

});

gulp.task('minify', ['minify-img', 'minify-js', 'minify-css']);

gulp.task('connect', function() {
	return connect.server({
		root: 'src',
		livereload: true

	});
});

gulp.task('reload', function(){
	gulp.src('src/**/*')
	.pipe(connect.reload());

});

gulp.task('watch', ['sass', 'vendors', 'connect'], function() {
	gulp.watch('src/scss/**/*', ['sass']);
	gulp.watch('src/js/vendors/*.js', ['vendors']);
	gulp.watch('src/**/*', ['inject', 'reload']);

});

gulp.task('default', ['watch']);
