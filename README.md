# 本棚アプリ
## 概要
- backend : django
- frontend : React(Typescript)
## 前提
`npm -v`でバージョンが表示されること
## 環境構築
- `git clone <このレポジトリのURL>`
- `docker compose build`
- `docker compose up -d`
- `npm install react-scripts --save`
- frontend/package.jsonのscriptsのstartをマウスホバーして，Run Scriptを押す

docker compose up した時点でhttp://localhost:8000 でDjnagoが動いていることを確認できる
Run Scriptすると，http://localhost:3000 が開いてReactが動いていることを確認できる
