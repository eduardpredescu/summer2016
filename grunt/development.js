module.exports = {
  less: {
    development: {
      options: {
        compress: false,
        sourceMap: true,
        sourceMapFilename: '<%= path.static %>/css/source.css.map',
        sourceMapURL: './source.css.map'
      },
      files: {
        '<%= path.static %>/css/main.css': '<%= path.src %>/less/main.less'
      }
    }
  },
  copy: {
    scripts: {
      files: [
        { expand: true,
          cwd: '<%= path.src%>/js/',
          src: ['map.js'],
          dest: '<%= path.static %>/js/'
        }
      ]
    }
  },
  watch: {
    styles: {
      files: ['<%= path.src %>/less/**/*.less'],
      tasks: ['less:development'],
      options: {
        nospawn: true
      }
    }
  }
}
