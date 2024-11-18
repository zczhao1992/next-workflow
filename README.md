# Next-WorkFlow

### 介绍

Next-WorkFlow，基于 Next.js、shadcn/ui、TailWind css、Prisma ORM、Supabase 的一套网页自动化工作流。

### 一、在线预览地址

- Link(可能需要翻墙)：https://next-workflow-zc.vercel.app/

### 二、Git 仓库地址 (欢迎 Star⭐)

- GitHub：https://github.com/zczhao1992/next-workflow.git

### 三、🔨🔨🔨 项目功能

- 🚀 采用最新技术找开发：Next14、TypeScript、shadcn/ui、TailWind css 等
- 🚀 使用 Clerk 作为身份认证，支持 Google、Github 账号登录
- 🚀 使用 Prisma ORM 及 PostgreSQL 作为数据库存储工具，数据库部署在 Supabase
- 🚀 整个项目集成了 TypeScript
- 🚀 使用 react-flow 作为整个项目的核心流程图库
- 🚀 使用 puppeteer、cheerio 以支持网页自动化，支持定时任务
- 🚀 目前已支持的节点工具包括：
  - 新建标签页
  - 获取页面
  - 获取元素文本
  - 填充输入框
  - 点击元素
  - 等待元素响应
  - 网络钩子
  - 跳转链接
  - 滚动元素
  - 保存为 JSON

### 四、安装使用步骤 📑

- **Clone：**

```text
# GitHub
git clone https://github.com/zczhao1992/next-workflow.git
```

- **Install：**

```text
npm install
cnpm install

# npm install 安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org
```

- **Run：**

```text
npm run dev
```

- **Build：**

```text
# 开发环境
npm run build
```

### 五、项目截图

#### 1、首页：

![workflow-home](./public/home.png)

#### 2、工作流列表：

![workflow-list](./public/workflowList.png)

#### 3、编辑器：

![workflow-editor](./public/editor.png)
![workflow-editor](./public/editor1.png)

### 六、文件资源目录 📚

```text
next-workflow
├─ prisma                 # prisma orm
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ actions             # 调用数据库逻辑
│  ├─ app                 # 项目页面
│  ├─ components          # 全局组件
│  ├─ hooks               # 自定义hook
│  ├─ lib                 # 工具
│  ├─ schema              # 业务模型
│  ├─ types               # 业务类型
│  └─ middleware.ts       # 中间件
├─ .eslintrc.json         # eslint配置
├─ .gitignore             # git 提交忽略
├─ components.json        # shadcn/ui 组件配置
├─ next-env.d.ts          # 环境变量配置
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ tailwind.config.ts     # tailwind 配置
└─ tsconfig.json          # typescript 全局配置
```
