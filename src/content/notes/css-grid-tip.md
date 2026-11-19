---
title: CSS Grid 的小技巧
pubDate: 2026-09-08
tags: [前端, CSS]
mood: 灵感
accent: mint
description: 用 minmax 和 auto-fit 做响应式网格，一行代码就够了。
---

今天重构了一个列表布局，发现还是这一行最好用：

```css
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
```

不需要媒体查询，列数会自己适应容器宽度。配合 `gap` 使用，几乎能解决八成的卡片布局需求。

一个细节：`minmax` 里的最小值不要太贪心。240px 在手机上够用，在窄屏上留一点余量会更从容。
