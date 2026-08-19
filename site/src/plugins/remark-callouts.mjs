const CALLOUT_TYPES = new Set(["note", "tip", "important", "warning", "caution", "resources"]);

const titleCase = (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

function calloutType(paragraph) {
  if (!paragraph || paragraph.type !== "paragraph") return null;

  const [first] = paragraph.children;
  if (!first) return null;

  if (first.type === "text") {
    const match = first.value.trim().match(/^\[!([A-Za-z]+)\](?:\s+(.+))?$/);
    if (match && CALLOUT_TYPES.has(match[1].toLowerCase())) {
      const type = match[1].toLowerCase();
      return { type, title: match[2] || titleCase(type) };
    }
  }

  if (paragraph.children.length === 1 && first.type === "strong") {
    const label = first.children?.map((child) => child.value || "").join("").trim().toLowerCase();
    if (CALLOUT_TYPES.has(label)) return { type: label, title: titleCase(label) };
  }

  return null;
}

function transform(node) {
  if (!node || !Array.isArray(node.children)) return;

  for (const child of node.children) {
    if (child.type === "blockquote") {
      const callout = calloutType(child.children[0]);
      if (callout) {
        child.data = {
          ...child.data,
          hName: "div",
          hProperties: {
            className: ["callout", `callout-${callout.type}`],
            role: "note",
          },
        };
        child.children[0] = {
          type: "paragraph",
          children: [{ type: "text", value: callout.title }],
          data: {
            hName: "p",
            hProperties: { className: ["callout-title"] },
          },
        };
      }
    }

    transform(child);
  }
}

export default function remarkCallouts() {
  return transform;
}
