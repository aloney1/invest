## 初始化项目流程
```
// 确保node.js版本为 v16.15.0
node -v
// 如果没有可以使用n工具来做多node的版本管理，nvm也可以
npm install -g n
// 安装v16.15.0 node.js
n install 16.15.0
// 使用n 切换当前的node版本, 会有列表可以选择
n
// 切换后检查下
node -v
// 依赖安装，如果没有pnpm需要先安装pnpm(Note: pnpm在依赖管理上要优于yarn和npm，会更加节省空间以及更好的依赖缓存)
// 为确保环境一致，请安装8.5.0版本
// 这里一定要使用pnpm做包管理，我在package.json里进行了限制
npm install -g pnpm@8.5.0
pnpm install
```

## git commit规范
```
// type 提交类型
// subject 提交的摘要信息
<type>:<subject>
```

*General type*
* feat: 添加新功能
* fix: 修改bug
* chore: 一些不影响功能的更改
* perf: 性能方面的优化
* refactor: 重构
* test: 添加测试

*Example:*
```
feat: 修改xxxx的bug
```
