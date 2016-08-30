'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-assert');
var Promise = require('pinkie-promise');
var pify    = require('pify');

var generator = null;

beforeEach(function () {
    return pify(helpers.testDirectory, Promise)(path.join(__dirname, 'temp'))
        .then(function () {
            generator = helpers.createGenerator('testcafe-browser-provider:app', ['../../generators/app'], null, { skipInstall: true });
        });
});

it('Should generate expected files', function () {
    helpers.mockPrompt(generator, {
        providerName:   'test-provider',
        githubUsername: 'test-user',
        needWebsite:    'Yes',
        website:        'test.com'
    });

    return pify(generator.run.bind(generator), Promise)().then(function () {
        assert.file([
            '.editorconfig',
            '.eslintrc',
            '.gitignore',
            '.travis.yml',
            'package.json',
            'Gulpfile.js',
            'LICENSE',
            'README.md',
            'src/index.js',
            'src/.babelrc',
            'test/test.js',
            'test/.eslintrc',
        ]);

        assert.fileContent('package.json', 'test-provider');
        assert.fileContent('package.json', 'test-user');
        assert.fileContent('package.json', 'test.com');

        assert.fileContent('README.md', 'test-provider');
        assert.fileContent('README.md', 'test-user');
        assert.fileContent('README.md', 'test.com');
    });
});
