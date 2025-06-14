### When writing unit tests, consider the following:
- **Naming Conventions**: Use clear and consistent naming conventions for your test files and test cases. This helps in understanding the purpose of each test at a glance. The format of the name should be FUNCTIONALITY_ASSERTION_TESTTYPE. where FUNCTIONALTONALITY is the name of the function being tested, ASSERTION is the expected outcome or what values are being checked for success, and TESTTYPE is the type of test (e.g., unit, integration).
- **Frameworks**: Use XUnit for .net.
- **Test Coverage**: Aim for high test coverage to ensure that most of your code is tested.
- **Isolation**: Each test should be independent and not rely on the state of other tests. Use mocking and stubbing to isolate the unit of work being tested.
- **Arrange-Act-Assert Pattern**: Structure your tests using the Arrange-Act-Assert pattern to clearly define the setup, execution, and verification steps.
- **Use Assertions**: Use assertions to verify that the expected outcomes match the actual outcomes. This helps in identifying failures quickly.
- **Test Edge Cases**: Include multiple tests for edge cases and error conditions to ensure robustness.
- **Keep Tests Fast**: Unit tests should be fast to run. Avoid long-running operations like network calls or database access in unit tests.
