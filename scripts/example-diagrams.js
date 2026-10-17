"use strict";

// Display-only BPMN 2.0 subset: none events, tasks, exclusive gateways,
// sequence flows and lanes within one process. No execution/XML dependency.
const exampleFlows = {
  orders: {
    name: "繰り返す入力",
    before: ["記録が届く", "使わない控え表を作成", "表ごとに項目を合わせる", "必要な書類へ再入力", "漏れ・誤りを見直す", "転記完了"],
    improvements: ["参照されない控え表の作成をやめる", "共通の入力項目・正本・必須チェックを決める", "受信検知・読取り・転記を仕組みに任せる"],
    after: ["受信・登録を検知", "情報を読み取る", "検証・転記案を作成", "例外あり？", "不備を確認・修正", "最終確認・反映を承認", "承認内容を反映", "反映完了"],
    roles: [2, 3, 2, 2, 1, 1, 2, 2],
  },
  invoices: {
    name: "月末の書類づくり",
    before: ["締めの時期", "使わない社内集計表を作成", "記録の形式・期間を合わせる", "集計して書類へ転記", "数字・条件を見直す", "提出・送付"],
    improvements: ["利用されていない社内集計表の作成をやめる", "締め日・集計元・書式・承認条件を決める", "定時集計・下書き・承認後の送付を自動化する"],
    after: ["締め日時が到来", "集計・下書きを作成", "不整合の候補を提示", "例外あり？", "数字・条件を修正", "最終確認・送付を承認", "承認済み書類を送付", "送付完了"],
    roles: [2, 2, 3, 2, 1, 1, 2, 2],
  },
  questions: {
    name: "ファイルの整理",
    before: ["ファイルが届く", "使わない個人用控えを複製", "名前・保存先を都度決める", "名前を変えて移動", "保存結果を見直す", "利用できる"],
    improvements: ["不要な個人用控えの複製をやめる", "共通の保存先・命名・分類・重複時の扱いを決める", "追加検知・分類提案・承認後の保存を自動化する"],
    after: ["ファイル追加を検知", "内容から分類を提案", "命名・振分案を検証", "例外あり？", "未分類・重複を判断", "最終確認・保存を承認", "承認内容で保存", "整理完了"],
    roles: [2, 3, 2, 2, 1, 1, 2, 2],
  },
};

const diagramHost = document.getElementById("example-diagram");
let diagramObserver;

