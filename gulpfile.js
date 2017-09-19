let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let path = require('path');
let browserSync = require('browser-sync').create();
let ROOT = path.resolve(__dirname);
let server = path.resolve(ROOT, 'mock');

// browser-sync配置，配置里启动nodemon任务
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:8080",
        port: 8080
    });
});

// browser-sync 监听文件
gulp.task('mock', ['browser-sync'], function() {
    gulp.watch(['./mock/server.js', './mock/data/**'], ['bs-delay']);
});

// 延时刷新
gulp.task('bs-delay', function() {
    setTimeout(function() {
        browserSync.reload();
        console.log('restart');
    }, 1000);
});

// 服务器重启
gulp.task('nodemon', function(cb) {
    // 设个变量来防止重复重启
    let started = false;
    let stream = nodemon({
                             script: './mock/server.js',
                             // 监听文件的后缀
                             ext: "js",
                             env: {
                                 'NODE_ENV': 'development'
                             },
                             // 监听的路径
                             watch: [
                                 server
                             ]
                         });
    stream.on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    }).on('crash', function() {
        console.error('Application has crashed!\n')
        stream.emit('restart', 10)
    })
});
