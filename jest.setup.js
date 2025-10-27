// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Google Maps API
global.google = {
  maps: {
    Map: jest.fn(),
    Marker: jest.fn(),
    LatLng: jest.fn((lat, lng) => ({ lat, lng })),
    event: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    Size: jest.fn((width, height) => ({ width, height })),
    Point: jest.fn((x, y) => ({ x, y })),
    OverlayView: jest.fn(() => ({
      setMap: jest.fn(),
      draw: jest.fn(),
      onAdd: jest.fn(),
      onRemove: jest.fn(),
      getPanes: jest.fn(() => ({
        overlayLayer: document.createElement('div'),
        overlayMouseTarget: document.createElement('div'),
      })),
      getProjection: jest.fn(() => ({
        fromLatLngToDivPixel: jest.fn(() => ({ x: 0, y: 0 })),
      })),
    })),
  },
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
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

// Suppress console errors in tests (optional)
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
       args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
