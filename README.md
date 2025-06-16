# sm - 系统信息监控命令行工具

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)
[![System Information](https://img.shields.io/badge/powered%20by-systeminformation-blueviolet)](https://systeminformation.io/)

`sm` 是一个强大的命令行工具，用于实时监控和查询系统硬件、软件及运行状态信息。基于 `Node` 和 `systeminformation` 库构建，提供简洁直观的命令行界面。

## 功能亮点

-   **全面系统监控**：覆盖 CPU、内存、磁盘、网络等 20+ 关键系统指标
-   **多语言支持**：中英文双语切换（支持扩展更多语言）
-   **层级化命令**：主命令+子命令组合查询，精准获取目标信息
-   **开发者友好**：JSON 结构化输出，便于脚本集成
-   **跨平台兼容**：支持 Windows, Linux, macOS 三大操作系统

## 安装

```bash
# 通过 npm 全局安装
npm install -g os-sm

# 或使用 yarn
yarn global add os-sm
```

## 快速开始

```bash
# 查看 CPU 信息
sm cpu

# 查看内存信息及硬件布局
sm mem --layout

# 查看磁盘信息（中文输出）
sm -l zh disk

# 获取电池状态
sm battery

# 查看 Docker 容器信息
sm docker --containers

# 查看系统概览信息
sm static
```

## 命令参考

### 核心系统命令

| 命令        | 描述             | 子选项                                           |
| ----------- | ---------------- | ------------------------------------------------ |
| `sm cpu`    | CPU 信息         | `--speed`, `--temperature`, `--cache`, `--flags` |
| `sm mem`    | 内存使用情况     | `--layout`                                       |
| `sm disk`   | 磁盘 I/O 信息    | `--layout`                                       |
| `sm os`     | 操作系统信息     | -                                                |
| `sm static` | 完整系统静态信息 | -                                                |

### 硬件监控

| 命令           | 描述      |
| -------------- | --------- |
| `sm bios`      | BIOS 信息 |
| `sm baseboard` | 主板信息  |
| `sm graphics`  | 显卡信息  |
| `sm audio`     | 音频设备  |
| `sm usb`       | USB 设备  |
| `sm bluetooth` | 蓝牙设备  |

### 网络与连接

| 命令         | 描述      | 子选项                                                               |
| ------------ | --------- | -------------------------------------------------------------------- |
| `sm network` | 网络接口  | `--connections`, `--gatewayDefault`, `--interfaceDefault`, `--stats` |
| `sm wifi`    | WiFi 信息 | `--connections`, `--networks`                                        |

### 电源与进程

| 命令           | 描述     | 子选项   |
| -------------- | -------- | -------- |
| `sm battery`   | 电池状态 | -        |
| `sm processes` | 系统进程 | `--load` |
| `sm users`     | 登录用户 | -        |

### 虚拟化与容器

| 命令            | 描述            | 子选项                                                                                        |
| --------------- | --------------- | --------------------------------------------------------------------------------------------- |
| `sm docker`     | Docker 信息     | `--containerProcesses`, `--containerStats`, `--containers`, `--images`, `--info`, `--volumes` |
| `sm virtualbox` | VirtualBox 信息 | -                                                                                             |

### 文件系统

| 命令    | 描述         | 子选项                  |
| ------- | ------------ | ----------------------- |
| `sm fs` | 文件系统统计 | `--size`, `--openFiles` |

## 全局选项

| 选项                | 描述                     | 默认值 |
| ------------------- | ------------------------ | ------ |
| `-l, --lang <lang>` | 设置输出语言 (`en`/`zh`) | `en`   |
| `-v, --version`     | 显示版本信息             | -      |
| `-h, --help`        | 显示命令帮助             | -      |

## 开发者指南

### 项目结构

```bash
os-sm/
├── locales/          # 国际化资源文件
│   ├── en.json       # 英文翻译
│   └── zh.json       # 中文翻译
├── index.js          # 主程序入口
└── package.json
```

### 添加新语言

1. 创建语言文件 `locales/fr.json`
2. 添加法语翻译内容
3. 更新 i18n 配置：

```javascript
i18n.configure({
    locales: ['en', 'zh', 'fr'] // 添加法语
    // ...其他配置
})
```

## 贡献指南

我们欢迎任何形式的贡献：

1. 提交 Issue 报告问题或建议新功能
2. Fork 项目并提交 Pull Request
3. 帮助完善多语言支持
4. 编写测试用例或改进文档

贡献流程：

```bash
git clone https://github.com/your-repo/os-sm.git
cd os-sm
npm install
git commit -m "Add awesome feature"
git push origin main
```

## 许可证

本项目基于 [MIT 许可证](https://opensource.org/licenses/MIT) 发布。

```text
Copyright (c) 2025 Fubowen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```
