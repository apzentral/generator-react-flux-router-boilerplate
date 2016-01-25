/**
 * Yeoman Generator for generator-cordova-react-flux-router-ionic
 */
'use strict';

// Libraries
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var cordova = require('cordova');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({

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
    },{
      type: 'input',
      name: 'package',
      message: 'What would you like the package to be?',
      default: 'com.example.' + this.appname
    }, {
      type: 'checkbox',
      name: 'platforms',
      message: 'What platforms would you like to add support for?',
      choices: [{
        name: 'browser',
        value: 'browser',
        checked: true
      }, {
        name: 'ios',
        value: 'ios',
        checked: true
      }, {
        name: 'android',
        value: 'android',
        checked: true
      }]
    }, {
      type: 'checkbox',
      name: 'plugins',
      message: 'What plugins would you like to include by default?',
      choices: [{
        name: 'Console',
        value: 'cordova-plugin-console',
        checked: true
      }, {
        name: 'Device',
        value: 'cordova-plugin-device',
        checked: true
      }, {
        name: 'Dialogs',
        value: 'cordova-plugin-dialogs',
        checked: true
      }, {
        name: 'Geo Location',
        value: 'cordova-plugin-geolocation',
        checked: true
      }, {
        name: 'In App Browser',
        value: 'cordova-plugin-inappbrowser',
        checked: true
      }, {
        name: 'Splash Screen',
        value: 'cordova-plugin-splashscreen',
        checked: true
      }, {
        name: 'Network Information',
        value: 'cordova-plugin-network-information',
        checked: true
      }, {
        name: 'Gap Reload',
        value: 'pro.fing.cordova.gapreload',
        checked: true
      }, {
        name: 'Crosswalk Webview',
        value: 'cordova-plugin-crosswalk-webview',
        checked: true
      }]
    }];
    this.prompt(prompts, function(props) {
      this.name = props.name;
      done();
    }.bind(this));
  },

  writing: {

    cordova: function() {
      if (this.arguments.indexOf('testing') >= 0) {
        return
      }
      var done = this.async();
      try {
        console.log('Creating project', chalk.cyan(process.cwd()), chalk.cyan(this.props.package), chalk.cyan(this.appname))
        cordova.create(process.cwd(), this.props.package, this.appname, done);
      } catch (err) {
        console.error('Failed to create cordova project', err);
        process.exit(1);
      }
    },

    www: function() {
      this.fs.copyTpl(
        this.templatePath('www'),
        this.destinationPath('www'), {
          appname: this.appname,
          name: this.user.git.name(),
          livereload: this.livereload
        }
      )
    },

    platforms: function() {
      if (this.props.platforms.length === 0) {
        return
      }
      var done = this.async()
      try {
        async.eachSeries(this.props.platforms, function(platform, cb) {
          console.log('Adding platform', chalk.cyan(platform))
          cordova.platform('add', platform, cb)
        }, done)
      } catch(err) {
        console.error('Failed to add platfoms', err)
        process.exit(1)
      }
    },

    plugins: function() {
      if (this.props.plugins.length === 0) {
        return
      }
      var done = this.async()
      try {
        async.eachSeries(this.props.plugins, function(plugin, cb) {
          console.log('Adding plugin', chalk.cyan(plugin))
          cordova.plugin('add', plugin, cb)
        }, done)
      } catch(err) {
        console.error('Failed to add plugins', err)
        process.exit(1)
      }
    },

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

