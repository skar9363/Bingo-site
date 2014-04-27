module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
    	server: {
    		options: {
    			port: 9000,
    			base: 'src',
    			hostname: 'localhost',
    			keepalive: true
    		}
    	}
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/scripts/index.js', 'src/scripts/preload.js', 'src/scripts/perspective_mouse.js', 'src/scripts/scroll_at.js'],
        dest: 'dist/scripts/<%= pkg.name %>.js'
      }
    },
    htmlmin: {    
      dist: {
        options: {
          removeComments: true,   //去注析
          collapseWhitespace: true  //去换行
        },
        files: {
          'dist/index.html': 'src/index.html',
          'dist/no_ie.html': 'src/no_ie.html'
        }
      }
    },
    cssmin: {
      with_banner: {
        options: {
          banner: '/* Bingo Css files by Bingo Li <%= grunt.template.today("dd-mm-yyyy") %> */'
        },
        files: {
          'dist/styles/index.css': 'src/styles/index.css'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        files: [
          {src: ['src/scripts/jquery.min.js'],dest: 'dist/scripts/jquery.min.js'},
          {src: ['<%= concat.dist.dest %>'],dest: 'dist/scripts/<%= pkg.name %>.min.js'}
        ]        
      }
    }
  });

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	// Server task
	grunt.registerTask('server',['connect']);
	// Default task(s).
	grunt.registerTask('default', ['concat', 'htmlmin', 'cssmin', 'uglify']);

};