/** js-vfs data file
 * This file contains the encoded data.
 * inject.js only contains the code required to use this file,
 * so you can use the same inject.js file for any VFS encoded filesystem.
 */

const base85decode = DECODE;

/**
 * Base85 encoded string containing the files
 * @type {String}
 */
const zip = base85decode("DATA");

JSZip