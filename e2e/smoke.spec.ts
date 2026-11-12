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

  test("CSP header is set and the home page triggers no violations", async ({ page }) => {
    const violations: string[] = []
    page.on("console", (m) => {
      if (/Content Security Policy/i.test(m.text()) && !m.text().includes("_vercel")) violations.push(m.text())
    })
    const res = await page.goto("/", { waitUntil: "networkidle" })
    expect(res?.headers()["content-security-policy"]).toContain("default-src 'self'")
    expect(violations).toEqual([])
  })

  test("nested unknown URLs also get the site's 404 page", async ({ page }) => {
    const res = await page.goto("/no/such/page")
    expect(res?.status()).toBe(404)
    await expect(page.locator("h1")).toContainText("404")
  })
})

test.describe("CMS", () => {
  test("admin login page loads without CSP violations", async ({ page }) => {
    const violations: string[] = []
    page.on("console", (m) => {
      if (/Content Security Policy/i.test(m.text())) violations.push(m.text())
    })
    const res = await page.goto("/admin/login", { waitUntil: "networkidle" })
    expect(res?.status()).toBe(200)
    expect(res?.headers()["x-robots-tag"]).toContain("noindex")
    await expect(page.locator('input[name="email"]')).toBeVisible()
    expect(violations).toEqual([])
  })

  test("public sign-up is disabled", async ({ request }) => {
    const data = { email: "intruder@example.com", password: "not-allowed-123" }
    expect((await request.post("/api/users/first-register", { data })).status()).toBe(403)
    expect((await request.post("/api/users", { data })).status()).toBe(403)
    expect((await request.get("/api/users")).status()).toBe(403)
  })

  test("content cannot be written without logging in", async ({ request }) => {
    expect((await request.post("/api/journal", { data: { title: "x" } })).status()).toBe(403)
  })

  test("journal content comes from the CMS", async ({ page }) => {
    await page.goto("/journal")
    await expect(page.locator("main a[href^='/journal/']").first()).toBeVisible()
  })
})
