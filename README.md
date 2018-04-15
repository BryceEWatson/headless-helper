# Headless Helper
> Utilities for headless browser testing using puppeteer.

Headless helper is a curated collection of utilities that have been useful in my automation testing. These simple wrappers have proven to be useful to me, and I hope to you as well. Contributions are always welcome, as are bug reports & feature requests.

## Installing / Getting started

To get started using headless-helper in your own project, simply install via yarn or npm:

```shell
yarn add headless-helper
```

In your tests you can then use headless-helper during initialization, test runs, and clean-up.
Some examples:

```js
const headlessHelper = require('headless-helper');
describe('My Awesome Acceptance Tests', () => {
	beforeEach((done) => {
		(async () => {
			try {
				await headlessHelper.getBrowser();
				done();
			} catch (err) {
				done(err);
			}
		})();
	});
	afterEach((done) => {
		(async () => {
			try {
				await headlessHelper.closeBrowser();
				done();
			} catch (err) {
				done(err);
			}
		})();
	});
	it('Should open pages and test them!', (done) => {
		(async () => {
			try {
				await headlessHelper.openPage('https://www.google.com');
				await headlessHelper.saveScreenshot('./test/screens/', 'Google-first-load');
			} catch (err) {
				done(err);
			}
		})();
	});
```

## Developing

Here's a brief intro about what a developer must do in order to start developing
the project further:

<<TODO>>

## Features

<<TODO>> (For now, check out the inline documentation - https://github.com/BryceEWatson/headless-helper/blob/master/src/index.js )

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Links
<<TODO>

## Licensing

The code in this project is licensed under MIT license.
