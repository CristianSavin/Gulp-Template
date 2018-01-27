var gulp = require('gulp'), // Conectam gulp
	sass = require('gulp-sass'); // Conectam pachetul sass

gulp.task('sass' , function() {
	return gulp.src(['sass/**/*.sass' , 'sass/**/*.scss'])
	.pipe(sass({outputStyle: 'expanded'}).on('error' , sass.logError)) // Compilam din sass in css
	.pipe(gulp.dest('css')) // Incarcam in mapa css
});

gulp.task('watch' , function() {
	gulp.watch(['sass/**/*.sass' , 'sass/**/*.scss'] , ['sass']); // Verificam schimbarile in filurile sass
});

gulp.task('default' , ['watch']);