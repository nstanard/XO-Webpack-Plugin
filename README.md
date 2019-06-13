# xo-webpack-plugin

> [XO](https://github.com/sindresorhus/xo) plugin for [webpack](https://github.com/webpack/webpack).

## Install

_Then install xo-webpack-plugin_
```console
$ npm i xo-webpack-plugin --save-dev
```

## Usage

In your webpack configuration

```javascript
const XoPlugin = require('xo-webpack-plugin');

// ...

const plugins = [
	// ...
]

const options = {
	// ...
}

module.exports = (env, argv) => {
	// Example condition to only run on watch
	if (argv.watch === true) {
		options.plugins.push(new XoPlugin({
			// [XO options](https://github.com/sindresorhus/xo#config)
		}));
	}
	return options
}
```

That's it!

## [License](LICENSE)
