# # visulization-project

### 一、项目Git简单教程

#### 初始化工作

1. git官网，下载适合版本git

```
https://git-scm.com/downloads
```

2. 安装完成后，在开始菜单里找到`Git`->`Git Bash`，出现的界面跟普通命令行窗口一样，在里面执行

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

3. 在自己想要下载的文件夹下执行

```bash
git clone git@github.com:jimzhang828/visualization-project.git && cd visualization-project
```

4. 到这里整个项目都已经下载到你的电脑本地

#### 修改与更新

1. 首先执行`git pull`，表示从github上把最新的版本（包括了其他人的修改）拉下来，保证自己本地的文件跟线上一致。

```bash
$ git pull
Already up to date.
```

2. 在本地对网页进行修改，包括添加和删除文件。修改完成后使用`git status`查看当前状态，`modified: js/hkisland.js`表示该js文件被修改过，颜色为红色表示该修改没有添加。

```bash
$ git status
......
	modified:   js/hkisland.js

no changes added to commit (use "git add" and/or "git commit -a")
```

3. 执行`git add .`，表示添加所有的修改，执行成功的话不会输出任何东西。再执行`git status`的话就可以看到`modified: js/hkisland.js`变成绿色。

4. 当全部的修改都添加后，执行`git commit -m "your commit"`，表示要提交修改，并且对所做的修改做一下描述。

```bash
$ git commit -m "add comments"
[master 108d9aa] add comments
 1 file changed, 2 insertions(+), 1 deletion(-)
```

5. 执行`git push`或者`git push -u origin master`，把修改推送到github。push前会要求输入github的账号和密码。

```
$ git push
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 360 bytes | 360.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
remote: This repository moved. Please use the new location:
remote:   git@github.com:jimzhang828/visualization-project.git
To github.com:jimzhang828/visulization-project.git
   a3513a9..108d9aa  master -> master
```

6. 总结5句常用的命令

```bash
git pull
git status
git add .
git commit -m "your comments"
git push -u origin master
```

#### SSH Key（Optional）

1. 如果觉得每次都提交都要输入账号密码太烦的话，可以添加密钥到github上，之后就不需要再输入账号密码。先执行下面的命令，邮箱替换成github的账号邮箱。

```bash
$ ssh-keygen -t rsa -C "email@example.com"
```

2. 接着再执行，复制输出的内容（密钥）。

```
cat ~/.ssh/id_rsa.pub
```

3. 打开github官网`github.com`，登录后点击`头像`->`Setting`，在左边设置项中选择`SSH and GPG keys`，再点击`New SSH key`按钮，把刚刚复制的密钥复制到Key输入框中，Title可以随便起，最后点击`Add SSH key`保存。