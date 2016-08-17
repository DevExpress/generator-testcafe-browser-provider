# testcafe-browser-provider-<%= providerName %>
[![Build Status](https://travis-ci.org/<%= githubUsername %>/testcafe-browser-provider-<%= providerName %>.svg)](https://travis-ci.org/<%= githubUsername %>/testcafe-browser-provider-<%= providerName %>)

This is the **<%= providerName %>** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install testcafe-browser-provider-<%= providerName %>
```

## Usage

<% if (isMultiBrowser) {%>
You can determine the available browser aliases by running
```
testcafe -b <%= providerName %>
```
<% } %>
When you run tests from the command line, use the <% if (isMultiBrowser) {%>alias<% } else { %>provider name<% } %> when specifying browsers:

```
testcafe <%= providerName %><%if (isMultiBrowser) { %>:browser1<% } %> 'path/to/test/file.js'
```


When you use API, pass the <% if (isMultiBrowser) {%>alias<% } else { %>provider name<% } %> to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('<%= providerName %><%if (isMultiBrowser) { %>:browser1<% } %>')
    .run();
```

## Author
<%= author %> <% if (website) { %>(<%= website %>)<% } %>
