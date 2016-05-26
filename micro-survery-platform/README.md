### 微型调查问卷平台
#### 简介
　　这是百度IFE前端技术学院2016年春季春季任务的最后三个任务中的第一个。目前这个调查问卷平台已经实现了问卷的新建，编辑，删除发布，填写以及统计等功能。目前此调查问卷平台无后台支持，数据的存储使用的是`localStorage`本地存储，目前还是一个实验性质的平台。后期准备添加上后台支持。
　　在线地址：https://simontart.github.io/BaiduIFE-Tasks/micro-survery-platform/list.html
#### 技术简介
　　由于是练习项目，目前没有使用任何框架和库。之所以不想使用框架来提升开发速度是为了想巩固自己的基础知识。由于之前习惯了jQuery的使用，感觉自己对许多原生的JavaScript方法有诸多不熟悉。关于如何不使用jQuery,参照了[You Don't Need jQuery](https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README.zh-CN.md)
## Browser Support
![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 10+ ✔ | Latest ✔ | 6.1+ ✔ |
#### v1版本还未完成的功能
　　目前还是第一个版本，目前还位添加的功能有如下：
　　1.问卷截至日期功能还未完成
　　2.问题是否是必填选项（目前默认选择题必填，问答题选填）
　　3.查看数据统计页面时可以效果动态化
#### v2版本计划
　　1.编辑问卷时自动保存
　　2.统计数据时的百分比和可能不为1，看能否优化
　　3.添加后台数据支持
