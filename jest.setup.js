// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    main: ({ children, ...props }) => <main {...props}>{children}</main>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
}))

// Create a clipboard mock that Jest can track
const mockWriteText = jest.fn(() => Promise.resolve());

// Mock navigator.clipboard for copy-to-clipboard tests
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
  configurable: true,
})

// Export for tests that need to access it
global.mockWriteText = mockWriteText;
