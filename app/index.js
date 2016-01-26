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
var fsextra = require('fs-extra');
var async = require('async');

module.exports = yeoman.Base.extend({

  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the generator for creating Cordova React Flux with Router and Ionic!'
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
      this.props = props;
      this.rootDir = process.cwd() + "/" + props.name;
      this.cordovaDir = this.rootDir + "/" + "cordova-app";
      this.clientDir = this.rootDir + "/" + "client";
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
        console.log('Creating Cordova project', chalk.cyan(this.cordovaDir), chalk.cyan(this.props.package), chalk.cyan(this.props.name));
        fsextra.mkdirs(this.rootDir);
        process.chdir(this.rootDir);
        cordova.create(this.cordovaDir, this.props.package, this.props.name, done);
      } catch (err) {
        console.error('Failed to create cordova project', err);
        process.exit(1);
      }
    },

    cleanupCordovaApp: function () {
      var done = this.async();
      var dirName = this.cordovaDir + '/www';

      fsextra.remove(dirName + '/css', function (err) {
        if (err) {
          return console.error(err);
        }
      });
      fsextra.remove(dirName + '/img', function (err) {
        if (err) {
          return console.error(err);
        }
      });
      fsextra.remove(dirName + '/js', function (err) {
        if (err) {
          return console.error(err);
        }
      });
      fsextra.remove(dirName + '/index.html', function (err) {
        if (err) {
          return console.error(err);
        }
      });

      console.log('Default cordova app removed');

      done();

    },

    platforms: function() {
      if (this.props.platforms.length === 0) {
        return
      }
      var done = this.async();

      try {
        console.log('Adding platforms...');
        process.chdir(this.cordovaDir);
        async.eachSeries(this.props.platforms, function(platform, cb) {
          console.log('Adding platform', chalk.cyan(platform))
          cordova.platform('add', platform, cb)
        }, done)
      } catch(err) {
        console.error('Failed to add platfoms', err)
        process.exit(1)
      }
    },

    //plugins: function() {
    //  if (this.props.plugins.length === 0) {
    //    return
    //  }
    //  var done = this.async()
    //  try {
    //    async.eachSeries(this.props.plugins, function(plugin, cb) {
    //      console.log('Adding plugin', chalk.cyan(plugin), process.cwd());
    //      cordova.plugin('add', plugin, cb)
    //    }, done)
    //  } catch(err) {
    //    console.error('Failed to add plugins', err)
    //    process.exit(1)
    //  }
    //},

    app: function() {
      var context = {
        title: this.props.name,
        description: 'React, Flux with Router application',
        appname: this.props.name
      };
      console.log('Begin client side app build ...', this.clientDir);


      this.template(this.templatePath('src/pages/index.html'),this.clientDir + '/index.html');
      this.template(this.templatePath('_package.json'), this.clientDir + '/package.json', context);
      this.template(this.templatePath('_bower.json'), this.clientDir + '/bower.json', context);
      this.directory(this.templatePath('src'), this.clientDir);

    },

    projectfiles: function() {
      console.log('projectfiles ...', this.clientDir);
      this.template(this.templatePath('editorconfig'), '.editorconfig');
      this.template(this.templatePath('jshintrc'), 'client/.jshintrc');
      this.template(this.templatePath('_.gitignore'), '.gitignore');
      this.template(this.templatePath('gulpfile.js'), 'client/gulpfile.js');
      this.template(this.templatePath('LICENSE'), 'LICENSE');
      this.template(this.templatePath('README.md'), 'README.md');
    }

  },

  end: function() {
    //process.chdir(this.clientDir);
    //this.installDependencies();
  }

});

