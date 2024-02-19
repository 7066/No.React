const fs = require("fs");
const emoji = {
  feat: " ✨  ",
  component: " 📦  ",
  fix: " 🐛  ",
  format: " 🎨  ",
  style: " 💄  ",
  refactor: " 💥  ",
};
console.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Running commit-msg.js");
const message = fs.readFileSync(".git/COMMIT_EDITMSG").toString();
if (message.includes("---PLOP-TRIGGER")) {
  const _ = message.replace("---PLOP-TRIGGER", "");
  fs.writeFileSync(".git/COMMIT_EDITMSG", _);
  process.exit(0);
} else {
  if (message.includes("()")) {
    console.info(`\x1B[31m禁止使用括号如: feat()`);
    process.exit(1);
  }
  const T = message.match(/feat|component|fix|format|style|refactor/g);
  const _ = message.replace(/feat|component|fix|format|style|refactor|:/g, "");

  fs.writeFileSync(".git/COMMIT_EDITMSG", T[0] + ":" + emoji[T[0]] + _);
  process.exit(0);
}
