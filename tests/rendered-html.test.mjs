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
  assert.match(html, /Choose your fit/i);
  assert.match(html, /Choose the complete Rio experience/i);
  assert.match(html, /Core Trip: Nights 1(?:–|&#x2013;)5/i);
  assert.match(html, /Optional Extended Trip: Nights 5(?:–|&#x2013;)9/i);
  assert.doesNotMatch(html, /class=["'][^"']*journey-decision/i);
  assert.doesNotMatch(html, /journey-bridge-marker/i);
  assert.equal(
    (html.match(/class=["']journey-stop-marker["']/gi) ?? []).length,
    2,
    "journey overview should render exactly two timeline markers",
  );
  assert.equal(
    (html.match(/class=["'][^"']*journey-map(?:\s|["'])/gi) ?? []).length,
    2,
    "journey overview should render one illustrated map per option",
  );
  assert.doesNotMatch(html, /up to six continuation travelers/i);
  assert.match(html, /Group Fit (?:&|&amp;) Vibe/i);
  assert.match(html, /Rio Core vs\. Salvador Extension/i);
  assert.match(html, /<details\b/i);
  assert.match(html, /data-cta-location=["']pricing_rio-core["']/i);
  assert.match(
    html,
    /data-cta-location=["']pricing_complete-journey["']/i,
  );

  const pricingPosition = html.indexOf("Choose how deep you want to go");
  const hostPosition = html.indexOf("Meet the host");
  assert.ok(pricingPosition >= 0, "pricing section should render");
  assert.ok(hostPosition > pricingPosition, "Meet the host should follow pricing");
});
