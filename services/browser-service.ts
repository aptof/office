import { chromium, type Browser, type Page } from 'playwright';

const INSIGHT_URL = 'https://insight.gov.in';

export class BrowserManager {
  private static instance: BrowserManager;
  private browserInstance: Browser | null = null;

  // Private constructor to prevent direct 'new' instantiations outside the class
  private constructor() {}

  /**
   * Get the global singleton instance of InsightBrowserManager
   */
  public static getInstance(): BrowserManager {
    if (!BrowserManager.instance) {
      BrowserManager.instance = new BrowserManager();
    }
    return BrowserManager.instance;
  }

  /**
   * Retrieves or initializes the singleton browser instance.
   */
  private async getBrowser(): Promise<Browser> {
    // If a browser instance already exists and is connected/launched, return it
    if (this.browserInstance && this.browserInstance.isConnected()) {
      return this.browserInstance;
    }

    this.browserInstance = await chromium.launch({ headless: false });
    return this.browserInstance;
  }

  public async getInsightPage(): Promise<Page> {
    const browser = await this.getBrowser();

    // Get all browser contexts, fallback to creating a new context if none exist
    let context = browser.contexts()[0];
    if (!context) {
      context = await browser.newContext();
    }

    const pages = context.pages();
    let targetPage: Page | undefined;

    // Search through existing open tabs/pages for the Insight Portal title
    for (const p of pages) {
      try {
        const title = await p.title();
        if (title.includes('Insight Portal')) {
          targetPage = p;
          break; // Exit loop once found
        }
      } catch (error) {
        // Handle cases where a page might be closed or unresponsive during title check
        console.error('Error reading page title:', error);
      }
    }

    // If an existing Insight tab wasn't found, open a new page
    if (!targetPage) {
      targetPage = await context.newPage();
      await this.openInsight(targetPage);
    } else {
      // Optional: Bring the existing page to the front if using a headed browser
      await targetPage.bringToFront();
    }

    return targetPage;
  }

  private async openInsight(page: Page) {
    await page.goto(INSIGHT_URL);
  }

  public async isLoggedInToInsight(page: Page): Promise<boolean> {
    const logoutBtn = page.locator('.btn-logout');
    return (await logoutBtn.count()) > 0;
  }

  /**
   * Gracefully closes the browser instance and resets the singleton state.
   */
  public async closeBrowser(): Promise<void> {
    if (this.browserInstance) {
      await this.browserInstance.close();
      this.browserInstance = null;
    }
  }
}
