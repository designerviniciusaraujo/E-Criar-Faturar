module.exports=function(grunt){

  grunt.initConfig({
    svgmin: {
     options: {
         plugins: [
             {
                 removeTitle: true
             }, {
                 removeUselessStrokeAndFill: false
             },{
               removeDesc: true
             }

         ]
     },

     multiple: {
				files: [{
					expand: true,
					cwd: 'assets/svg/',
					src: ['**/*.svg'],
					dest: 'assets/svg/convert'
				}]
			},
 },

 imagemin: {

    dynamic: {
        files: [{
            expand: true,
            cwd: 'assets/img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'assets/img/convert'
        }]
    }
}
});

  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default',['svgmin','imagemin']);


  };
