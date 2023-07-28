'use strict';
const Generator    = require('yeoman-generator');
const slugify      = require('underscore.string').slugify;
const normalizeUrl = require('normalize-url');

function filterProjectName (name) {
    return slugify(name.replace(/^testcafe(-|\s)browser(-|\s)provider(-|\s)/i, ''));
}

module.exports = class extends Generator {
    prompting () {
        const prompts = [
            {
                name:    'providerName',
                message: 'How do you want to name your browser provider?',
                default: filterProjectName(this.appname) || void 0,
                filter:  filterProjectName
            },
            {
                name:     'githubUsername',
                message:  'What is your GitHub username?',
                store:    true,
                validate: function (name) {
                    return name.length ? true : 'You should provide a username';
                }
            },
            {
                name:    'homepage',
                message: 'What is the URL of your browser provider homepage?',
                default: function (answers) {
                    return 'https://github.com/' + answers.githubUsername + '/testcafe-browser-provider-' + answers.providerName;
                },
                filter: function (url) {
                    return url && normalizeUrl(url);
                }
            },
            {
                name:    'isMultiBrowser',
                type:    'confirm',
                default: false,
                message: 'Will your provider be capable to start multiple types of browsers?'
            },
            {
                name:    'needWebsite',
                type:    'confirm',
                store:   true,
                default: true,
                message: 'Do you want to include a link to your personal website?'
            },
            {
                name:    'website',
                message: 'What is the URL of your personal website?',
                store:   true,
                filter:  function (url) {
                    return url && normalizeUrl(url);
                },
                when: function (answers) {
                    return answers.needWebsite;
                }
            }
        ];

        return this
            .prompt(prompts)
            .then(props => {
                this.props = props;
            });
    }

    writing () {
        const tmplProps = {
            author:         this.user.git.name(),
            email:          this.user.git.email(),
            website:        this.props.website,
            providerName:   this.props.providerName,
            isMultiBrowser: this.props.isMultiBrowser,
            githubUsername: this.props.githubUsername,
            homepage:       this.props.homepage
        };

        const unescaped = {
            '_.editorconfig':  '.editorconfig',
            '_.eslintrc':      '.eslintrc',
            '_.travis.yml':    '.travis.yml',
            '_.gitignore':     '.gitignore',
            '_package.json':   'package.json',
            'test/_.eslintrc': 'test/.eslintrc',
            'src/_.babelrc':   'src/.babelrc'
        };

        this.fs.copyTpl(this.templatePath() + '/**/*', this.destinationPath(), tmplProps);

        Object.keys(unescaped).forEach(escaped => {
            this.fs.move(this.destinationPath(escaped), this.destinationPath(unescaped[escaped]));
        });
    }
};
