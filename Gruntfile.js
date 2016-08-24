'use strict';
module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var config = {
        src : "src",
        dest : "dest",
    }

    grunt.initConfig({
        config : config,
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> by <%= pkg.author %> */\n'
            },
            buildDest: {
                options: {
                    report: "min",
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    '<%= config.dest %>/js/marketingPlan.min.js': ['<%= config.src %>/js/marketingPlan.js']
                }
            },
            buildLive: {
                options: {
                    report: "min"
                },
                files: {
                    '<%= config.dest %>/js/marketingPlan.min.js': ['<%= config.src %>/js/marketingPlan.js']
                }
            }
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
                    '<%= config.dest %>/css/marketingplan.css': '<%= config.src %>/css/marketingplan.less'
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: '<%= config.src %>/', src: ['*.html'], dest: '<%= config.dest %>/', filter: 'isFile' },
                    { expand: true, cwd: '<%= config.src %>/css/', src: ['*.css'], dest: '<%= config.dest %>/css/', filter: 'isFile' },
                    { expand: true, cwd: '<%= config.src %>/js/', src: ['**'], dest: '<%= config.dest %>/js/' },
                    { expand: true, cwd: '<%= config.src %>/font/', src: ['**'], dest: '<%= config.dest %>/font/' },
                    { expand: true, cwd: '<%= config.src %>/images/', src: ['**'], dest: '<%= config.dest %>/images/' },
                ]
            },
            html: {
                files: [
                    { expand: true, cwd: '<%= config.src %>/', src: ['*.html'], dest: '<%= config.dest %>/', filter: 'isFile' }
                ]
            },
            css: {
                files: [
                    { expand: true, cwd: '<%= config.src %>/css/', src: ['*.css'], dest: '<%= config.dest %>/css/', filter: 'isFile' }
                ]
            },
            images: {
                files: [
                    { expand: true, cwd: '<%= config.src %>/images/', src: ['**'], dest: '<%= config.dest %>/images/' }
                ]
            },
            js: {
                files: [
                    { expand: true, cwd: '<%= config.src %>/js/', src: ['**'], dest: '<%= config.dest %>/js/' }
                ]
            }
        },
        clean: {
            scripts: ['<%= config.dest %>/js/marketingPlan.js']
        },
        connect: {
            server: {
                options: {
                    port: 9090,
                    base: '<%= config.dest %>'
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%= config.src %>/js/marketingPlan.js'],
                tasks: ['uglify:buildLive'],
                options: {
                    spawn: false,
                    livereload: true//即时更新至浏览器
                },
            },
            js: {
                files: ['<%= config.src %>/js/*.js', '!<%= config.src %>/js/marketingPlan.js'],
                tasks: ['copy:js', 'clean'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            less: {
                files: ['<%= config.src %>/css/marketingplan.less'],
                tasks: ['less'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['<%= config.src %>/css/*.css'],
                tasks: ['copy:css'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['<%= config.src %>/*.html'],
                tasks: ['copy:html'],
                options: {
                    livereload: true,
                },
            },
            images :{
                files: ['<%= config.src %>/images/**'],
                tasks: ['copy:images'],
                options: {
                    livereload: true,
                },
            },
        },
    });

    /*// 加载JS压缩插件。
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
    grunt.loadNpmTasks('grunt-contrib-watch');*/

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['copy:main', 'clean', 'uglify:buildDest', 'less']);
    // 调试服务器
    grunt.registerTask('live', ['connect', 'watch']);
};
