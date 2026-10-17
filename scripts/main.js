"use strict";

// Navigation remains available without JavaScript.
const header = document.querySelector(".site-header");
const menu = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
if (header && menu && nav) {
  header.classList.add("has-js");
  const closeMenu = () => {
    header.classList.remove("nav-open");
    menu.setAttribute("aria-expanded", "false");
    menu.querySelector(".menu-label").textContent = "メニュー";
  };
  menu.addEventListener("click", () => {
    const open = !header.classList.contains("nav-open");
    header.classList.toggle("nav-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.querySelector(".menu-label").textContent = open ? "閉じる" : "メニュー";
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("nav-open")) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });
  window.matchMedia("(min-width: 70rem)").addEventListener("change", closeMenu);
}

// Illustrative workflows, not customer results or guaranteed savings.
const examples = {
  "orders": {
    "category": "日々の気がかり",
    "title": [
      "同じことを、",
      "また入力しなきゃ。"
    ],
    "description": "仕事の記録や連絡先を、表にも書類にも入力する。チームで分担していても、ひとりで進めていても、転記と見直しに時間を取られていませんか。",
    "tools": "表計算ソフト / 入力フォーム / データ連携 / AI-エージェント",
    "before": [
      [
        "manual",
        "開始",
        "記録が届く",
        "この出来事をきっかけに、人が作業を始めます。"
      ],
      [
        "manual",
        "なくす対象",
        "使わない控え表を作成",
        "この想定例では利用されていないため、作業そのものを廃止できます。"
      ],
      [
        "manual",
        "整える対象",
        "表ごとに項目を合わせる",
        "共通のルールがなく、その都度合わせ直しています。"
      ],
      [
        "manual",
        "自動化の対象",
        "必要な書類へ再入力",
        "必要な作業は残し、定型処理をプログラムやAIへ任せます。"
      ],
      [
        "human",
        "人が確認",
        "漏れ・誤りを見直す",
        "最終確認と例外への判断は、改善後も人が担当します。"
      ],
      [
        "human",
        "終了",
        "転記完了",
        "改善前の作業が完了します。"
      ]
    ],
    "after": [
      [
        "auto",
        "自動化プログラム",
        "受信・登録を検知",
        "受信通知や新規登録をきっかけに、自動で処理を始めます。"
      ],
      [
        "auto",
        "AI-エージェント",
        "情報を読み取る",
        "文書やメールから必要な情報を抽出し、不明な内容も確認対象として引き継ぎます。"
      ],
      [
        "auto",
        "自動化プログラム",
        "検証・転記案を作成",
        "事前に決めた必須項目・形式を確認し、必要な表や書類への転記案を作成します。"
      ],
      [
        "auto",
        "自動化プログラム",
        "例外あり？",
        "例外があれば5へ、なければ5を省略して6の最終確認へ進みます。"
      ],
      [
        "human",
        "人",
        "不備を確認・修正",
        "例外がある場合のみ、不足・不明な情報を確認して修正します。その後、6へ進みます。"
      ],
      [
        "human",
        "人",
        "最終確認・反映を承認",
        "例外の有無にかかわらず、人が内容を最終確認して反映を承認します。"
      ],
      [
        "auto",
        "自動化プログラム",
        "承認内容を反映",
        "承認された内容を必要な表や書類に反映します。"
      ],
      [
        "auto",
        "自動化プログラム",
        "反映完了",
        "承認内容の反映が完了します。"
      ]
    ],
    "outcome": "「まだ転記が残っている」という気がかりを減らし、次にしたいことへ気持ちを切り替えられる。",
    "problem": "入力するたびに、作業も確認も増えていく。",
    "preparation": [
      [
        "manual",
        "なくす",
        "参照されない控え表の作成をやめる",
        "正本と必要な転記先を決め、使われていない控え表への記入そのものを廃止します。"
      ],
      [
        "manual",
        "整える",
        "共通の項目と入力ルールを決める",
        "入力項目、正本、転記先、必須チェックを事前に揃えます。"
      ]
    ]
  },
  "invoices": {
    "category": "日々の気がかり",
    "title": [
      "月末が近づくと、",
      "集計や書類づくりが気になる。"
    ],
    "description": "売上や経費、活動の記録をまとめて、報告書や請求書をつくる。会社の担当業務でも、個人の仕事でも、締め切り前に同じ作業が重なります。",
    "tools": "表計算ソフト / 会計ソフト / 書類のひな形 / AI-エージェント",
    "before": [
      [
        "manual",
        "開始",
        "締めの時期",
        "この出来事をきっかけに、人が作業を始めます。"
      ],
      [
        "manual",
        "なくす対象",
        "使わない社内集計表を作成",
        "この想定例では利用されていないため、作業そのものを廃止できます。"
      ],
      [
        "manual",
        "整える対象",
        "記録の形式・期間を合わせる",
        "共通のルールがなく、その都度合わせ直しています。"
      ],
      [
        "manual",
        "自動化の対象",
        "集計して書類へ転記",
        "必要な作業は残し、定型処理をプログラムやAIへ任せます。"
      ],
      [
        "human",
        "人が確認",
        "数字・条件を見直す",
        "最終確認と例外への判断は、改善後も人が担当します。"
      ],
      [
        "human",
        "終了",
        "提出・送付",
        "改善前の作業が完了します。"
      ]
    ],
    "after": [
      [
        "auto",
        "自動化プログラム",
        "締め日時が到来",
        "事前に決めた締め日時に、自動で処理を始めます。"
      ],
      [
        "auto",
        "自動化プログラム",
        "集計・下書きを作成",
        "対象の記録を集計し、決めたひな形で書類の下書きを作成します。"
      ],
      [
        "auto",
        "AI-エージェント",
        "不整合の候補を提示",
        "記載内容や個別条件を読み取り、不整合や確認が必要な箇所の候補を示します。"
      ],
      [
        "auto",
        "自動化プログラム",
        "例外あり？",
        "例外があれば5へ、なければ5を省略して6の最終確認へ進みます。"
      ],
      [
        "human",
        "人",
        "数字・条件を修正",
        "例外がある場合のみ、記録の漏れや個別条件を確認・修正します。その後、6へ進みます。"
      ],
      [
        "human",
        "人",
        "最終確認・送付を承認",
        "例外の有無にかかわらず、人が数字・宛先・内容を最終確認して送付を承認します。"
      ],
      [
        "auto",
        "自動化プログラム",
        "承認済み書類を送付",
        "承認済みの書類を、確認済みの宛先へ送付します。"
      ],
      [
        "auto",
        "自動化プログラム",
        "送付完了",
        "承認された書類の送付が完了します。"
      ]
    ],
    "outcome": "月末の作業を抱え込まず、必要な確認に落ち着いて向き合う。仕事のあとの予定も立てやすくする。",
    "problem": "締め切りが近づくほど、ほかのことに使いたい時間まで気になってしまう。",
    "preparation": [
      [
        "manual",
        "なくす",
        "利用されていない社内集計表を廃止する",
        "用途を確認し、誰も利用していない社内集計表を毎月つくる作業をやめます。"
      ],
      [
        "manual",
        "整える",
        "締め日・集計元・書式・承認条件を決める",
        "対象期間、データの置き場所、書類のひな形、承認者と確認項目を事前に揃えます。"
      ]
    ]
  },
  "questions": {
    "category": "日々の気がかり",
    "title": [
      "あとで整理しよう、が",
      "たまっていく。"
    ],
    "description": "届いた書類や保存したデータを、名前を変えてフォルダへ移す。共有するファイルも、自分だけで使うファイルも、後回しにすると探す時間が増えてしまいます。",
    "tools": "保存フォルダ / ファイル名のルール / 自動振り分け / AI-エージェント",
    "before": [
      [
        "manual",
        "開始",
        "ファイルが届く",
        "この出来事をきっかけに、人が作業を始めます。"
      ],
      [
        "manual",
        "なくす対象",
        "使わない個人用控えを複製",
        "この想定例では利用されていないため、作業そのものを廃止できます。"
      ],
      [
        "manual",
        "整える対象",
        "名前・保存先を都度決める",
        "共通のルールがなく、その都度合わせ直しています。"
      ],
      [
        "manual",
        "自動化の対象",
        "名前を変えて移動",
        "必要な作業は残し、定型処理をプログラムやAIへ任せます。"
      ],
      [
        "human",
        "人が確認",
        "保存結果を見直す",
        "最終確認と例外への判断は、改善後も人が担当します。"
      ],
      [
        "human",
        "終了",
        "利用できる",
        "改善前の作業が完了します。"
      ]
    ],
    "after": [
      [
        "auto",
        "自動化プログラム",
        "ファイル追加を検知",
        "対象フォルダへの追加を検知し、自動で処理を始めます。"
      ],
      [
        "auto",
        "AI-エージェント",
        "内容から分類を提案",
        "書類の内容から種類や保存先の候補を提案し、分類できないものは確認対象にします。"
      ],
      [
        "auto",
        "自動化プログラム",
        "命名・振分案を検証",
        "事前に決めた命名・分類ルールや重複を確認して、保存案を作成します。"
      ],
      [
        "auto",
        "自動化プログラム",
        "例外あり？",
        "例外があれば5へ、なければ5を省略して6の最終確認へ進みます。"
      ],
      [
        "human",
        "人",
        "未分類・重複を判断",
        "例外がある場合のみ、未分類のファイルや重複候補の扱いを判断します。その後、6へ進みます。"
      ],
      [
        "human",
        "人",
        "最終確認・保存を承認",
        "例外の有無にかかわらず、人が保存先・名前を最終確認して保存を承認します。"
      ],
      [
        "auto",
        "自動化プログラム",
        "承認内容で保存",
        "承認された内容で保存します。勝手な削除・上書きは行いません。"
      ],
      [
        "auto",
        "自動化プログラム",
        "整理完了",
        "承認内容に沿ったファイルの整理が完了します。"
      ]
    ],
    "outcome": "「整理しなきゃ」をためず、必要なものを見つけやすくする。探し物で手を止めず、自分のペースを保てる。",
    "problem": "後回しにした整理が、次の作業を始める負担になる。",
    "preparation": [
      [
        "manual",
        "なくす",
        "不要な個人用控えの複製をやめる",
        "共有先に正本があるのに使っていない個人用控えを作る作業を廃止します。"
      ],
      [
        "manual",
        "整える",
        "保存先・命名・分類・重複時の扱いを決める",
        "共通の保存先と命名・分類ルールを決め、不明なものや重複候補の確認方法も揃えます。"
      ]
    ]
  }
};

