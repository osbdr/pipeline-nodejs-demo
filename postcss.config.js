module.exports = {
    plugins: [
      require('stylelint')({}),
      require('postcss-reporter')({throwError: true})
    ],
  }