module.exports = {
  less: {
    production: {
      options: {
        compress: true,
        sourceMap: false
      },
      files: {
        '<%= path.static %>/css/main.css': '<%= path.src %>/less/main.less'
      }
    }
  },
  postcss: {
    production: {
      src: '<%= path.static %>/css/main.css',
      options: {
        map: false,
        processors: [
          require('autoprefixer')()
        ]
      }
    }
  }
}
