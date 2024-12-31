import * as fs from 'fs';
import * as path from 'path';

const allureResultsDir = path.resolve(
  __dirname,
  '../../test-reports/allure-results'
);

export async function cleanAllureReport(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if the directory exists
    if (!fs.existsSync(allureResultsDir)) {
      console.log('No Allure report folder found. Nothing to clean.');
      resolve(); // Resolve immediately if the folder does not exist
      return;
    }

    // Proceed to clean the directory if it exists
    fs.rm(allureResultsDir, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Error while cleaning Allure results: ${err}`);
        reject(err);
      } else {
        console.log('Allure results cleaned successfully.');
        resolve();
      }
    });
  });
}
