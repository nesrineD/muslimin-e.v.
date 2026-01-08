// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// jest-axe for accessibility testing
import { toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);
