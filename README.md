# ATLAS Portal

ATLAS 工业大模型与智能体评测平台族门户重设计。页面保留原门户的事实、四个平台内容、导航锚点、平台详情弹层和工作台待接入提示，不虚构指标、客户或成果。

## 运行

```powershell
npm install
npm run dev
```

请通过开发服务器预览；直接双击 `index.html` 会因浏览器对 ES module 的本地文件限制而禁用脚本。

生产构建：

```powershell
npm run build
npm run preview
```

部署到 `/atlas/` 子路径时：

```powershell
$env:VITE_BASE='/atlas/'
npm run build
```

## 文件

- `index.html`：页面内容、弹层和导航
- `styles.css`：Console 主题页面样式与 Hallmark stamp
- `tokens.css` / `base.css`：主题 token 与基础规则
- `script.js`：移动导航、平台详情弹层、工作台提示
- `assets/fonts/`：自托管 ZCOOL QingKe HuangYou、Host Grotesk 与 Space Mono；ZCOOL 已按当前页面字符子集化
- `.hallmark/`：预检、品牌证据、前后截图、linter 截图和构建日志

## Hallmark Picks

- **Material**：原门户自包含 HTML、四个平台架构与流程文案。没有可用照片，因此不放置图库照片，也不生成装饰性插画；首屏可视化是由真实平台关系组成的系统面板。
- **Audience**：高校科研合作方、项目申报与评审人员、工业 AI 团队。
- **Use**：理解四个评测平台及其证据边界，并进入后续统一评测工作台。
- **Tone**：技术、克制、可审计，接近实验室仪器而非霓虹控制台。
- **Genre**：modern-minimal
- **Theme**：Console，graphite 配色，叠加 macOS 液态玻璃表面
- **Shape**：Split Studio
- **Hero**：Corridor
- **Typography**：ZCOOL QingKe HuangYou / Host Grotesk / Space Mono
- **Signature**：四个平台被组织成同一块协同仪器面板，并随指针产生玻璃高光
- **Sections**：评测原则、四个平台、评测协议、报告结构、工作台入口
- **Outcome**：`0 FAIL / 0 REFLEX / 0 WARN`，3 项液态玻璃相关的 29 waiver


## 交互

- 首屏标题循环打字并回删；暂停按钮视觉隐藏，键盘聚焦时出现。
- 鼠标下滚隐藏顶部导航，上滚立即恢复。
- 鼠标滚轮或触屏上下轻扫会切换到相邻内容节点，使用无回弹的单调缓动；短模块按一屏幻灯片对齐，当前模块先渐出，目标模块在切换中段开始渐入。
- 液态玻璃面板带指针跟随高光、背景折射、细边高光和轻量阴影；平台表与报告表统一使用行级聚光灯和局部边界高光。
- 首屏平台架构支持整宽抽屉拉手展开/收起，拉手带三个抓取点，外层玻璃卡片高度同步变化。
- 顶部和底部 ATLAS 标识可平滑返回首页。
- 系统开启“减少动态效果”时，自动关闭打字、吸附与渐隐渐现动画，保留原生滚动。

## 前后对照

- 前后对照页：`.hallmark/compare.html`
- 原站截图：`.hallmark/before/`
- 新版截图：`.hallmark/shots/`
- 预检：`.hallmark/preflight.json`
- 品牌证据：`.hallmark/brand-spec.md`
- 构建记录：`.hallmark/log.json`

## 评测工作台

顶部、底部页脚和页面末端的“评测工作台”统一跳转到：

`http://8.130.152.15/login?next=/project/overview`
