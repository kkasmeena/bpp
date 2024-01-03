import { test, expect } from "@playwright/test";
import { SettingsPage } from "../pages/SettingsPage";
import { NewRepositoryPage } from "../pages/NewRepositoryPage";
import { NewIssuePage } from "../pages/NewIssuePage";
import { Navigation } from "../pages/Navigation";
import { IssuesPage } from "../pages/IssuesPage";

test.beforeEach(async ({ page }) => {
  const navigation = new Navigation(page);
  await navigation.goToGithubHomePage()
  await navigation.navigateToNewRepoPage()

  const new_repository = new NewRepositoryPage(page);
  await new_repository.createRepository("Test Description");
});

test.afterEach(async ({ page }) => {
  const settings_page = new SettingsPage(page);
  const navigation = new Navigation(page);

  await navigation.navigateToSettingsPage();
  await settings_page.deleteRepository();


});

test("should create an issue", async ({ page }) => {
  const navigation = new Navigation(page);
  navigation.navigateToIssuesPage();

  const issuesPage = new IssuesPage(page);
  issuesPage.clickCreateNewIssue()

  const new_issue_page = new NewIssuePage(page);
  await new_issue_page.FillNewIssueTitle("new test issue");
  await new_issue_page.FillNewIssueDescription("new issue description");
  await new_issue_page.SubmitNewIssue();
  await issuesPage.AssertNewIssueCreated();

});
