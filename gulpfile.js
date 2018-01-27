var gulp = require('gulp'), // Conectam gulp
	sass = require('gulp-sass'), // Conectam pachetul sass
	browserSync = require('browser-sync'), // Conectam Browser reload
	concat = require('gulp-concat'), // gulp-concat
	uglify = require('gulp-uglifyjs'), // gulp-uglify
	cssnano = require('gulp-cssnano'), // cssnano
	rename = require('gulp-rename'), // gulp-rename
	del = require('del'), // del
	imagemin = require('gulp-imagemin'),
	pngqunat = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('sass' , function() {
	return gulp.src(['app/sass/**/*.sass' , 'app/sass/**/*.scss'])
	.pipe(sass()) // Compilam din sass in css
	.pipe(autoprefixer(['last 15 versions' , '> 1%' , 'ie 8' , 'ie 7'] , {cascade: true}))
	.pipe(gulp.dest('app/css')) // Incarcam in mapa css
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts' , function() {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/bootstrap/dist/js/bootstrap.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app//js'));
});

gulp.task('css-libs', ['sass'] , function() {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync' , function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean' , function() {
	return del.sync('dist');
});

gulp.task('clear' , function() {
	return cache.clearAll();
});

gulp.task('img' , function() {
	return gulp.src('app/images/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugin : [{removeViewBox: false}],
		une: [pngqunat()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch' , ['browser-sync' , 'css-libs' , 'scripts'] , function() {
	gulp.watch(['app/sass/**/*.sass' , 'app/sass/**/*.scss'] , ['sass']); // Verificam schimbarile in filurile sass
	gulp.watch('app/*.html' , browserSync.reload);
	gulp.watch('app/js/**/*.js' , browserSync.reload);
});

gulp.task('default' , ['watch']);

gulp.task('build' , ['clean' , 'img' , 'sass' , 'scripts'] ,function() {
	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css'
	])
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs= gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));	

});






