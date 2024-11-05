## 実行方法
```.env```を作成、環境変数を登録  
```npm install```  
```npm run db:push```  
```npm run dev```  
http:/localhost:3000に接続

## Prisma
```npx prisma studio```  
http:/localhost:5555に接続  
→データベースの中身が見れる、GUIでテーブル書き換え可能  

## ブランチ命名規則
基本的には<個人名>/<作業名>で統一  

## コミットメッセージ
○○: 海画面に遷移するめんだこボタンを追加

fix：バグ修正
add：新規ファイル追加  
remove：ファイル削除  
feat：新規機能実装  
update：機能修正（バグではない）  
change：仕様変更  
ref：リファクタリング  
style：空白とか改行とかコメントとか  
docs：ボタンの文字を変えたとか  
revert：変更取り消し  
