module.exports = {
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
