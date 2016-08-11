export default {
    // Multiple browsers support
    isMultiBrowser: <%= isMultiBrowser %>,


    // Required - must be implemented
    // Browser control
    async openBrowser (/* id, browserInfo, startPage */) {
        throw new Error('Not implemented!');
    },

    async closeBrowser (/* id, pageInfo */) {
        throw new Error('Not implemented!');
    },


    // Optional - remove methods you do not want to implement
    // Initialization
    async init () {
        return;
    },

    async dispose () {
        return;
    },

    <% if (isMultiBrowser) { %>
    // Browser names handling
    async getBrowserList () {
        throw new Error('Not implemented!');
    },

    async isValidBrowserName (/* browserName */) {
        return true;
    },
    <% } else { %>
    // Browser names handling
    async isValidBrowserName (/* browserName */) {
        return true;
    },
    <% } %>

    // Extra functions
    async resizeWindow (/* id, pageInfo, width, height */) {
        this.reportWarning('The screenshot functionality is not supported by the "<%= providerName %>" browser provider.');
    },

    async takeScreenshot (/* id, pageInfo, screenshotPath */) {
        this.reportWarning('The window resize functionality is not supported by the "<%= providerName %>" browser provider.');
    }
};
