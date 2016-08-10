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
      builda: {//任务一
        options: {
          report: "min"
  		  },
    		files: {
    		  'js/marketingPlan.min.js': ['js/marketingPlan.js']
    		}
      },
    },
    less: {
      production: {
        options: {
          paths: ['assets/css'],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["ie >= 8","ie_mob >= 10","ff >= 26","chrome >= 30","safari >= 6","opera >= 23","ios >= 5","android >= 2.3","bb >= 10"]}),//自动补全CSS3的前缀
            new (require('less-plugin-clean-css'))()//压缩CSS
          ]
        },
        files: {
          'css/marketingplan.css': 'css/marketingplan.less'
        }
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // 加载Less编译插件
  grunt.loadNpmTasks('grunt-contrib-less');
  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify','less']);
};