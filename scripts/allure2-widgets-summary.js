/**
 * Creates allure-report/widgets/summary.json in Allure 2 format
 * so tools like allure-notifications can find it.
 * Run after: allure generate
 */
const fs = require("fs");
const path = require("path");

const reportDir = path.join(__dirname, "..", "allure-report");
const summaryPath = path.join(reportDir, "summary.json");
const widgetsDir = path.join(reportDir, "widgets");
const widgetsSummaryPath = path.join(widgetsDir, "summary.json");

if (!fs.existsSync(summaryPath)) {
  console.warn("scripts/allure2-widgets-summary.js: summary.json not found, skip");
  process.exit(0);
}

const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));

// Map Allure 3 / Classic format -> Allure 2 widgets/summary format
const stats = summary.stats || {};
const passed = stats.passed ?? 0;
const total = stats.total ?? 0;
const failed = stats.failed ?? 0;
const broken = stats.broken ?? 0;
const skipped = stats.skipped ?? 0;
const unknown = stats.unknown ?? 0;

const tests = summary.newTests || [];
const durations = tests.map((t) => t.duration || 0).filter(Boolean);
const sumDuration = durations.length ? durations.reduce((a, b) => a + b, 0) : summary.duration || 0;
const minDuration = durations.length ? Math.min(...durations) : 0;
const maxDuration = durations.length ? Math.max(...durations) : summary.duration || 0;

const start = summary.createdAt ?? Date.now();
const durationMs = summary.duration ?? sumDuration;
const stop = start + durationMs;

const allure2Summary = {
  reportName: summary.name || "Allure Report",
  testRuns: [],
  statistic: {
    failed,
    broken,
    skipped,
    passed,
    unknown,
    total: total || tests.length,
  },
  time: {
    start,
    stop,
    duration: durationMs,
    minDuration,
    maxDuration,
    sumDuration,
  },
};

if (!fs.existsSync(widgetsDir)) {
  fs.mkdirSync(widgetsDir, { recursive: true });
}
fs.writeFileSync(widgetsSummaryPath, JSON.stringify(allure2Summary, null, 2), "utf8");
console.log("Created allure-report/widgets/summary.json (Allure 2 format)");
