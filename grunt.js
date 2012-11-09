module.exports = function(grunt) {
    pkg: '<json:package.json>',
    grunt.initConfig({
        concat: {
            dist: {
                src: ['./js/bootstrap.min.js', './js/exchange.js],
                dest: 'dist/built.js'
            }
        }
    });
};