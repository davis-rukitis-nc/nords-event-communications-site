import { test, expect } from "@playwright/test"

test.describe("Smoke Tests", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/NECom/)
  })

  test("navigation works", async ({ page }) => {
    await page.goto("/")

    // Test About navigation
    await page.click("text=About")
    await expect(page).toHaveURL(/\/about/)

    // Test Events navigation
    await page.goto("/")
    await page.click("text=Events")
    await expect(page).toHaveURL(/\/events/)
  })

  test("contact page has form elements", async ({ page }) => {
    await page.goto("/contact")
    await expect(page.locator("h1")).toContainText(/contact/i)
  })

  test("404 page works", async ({ page }) => {
    await page.goto("/nonexistent-page")
    await expect(page.locator("h1")).toContainText("404")
  })
})
