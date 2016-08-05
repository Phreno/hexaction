var 
gulp = require( "gulp" )
, fs = require( "fs" )
, coffeelint = require( "gulp-coffeelint" )
, coffee = require( "gulp-coffee" )
, concat = require( "gulp-concat" )
, header = require( "gulp-header" )
, jasmine = require( "gulp-jasmine" )
, coffeeScript = require("coffee-script/register")
, bundle = require( "./package.json" ); 

/**
 * Information sur le package.
 * */
var about = {
  template: fs.readFileSync( bundle.config.file.about, "utf-8" ),
  data: {
    name: bundle.name,
    version: bundle.version,
    author: bundle.author.name,
    git: bundle.author.git,
    twitter: bundle.author.twitter,
    license: fs.readFileSync( bundle.config.file.license, "utf-8" ) ,
    repository: bundle.repository.url,
    more: "Forked from https://github.com/rrreese/Hexagon.js"
  }
};

console.log(JSON.stringify(about));

/**
 * Liste des taches programmees.
 * */
var action = {
  BUILD: "build",
  TEST: "test",
  WATCH: "watch"
};

/**
 * Verification des specifications.
 * */
gulp.task( action.TEST, function () {
  gulp
  .src( bundle.config.filter.spec  )
  .pipe( jasmine( { verbose: true } ))
});


/**
 * Generation du livrable.
 * */
gulp.task( action.BUILD, function () {
    gulp
    .src( bundle.config.filter.src ) 
    .pipe( coffeelint() )
    .pipe( coffeelint.reporter( "fail" ))
    .pipe( concat( bundle.config.file.generated ))
    .pipe( coffee() )
    .pipe( header( about.template, about.data ))
    .pipe( gulp.dest( bundle.config.folder.dist ));
});

/**
 * Mise a jour du livrable.
 * */
gulp.task( action.WATCH, function () {
        gulp.watch( 
          [ bundle.config.filter.src, bundle.config.filter.spec ],  
          [ action.TEST, action.BUILD ]
        );
});
