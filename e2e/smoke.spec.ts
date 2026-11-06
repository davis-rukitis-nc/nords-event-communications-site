import { test, expect } from "@playwright/test"

test.describe("Smoke", () => {
  test("home renders with a single h1 and JSON-LD", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/NECom/)
    await expect(page.locator("h1")).toHaveCount(1)
    expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThan(0)
  })

  test("events menu opens and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/", { waitUntil: "networkidle" })
    const button = page.getByRole("button", { name: "Events", exact: true })
    // Retry until hydrated.
    await expect(async () => {
      await button.click()
      await expect(button).toHaveAttribute("aria-expanded", "true", { timeout: 500 })
    }).toPass()
    await expect(page.locator("#events-menu")).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(page.locator("#events-menu")).toBeHidden()
    await expect(button).toBeFocused()
  })

  test("primary pages load", async ({ page }) => {
    for (const path of ["/about", "/events", "/journal", "/contact", "/events/rimi-riga-marathon"]) {
      const res = await page.goto(path)
      expect(res?.status(), path).toBe(200)
      await expect(page.locator("h1")).toHaveCount(1)
    }
  })

  test("subpage titles carry the brand once", async ({ page }) => {
    await page.goto("/about")
    await expect(page).toHaveTitle("About Us | NECom")
  })

  test("404 page", async ({ page }) => {
    const res = await page.goto("/nonexistent-page")
    expect(res?.status()).toBe(404)
    await expect(page.locator("h1")).toContainText("404")
  })
})
