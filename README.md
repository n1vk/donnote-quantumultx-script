# Donnote-QuantumultX-Script

Donnote QuantumultX 脚本用于在 QuantumultX 软件中重现 Donnote 获取成绩的 MitM 逻辑，方便 Donder 直接在手机上同步成绩。

## 前置条件

1. 安装了 QuantumultX 软件的 iOS 设备（推荐开启 QuantumultX 通知权限）。
2. 在 QuantumultX 设置中，启用 MitM ，按照说明添加描述文件并信任证书。
3. 在 QuantumultX 设置中，启用重写。

## 直接添加重写规则

在设置-重写栏目内，选择规则资源，点击右上角的添加连接，在资源路径选项中填写：
```
https://raw.githubusercontent.com/n1vk/donnote-quantumultx-script/refs/heads/main/taiko_download.snippet
```

如果提示“无法连接至服务器”，说明你的网络访问Github有障碍，请按照以下方式尝试手动添加。


## 手动添加重写规则

### 拷贝脚本

将代码库中的 `taiko.snippet` 拷贝到`文件`的`本地存储/QuantumultX/Profile`内，将`getter.js`, `setter.js`拷贝到`本地存储/QuantumultX/Scripts`内。

### 添加重写规则资源

在设置-重写栏目内，选择规则资源，点击右上角的添加连接，在资源路径选项中选择本地拷贝的 `taiko.snippet` 文件。

在主页面，确保重写规则选项卡内已有两个重写规则。

<div align="center">
  <img src="https://github.com/user-attachments/assets/6fa12363-8018-4e14-bf81-803cc256d00e" alt="重写规则" width="300" />
</div>

### 启动软件并同步

长按右下角设置运行模式为全部代理，并开启代理（你不需要任何代理节点）。接下来和电脑端进行同样的操作流程即可，如果你允许了App通知权限，你将会收到成功/失败的系统提示。

<div align="center">
  <img src="https://github.com/user-attachments/assets/a8d97840-e6e8-47df-b281-16af522a9dec" alt="重写规则" width="300" />
</div>
