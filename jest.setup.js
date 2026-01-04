// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react')
  
  // Filter out framer-motion specific props
  const filterProps = (props) => {
    const {
      initial,
      animate,
      exit,
      variants,
      whileHover,
      whileTap,
      whileInView,
      viewport,
      transition,
      ...rest
    } = props
    return rest
  }

  return {
    motion: {
      div: ({ children, ...props }) => <div {...filterProps(props)}>{children}</div>,
      main: ({ children, ...props }) => <main {...filterProps(props)}>{children}</main>,
      h1: ({ children, ...props }) => <h1 {...filterProps(props)}>{children}</h1>,
      h2: ({ children, ...props }) => <h2 {...filterProps(props)}>{children}</h2>,
      p: ({ children, ...props }) => <p {...filterProps(props)}>{children}</p>,
      a: ({ children, ...props }) => <a {...filterProps(props)}>{children}</a>,
    },
    AnimatePresence: ({ children }) => children,
  }
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}
