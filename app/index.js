/**
 * Yeoman Generator for generator-react-flux-router-boilerplate
 */
'use strict';

// Libraries
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var AppGenerator = yeoman.generators.Base.extend({

  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the generator for creating React Flux with Router Boilerplate!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }];
    this.prompt(prompts, function(props) {
      this.name = props.name;
      done();
    }.bind(this));
  },

  writing: {

    app: function() {
      var context = {
        title: this.name,
        description: 'React, Flux with Router application',
        appname: this.name
      };
      this.template('_package.json', 'package.json', context);
      this.template('_bower.json', 'bower.json', context);
      this.dest.mkdir('config');
      this.dest.mkdir('src');
      this.dest.mkdir('src/actions');
      this.dest.mkdir('src/assets');
      this.dest.mkdir('src/components');
      this.dest.mkdir('src/constants');
      this.dest.mkdir('src/dispatcher');
      this.dest.mkdir('src/layouts');
      this.dest.mkdir('src/pages');
      this.dest.mkdir('src/stores');
      this.dest.mkdir('src/utilities');
      this.template('src/pages/index.html');
      this.src.copy('src/actions/RouteActions.js', 'src/actions/RouteActions.js');
      this.src.copy('src/actions/ToDoRequestActions.js', 'src/actions/ToDoRequestActions.js');
      this.src.copy('src/actions/ToDoResponseActions.js', 'src/actions/ToDoResponseActions.js');
      this.src.copy('src/pages/Index.jsx', 'src/pages/Index.jsx');
      this.src.copy('src/pages/Libraries.jsx', 'src/pages/Libraries.jsx');
      this.src.copy('src/pages/ToDo.jsx', 'src/pages/ToDo.jsx');
      this.directory('src/assets/', 'src/assets/');
      this.directory('src/components/', 'src/components/');
      this.directory('src/constants/', 'src/constants/');
      this.directory('src/dispatcher/', 'src/dispatcher/');
      this.directory('src/layouts/', 'src/layouts/');
      this.directory('src/stores/', 'src/stores/');
      this.directory('src/utilities/', 'src/utilities/');
      this.directory('config/', 'config/');
      this.src.copy('src/app.js', 'src/app.js');
      this.src.copy('src/config.js', 'src/config.js');
    },

    projectfiles: function() {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('_.gitignore', '.gitignore');
      this.src.copy('gulpfile.js', 'gulpfile.js');
      this.src.copy('LICENSE', 'LICENSE');
      this.src.copy('README.md', 'README.md');
    }

  },

  end: function() {
    this.installDependencies();
  }

});

module.exports = AppGenerator;