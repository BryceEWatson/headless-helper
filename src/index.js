const puppeteer = require('puppeteer');

/**
 * Launches the puppeteer browser & saves the browser object locally
 */
async function getBrowser() {
	module.exports.browser = await puppeteer.launch({
		ignoreHTTPSErrors: true
	});
}
/**
 * Closes the browser object.
 */
async function closeBrowser() {
	return await module.exports.browser.close();
}
/**
 * Opens a new page in the browser, saves a reference, and then goes to the url.
 * @param  {String} url url to navigate to on the new page.
 */
async function openPage(url) {
	module.exports.page = await module.exports.browser.newPage();
	return await module.exports.page.goto(url);
}
/**
 * Changes the active page by matching the provided url.
 * @param  {String} url matching url of the page we are changing to.
 * @return {Boolean}     True only if the url was matched with an existing page.
 */
async function changePage(url) {
	let pages = await module.exports.browser.pages();
	let foundPage = false;
	for (let i = 0; i < pages.length; i += 1) {
		if (pages[i].url() === url) {
			foundPage = true;
			module.exports.page = pages[i]; //set the new working page as the popup
			break;
		}
	}
	return foundPage;
}
/**
 * Saves a screenshot to the path provided, using the file name provided.
 * Appends the current time in ms to the file name, to avoid duplicates.
 * All images saved in png format.
 * @param  {String} path     Path to the save folder - Must exist!
 * @param  {String} fileName Name of the saved image file.
 * @return {Promise}          Resolves to the buffer of the screenshot.
 */
async function saveScreenshot(path, fileName) {
	const date = new Date(Date.now());
	const dateString = date.getFullYear() + '' +
		String('00' + (date.getMonth() + 1)).slice(-2) +
		date.getDate() + '' +
		date.getHours() + date.getMinutes() + date.getSeconds();
	return await module.exports.page.screenshot({
		path: path + fileName + '-' + dateString + '.png',
		fullPage: true
	});
}
/**
 * Returns the innerHTML of a specified element on the page document.
 * @param  {Page} page     puppeteer page object - See: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page
 * @param  {String} selector A DOMString containing one or more selectors to match. - See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 * @return {String}          The innerHTML value of the found element.
 */
async function getElementHTML(page, selector) {
	const value = await page.evaluate(async (params) => {
		return new Promise(resolve => {
			resolve(document.querySelector(params.selector).innerHTML);
		});
	}, {
		selector
	});
	return value;
}
/**
 * Returns the attribute value of a specified element on the page document.
 * @param  {Page} page     puppeteer page object - See: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page
 * @param  {String} selector A DOMString containing one or more selectors to match. - See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 * @param  {String} attribute Attribute name for which we want the value.
 * @return {String}           The value of the attribute on the found element.
 */
async function getElementAttribute(page, selector, attribute) {
	const value = await page.evaluate(async (params) => {
		return new Promise(resolve => {
			let container = document.querySelector(params.selector);
			resolve(container.getAttribute(params.attribute));
		});
	}, {
		selector,
		attribute
	});
	return value;
}
/**
 * Checks whether an element exists on the page.
 * @param  {Page} page     puppeteer page object - See: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page
 * @param  {String} selector A DOMString containing one or more selectors to match. - See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 * @return {Boolean}          True if the element was found on the given page.
 */
async function doesElementExist(page, selector) {
	let element = await page.$(selector);
	return element !== null;
}

module.exports = {
	getBrowser,
	closeBrowser,
	openPage,
	saveScreenshot,
	getElementAttribute,
	getElementHTML,
	changePage,
	doesElementExist
};
