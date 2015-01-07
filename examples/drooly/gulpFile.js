'use strict';

var gulp 			= require('gulp'),
	browerFiles = require('main-bower-files'),
	browserSync = require('browser-sync'),
	chalk 			= require('chalk'),
	gulpif 			= require('gulp-if'),
	open 				= require('open'),
	runSequence = require('run-sequence'),
	stylish 		= require('jshint-stylish'),
	del 				= require('del'),
	plugins 		= require('gulp-load-plugins')();

//src path
var src = {
	root : 'app',
	css : 'app/css',
	js : 'app/js',
	fonts : 'app/fonts',
	images : 'app/images',
	sass : './sass',
	bower : './bower_components',
	zip : './zip'
};

//build path
var build = {
	root : 'build',
	css : 'build/css',
	js : 'build/js',
	fonts : 'build/fonts',
	images : 'build/images'
};

var production = false;

// minify html options
var opts = {
	comments: false,
	quotes: true,
	spare: true,
	empty: true,
	cdata: true
};

// chalk config
var error = chalk.red.bold,
	hint = chalk.yellow.bold,
	change = chalk.red;

//server and live reload config
var serverConfig = {
	host : 'localhost',
	port : 3000,
	livereload: true,
	open: true
};

//bower config
var bowerConfig = {
	paths: {
		bowerDirectory: src.bower,
		bowerrc: '.bowerrc',
		bowerJson: 'bower.json'
	}
};

/**================================================
		List all gulp tasks
===================================================*/

gulp.task('help', plugins.taskListing);

/**================================================
		Server & livereload using gulp-connect
===================================================*/

gulp.task('server', function () {

	console.log(hint('\n --------- Server Started http://localhost:'+ serverConfig.port +' ------------------------>>> \n'));
	return gulp.src('build')
		.pipe(plugins.webserver(serverConfig));
});

/**================================================
		HTML -- minify html to build
===================================================*/

gulp.task('html', function () {

	console.log(hint('\n --------- Running HTML tasks ------------------------------------------>>>'));
	return gulp.src([src.root + '/*.html', src.root + '/**/*.html'])
		.pipe(gulpif(production, plugins.minifyHtml(opts)))
		.pipe(plugins.fileInclude({
			prefix: '@@',
			basepath: './app/templates/' //path to templates
		}))
		.pipe(plugins.size())
		.pipe(gulp.dest(build.root));
});

/**===============================================
		CSS & SASS Tasks -- minify, concat
=================================================*/

var callback = function (err) {
	console.log(error('\n SASS file has error clear it to see changes, see below log ------------->>> \n'));
	console.log(error(err));
};

gulp.task('sass', function () {

	console.log(hint('\n --------- Running SASS tasks ------------------------------------------->>>'));
	return gulp.src([src.css + '/app.scss'])
		.pipe(plugins.sass({ onError: callback }))
		.pipe(plugins.size())
		.pipe(gulp.dest(src.sass));
});

gulp.task('fonts', function () {

	console.log(hint('\n --------- Running Fonts tasks -------------------------------------------->>>'));
	return gulp.src([src.fonts + '/*.*', src.fonts + '/**/*.*'])
		.pipe(plugins.size())
		.pipe(gulp.dest(build.fonts));
});

gulp.task('css', ['sass', 'fonts'], function () {

	console.log(hint('\n --------- Running CSS tasks -------------------------------------------->>>'));
	return gulp.src([src.css + '/**/*.css', src.sass + '/app.css'])
		.pipe(gulpif(production, plugins.minifyCss()))
		.pipe(plugins.concat('styles.css'))
		.pipe(plugins.size())
		.pipe(gulp.dest(build.css));
});

/**================================================
		Script Tasks -- js hint & uglify & concat
===================================================*/

gulp.task('scripts', function () {

	console.log(hint('\n --------- Running SCRIPT tasks ----------------------------------------->>>'));
	return gulp.src([src.js + '/*.js', src.js + '/**/*.js'])
		.pipe(plugins.jshint('.jshintrc'))
		.pipe(plugins.jshint.reporter(stylish))
		.pipe(plugins.concat('all.js'))
		.pipe(gulpif(production, plugins.uglify()))
		.pipe(plugins.size())
		.pipe(gulp.dest(build.js));
});

/**================================================
		Concat - all bower packages
===================================================*/

