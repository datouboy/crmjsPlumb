'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> by <%= pkg.author %> */\n'
            },
            /*build: {
              src: 'src/<%= pkg.name %>.js',
              dest: 'build/<%= pkg.name %>.min.js'
            }*/
            builda: { //任务一
                options: {
                    report: "min"
                },
                files: {
                    'dest/js/marketingPlan.min.js': ['src/js/marketingPlan.js']
                }
            },
        },
        less: {
            production: {
                options: {
                    paths: ['assets/css'],
                    plugins: [
                        new(require('less-plugin-autoprefix'))({ browsers: ["ie >= 8", "ie_mob >= 10", "ff >= 26", "chrome >= 30", "safari >= 6", "opera >= 23", "ios >= 5", "android >= 2.3", "bb >= 10"] }), //自动补全CSS3的前缀
                        new(require('less-plugin-clean-css'))() //压缩CSS
                    ]
                },
                files: {
                    'dest/css/marketingplan.css': 'src/css/marketingplan.less'
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/', src: ['*.html'], dest: 'dest/', filter: 'isFile' },
                    { expand: true, cwd: 'src/css/', src: ['*.css'], dest: 'dest/css/', filter: 'isFile' },
                    { expand: true, cwd: 'src/js/', src: ['**'], dest: 'dest/js/' },
                    { expand: true, cwd: 'src/font/', src: ['**'], dest: 'dest/font/' },
                    { expand: true, cwd: 'src/images/', src: ['**'], dest: 'dest/images/' },
                ]
            },
            html: {
                files: [
                    { expand: true, cwd: 'src/', src: ['*.html'], dest: 'dest/', filter: 'isFile' }
                ]
            },
            css: {
                files: [
                    { expand: true, cwd: 'src/css/', src: ['*.css'], dest: 'dest/css/', filter: 'isFile' }
                ]
            },
            images: {
                files: [
                    { expand: true, cwd: 'src/images/', src: ['**'], dest: 'dest/images/' }
                ]
            },
            js: {
                files: [
                    { expand: true, cwd: 'src/js/', src: ['**'], dest: 'dest/js/' }
                ]
            }
        },
        clean: {
            scripts: ['dest/js/marketingPlan.js']
        },
        connect: {
            server: {
                options: {
                    port: 9090,
                    base: 'dest'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/js/marketingPlan.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                    livereload: true//即时更新至浏览器
                },
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['copy:js', 'clean'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            less: {
                files: ['src/css/marketingplan.less'],
                tasks: ['less'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['src/css/*.css'],
                tasks: ['copy:css'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['src/*.html'],
                tasks: ['copy:html'],
                options: {
                    livereload: true,
                },
            },
            images :{
                files: ['src/images/**'],
                tasks: ['copy:images'],
                options: {
                    livereload: true,
                },
            },
        },
    });

    // 加载JS压缩插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 加载Less编译插件
    grunt.loadNpmTasks('grunt-contrib-less');
    // 加载文件Copy插件
    grunt.loadNpmTasks('grunt-contrib-copy');
    // 加载清除文件插件
    grunt.loadNpmTasks('grunt-contrib-clean');
    // 加载测试服务器插件
    grunt.loadNpmTasks('grunt-contrib-connect');
    // 加载实时监听内容改变插件
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['copy:main', 'clean', 'uglify', 'less']);
    // 调试服务器
    grunt.registerTask('live', ['connect', 'watch']);
};