const panel = document.getElementById("example-panel");
if (panel) {
  let selected = "orders";
  let view = "after";
  const render = () => {
    const example = examples[selected];
    document
      .getElementById("example-title")
      .replaceChildren(
        document.createTextNode(example.title[0]),
        document.createElement("br"),
        document.createTextNode(example.title[1]),
      );
    document.getElementById("example-category").textContent = example.category;
    document.getElementById("example-description").textContent =
      example.description;
    document.getElementById("example-tools").textContent =
      `使うものの例：${example.tools}`;
    document.getElementById("example-state").textContent =
      view === "after" ? "開始・処理は自動化し、人は最終確認と例外対応へ" : "いつも抱えている作業";
    document.getElementById("example-outcome").textContent =
      view === "after" ? example.outcome : example.problem;
    document.getElementById("example-outcome-label").textContent =
      view === "after" ? "目指す変化" : "こんな気がかりに";
    const makeItem = ([kind, label, heading, description], index) => {
      const item = document.createElement("li");
      const tag = document.createElement("span");
      tag.className = `step-tag tag-${kind}`;
      tag.textContent = label;
      const body = document.createElement("div");
      const strong = document.createElement("strong");
      const text = document.createElement("p");
      strong.textContent = index === undefined ? heading : `${index + 1}. ${heading}`;
      text.textContent = description;
      body.append(strong, text);
      item.append(tag, body);
      return item;
    };
    const preparation = document.getElementById("example-preparation");
    preparation.hidden = view !== "after";
    document.getElementById("example-preparation-steps").replaceChildren(
      ...example.preparation.map(step => makeItem(step)),
    );
    document.getElementById("example-flow-heading").textContent =
      view === "after" ? "運用の流れ（図の左から右の順）" : "改善前の流れ（図の左から右の順）";
    document.getElementById("example-steps").replaceChildren(...example[view].map(makeItem));
    if (typeof renderExampleDiagram === "function") renderExampleDiagram(selected, view);
    panel.setAttribute("aria-labelledby", `tab-${selected}`);
    document.querySelectorAll("[data-example]").forEach((button) => {
      const active = button.dataset.example === selected;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    document
      .querySelectorAll("[data-view]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.view === view),
        ),
      );
  };
  const tabs = Array.from(document.querySelectorAll("[data-example]"));
  const selectExample = (button) => {
    selected = button.dataset.example;
    render();
  };
  tabs.forEach((button, index) => {
    button.addEventListener("click", () => selectExample(button));
    button.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectExample(tabs[next]);
      tabs[next].focus();
    });
  });
  document.querySelectorAll("[data-view]").forEach((button) =>
    button.addEventListener("click", () => {
      view = button.dataset.view;
      render();
    }),
  );
  document.querySelector(".example-picker").hidden = false;
  document.querySelector(".example-view-switch").hidden = false;
  if (typeof renderExampleDiagram === "function") {
    document.getElementById("example-text-description").open = false;
    document.getElementById("example-diagram-legend").hidden = false;
  }
  render();
}

const copyEmail = document.getElementById("copy-email");
if (copyEmail && navigator.clipboard && window.isSecureContext) {
  copyEmail.parentElement.hidden = false;
  copyEmail.addEventListener("click", async () => {
    const status = document.getElementById("copy-status");
    try {
      await navigator.clipboard.writeText("support@proc-x.co.jp");
      status.textContent = "コピーしました。";
    } catch {
      status.textContent =
        "コピーできませんでした。上のアドレスを選択してコピーしてください。";
    }
  });
}
