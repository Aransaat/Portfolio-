#!/usr/bin/env node
"use strict";

// Business card for Arghavan Saatsaz. Run with: npx arghavan

const out = process.stdout;
const color = out.isTTY && !process.env.NO_COLOR && process.env.TERM !== "dumb";
const paint = (code) => (s) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const c = {
  bold: paint("1"), dim: paint("2"), italic: paint("3"),
  blue: paint("38;5;75"), sky: paint("38;5;153"), pink: paint("38;5;218"),
  green: paint("38;5;114"), grey: paint("38;5;245"), white: paint("97"),
};
const strip = (s) => s.replace(/\x1b\[[0-9;]*m/g, "");

const label = (t) => c.blue(c.bold(t.padStart(12))) + "  ";
const rows = [
  "",
  `   ${c.white(c.bold("Arghavan Saatsaz"))}  ${c.grey("·")}  ${c.pink("blue team in training ✶")}`,
  `   ${c.sky("Cybersecurity Student & Aspiring SOC Analyst")}`,
  "",
  label("Now") + "BAT in Cybersecurity @ Collin College (2026–2028)",
  label("Studied") + "AAS, IS Cybersecurity (2026) · AAS, Cloud Computing (2025)",
  label("Certified") + "CompTIA Security+  " + c.grey("· AWS AI Practitioner in progress"),
  label("Experience") + "2 yrs guarding HIPAA data & access controls in pharmacies",
  label("Builds") + "AWS compliance dashboards, ML threat detection, serverless",
  label("") + "pipelines with least-privilege IAM",
  label("Looking for") + c.green("SOC analyst · security analyst · cloud engineering roles"),
  label("Based in") + "McKinney, TX " + c.grey("· authorized to work in the US · open to relocate"),
  "",
  label("Web") + c.sky("https://arghavansaat.com"),
  label("GitHub") + c.sky("https://github.com/aransaat"),
  label("LinkedIn") + c.sky("https://linkedin.com/in/arghavan-saatsaz"),
  label("Email") + c.sky("Aranisreadytowork@outlook.com"),
  "",
  `   ${c.dim(c.italic("Thanks for stopping by! Say hi anytime."))}`,
  "",
];

const width = Math.max(...rows.map((r) => strip(r).length)) + 3;
const pad = (r) => r + " ".repeat(width - strip(r).length);
const frame = c.blue;
const card = [
  frame("╭" + "─".repeat(width) + "╮"),
  ...rows.map((r) => frame("│") + pad(r) + frame("│")),
  frame("╰" + "─".repeat(width) + "╯"),
].join("\n");

const header = c.grey("  ⌨  npx arghavan") + "\n";

// Quick typewriter reveal in real terminals; plain print when piped or in CI.
if (!out.isTTY || process.env.CI || process.argv.includes("--no-anim")) {
  out.write(header + card + "\n");
} else {
  const lines = (header + card).split("\n");
  let i = 0;
  const tick = setInterval(() => {
    out.write(lines[i] + "\n");
    if (++i >= lines.length) clearInterval(tick);
  }, 35);
}
