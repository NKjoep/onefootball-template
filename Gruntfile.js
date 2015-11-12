module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt); //will auto-load tasks from dependencies

  var fs = require('fs'); //laod the core module `fs` needed to read the json

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), //load some variables from the package.json

    ejs: { //read all out ejs files and compile it
      all: {
        src: ['./src/template.ejs'],
        dest: '<%= pkg.distPath %>/index.html',
        options: {
          //here i discard some other things, I focus to data.info
          data: JSON.parse(fs.readFileSync('./src/data.json')).data.info
        }
      }
    },

    copy: { //copy the assets
      assets: {
        expand: true,
        cwd: './src/',
        src: 'assets/**',
        dest: '<%= pkg.distPath %>/'
      }
    },

    clean: { //clean, I have shower every morning...
      build: {
        src: [
          '<%= pkg.distPath %>/**/*'
        ]
      }
    },

    less: { //compile the less
      template: {
        files: {
          '<%= pkg.distPath %>/assets/app.css': './src/app.less'
        },
        options: {
          //here's a trick, pass some values from the json
          modifyVars: {
            'brand-color': '#<%= ejs.all.options.data.clubTeam.colors.mainColor %>',
            'player-img': '"<%= ejs.all.options.data.imageSrc %>"',
            'team-img': '"<%= ejs.all.options.data.clubTeam.logoUrls[1].url %>"'
          }
        }
      }
    },

    watch: { // watch the `src` folder
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

  grunt.registerTask('default', ['build']); //the default task

};
