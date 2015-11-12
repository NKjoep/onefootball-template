module.exports = function(grunt) {
  'use strict';
  var fs = require('fs');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ejs: {
      all: {
        src: ['./src/template.ejs'],
        dest: '<%= pkg.distPath %>/index.html',
        options: {
          data: JSON.parse(fs.readFileSync('./src/data.json')).data.info
        }
      }
    },

    copy: {
      assets: {
        expand: true,
        cwd: './src/',
        src: 'assets/**',
        dest: '<%= pkg.distPath %>/'
      }
    },

    clean: {
      build: {
        src: [
          '<%= pkg.distPath %>/**/*'
        ]
      }
    },

    less: {
      template: {
        files: {
          '<%= pkg.distPath %>/assets/app.css': './src/app.less'
        }
      }
    },

    watch: {
      all: {
        files: ['./src/**'],
        tasks: ['build']
      }
    }
  });


  grunt.registerTask('dev', 'build the template in <%= pkg.distPath %> and watch for changes', function() {
    grunt.task.run([
      'clean', 'less:template', 'ejs', 'copy', 'watch'
    ]);
  });

  grunt.registerTask('build', 'build the template in <%= pkg.distPath %>', function() {
    grunt.task.run([
      'clean', 'less:template', 'ejs', 'copy'
    ]);
  });

  grunt.registerTask('default', ['build']);

};
