/*global describe, beforeEach, it*/
'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs-extra');

describe('react-flux-router-boilerplate:app', function() {

  before(function(done) {
    var testFolder = path.join(os.tmpdir(), './temp-test');
    try {
      var stats = fs.lstatSync(testFolder);
      // Is it a directory?
      if (stats.isDirectory()) {
        // Yes it is, then remove this
        fs.removeSync(testFolder);
      }
    } catch (e) {
      if (e.code != 'ENOENT') throw e;
    }

    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(testFolder)
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        someOption: true
      })
      .on('end', done);
  });

  it('creates files', function() {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      'LICENSE',
      'README.md',
      'src/pages/index.html',
      'src/actions/RouteActions.js',
      'src/actions/ToDoActions.js',
      'src/app.js',
      'src/config.js',
    ]);
  });
});