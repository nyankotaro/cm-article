# Mac構築手順

## homebrewインストール

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/your_username/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

## Ansibleインストール

```shell
brew install ansible
```

## Ansible-Galaxyインストール

```shell
ansible-galaxy collection install geerlingguy.mac
```

## ディレクトリのコピー

```shell
svn export https://github.com/nyankotaro/cm-article/trunk/building-mac-using-ansible-galaxy
```

## Ansible実行

```shell
ansible-playbook -i inventory site.yml
```

## ブログリンク

[Ansible Galaxyを使ってMacを構築してみた -2022-](https://dev.classmethod.jp/etc/building-mac-using-ansible-galaxy/)
