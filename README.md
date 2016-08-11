# 基于jsPlumb-2.1.4 & jQuery 搭建的CRM流程操作界面

---

 拖拽式操作，各个节点可以连接相匹配的节点
 每个节点双击可以打开节点配置
 
---

##### 环境

所需组件：

 1. jsPlumb-2.1.4
 2. bootstrap 3.3.6
 3. jquery 1.11.3


##### 技术栈

> [jsPlumb](https://jsplumbtoolkit.com/)

> [bootstrap](http://v3.bootcss.com/)

---
### 截图

---

![print](./print/demo.jpg)

---

### 启动测试

grunt live

### 本地测试地址

http://localhost:9090

### 编译打包

grunt


### 目录结构
<pre>
.
├── README.md           
├── dist                     // 项目build目录
├── print                    // 项目截图目录
├── package.json             // node.js项目配置文件
├── webpack.config           // webpack配置文件
├── src                      // 生产目录
│   ├── css
│   ├── js
│   ├── images
│   └── fonts
</pre>
