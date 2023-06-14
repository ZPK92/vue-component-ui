## 步骤1:pnpm init pnpm tsc --init
## 步骤2:使用pnpm必须要建立.npmrc文件 shamefully-hoist = true 否则安装的模块无法放置到node_modules目录下
## 步骤3:使用pnpm可以快速建立monorepo 使用pnpm workspace.yaml来实现monorepo 创建pnpm-workspace.yaml文件(pnpm-workspace.yaml里面 ** 代表任意目录，* 代表任意文件)
## 步骤4:在package文件里面components,theme-chalk,utils文件中创建package.json文件后，在全局执行pnpm install @z-k/components -w , pnpm install @z-k/utils -w ,pnpm install @z-k/theme-chalk -w 将这三个包安装到node_modules里面 在当前根目录下 我们可以引用某个工作目录的文件 可以查看package.json中的依赖 使用"workspace:*" 表示任意版本
## 步骤5:然后再执行pnpm install 就会在跟node_module文件里面生成@z-k库

## pnpm create vite paly  创建测试环境

## 步骤6：创建utils create.ts

- 第一个问题点，我们不可能进入某个包里去启动某个指令 ? 可以在跟package.json文件里面进行配置脚本
- 解答 在外部package.json play这个包 dev这个命令： "dev": "pnpm -C play dev",


## 编写组建的逻辑思想? 明确组件能怎么用 第一要定义的是他的props 根据props实现功能

## 在vue3中如何将名字导出?  使用unplugin-vue-define-options插件 并进行配置

## vite装上sass之后 自动就识别了 不需要再安装插件


## Eslint配置
- 开发项目需要安装vscode插件volar 以及eslint插件(能够有提示)
- 1.npx eslint --init 然后给这步骤向下走  npx会对eslint进行安装 然后后面就有了一些库的名字 如下面
- eslint-plugin-vue@latest  @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
## eslint 规范检测 但是pretter格式化代码   
.editorconfig 编译器配置  需要和插件配置editorconfig  for vscode
这个要注意 校验无法生效

## 使用pretter vscode插件，需要 在设置里面 勾选Format On Save  formatter 设置为Perttier -Code formater

# vitepress编写组件文档
 pnpm isntall vitepress -D
## docs配置中"dev": "vitepress dev ." .表示的是当前目录