function renderExampleDiagram(key, view) {
  if (!diagramHost) return;
  diagramObserver?.disconnect();
  const flow = exampleFlows[key];
  const after = view === "after";
  const labels = flow[view];
  const title = `${flow.name}：${after ? "仕組みに任せると" : "今の負担"}`;
  const caption = document.createElement("figcaption");
  caption.textContent = title;
  caption.className = "bpmn-caption";
  const canvas = document.createElement("div");
  canvas.className = `bpmn-canvas${after ? " bpmn-three-lanes" : ""}`;
  canvas.style.setProperty("--bpmn-steps", labels.length);
  canvas.setAttribute("role", "img");
  const roleNames = ["人", "自動化プログラム", "AI-エージェント"];
  const stepSummary = index => `${roleNames[flow.roles[index] - 1]}：${labels[index]}`;
  const summary = after
    ? `${[0, 1, 2, 3].map(stepSummary).join("。")}。はいの場合は${stepSummary(4)}。いいえの場合は例外対応を省略。どちらも${[5, 6, 7].map(stepSummary).join("。")}。`
    : `人が行う流れ：${labels.join(" → ")}。`;
  canvas.setAttribute("aria-label", `${title}。${summary}。改善の方針：なくす、${flow.improvements[0]}。整える、${flow.improvements[1]}。自動化する、${flow.improvements[2]}。`);
  const lanes = document.createElement("div");
  lanes.className = "bpmn-lanes";
  lanes.setAttribute("aria-hidden", "true");
  for (const name of after ? roleNames : ["人が行う作業"]) {
    const lane = document.createElement("div");
    const heading = document.createElement("strong");
    heading.textContent = name;
    lane.append(heading);
    lanes.append(lane);
  }
  canvas.append(lanes);
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.classList.add("bpmn-connectors");
  svg.setAttribute("aria-hidden", "true");
  canvas.append(svg);
  const nodes = labels.map((label, index) => {
    const node = document.createElement("div");
    const event = index === 0 || index === labels.length - 1;
    const gateway = after && index === 3;
    node.className = `bpmn-node ${event ? "bpmn-event" : gateway ? "bpmn-gateway" : "bpmn-task"}`;
    node.style.gridColumn = String(index + 1);
    node.style.gridRow = after ? String(flow.roles[index]) : "1";
    node.setAttribute("aria-hidden", "true");
    const anchor = document.createElement("span");
    anchor.className = "bpmn-anchor";
    if (event) {
      anchor.classList.add(index === 0 ? "bpmn-start" : "bpmn-end");
      const text = document.createElement("span");
      text.textContent = label;
      text.className = "bpmn-event-label";
      node.append(anchor, text);
    } else if (gateway) {
      anchor.classList.add("bpmn-diamond");
      const marker = document.createElement("span");
      marker.textContent = "×";
      anchor.append(marker);
      const text = document.createElement("span");
      text.textContent = label;
      text.className = "bpmn-question";
      node.append(text, anchor);
    } else {
      anchor.textContent = label;
      node.append(anchor);
      const phase = after ? ([1, 2, 6].includes(index) ? 2 : null) : (index >= 1 && index <= 3 ? index - 1 : null);
      if (phase !== null) {
        const badge = document.createElement("span");
        badge.className = `bpmn-phase bpmn-phase-${phase}`;
        badge.textContent = after ? "自動化" : ["なくす対象", "整える対象", "自動化の対象"][phase];
        node.append(badge);
      }
    }
    canvas.append(node);
    return node;
  });
  const improvements = document.createElement("div");
  improvements.className = "bpmn-improvements";
  for (const [index, text] of flow.improvements.entries()) {
    const item = document.createElement("div");
    const heading = document.createElement("strong");
    heading.textContent = ["01 なくす", "02 整える（事前準備）", "03 自動化する"][index];
    const description = document.createElement("p");
    description.textContent = text;
    item.append(heading, description);
    improvements.append(item);
  }
  diagramHost.replaceChildren(caption, improvements, canvas);
  diagramHost.hidden = false;

  const draw = () => {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width) return;
    svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
    svg.replaceChildren();
    const defs = document.createElementNS(svgNS, "defs");
    const marker = document.createElementNS(svgNS, "marker");
    marker.setAttribute("id", "bpmn-arrow");
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "9");
    marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "7");
    marker.setAttribute("markerHeight", "7");
    marker.setAttribute("orient", "auto");
    const tip = document.createElementNS(svgNS, "path");
    tip.setAttribute("d", "M 0 0 L 10 5 L 0 10 Z");
    tip.setAttribute("fill", "currentColor");
    marker.append(tip);
    defs.append(marker);
    svg.append(defs);
    const boxes = nodes.map(node => {
      const r = node.querySelector(".bpmn-anchor").getBoundingClientRect();
      return { x: r.left - bounds.left + r.width / 2, left: r.left - bounds.left, top: r.top - bounds.top, bottom: r.bottom - bounds.top, right: r.right - bounds.left, y: r.top - bounds.top + r.height / 2 };
    });
    const path = d => {
      const line = document.createElementNS(svgNS, "path");
      line.setAttribute("d", d);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", "1.5");
      line.setAttribute("marker-end", "url(#bpmn-arrow)");
      svg.append(line);
    };
    const label = (value, x, y) => {
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y);
      text.textContent = value;
      svg.append(text);
    };
    for (let i = 0; i < boxes.length - 1; i++) {
      const a = boxes[i], b = boxes[i + 1];
      const middle = (a.right + b.left) / 2;
      path(`M ${a.right} ${a.y} H ${middle} V ${b.y} H ${b.left - 2}`);
      if (after && i === 3) label("はい", middle - 16, a.y - 12);
    }
    if (after) {
      const a = boxes[3], b = boxes[5];
      const laneHeight = bounds.height / 3;
      const routeY = laneHeight * 2 - 24;
      // Both branches converge at human final approval, never skip it.
      path(`M ${a.x} ${a.bottom} V ${routeY} H ${b.x} V ${b.bottom + 2}`);
      label("いいえ", a.x + 8, routeY - 10);
    }
  };
  draw();
  diagramObserver = new ResizeObserver(draw);
  diagramObserver.observe(canvas);
}
