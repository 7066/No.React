module.exports = {
  description: "创建组件",
  prompts: [
    {
      type: "input",
      name: "code",
      message: "请输入组件代码(如: image)\n",
      validate: (_) => {
        if (_) return true;
        return "请输入组件代码!";
      },
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/components/No{{pascalCase code}}/index.tsx",
      templateFile: "./.plop/templates/component/index.hbs",
    },
    {
      type: "add",
      path: "src/components/No{{pascalCase code}}/style.scss",
      templateFile: "./.plop/templates/component/style.hbs",
    },
  ],
};
