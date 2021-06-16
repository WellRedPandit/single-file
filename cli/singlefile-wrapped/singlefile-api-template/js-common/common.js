// ----------------------------------------------------------------------------------------------------
// singlefile

var singlefile_options = {
	removeHiddenElements: false,
	removeUnusedStyles: true,
	removeUnusedFonts: true,
	removeImports: true,
	removeScripts: false,
	compressHTML: false,
	removeAudioSrc: true,
	removeVideoSrc: true,
	removeAlternativeFonts: true,
	removeAlternativeMedias: true,
	removeAlternativeImages: true,
	groupDuplicateImages: true
};

/**
 * @param {number} tabId
 * @return {any}
 */
async function singlefile_inject(tabId) {
	console.log('await extension.injectScript(tabId, singlefile_options)');
	return await extension.injectScript(tabId, singlefile_options);
}

/**
 * @return {string}
 */
async function singlefile_get() {
	console.log('await extension.getPageData(singlefile_options)');
	return await extension.getPageData(singlefile_options);
}
