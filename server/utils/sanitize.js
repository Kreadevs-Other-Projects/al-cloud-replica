import sanitizeHtml from "sanitize-html";
export const clean = (s) =>
  sanitizeHtml(String(s || ""), {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  });
