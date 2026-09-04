import { test, expect } from "@playwright/test";

test("Complete request creation flow", async ({ page }) => {
  // 1. Open Login page
  await page.goto("/");

  // 2. Fill Login form
  await page
    .getByPlaceholder("Enter your email")
    .fill("test@gov.in");

  await page
    .getByPlaceholder("Enter your password")
    .fill("Test@123");

  // 3. Click Sign In
  await page
    .getByRole("button", { name: "Sign In" })
    .click();

  // 4. Verify Dashboard opened
  await expect(page).toHaveURL(/\/dashboard/);

  // 5. Open Requests page
  await page
    .getByRole("link", { name: "Requests" })
    .click();

  // 6. Verify Requests page
  await expect(
    page.getByRole("heading", { name: "Request Management" })
  ).toBeVisible();

  // 7. Fill Request form

  // Citizen Name
  await page
    .getByPlaceholder("Citizen Name")
    .fill("E2E Test Citizen");

  // Request Type
  await page
    .locator("select")
    .nth(0)
    .selectOption("Birth Certificate");

  // Department
  await page
    .locator("select")
    .nth(1)
    .selectOption("Revenue");

  // Status
  await page
    .locator("select")
    .nth(2)
    .selectOption("Pending");

  // Description
  await page
    .getByPlaceholder("Request Description")
    .fill("E2E testing request for verification");

  // 8. Submit request
  await page
    .getByRole("button", { name: "Save Request" })
    .click();

  // 9. Find the newly created request row
  const newRow = page
    .getByRole("row")
    .filter({ hasText: "E2E Test Citizen" });

  // 10. Verify the new request is visible
  await expect(newRow).toBeVisible();

  // 11. Verify request details inside the same row
  await expect(newRow).toContainText("E2E Test Citizen");
  await expect(newRow).toContainText("Birth Certificate");
  await expect(newRow).toContainText("Revenue");
  await expect(newRow).toContainText("Pending");
  await expect(newRow).toContainText(
    "E2E testing request for verification"
  );
});