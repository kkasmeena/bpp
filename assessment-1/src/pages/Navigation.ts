import { Page, Locator } from "@playwright/test";

export class Navigation {
    page: Page;
    settingsLink: Locator;
    issuesLink: Locator;
    createSomethingNewButton: Locator;
    newRepositoryButton: Locator;


    constructor (page: Page) {
        this.page = page;
        this.settingsLink = this.page.getByRole("link", { name: "Settings" });
        this.issuesLink = this.page.getByRole("link", { name: "Issues" });
        this.createSomethingNewButton = this.page.getByRole("button", { name: "Create something new" });
        this.newRepositoryButton = this.page.getByRole("menuitem", { name: "New repository" });

    }
    
    async goToGithubHomePage() {
        await this.page.goto("/")
    }

    async navigateToSettingsPage() {
        await this.settingsLink.click();
    }

    async navigateToIssuesPage() {
        await this.issuesLink.click();
    }

    async navigateToNewRepoPage() {
        await this.createSomethingNewButton.click();
        await this.newRepositoryButton.click();

    }

}

