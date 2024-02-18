const _module = require("./build/plop/module.js");
const _component = require("./build/plop/component.js");
const _commit = require("./build/plop/commit.js");
module.exports = (plop) => {
  plop.setGenerator("commit", _commit);
  plop.setGenerator("module", _module);
  plop.setGenerator("component", _component);
};
