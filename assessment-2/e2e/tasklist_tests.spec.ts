import { test, expect } from '@playwright/test';

test('all lists link navigates user to lists', async ({ page }) => {
  await page.goto('/');

  await page.getByRole("link", { name: "All lists" }).click();
  await expect(page).toHaveURL("/#/");
});

test('User creates new task in list', async ({ page, request }) => {
  const newList = await request.post('/api/lists', {
    data: {
      data: { title: "List of e2e tests"},
    }
  });
  expect(newList.ok()).toBeTruthy();

  const newListjson = await newList.json();
  const { id } = newListjson.data;

  await page.goto('/');
  await page.locator(`[href$="${id}"]`).click();

  await page.getByRole("textbox", { name: "Add new" }).fill("New Task");
  await page.getByRole("textbox", { name: "Add new" }).press('Enter');

  expect(page.getByText("New Task")).toBeVisible();
});
