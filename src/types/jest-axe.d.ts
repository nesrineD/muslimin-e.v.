declare module "jest-axe" {
  // Minimal typings for build-time TypeScript checks.
  // Tests use jest-axe at runtime via Jest.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const axe: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const toHaveNoViolations: Record<string, any>;
}
