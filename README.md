# PROC.X 公式サイト

株式会社PROC.X（プロックス）の、日本の中小企業に向けた業務自動化の紹介サイトです。
公開先: https://proc-x.github.io/

## 内容の方針

「仕事を減らす。その先を、自動化する。」を中心に、**なくす → 整える → 自動化する**の順序を伝えます。
既存ツールの活用、Python・C#による開発、AIエージェントを、業務に合わせて選択する方針です。
受注・転記、集計・請求、社内問い合わせの改善例は、導入実績ではなく想定例として掲載しています。
会社の基本情報は既存サイトから引き継いでいます。
「なくす」は不要なタスクの廃止を指します。AIは回答案の作成を支援し、担当者が根拠と内容を確認して回答する例に統一しています。

## 構成

- `index.html`: サービス紹介、業務例の改善前後切り替え、FAQ、メール相談
- `company.html`: 会社概要・事業方針
- `thanks.html`: 旧URLを残したお問い合わせ案内。受信を確認できないため、送信完了とは表示しません。
- `styles/site.css`: 全ページ共通のレスポンシブデザイン
- `scripts/main.js`: モバイルメニュー、業務例の切り替え、メールアドレスのコピー
- `images/logo.png`: 既存のロゴ

日本語を主言語に、デジタル庁デザインシステム（DADS）のガイドラインを参照した共通スタイルを使用します。
トップの業務フローはHTMLの見出し・リストで構成し、読み上げや文字拡大でも内容を伝えます。
フォームの送信先は設けず、既存の `support@proc-x.co.jp` へのメール導線を使用します。

## ローカル確認

ビルド・npm install は不要です。Python 3 がある環境で、リポジトリのルートから実行します。

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

`http://127.0.0.1:8765/` を開きます。動作に必要な外部JavaScriptや本番用パッケージはありません。
日本語フォントは Google Fonts の Noto Sans JP（400 / 700）を使用し、取得できない場合は端末の sans-serif にフォールバックします。
JavaScript が無効でも、本文、受注の改善例、FAQ、ナビゲーションとメールリンクを利用できます。

## 変更後の確認

```powershell
node --check scripts/main.js
git diff --check
```

ブラウザーで以下を確認します。

1. スマートフォン・タブレット・PCで、横はみ出しや文字の重なりがない。
2. 3業務それぞれで、改善前・改善後の内容と選択表示が一致する。タブは左右矢印・Home・Endで選択でき、Tabでパネルに進める。
3. モバイルメニューが開閉し、Escapeで閉じ、リンク選択後にも閉じる。
4. FAQが開閉する。キーボードからリンクとボタンを操作できる。
5. メールリンクの宛先が正しい。コピー成功・失敗が画面に表示される。
6. 会社概要・お問い合わせ案内のページと、各ページからのリンクが開く。
7. JavaScript無効・フォント取得不可でも相談先へ進める。
8. 本文・操作ラベルは16px以上、補足情報は14px以上。文字を200%に拡大しても欠けず、フォーカスは黄・黒で視認できる。

## 公開

GitHub Pages は `main` ブランチのルートから公開します。
作業ブランチで編集・確認後、承認済みの変更を `main` に反映し push します。
CSS / JavaScript の変更時は、HTML内の `?v=...` も更新して古いキャッシュの混在を防ぎます。
`output/` は既存のローカル検証用データで、公開用コミットに含めません。

## デザインの参照元と適用範囲

2026年10月4日に [デジタル庁デザインシステムβ版 v2.18.0](https://design.digital.go.jp/dads/) を確認して適用しました。

- [カラー](https://design.digital.go.jp/dads/foundations/color/): 公式HTMLサンプルの青・ニュートラルの値をCSS変数として採用。本文はGray-900、補足はGray-600、操作はBlue-900、通常リンクはBlue-1000、訪問済みリンクはMagenta-900。フォーカスにはYellow-300と黒を使用。
- [タイポグラフィ](https://design.digital.go.jp/dads/foundations/typography/): Noto Sans JP、400 / 700、本文・UIは1rem（標準16px）、補足は0.875rem（標準14px）、本文行高1.7。文字サイズはremで指定。
- [余白](https://design.digital.go.jp/dads/foundations/spacing/): 8pxを基準に、16 / 24 / 32 / 48 / 64pxを用途別に使用。
- [ボタン](https://design.digital.go.jp/dads/components/button/): 主操作は塗り、副操作はアウトライン。高さ56 / 48px、角丸8pxを採用し、ホバー・押下・キーボードフォーカスを区別。
- [タブ](https://design.digital.go.jp/dads/components/tab/): 業務例を切り替えるラベルとパネルを関連づけ、選択タブの上辺を青で表示。ロービングtabindexと矢印キー操作を実装。
- [アコーディオン](https://design.digital.go.jp/dads/components/accordion/): FAQにdetails / summaryを使用。開閉の丸形矢印と見やすいフォーカスを表示。
- [リンクテキスト](https://design.digital.go.jp/dads/foundations/link-text/): 青・下線・訪問済み色を設定し、色だけに依存せずリンクを識別。ページ内目次・パンくず・本文スキップ導線を用意。

既存の静的HTML / CSS / JavaScriptへ必要な仕様を適用した独自実装です。公式パッケージへの依存、デジタル庁による認定、WCAG全項目の適合宣言を意味しません。ロゴ・会社情報・サービス内容はPROC.Xのものです。公式HTMLサンプルを参照したコードのライセンスは `THIRD_PARTY_NOTICES.md` に記載しています。