gulp.task('concat-bower', function () {

	console.log(hint('\n --------- Bower Concat ------------------------------------------------->>> \n'));
	var jsFilter   = plugins.filter('**/*.js'),
		cssFilter  = plugins.filter('**/*.css');

	//for js files
	return gulp.src(browerFiles(bowerConfig), { base : './bower_components'})
		.pipe(jsFilter)
		.pipe(plugins.concat('bower.js'))
		.pipe(gulpif(production, plugins.uglify()))
		.pipe(plugins.size())
		.pipe(gulp.dest(build.js))
		.pipe(jsFilter.restore())

		//for css files
		.pipe(cssFilter)
		.pipe(plugins.concat('bower.css'))
		.pipe(gulpif(production, plugins.uglify()))
		.pipe(plugins.size())
		.pipe(gulp.dest(build.css))
		.pipe(cssFilter.restore());
});

/**================================================
			Images minification
===================================================*/

gulp.task('img-min', function () {

	console.log(hint('\n --------- Image Minification -------------------------------------------->>> \n'));
	return gulp.src([src.images + '/*.*', src.images + '/**/*.*'])
		.pipe(plugins.imagemin())
		.pipe(plugins.size())
		.pipe(gulp.dest(build.images));
});

/**===============================================
		Watch -- all files
=================================================*/

gulp.task('watch', function () {

	console.log(hint('\n --------- Watching All Files ------------------------------------------->>> \n'));
	var HTML  = gulp.watch(['app/*.html', 'app/**/*.html'], ['html']),
		JS      = gulp.watch(['app/*.js', 'app/js/**/*.js'], ['scripts']),
		CSS     = gulp.watch(['app/*.css', 'app/css/**/*.css'], ['css']),
		SASS    = gulp.watch(['app/*.scss', 'app/css/**/*.scss'], ['css']),
		FONTS   = gulp.watch(['app/fonts/*.*', 'app/fonts/**/*.*'], ['fonts']),
		IMG     = gulp.watch(['app/images/*.*', 'app/images/**/*.*'], ['img-min']),
		BOWER   = gulp.watch(['bower_components/**/*.*', 'bower_components/**/**', 'bower.json'], ['concat-bower']);

	var log = function (event) {
		if (event.type == 'deleted') {
			runSequence('clean');
			setTimeout(function () {
				runSequence('html', 'scripts', 'css', 'watch');
			}, 500);
		}
		console.log(change('\n -- File ' + event.path + ' was ' + event.type + ' -->>>'));
	};

	//on change print file name and event type
	HTML.once('change', log);
	CSS.once('change', log);
	SASS.once('change', log);
	JS.once('change', log);
	IMG.once('change', log);
	FONTS.once('change', log);
	BOWER.once('change', log);
});

/**================================================
		Clean - remove files and folder in build
===================================================*/

gulp.task('clean', function () {
	console.log(hint('\n --------- Clean:Build Folder ------------------------------------------>>> \n'));
	
	del('build/', function (err) {
    console.log(hint('All are files deleted from the build folder'));
	});
});

/**================================================
		Browser sync to sync with browser
==================================================*/

gulp.task('browser-sync', function () {
	browserSync.init([build.root + '*/*.*', build.root + '**/*.*'],
	{
		server : { baseDir : './build' }
	});
});

/**================================================
		Zip all build files with date
==================================================*/

gulp.task('zip', function () {
	var date = new Date().toDateString();

	console.log(hint('\n --------- Zipping Build Files ------------------------------------------>>> \n'));
	return gulp.src([build.root + '/**/*'])
		.pipe(plugins.zip('build - ' + date + '.zip'))
		.pipe(plugins.size())
		.pipe(gulp.dest('./zip/'));
});

/**===============================================
		Gulp build Tasks - dev, production
=================================================*/

gulp.task('build', function () {

	console.log(hint('\n --------- Build Development Mode  -------------------------------------->>> \n'));
	runSequence('html', 'scripts', 'css', 'img-min', 'concat-bower', 'server', 'watch');
});

gulp.task('prod', function () {

	console.log(hint('\n --------- Build Production Mode  --------------------------------------->>> \n'));
	production = true;
	runSequence('html', 'scripts', 'css', 'img-min', 'concat-bower', 'server', 'watch');
});


/**==============================================
		Gulp Default Tasks -- build
=================================================*/

gulp.task('default', ['build']);
