const fs = require("fs");
const { normalizeLineEndings, timeToSeconds } = require("./utils");

class FairBilling {
  readLogFileAsArray(logFilePath) {
    const content = fs.readFileSync(logFilePath, "utf8");
    const arr = normalizeLineEndings(content).split("\n");
    return arr;
  }

  getTimeDifferenceInSecs(endTime, startTime) {
    return timeToSeconds(endTime) - timeToSeconds(startTime);
  }

  isValidEntry(entry) {
    return /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d\s[a-zA-Z0-9]+\s(?:Start|End)$/.test(entry);
  }

  compute(logFilePath) {
    const billingMap = new Map();
    const entries = this.readLogFileAsArray(logFilePath);

    // We're assuming these are always valid
    const defaultStartTime = entries[0].split(" ")[0];
    const defaultEndTime = entries[entries.length - 1].split(" ")[0];

    for (const entry of entries) {
      if (!this.isValidEntry(entry)) {
        continue;
      }

      const [timestamp, username, indicator] = entry.split(" ");
      if (!billingMap.has(username)) {
        billingMap.set(username, {
          duration: 0,
          sessions: 0,
          queue: [],
        })
      }

      const record = billingMap.get(username);

      if (indicator === "Start") {
        record.queue.push(timestamp);
        record.duration += this.getTimeDifferenceInSecs(defaultEndTime, timestamp);
        record.sessions += 1;
      } else {
        if (record.queue.length === 0) {
          record.duration += this.getTimeDifferenceInSecs(timestamp, defaultStartTime);
          record.sessions += 1;
        } else {
          const start = record.queue.shift();
          record.duration -= this.getTimeDifferenceInSecs(defaultEndTime, start);
          record.duration += this.getTimeDifferenceInSecs(timestamp, start)
        }
      }
      
    }

    const data = [];
    for (const [key, value] of billingMap) {
      data.push(`${key} ${value.sessions} ${value.duration}`);
    }

    return data;
  }
}

module.exports = FairBilling;
