# Saucedemo Test Automation

This repository contains the test automation framework for testing the **Saucedemo** application using **Playwright**.

## Project Structure

- **`tests/`**: Contains the test scripts and page action classes.
- **`config/`**: Contains configuration files for setting up the test environment.
- **`pageLocators/`**: Contains locators for different pages of the application.
- **`common/`**: Contains utility and helper classes like base actions.
- **`global.setup.ts`**: Setup file for environment configuration and initialization.

## Setup and Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd saucedemo_testautomation
    ```

3. Install the dependencies using npm:

    ```bash
    npm install
    ```

4. **Set up environment variables**:
    - Create a `.env` file at the root of the project and add the necessary environment variables. Example:

      ```env
      BASE_URL=https://www.saucedemo.com
      ```

## Running Tests

1. **Run all tests**:

   You can run all the tests using Playwright test runner:

    ```bash
    npx playwright test
    ```

   This will execute the tests in the `tests` directory and generate test reports.

2. **Run tests for a specific file in specific browser in headed mode**:

   To run a specific test file in specific browser in headed mode, use the following command:

    ```bash
    npx playwright test feature.spec.ts --headed --project=DesktopChrome
    ```

3. **Run tests in parallel**:

   Playwright supports running tests in parallel by default, making it faster to execute multiple tests.

    ```bash
    npx playwright test
    ```

## Allure Reports

After running the tests, you can generate a detailed test report using Allure:

1. **Generate Allure report**:

    ```bash
    npx allure generate ./test-reports/allure-result -o ./test-reports/allure-report
    ```

2. **Open Allure report**:

    ```bash
    npx allure open ./test-reports/allure-report
    ```

## Environment Configuration

Make sure that the environment configurations are set correctly for each environment. You can configure this in `playwright.config.ts`.

## Folder Structure Overview

- **`tests/`**: Contains the test cases and scenarios for various features of the application.
- **`pageLocators/`**: Contains locators for web elements used in the test scripts.
- **`common/`**: Contains base classes and utility functions to reuse across tests.

## Contributing

Feel free to fork this repository, make improvements, and submit pull requests. If you encounter any issues or have suggestions, please create an issue in the repository.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

**Author**: Makid Haider  
**Version**: 1.0.0
