import puppeteer from 'puppeteer';


const SURVEY_ADMIN_PANEL = 'http://127.0.0.1/limesurvey/index.php/admin/index';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

export async function createLimeSurveyUser (
    username: string,
    email: string,
    password: string,
) {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 5,
    });
    const page = await browser.newPage();
  
    await page.goto(SURVEY_ADMIN_PANEL);
  
    await page.setViewport({width: 1080, height: 1024});
  
    // login
    await page.type('#user', ADMIN_USERNAME);
    await page.type('#password', ADMIN_PASSWORD);
    await page.click('#loginform > div.row.login-submit.login-content > div > p > button');
  
    // click configuration
    await page.waitForSelector(".navbar");
    await page.click("body > nav > div > div.collapse.navbar-collapse.justify-content-center > ul > li.dropdown.mega-dropdown.nav-item > a");
   
    // click user management
    await page.waitForSelector("body > nav > div > div.collapse.navbar-collapse.justify-content-center > ul > li.dropdown.mega-dropdown.nav-item > a");
    await page.click("#mainmenu-dropdown > div > div:nth-child(4) > ul > li:nth-child(2) > a");
    
    // click add user
    await page.waitForSelector("#ls-question-tools-button");
    await page.click("#ls-question-tools-button");
  
    await delay(500);
    // fill and submit user creation form
    await page.waitForSelector("#User_Form_users_name");
    await page.waitForSelector("#User_Form_email");
    await page.type("#User_Form_users_name", username);
    await page.type("#User_Form_email", email);
    // await page.click("#utility_set_password_yes");
    const handles = await page.$$("#utility_set_password_yes");
    await handles[0].evaluate((h: any) => h.click());
    await page.waitForSelector("#User_Form_password");
    await page.type("#User_Form_password", password);
    await page.type("#password_repeat", password);
    await page.waitForSelector("#submitForm");
    const submitButtons = await page.$$("#submitForm");
    await submitButtons[0].evaluate((h: any) => h.click());
  
    await delay(1000);
    await page.waitForSelector("#perm_surveys_create");
    const createSurveyPermissionCheckboxes = await page.$$("#perm_surveys_create");
    await createSurveyPermissionCheckboxes[1].evaluate((h: any) => h.click());
    await delay(500);
  
    await page.waitForSelector("#permission-modal-submitForm");
    const savePermissionsButtons = await page.$$("#permission-modal-submitForm");
    await savePermissionsButtons[0].evaluate((h: any) => h.click());
  
    await delay(5000);
  
    await browser.close();
}