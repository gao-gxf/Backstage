### 安装运行
##### 1.下载或克隆项目源码
##### 2.npm安装相关包文件(国内建议增加淘宝镜像源cnpm,安装速度更快😁)
```js
npm i
```
##### 3.启动项目
```js
npm start
```
##### 4.打包项目
```js
npm run build
```

### 依赖模块
<span style="color: rgb(184,49,47);">备注：项目是用create-react-app创建的，列出主要的功能依赖包，包含但不限于以下内容，点击名称可跳转相关网站。</span>
- [react@15.5.0](https://facebook.github.io/react/)
- [react-router@3.0.2](https://react-guide.github.io/react-router-cn/)(<span style="color: rgb(243,121,52);">react路由,4.x的差异还是比较大，暂时还是3.x的版本</span>)
- [antd@2.9.3](https://ant.design/index-cn)(<span style="color: rgb(243,121,52);">蚂蚁金服开源的react ui组件框架</span>)
- [axios@0.16.1](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http请求模块</span>)
- [echarts-for-react@1.2.0](https://github.com/hustcc/echarts-for-react)(<span style="color: rgb(243,121,52);">可视化图表</span>)
- [babel-loader@7.0.0](https://www.npmjs.com/package/babel-loader)(<span style="color: rgb(243,121,52);">转换ES6代码</span>)
- [css-loader@0.28.4](http://www.css88.com/doc/webpack/loaders/css-loader/)(<span style="color: rgb(243,121,52);">JS中的CSS加载器</span>)
- [file-loader@0.11.2](http://www.css88.com/doc/webpack/loaders/file-loader/)(<span style="color: rgb(243,121,52);">打包图片文件</span>)
- [style-loader@0.18.2](https://webpack.docschina.org/loaders/style-loader/)(<span style="color: rgb(243,121,52);">样式加载器</span>)
- [webpack@2.6.1](http://webpack.github.io/)(<span style="color: rgb(243,121,52);">前端资源加载／打包工具</span>)
- [webpack-dev-server@2.5.0](https://www.npmjs.com/package/webpack-dev-server)(<span style="color: rgb(243,121,52);">web服务,实时刷新</span>)

### 功能模块
<span style="color: rgb(184,49,47);">备注：列出主要的功能模块，包含但不限于以下内容。</span>
<!--more-->

- 实时数据概况
    - 概况
    - 订单
- 运营日报
    - 订单收入及成本
    - 订单分布
    - 订单画像
    - 议价分析
    - 运力分析
    - 用户统计
    - 派单分析
    - 司机服务质量
- 排行榜
    - 订单
    - ...   
    - 司机
    - ...
    - 用户
    - ...
- 系统管理
    - 系统公告
    - 权限管理  
        - 角色组
        - 用户列表
        - 模块列表

### 代码目录
```js
+-- build/                                  ---打包的文件目录
+-- config/                                 ---npm run eject 后的配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/                                 
|   --- index.html							---首页入口html文件
+-- scripts/                                 
|   --- build.js							---打包文件
|   --- start.js							---打包文件
|   --- test.js							    ---打包文件
+-- src/                                    ---核心代码目录
|   +-- axios                               ---接口请求存放目录
|   |    --- index.js
|   +-- components                          ---各组件存放目录
|   |    +-- chart                          ---图表组件
|   |    |    --- ...   
|   |    +-- exportFile                     ---数据导出组件
|   |    |    --- ...   
|   |    +-- pagaination                    ---分页组件
|   |    |    --- ...   
|   |    +-- pages                          ---登录页面组件
|   |    |    --- ...   
|   |    +-- ranking                        ---排行榜页面组件
|   |    |    --- ...   
|   |    +-- searchBox                      ---筛选查询组件
|   |    |    --- ...   
|   |    --- BreadcrumbCustom.jsx           ---面包屑组件
|   |    --- HeaderCustom.jsx               ---顶部导航组件
|   |    --- Page.jsx                       ---页面容器
|   |    --- SiderCustom.jsx                ---左边菜单组件
 +-- page                                   ---页面存放目录
|   |    --- operatingDaily                 ---运营日报文件
|   |    --- realTimeData                   ---实时数据概况文件
|   |    --- ranking                        ---排行榜文件
|   |    --- systemManage                   ---系统管理文件
|   |    --- pageError                      ---报错页面文件
 +-- routes                                 ---路由配置存放目录
|   |    --- index.js
 +-- store                                  ---redux存放目录
|   |    --- index                          ---页面初始化状态
|   |    --- menu                           ---左侧菜单变化状态
|   |    --- store.js                       ---所有状态管理
 +-- style                                  ---样式文件存放目录
 +-- utils                                  ---工具文件存放目录
|   --- api.js                              ---接口请求
|   --- dataHandle.js                       ---数据格式化
|   --- dateFormat.js                       ---日期格式化
|   --- exportFile.js                       ---数据导出
+-- theme/                                  ---主题配置存放目录
|   +-- index.json                          ---配置文件
--- yarn.lock                               
--- package-lock.json                       
--- package.json                                    
```                                   

### 更新日志

#### 2018-06-25 ~ 2018-07-06
- 第三版BI重构

#### 2018-07-09 ~ 2018-08-10
- 第三版BI系统管理模块添加，包括系统公告和权限管理

#### 2018-08-13 ~ 2018-08-24
- 第三版BI运营日报模块修改及现有功能上线