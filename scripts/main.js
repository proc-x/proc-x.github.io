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
    "tools": "表計算ソフト / 入力フォーム / データ連携",
    "before": [
      [
        "manual",
        "手作業",
        "元の記録を見ながら、別の表に転記",
        "同じ名前や数字を、使う書類ごとに入力する。"
      ],
      [
        "manual",
        "手作業",
        "入力漏れや間違いを見比べる",
        "一か所直すと、ほかの表や書類も確認し直す。"
      ]
    ],
    "after": [
      [
        "auto",
        "仕組み",
        "一度入力した情報を、必要な表や書類へ反映",
        "転記先と項目を決め、同じ情報を繰り返し入力する手間を減らす。"
      ],
      [
        "human",
        "人が確認",
        "元の情報と、例外のある内容を確かめる",
        "入力内容の不備や、いつもと違う条件は自分や担当者が確認する。"
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
    "tools": "表計算ソフト / 会計ソフト / 書類のひな形",
    "before": [
      [
        "manual",
        "手作業",
        "必要な記録を集め、数字をまとめる",
        "複数のファイルを開き、対象の期間や項目をそろえる。"
      ],
      [
        "manual",
        "手作業",
        "書類へ転記し、計算や記載内容を見直す",
        "相手や用途ごとに、同じ手順で書類をつくる。"
      ]
    ],
    "after": [
      [
        "auto",
        "仕組み",
        "記録を集計し、書類の下書きをつくる",
        "決めた場所のデータを集め、計算とひな形への反映を行う。"
      ],
      [
        "human",
        "人が確認",
        "数字や条件を確かめて、提出・送付する",
        "元の記録の漏れや個別の条件は、提出・送付の前に確認する。"
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
    "tools": "保存フォルダ / ファイル名のルール / 自動振り分け",
    "before": [
      [
        "manual",
        "手作業",
        "ファイルを開き、名前と保存先を決める",
        "日付や種類を確かめながら、一つずつ名前を変更する。"
      ],
      [
        "manual",
        "手作業",
        "必要になってから、保存場所を探す",
        "整理が追いつかず、似た名前のファイルを開いて確かめる。"
      ]
    ],
    "after": [
      [
        "auto",
        "仕組み",
        "決めたルールで名前を付け、フォルダへ振り分ける",
        "対象のファイルを、日付や種類などに合わせて整理する。"
      ],
      [
        "human",
        "人が確認",
        "分類できないものや、重複の候補を確かめる",
        "判断がつかないファイルは確認用に分け、勝手に削除・上書きしない。"
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
      view === "after" ? "仕組みに任せることと、人が確認すること" : "いつも抱えている作業";
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
