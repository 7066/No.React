module.exports = {
  description: "添加模块",
  prompts: [
    {
      type: "input",
      name: "code",
      message: "请输入模块代码(如: system)\n",
      validate: (_) => {
        if (_) return true;
        return "请输入模块代码!";
      },
    },
    {
      type: "list",
      choices: [
        {
          name: "是",
          value: true,
        },
        {
          name: "否",
          value: false,
        },
      ],
      default: false,
      name: "hasLocales",
      message: "是否添加国际化配置?\n",
    },
    {
      type: "input",
      name: "text",
      message: "请设置模块的中文翻译(如: 系统管理)\n",
      when: (data) => {
        return data.hasLocales;
      },
    },
  ],
  actions: (data) => {
    const _L = [
      {
        type: "add",
        path: "src/modules/{{lowerCase code}}/pages/index.tsx",
        templateFile: "build/plop/templates/module/pages/index.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{lowerCase code}}/pages/style.scss",
        templateFile: "build/plop/templates/module/pages/style.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{lowerCase code}}/route.ts",
        templateFile: "build/plop/templates/module/route.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{lowerCase code}}/service.ts",
        templateFile: "build/plop/templates/module/service.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{lowerCase code}}/store.ts",
        templateFile: "build/plop/templates/module/store.hbs",
      },
    ];
    if (data.hasLocales) {
      [].push.apply(_L, [
        {
          type: "add",
          path: "src/modules/{{lowerCase code}}/locales/zh.json",
          templateFile: "build/plop/templates/module/locales/zh.hbs",
        },
        {
          type: "add",
          path: "src/modules/{{lowerCase code}}/locales/en.json",
          templateFile: "build/plop/templates/module/locales/en.hbs",
        },
      ]);
    }
    return _L;
  },
};
