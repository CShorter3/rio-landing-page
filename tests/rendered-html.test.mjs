import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const renderHome = async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  return response.text();
};

test("renders development preview metadata", async () => {
  assert.match(await renderHome(), developmentPreviewMeta);
});

test("renders the refactored conversion narrative", async () => {
  const html = await renderHome();

  assert.doesNotMatch(html, /<footer\b/i);
  assert.doesNotMatch(html, /class=["'][^"']*rhythms-section/i);
  assert.match(html, /Rio is complete\. Bahia goes deeper\./i);
  assert.match(html, /Group Fit (?:&|&amp;) Vibe/i);
  assert.match(html, /Rio Core vs\. Salvador Extension/i);
  assert.match(html, /<details\b/i);
  assert.match(html, /data-cta-location=["']pricing_rio-core["']/i);
  assert.match(
    html,
    /data-cta-location=["']pricing_complete-journey["']/i,
  );

  const pricingPosition = html.indexOf("Choose how deep you want to go");
  const hostPosition = html.indexOf("Meet Calid");
  assert.ok(pricingPosition >= 0, "pricing section should render");
  assert.ok(hostPosition > pricingPosition, "Meet Calid should follow pricing");
});
