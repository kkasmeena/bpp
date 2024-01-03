import { Page , expect, Locator} from "@playwright/test";

export class NewRepositoryPage {
    page: Page;
    createNewRepoButton: Locator;
    useSuggestedRepoNameLink: Locator;
    isAvailableText: Locator;
    descriptionTextBox: Locator;
    createRepobutton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.createNewRepoButton = this.page.getByRole("button", { name: "Create repository" })
        this.useSuggestedRepoNameLink = this.page.getByRole("button", { name: "Use suggested repository name" })
        this.isAvailableText = this.page.getByText('is available.');
        this.descriptionTextBox = this.page.getByRole("textbox", { name: "Description" })
        this.createRepobutton = this.page.getByRole("button", { name: "Create repository" })
    }

    async createRepository(newDescription: string) {
        await expect(this.createNewRepoButton).toBeVisible();
        await this.useSuggestedRepoNameLink.click();
        await expect(this.isAvailableText).toBeVisible();
        await this.descriptionTextBox.fill(newDescription);
        await expect(this.createRepobutton).toBeEnabled();
        await this.createRepobutton.click();
    }
}