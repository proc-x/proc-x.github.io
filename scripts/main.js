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
  };
  menu.addEventListener("click", () => {
    const open = !header.classList.contains("nav-open");
    header.classList.toggle("nav-open", open);
    menu.setAttribute("aria-expanded", String(open));
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
  window.matchMedia("(min-width: 851px)").addEventListener("change", closeMenu);
}

// Illustrative workflows, not customer results or guaranteed savings.
const examples = {
  orders: {
    category: "営業事務・受発注",
    title: ["同じ注文内容を、", "何度も入力している。"],
    description:
      "メールの注文内容をExcelに転記し、販売管理システムにも入力。最後は担当者へメールで連絡。",
    tools: "メール / Excel / 販売管理システム",
    before: [
      [
        "manual",
        "手作業",
        "注文内容をExcelの管理表に転記",
        "メールと管理表を見比べながら入力。",
      ],
      [
        "manual",
        "手作業",
        "販売管理システムにも同じ内容を入力",
        "二つの情報が一致しているかを確認。",
      ],
      [
        "manual",
        "手作業",
        "担当者へ連絡メールを作成",
        "注文の内容をまとめ直して送信。",
      ],
    ],
    after: [
      [
        "remove",
        "なくす",
        "Excelへの二重入力を廃止",
        "販売管理システムを情報の参照先に統一。",
      ],
      [
        "auto",
        "自動化",
        "注文情報の登録と担当者への通知",
        "注文の形式に合わせて、連携や読み取りを設計。",
      ],
      [
        "human",
        "人が判断",
        "内容の不備や特別な条件を確認",
        "通常の処理は仕組みに任せ、例外に対応。",
      ],
    ],
    outcome: "何度も入力する仕事から、注文を確かめる仕事へ。",
    problem: "同じ情報を、何度も入力して確認している。",
  },
  invoices: {
    category: "経理・売上管理",
    title: ["月末になるたび、", "集計と請求書に追われる。"],
    description:
      "部署ごとのExcelを集めて数字を転記。合計を確認し、請求書のひな形にまた入力している。",
    tools: "Excel / 会計ソフト / Python・C#",
    before: [
      [
        "manual",
        "手作業",
        "各部署の集計ファイルを集める",
        "提出を依頼し、古いファイルが混じっていないか確認。",
      ],
      [
        "manual",
        "手作業",
        "数字をまとめ直し、金額を計算",
        "表の形式をそろえて、請求先別に集計。",
      ],
      [
        "manual",
        "手作業",
        "請求書に転記して、確認・送付",
        "取引先ごとに同じ作業を繰り返す。",
      ],
    ],
    after: [
      [
        "remove",
        "なくす",
        "部署別の提出用ファイルを廃止",
        "売上情報の置き場所をそろえ、集め直しを不要に。",
      ],
      [
        "auto",
        "自動化",
        "売上を集計し、請求書の下書きを作成",
        "確定したデータから、同じルールで帳票を作成。",
      ],
      [
        "human",
        "人が判断",
        "金額と請求条件を承認",
        "送付前に確認し、訂正や個別の条件に対応。",
      ],
    ],
    outcome: "数字を集める時間を、内容を確かめる時間へ。",
    problem: "情報を集め、整え、また入力する作業が月末に集中。",
  },
  questions: {
    category: "総務・社内サポート",
    title: ["「あの資料、どこ？」に、", "何度も答えている。"],
    description:
      "申請方法や社内ルールの質問が担当者に集中。資料を探して、同じ説明をその都度送っている。",
    tools: "社内資料 / チャット / AIエージェント",
    before: [
      [
        "manual",
        "手作業",
        "担当者にチャットで問い合わせ",
        "回答が届くまで次の仕事を進められない。",
      ],
      [
        "manual",
        "手作業",
        "複数のフォルダから資料を探す",
        "どれが最新かを調べて、該当箇所を確認。",
      ],
      [
        "manual",
        "手作業",
        "回答文を書いて返信",
        "同じ質問でも、毎回担当者が対応。",
      ],
    ],
    after: [
      [
        "remove",
        "なくす",
        "資料の重複管理と個別の案内を減らす",
        "参照先と更新担当を決め、自分で調べられる状態に。",
      ],
      [
        "auto",
        "自動化",
        "社内資料から回答案と参照元を提示",
        "権限のある資料だけをAIエージェントが参照。",
      ],
      [
        "human",
        "人が判断",
        "資料にない質問や個別事情に対応",
        "根拠が見つからないときは、担当者へ引き継ぐ。",
      ],
    ],
    outcome: "同じ説明の繰り返しを減らし、個別の相談に向き合う。",
    problem: "聞く人も、答える人も、そのたびに仕事が止まる。",
  },
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
      `活用するものの例：${example.tools}`;
    document.getElementById("example-state").textContent =
      view === "after" ? "見直すと、こう変わる" : "いつもの業務の流れ";
    document.getElementById("example-outcome").textContent =
      view === "after" ? example.outcome : example.problem;
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
    document
      .querySelectorAll("[data-example]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.example === selected),
        ),
      );
    document
      .querySelectorAll("[data-view]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.view === view),
        ),
      );
  };
  document.querySelectorAll("[data-example]").forEach((button) =>
    button.addEventListener("click", () => {
      selected = button.dataset.example;
      render();
    }),
  );
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
