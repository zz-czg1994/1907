const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleancss = require("gulp-clean-css");
const babel = require("gulp-babel");
const imagemin =require("gulp-imagemin")


gulp.task("copyhtml",function(){
    gulp.src("html/*.html").pipe(gulp.dest("dist/data")).pipe(connect.reload())
})

gulp.task("copycss",function(){
    gulp.src("css/*.css").pipe(gulp.dest("dist/css"))
})

gulp.task("babel",function(){
	gulp.src("js/*.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("js/test"));
})

gulp.task('copyjs',function(){
	gulp.src('js/test/*.js')

	.pipe(uglify())//压缩
	.pipe(rename({
		suffix:'.min'
	}))//重命名
	.pipe(gulp.dest('dist/js'))//放置
})

gulp.task("copyimg",function(){
    gulp.src("img/**")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})

gulp.task('sass',function(){
	gulp.src('sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(cleancss())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css'))  
}) 

// 监听
/* gulp.task('watch',function(){
	gulp.watch(['html/*.html','css/*.css','js/*.js','js/test/*.js','img/**','sass/*.scss'],['copyhtml','copycss','babel','copyjs','copyimg','sass'])
}) */
// 执行
/* gulp.task('build',['copyhtml','copycss','babel','copyjs','copyimg','sass'],function(){
	console.log("succeed")
}) */

gulp.task("server",function(){
	connect.server({
		root:'dist',
		livereload:true
	})
})

gulp.task('default',['watch','server']);
