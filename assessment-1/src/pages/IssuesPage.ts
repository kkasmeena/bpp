import { Page , Locator, expect} from "@playwright/test";

export class IssuesPage {
    page: Page;
    createNewIssueButton: Locator;
    closeIssueButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.createNewIssueButton = this.page.getByRole("link", { name: "New issue" });
        this.closeIssueButton = this.page.getByRole("button", { name: "Close issue", exact: true });
    }
    
    async clickCreateNewIssue() {
        await this.createNewIssueButton.click();
    }

    async AssertNewIssueCreated() {
        await expect(this.closeIssueButton).toBeVisible();
    }
}

