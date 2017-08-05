var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    plumber = require("gulp-plumber"),
    gutil = require("gulp-util"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    jade = require("gulp-jade"),
    imagemin = require("gulp-imagemin");

//压缩js
gulp.task("uglifyjs",function(){
  gulp.src("src/js/**/*.js")
      //将流先输入plumber中，以便在出现异常后捕获
      .pipe(plumber(errHandle("uglifyjs")))
      .pipe(uglify())//压缩js
      .pipe(gulp.dest("bundle/js"));//将压缩的文件输出到此目录下
});

function errHandle(title){
  return function(err){
    gutil.log(gutil.colors.red("["+title+"]"),err.toString());
    this.emit('end');
  };
}

//预处理sass
gulp.task("sAss",function(){
  return gulp.src("src/sass/**/*.sass")
      .pipe(plumber(errHandle("sAss")))
      .pipe(sass())
      .pipe(gulp.dest("src/css"));
});

//压缩css
gulp.task("minifycss",function(){
  gulp.src("src/css/**/*.css")
      .pipe(plumber(errHandle("minifycss")))
      .pipe(autoprefixer({//添加前缀
        browsers : "last 2 versions"
      }))
      .pipe(minify())
      .pipe(gulp.dest("bundle/css"));
});

//编译jade
gulp.task("jade",function(){
  gulp.src("src/jade/**/*.jade")
      .pipe(plumber(errHandle("jade")))
      .pipe(jade({pretty:true}))
      .pipe(gulp.dest("bundle/html"));
});

//压缩图片
gulp.task("imagemin",function(){
  gulp.src("src/img/*")
      .pipe(plumber(errHandle("imagemin")))
      .pipe(imagemin({
        progressive:true
      }))
      .pipe(gulp.dest("bundle/img"));
});

//所有任务一起
gulp.task("all",["jade,uglifyjs,minifycss,imagemin"]);
