const { spawn } = require("child_process");
const emoji = {
  feat: " ✨  ",
  component: " 📦  ",
  fix: " 🐛  ",
  format: " 🎨  ",
  style: " 💄  ",
  refactor: " 💥  ",
};
// commitlint rule
const choices = [
  {
    name: "feat: ✨        新增功能",
    value: "feat",
  },
  {
    name: "component: 📦   新增组件",
    value: "component",
  },
  {
    name: "fix: 🐛         修复缺陷",
    value: "fix",
  },
  {
    name: "format: 🎨      代码格式化",
    value: "format",
  },
  {
    name: "style: 💄       更新 UI 和样式文件",
    value: "style",
  },
  {
    name: "refactor: 💥    代码重构",
    value: "refactor",
  },
];

module.exports = {
  description: "提交信息",
  prompts: [
    {
      type: "list",
      choices,
      default: "feat",
      name: "type",
      message: "请选择提交类型 :\n",
    },
    {
      type: "input",
      name: "describe",
      message: "本次提交简述 :\n",
      validate: (_) => {
        if (_) return true;
        return "请简略叙述本次更改!";
      },
    },
    {
      type: "input",
      name: "remark",
      message: "(可选)备注本次更改影响范围或BUG编号 : \n",
    },
  ],
  actions: (data) => {
    const delayLog = (data) => () => {
      // 类型 + 表情
      let _type = data.type + ":" + emoji[data.type];
      let _ms = _type + data.describe;
      // 备注
      let _rk = "";
      if (data.remark && data.remark !== "r") {
        _rk = "    " + "\nREMARK MESSAGE:  " + data.remark;
      }
      spawn("git", ["commit", "-m", _ms + _rk + "---PLOP-TRIGGER"], {
        stdio: "inherit",
      });

      const _ = "###-------------------------------------------------------###";
      if (data.remark && data.remark !== "r") {
        console.info(`
        \n\x1B[90m${_}\x1B[0m\n\x1B[32m${_type}\x1B[0m  \x1B[36m${data.describe}\x1B[0m
        \n\x1B[35mREMARK MESSAGE:\x1B[0m  \x1B[10m${data.remark}\x1B[0m\n\x1B[90m${_}\x1B[0m`);

        return Promise.resolve("");
      }
      console.info(`
        \n\x1B[90m${_}\x1B[0m\n\x1B[32m${_type}\x1B[0m  \x1B[36m${data.describe}\x1B[0m\n\x1B[90m${_}\x1B[0m`);
      return Promise.resolve("");
    };
    return [delayLog(data)];
  },
};
