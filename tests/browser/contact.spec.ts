import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("heading", { name: "Have something to build?" }).scrollIntoViewIfNeeded();
});

test("responsive layout, native validation, selection, error preservation and success", async ({ page }, testInfo) => {
  const section = page.locator("#contact");
  let requests = 0;
  await page.route("**/api/contact", async (route) => {
    requests++;
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({ status: requests === 1 ? 502 : 200, contentType: "application/json", body: JSON.stringify({ ok: requests > 1 }) });
  });
  const submit = page.getByRole("button", { name: "Start a conversation" });
  await submit.click();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  expect(requests).toBe(0);
  await page.getByLabel("Build something new", { exact: true }).check();
  await page.getByLabel("Just an idea", { exact: true }).check();
  await page.getByLabel("Join our team", { exact: true }).check();
  await expect(page.getByLabel("Build something new", { exact: true })).not.toBeChecked();
  await expect(page.getByLabel("Just an idea", { exact: true })).toHaveCount(0);
  await page.getByLabel("Part-time", { exact: true }).check();
  await page.getByLabel("Full-time opportunity", { exact: true }).check();
  await expect(page.getByLabel("Part-time", { exact: true })).not.toBeChecked();
  await page.getByLabel("Name", { exact: true }).fill("Test Engineer");
  await page.getByLabel("Email").fill("invalid");
  await submit.click();
  await expect(page.getByLabel("Email")).toBeFocused();
  expect(requests).toBe(0);
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Tell me a little about what you're working on").fill("   ");
  await submit.click();
  expect(requests).toBe(0);
  await page.getByLabel("Tell me a little about what you're working on").fill("Building a backend service.");
  const geometry = await section.evaluate((element) => ({ width: element.clientWidth, scroll: element.scrollWidth }));
  expect(geometry.scroll).toBeLessThanOrEqual(geometry.width);
  const nameBox = await page.getByLabel("Name", { exact: true }).boundingBox();
  const emailBox = await page.getByLabel("Email").boundingBox();
  if (testInfo.project.name === "desktop") expect(nameBox?.y).toBe(emailBox?.y);
  else expect(emailBox!.y).toBeGreaterThan(nameBox!.y);
  await section.screenshot({ path: testInfo.outputPath("contact.png") });
  await submit.click();
  await expect(page.getByRole("button", { name: "Starting the conversation…" })).toBeDisabled();
  await expect(page.getByText("Something went wrong.", { exact: false })).toBeVisible();
  await expect(page.getByLabel("Tell me a little about what you're working on")).toHaveValue("Building a backend service.");
  await submit.click();
  await expect(page.getByRole("status")).toContainText("Thanks — I'll get back to you soon.");
  await expect(page.getByRole("status")).toBeFocused();
  await expect(page.getByRole("status").getByRole("link", { name: "GitHub" })).toBeVisible();
});

test("keyboard can select options, navigate radios and send", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({ contentType: "application/json", body: '{"ok":true}' }));
  const first = page.getByLabel("Build something new", { exact: true });
  await first.focus();
  await page.keyboard.press("Space");
  await expect(first).toBeChecked();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByLabel("Join our team", { exact: true })).toBeChecked();
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Contract", { exact: true })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByLabel("Part-time", { exact: true })).toBeChecked();
  await page.keyboard.press("Tab");
  await page.keyboard.type("Keyboard Engineer");
  await page.keyboard.press("Tab");
  await page.keyboard.type("keyboard@example.com");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.type("An API integration project.");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Start a conversation" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toBeFocused();
});


test("context changes clear stale answers; something else goes straight to the message", async ({ page }) => {
  for (const [intention, question, answer] of [
    ["Build something new", "Where are you right now?", "Just an idea"],
    ["Improve what we have", "What are you looking for?", "Build new features"],
    ["Join our team", "What kind of engagement are you looking for?", "Full-time opportunity"],
    ["Connect our systems", "What best describes what you need?", "Automate a manual process"],
  ]) {
    await page.getByLabel(intention, { exact: true }).check();
    await expect(page.getByRole("group", { name: `${question} (optional)` })).toBeVisible();
    await expect(page.locator('input[name="context"]:checked')).toHaveCount(0);
    await page.getByLabel(answer, { exact: true }).check();
  }
  await page.getByLabel("Something else", { exact: true }).check();
  await expect(page.locator('input[name="context"]')).toHaveCount(0);
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Tell me a little about what you're working on")).toBeFocused();
});

test("can send without choosing an intention or contextual answer", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    expect(route.request().postDataJSON()).toMatchObject({ intention: "", context: "" });
    await route.fulfill({ contentType: "application/json", body: '{"ok":true}' });
  });
  await page.getByLabel("Name", { exact: true }).fill("Business Owner");
  await page.getByLabel("Email", { exact: true }).fill("owner@example.com");
  await page.getByLabel("Tell me a little about what you're working on").fill("I have an idea for my business.");
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await expect(page.getByRole("status")).toBeFocused();
});
