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

function timeToSeconds(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

exports.normalizeLineEndings = normalizeLineEndings;
exports.lineBreak = getLineBreak();
exports.timeToSeconds = timeToSeconds;
