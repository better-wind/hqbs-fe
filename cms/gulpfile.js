var gulp = require('gulp');
var minimist = require('minimist');
var connect = require('gulp-connect');
//本地服务器
gulp.task('server',function(){
    connect.server({
        root : '',
        port : 8002,
        livereload : true
    });
});

gulp.task('default',['server']);

