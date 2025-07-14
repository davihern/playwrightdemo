export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/westeurope_acc3654d-81b9-47c1-a91b-4ebbed3764b1/browsers"

Prueba todos los tests:
npx playwright test --config=playwright.service.config.ts --workers=80

Prueba todos los tests con trace:
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on

Prueba localhost
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on