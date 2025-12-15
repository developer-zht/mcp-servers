<!-- # MCP Servers Collection

一个 MCP (Model Context Protocol) Servers 的集合,用于为 AI 助手提供视频/音频内容总结能力。

## 📦 项目结构

```
mcp-servers/
├── packages/
│   ├── shared/                    # 共享工具库
│   │   ├── src/
│   │   │   ├── index.ts          # 导出入口
│   │   │   └── env.ts            # 环境变量管理
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── bilibili-summarizer/       # B站视频总结 MCP Server
│       ├── src/
│       │   └── index.ts          # MCP Server 入口
│       ├── package.json
│       └── tsconfig.json
│
├── .env.example                   # 环境变量模板
├── .gitignore
├── package.json                   # 根 package.json (workspace 配置)
├── pnpm-workspace.yaml            # pnpm workspace 配置
├── tsconfig.json                  # 根 TypeScript 配置
└── README.md
```

## 🚀 快速开始

### 1. 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
-

### 2. 安装依赖

```bash
# 安装 pnpm (如果还没有)
npm install -g pnpm

# 安装所有依赖
pnpm install

```

### 3. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env
# 编辑 .env 文件,填写你的 API Keys
# 必需: OPENAI_API_KEY
# 可选: BILIBILI_SESSION_TOKEN
```

### 4. 构建项目

```bash
# 构建所有包
pnpm build
# 或者只构建特定的包
pnpm --filter @mcp-servers/bilibili-summarizer build
```

### 5. 运行 MCP Server

```bash
# 直接运行 (用于测试)
node packages/bilibili-summarizer/dist/index.js
# 或者使用 npm script
pnpm --filter @mcp-servers/bilibili-summarizer start

```

## 🔧 开发指南

### 开发模式 (watch mode)

```bash
# 监听所有包的变化并自动重新编译
pnpm dev
# 只监听特定的包
pnpm --filter @mcp-servers/shared dev
```

### 添加新的 MCP Server

```bash
# 1. 创建新包的目录结构
mkdir -p packages/your-server/src
# 2. 创建 package.json (参考 bilibili-summarizer)

# 3. 创建 tsconfig.json (继承根配置)

# 4. 实现 MCP Server 逻辑

# 5. 在根目录安装依赖
pnpm install

```

### 在包之间共享代码

```typescript
// packages/shared/src/utils/http.ts
export async function fetchWithTimeout(url: string) {
  // ...
}
// packages/bilibili-summarizer/src/index.ts
import { fetchWithTimeout } from '@mcp-servers/shared/utils/http.js';
```

## 📖 架构设计

### Monorepo 结构

使用 **pnpm workspace** 管理多个相关的包:

- ✅ 代码复用 (通过 `@mcp-servers/shared`)
- ✅ 统一工具链 (TypeScript, ESLint)
- ✅ 原子化提交 (一次提交可以修改多个包)
- ✅ 类型安全 (包之间的类型自动同步)

### 依赖关系

```
bilibili-summarizer  →  shared
youtube-summarizer   →  shared
podcast-summarizer   →  shared
```

**原则**: 只能单向依赖 shared,不能反向依赖

### TypeScript 配置继承

```
根 tsconfig.json (通用规则)
  ↓ extends
packages/shared/tsconfig.json (库模式)
  ↓ extends
packages/bilibili-summarizer/tsconfig.json (应用模式)
```

## 🔐 环境变量管理

敏感信息 (API Keys) 通过环境变量管理:

1. `.env.example` - 环境变量模板 (可以提交到 Git)
2. `.env` - 实际的密钥 (在 .gitignore 中,不提交)
3. `packages/shared/src/env.ts` - 类型安全的环境变量读取

## 📝 常用命令

```bash
# 安装依赖
pnpm install
# 构建所有包
pnpm build
# 开发模式 (watch)
pnpm dev
# 清理构建产物
pnpm clean
# 运行特定包的脚本
pnpm --filter <package-name> <script>

```

## 🎯 下一步

- [ ] 实现 Bilibili 字幕获取逻辑

- [ ] 实现 OpenAI 调用逻辑

- [ ] 添加缓存支持

- [ ] 添加错误处理

- [ ] 添加单元测试

- [ ] 支持 YouTube 视频总结

- [ ] 支持播客总结

## 📄 许可证

MIT

## Configuration

### Method 1: Claude Desktop (Recommended)

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bilibili-summarizer": {
      "command": "npx",
      "args": ["@mcp-servers/bilibili-summarizer"],
      "env": {
        "OPENAI_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Method 2: .env file (Development)

Create .env in your project root:

```bash
cp .env.example .env
# Edit .env and add your API keys
``` -->
