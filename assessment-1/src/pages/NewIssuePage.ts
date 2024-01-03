import { Page, Locator, expect } from "@playwright/test";


export class NewIssuePage {
    readonly page: Page;
    titleLocator: Locator;
    descriptionLocator: Locator;
    submitNewIssue: Locator;

    constructor (page: Page) {
        this.page = page;
        this.titleLocator = this.page.getByRole("textbox", { name: "Title" });
        this.descriptionLocator = this.page.getByPlaceholder(' ', { exact: true });
        this.submitNewIssue = this.page.getByRole("button", { name: "Submit new issue" });
    }
    
    async FillNewIssueTitle(newTitle: string) {
        await expect(this.titleLocator).toBeVisible();
        await this.titleLocator.fill(newTitle);
    }

    async FillNewIssueDescription(newDescription: string) {
        await this.descriptionLocator.fill(newDescription);
    }

    async SubmitNewIssue() {
        await this.submitNewIssue.click();
    }

}
