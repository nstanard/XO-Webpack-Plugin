const XoLinter = require('xo'); // https://github.com/xojs/xo

function XoWebpackPlugin(options) {
	this.packagePath = options.cwd;
	this.autoFix = options.autoFix;
	this.fixables = options.fixables;

	delete options.autoFix;
	delete options.fixables;

	this.options = options || {};
}

XoWebpackPlugin.prototype.apply = compiler => {
	const {options} = this;

	compiler.hooks.emit.tap('XoWebpackPlugin', () => {
		const results = XoLinter.lintFiles([], options);
		results.then(linter => {
			if (linter && linter.results && linter.results.length !== 0) {
				linter.results.forEach(fileResult => {
					// Set so it outputs warnings or errors based on passed in params
					if (fileResult.errorCount > 0 && fileResult.messages && fileResult.messages.length > 0) {
						console.log('\u001B[31m%s\u001B[0m', fileResult.filePath);
						for (let i = fileResult.messages.length - 1; i >= 0; i--) {
							console.log('\u001B[31m%s\u001B[0m', ' - ' + fileResult.messages[i].line + ':' + fileResult.messages[i].message);
						}
					}
				});
			} else {
				console.log('No linter results to display.');
			}
		});
	});
};

module.exports = XoWebpackPlugin;
