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
        "なくす対象",
        "使わない控え表にも記入する",
        "この想定例では利用されていないため、作業そのものを廃止できます。"
      ],
      [
        "manual",
        "整える対象",
        "表ごとに項目名や形式を合わせる",
        "共通のルールがなく、その都度合わせ直しています。"
      ],
      [
        "manual",
        "自動化の対象",
        "必要な書類へ同じ情報を再入力する",
        "必要な作業は残し、定型処理をプログラムやAIへ任せます。"
      ],
      [
        "human",
        "人が確認",
        "内容や処理結果を見直す",
        "最終確認と例外への判断は、改善後も人が担当します。"
      ]
    ],
    "after": [
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
      ],
      [
        "auto",
        "自動化プログラム",
        "受信・登録を検知し、転記案を検証する",
        "受信通知や新規登録をきっかけに開始。必須項目などを検証し、承認後に必要な表や書類へ反映します。"
      ],
      [
        "auto",
        "AI-エージェント",
        "書式が異なる情報を読み取る",
        "文書やメールから必要な情報を抽出。不明な内容は推測で確定せず、例外として人の確認へ回します。"
      ],
      [
        "human",
        "人",
        "例外に対応し、最終確認・反映を承認する",
        "不足・不明な情報を確認・修正し、通常の処理も最終確認を経て反映を承認します。"
      ]
    ],
    "outcome": "「まだ転記が残っている」という気がかりを減らし、次にしたいことへ気持ちを切り替えられる。",
    "problem": "入力するたびに、作業も確認も増えていく。"
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
        "なくす対象",
        "使わない社内集計表まで作成する",
        "この想定例では利用されていないため、作業そのものを廃止できます。"
      ],
      [
        "manual",
        "整える対象",
        "記録の形式や対象期間を毎月合わせる",
        "共通のルールがなく、その都度合わせ直しています。"
      ],
      [
        "manual",
        "自動化の対象",
        "必要な集計と書類への転記を手作業で行う",
        "必要な作業は残し、定型処理をプログラムやAIへ任せます。"
      ],
      [
        "human",
        "人が確認",
        "内容や処理結果を見直す",
        "最終確認と例外への判断は、改善後も人が担当します。"
      ]
    ],
    "after": [
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
      ],
      [
        "auto",
        "自動化プログラム",
        "締め日時に集計と書類作成を始める",
        "定時実行で対象の記録を集計し、下書きを作成。人の承認後に書類を送付します。"
      ],
      [
        "auto",
        "AI-エージェント",
        "書類の不整合の候補を提示する",
        "記載内容や個別条件を読み取り、不整合や確認が必要な箇所の候補を示します。"
      ],
      [
        "human",
        "人",
        "例外を修正し、最終確認・送付を承認する",
        "記録の漏れや個別条件を確認・修正し、数字・宛先・内容を最終確認して送付を承認します。"
      ]
    ],
    "outcome": "月末の作業を抱え込まず、必要な確認に落ち着いて向き合う。仕事のあとの予定も立てやすくする。",
    "problem": "締め切りが近づくほど、ほかのことに使いたい時間まで気になってしまう。"
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
        "なくす対象",
        "使わない個人用控えを複製する",
        "この想定例では利用されていないため、作業そのものを廃止できます。"
      ],
      [
        "manual",
        "整える対象",
        "ファイルごとに名前や保存先を考える",
        "共通のルールがなく、その都度合わせ直しています。"
      ],
      [
        "manual",
        "自動化の対象",
        "名前の変更とフォルダへの移動を手作業で行う",
        "必要な作業は残し、定型処理をプログラムやAIへ任せます。"
      ],
      [
        "human",
        "人が確認",
        "内容や処理結果を見直す",
        "最終確認と例外への判断は、改善後も人が担当します。"
      ]
    ],
    "after": [
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
      ],
      [
        "auto",
        "自動化プログラム",
        "ファイル追加を検知し、命名・振分案を検証する",
        "フォルダへの追加を検知して開始。命名ルールや重複を検証し、承認後に保存します。勝手な削除・上書きは行いません。"
      ],
      [
        "auto",
        "AI-エージェント",
        "内容を読み取り、分類を提案する",
        "書類の内容から種類や保存先の候補を提案。分類できないものは例外として人へ回します。"
      ],
      [
        "human",
        "人",
        "例外を判断し、最終確認・保存を承認する",
        "未分類のファイルや重複候補を判断し、通常の処理も保存先・名前を最終確認して承認します。"
      ]
    ],
    "outcome": "「整理しなきゃ」をためず、必要なものを見つけやすくする。探し物で手を止めず、自分のペースを保てる。",
    "problem": "後回しにした整理が、次の作業を始める負担になる。"
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
    const steps = example[view].map(([kind, label, heading, description]) => {
      const item = document.createElement("li");
      const tag = document.createElement("span");
      tag.className = `step-tag tag-${kind}`;
      tag.textContent = label;
      const body = document.createElement("div");
      const strong = document.createElement("strong");
      const text = document.createElement("p");
      strong.textContent = heading;
      text.textContent = description;
      body.append(strong, text);
      item.append(tag, body);
      return item;
    });
    document.getElementById("example-steps").replaceChildren(...steps);
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
