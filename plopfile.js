const _module = require("./.plop/module.js");
const _component = require("./.plop/component.js");
const _commit = require("./.plop/commit.js");
module.exports = (plop) => {
  plop.setGenerator("commit", _commit);
  plop.setGenerator("module", _module);
  plop.setGenerator("component", _component);
};
