// Gulp plugins
var gulp      = require('gulp');
var prefix    = require('gulp-autoprefixer');
var data      = require('gulp-data');
var gulpIf    = require('gulp-if');
var imagemin  = require('gulp-imagemin');
var include   = require('gulp-include');
var notify    = require('gulp-notify');
var uglify    = require('gulp-uglify');
var render    = require('gulp-nunjucks-render');
var plumber   = require('gulp-plumber');
var sass      = require('gulp-sass');
var maps      = require('gulp-sourcemaps');

// Other plugins
var sequence  = require('run-sequence');
var sync      = require('browser-sync');
var del       = require('del');
var fs        = require('fs');

/** 
 * Commands:
 * gulp
 * gulp images
 * gulp nunjucks
 * gulp sass
 * gulp scripts
 * gulp watch
 */

// Whether build is for testing or production
var isProd = false;

// Project build directories
var config = {
  src: 'dev/',
  dest: 'app/'
}

// Plug-in settings
var includeSettings = {
  includePaths: [
    __dirname + "/bower_components",
    __dirname + "/dev/js"
  ]
}

// Prompt any error then end current task
function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      // Custom error title
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
    })
  });
}

// Activates browser sync to automatically update browser upon detecting changes
gulp.task('sync', function() {
  sync({
    // Set base directory of server to root folder
    server: { baseDir: './' },
    // Prevents browsers from opening automatically
    open: true,
    // Disable pop-over notification
    notify: true,
  })
});

// Removed all files from destination folder before rebuild
gulp.task('clean', function() {
  return del('app/');
});

// Concatenates and minifies all js files
gulp.task('scripts', function(){
  return gulp.src(config.src + 'js/main.js')
    .pipe(customPlumber('Error Running Scripts'))
    // Initialize sourcemaps
    .pipe(gulpIf(isProd == false, maps.init()))
    .pipe(include(includeSettings))
    .pipe(gulpIf(isProd == true, uglify()))
    // Write sourcemaps
    .pipe(gulpIf(isProd == false, maps.write()))
    .pipe(gulp.dest(config.dest + 'js'))
    .pipe(notify({ message: 'Scripts Complete!', onLast: true }))
    // Tells browser sync to reload files when task is done
    .pipe(sync.reload({ stream: true }))
});

// Compile all sass into css
gulp.task('sass', function() {
  var sassOptions = { outputStyle: 'compressed' };
  var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };

  return gulp.src(config.src + 'scss/**/*.scss')
    .pipe(customPlumber('Error Running Sass'))
    // Initialize sourcemaps
    .pipe(gulpIf(isProd == false, maps.init()))
    .pipe(gulpIf(isProd == false, sass(), sass(sassOptions)))
    // Add prefixes for IE8, IE9 and last 2 versions of all other browsers
    .pipe(prefix(autoprefixerOptions))
    // Write sourcemaps
    .pipe(gulpIf(isProd == false, maps.write()))
    .pipe(gulp.dest(config.dest + 'css'))
    .pipe(notify({ message: 'Sass Complete!', onLast: true }))
    // Tells browser sync to reload files when task is done
    .pipe(sync.reload({ stream: true }))
});

// Compile all nunjucks logic into html
gulp.task('nunjucks', function() {
  // Identify location of nunjucks partials
  //render.nunjucks.configure([config.src + 'templates/']);

  render.nunjucks.configure(config.src);

  // Get all html and nunjucks files in pages
  return gulp.src(config.src + 'pages/**/*.+(html|nunjucks)')
    .pipe(customPlumber('Error Running Nunjucks'))
    .pipe(data(function() { return JSON.parse(fs.readFileSync(config.src + 'data/data.json')) }))
    .pipe(render({path: [config.src + 'templates/']}))
    //.pipe(render({data: {masterlayout: 'layout.nunjucks'}}))
    .pipe(gulp.dest(''))
    .pipe(notify({ message: 'Nunjucks Complete!', onLast: true }))
    // Tells browser sync to reload files when task is done
    .pipe(sync.reload({ stream: true }))  
});

// Minify all images
gulp.task('images', function() {
  var imageSettings = [
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ];

  return gulp.src(config.src + 'img/**/*')
    .pipe(imagemin(imageSettings))
    .pipe(gulp.dest(config.dest + 'img'))
    .pipe(notify({ message: 'Images Complete!', onLast: true }))
});

// Move video files
gulp.task('videos', function() {
  return gulp.src(config.src + 'vid/*')    
    .pipe(gulp.dest(config.dest + 'vid'))
    .pipe(notify({ message: 'Videos Complete!', onLast: true }))
});

// Watch specified folders and files for any changes
gulp.task('watch', function(){
  gulp.watch(config.src + 'img/**/*', ['images']);
  gulp.watch(config.src + 'js/**/*.js', ['scripts']);
  gulp.watch(config.src + 'scss/**/*.scss', ['sass']);
  gulp.watch([
    config.src + 'templates/**/*.+(html|nunjucks)', 
    config.src + 'pages/**/*.+(html|nunjucks)',
    config.src + 'data/data.json'],
    ['nunjucks']
  );
});

gulp.task('prod', function(callback) {
  isProd = true;

  sequence(
    ['clean'],
    ['videos', 'images'],
    ['default'],
    callback
  )
});

// Executes a sequence of tasks
gulp.task('default', function(callback) {
  sequence(
    ['scripts', 'sass', 'nunjucks'],
    ['sync', 'watch']
  )
});
