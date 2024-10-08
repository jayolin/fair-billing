const os = require("os");

function normalizeLineEndings(str) {
  return str.replace(/\r\n|\r\n/g, "\n")
}

function getLineBreak() {
  const platform = os.platform();

  if (platform === "win32") {
    return "\r\n";
  }
  return "\n";
}

exports.normalizeLineEndings = normalizeLineEndings;
exports.lineBreak = getLineBreak();
