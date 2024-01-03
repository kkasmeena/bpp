import { Page , Locator} from "@playwright/test";
import { config } from "../utils/config";

export class SettingsPage {
    page: Page;
    dangerZoneDeleteThisRepoButton: Locator;
    iWantToDeleteThisRepoButton: Locator;
    iHaveReadAndUnderstandTheseEffectsButton: Locator;
    repoNameParagraph: Locator;
    toConfirmTypeTextBox: Locator;
    deleteThisRepositoryButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.dangerZoneDeleteThisRepoButton = this.page.getByRole("button", { name: "Delete this repository" });
        this.iWantToDeleteThisRepoButton = this.page.getByRole("button", { name: "I want to delete this repository" });
        this.iHaveReadAndUnderstandTheseEffectsButton = this.page.getByRole("button", { name: "I have read and understand these effects" });
        this.repoNameParagraph = this.page.getByRole('paragraph').getByText(config.username);
        this.toConfirmTypeTextBox = this.page.getByLabel("To confirm, type");
        this.deleteThisRepositoryButton = this.page.getByLabel('Delete').getByRole('button', { name: 'Delete this repository' });
    }
    
    async deleteRepository() {
        await this.dangerZoneDeleteThisRepoButton.click();
        await this.iWantToDeleteThisRepoButton.click();
        await this.iHaveReadAndUnderstandTheseEffectsButton.click();
        const repo_name = await this.page.getByRole('paragraph').getByText(config.username).innerText();
        await this.toConfirmTypeTextBox.fill(repo_name);
        await this.deleteThisRepositoryButton.click()
    }

}

