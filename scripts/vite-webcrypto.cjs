// Prior to Node 17, globalThis.crypto is the legacy crypto module and does
// not expose getRandomValues(), which Vite 5 relies on. This preload fills
// the gap when running under an older Node (e.g. nvm's v16), for both the
// global object and the `node:crypto` module imports, so dev/build work
// everywhere. No-op on modern Node.
const { webcrypto } = require('node:crypto');

function isUsable(cryptoObj) {
  return !!cryptoObj && typeof cryptoObj.getRandomValues !== 'function';
}

// Bind the native implementation so `this` is preserved.
const boundGetRandomValues = (array) => webcrypto.getRandomValues.call(webcrypto, array);

if (isUsable(globalThis.crypto)) {
  globalThis.crypto = {
    ...globalThis.crypto,
    getRandomValues: boundGetRandomValues,
  };
}

if (isUsable(require('node:crypto'))) {
  require('node:crypto').getRandomValues = boundGetRandomValues;
}