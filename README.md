<div align=center>

<img width="240" src="/public/logo.svg" >

</div>

<div align=center>

# Weather Forecast

</div>
&nbsp;

## Overview

![](/public/weather-cover.webp)

This is a Web application that provides a one-week weather forecasts for cities in China.

### Techniques

（1）A Vue 3 project built by [Vite](https://cn.vitejs.dev/).  
（2）Organized the UI interface by using [Element Plus](https://element-plus.gitee.io/zh-CN/) and deconstructed it by three components: `CityPanel.vue`、`Days.vue`、`Footer.vue`. Enable the responsive layout by using `media query`.  
（3）By comparing the city suffixes ('市', '县', '自治州', '岛'), the legal city name is determined to be a request parameter. To make the request easier, I set the `Axios` as the Vue global property `$http`，and request/response interceptor is also set at the same time.  
（4）Used the `Less` to write the styles and applyed some icons from [阿里巴巴矢量图标库](https://www.iconfont.cn/)

Deploy in Gitee pages: https://w-junhui.gitee.io/weather-forecast

## Start Dev mode

```sh
# Install dependencies after forking repo
npm i
# start the normal dev mode
npm run dev
# Preview the project after build
npm run preview
```

## Build and deploy

With the magic power of [GitHub Actions](https://docs.github.com/zh/actions), the project can be deployed to [Gitee Pages](https://gitee.com/help/articles/4136#article-header0) automatically once it's built. In other words, you don't have to run the script command(npm run build) with your bare hand, but adding some simple steps in the workflow file by using the GitHub Actions.

Once the project is built by GitHub Actions, the build directory `dist/` will be deployed to the remote repository's branch `gh-pages`

The deployment is similar to my blog deployment, you may refer to my article [《我的博客部署之路》](https://w-junhui.gitee.io/%E6%8A%80%E6%9C%AF%E5%8D%9A%E6%96%87/VuePress/%E6%88%91%E7%9A%84%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2%E4%B9%8B%E8%B7%AF.html)  
CSDN：[我的 VuePress 博客部署之路](https://blog.csdn.net/INT_FUTURE/article/details/128975977)

## Contact me

If you have any questions about this repo, feel free to e-mail me: wu-junhui@foxmail.com  
Or you may create a [Issues](https://github.com/Wu-JunHui/Wu-JunHui.github.io/issues).

## Open source license

[MIT](/LICENSE)

&nbsp;
&nbsp;

---

&nbsp;
&nbsp;

## 概述

![](/public/weather-cover.webp)

这是一个提供全国城市当天往后一周的天气预报的 Web 应用

### 技术应用

（1）使用 [Vite](https://cn.vitejs.dev/) 构建的 Vue 3 项目  
（2）基于 [Element Plus](https://element-plus.gitee.io/zh-CN/) 构建项目 UI 界面，并将界面进行组件化拆分，封装了 `CityPanel.vue`、`Days.vue`、`Footer.vue` 三个组件，同时通过**媒体查询**设置不同视口的页面布局，实现**响应式布局**  
（3）通过比对城市后缀（'市', '县', '自治州', '岛'），判断出合法城市名后，将 `Axios` 设置为全局属性 `$http` 以方便发起数据请求，同时设置了**请求/响应拦截器**
（4）项目中使用 `Less` 编写样式，同时使用了 [阿里巴巴矢量图标库](https://www.iconfont.cn/)

部署于 Gitee pages: https://w-junhui.gitee.io/weather-forecast

## 开发模式

```sh
# Fork仓库后，安装依赖
npm i
# 启用普通的开发环境
npm run dev
# 预览模式，预览构建后的项目
npm run preview
```

## 构建与部署

借助 [GitHub Actions](https://docs.github.com/zh/actions)，当前应用能在构建项目的同时，自动部署至 [GitHub Pages](https://docs.github.com/zh/pages) 和 [Gitee Pages](https://gitee.com/help/articles/4136#article-header0)。同时，构建项目也不再需要手动执行脚本命令（npm run build ），而是使用 GitHub Actions，在工作流中增加构建项目的任务步骤即可

通过工作流的相关设置，项目自动构建完毕后，构建目录 `dist/` 将会部署在远程仓库的 `gh-pages` 分支

该项目部署与我的博客部署类似，可参考我的博客文章 [《我的博客部署之路》](https://w-junhui.gitee.io/%E6%8A%80%E6%9C%AF%E5%8D%9A%E6%96%87/VuePress/%E6%88%91%E7%9A%84%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2%E4%B9%8B%E8%B7%AF.html)  
CSDN：[我的 VuePress 博客部署之路](https://blog.csdn.net/INT_FUTURE/article/details/128975977)

## 联系我

如果对该仓库的代码有任何疑问，可通过邮箱联系我：wu-junhui@foxmail.com  
或者你也可以创建一个 [Issues](https://github.com/Wu-JunHui/Wu-JunHui.github.io/issues)

## 开源许可

[MIT](/LICENSE)
