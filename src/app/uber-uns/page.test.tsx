import { render, screen } from '@testing-library/react'
import UberUnsPage from '@/app/uber-uns/page'

// Mock the SocialMediaSection component
jest.mock('@/components/SocialMediaSection', () => ({
  SocialMediaSection: () => <div data-testid="social-media-section">Social Media Section</div>,
}))

describe('UberUnsPage', () => {
  describe('Page Rendering', () => {
    it('renders the page without crashing', () => {
      render(<UberUnsPage />)
      expect(screen.getByText(/Über/i)).toBeInTheDocument()
    })

    it('renders the main container with correct styling', () => {
      const { container } = render(<UberUnsPage />)
      const mainElement = container.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      expect(mainElement).toHaveClass('relative', 'z-10')
    })
  })

  describe('Hero Section', () => {
    it('displays the hero title with "Muslimin e.V."', () => {
      render(<UberUnsPage />)
      expect(screen.getByText('Über')).toBeInTheDocument()
      expect(screen.getByText('Muslimin e.V.')).toBeInTheDocument()
    })

    it('displays the hero subtitle', () => {
      render(<UberUnsPage />)
      expect(
        screen.getByText('Ein aktiver muslimischer Mädchen- und Frauenverein seit 2011')
      ).toBeInTheDocument()
    })

    it('applies gradient styling to the title', () => {
      const { container } = render(<UberUnsPage />)
      const gradientSpan = container.querySelector('.bg-gradient-to-r.from-coral-500.to-warm-500')
      expect(gradientSpan).toBeInTheDocument()
    })
  })

  describe('"Wer sind wir?" Section', () => {
    it('displays the "Wer sind wir?" heading', () => {
      render(<UberUnsPage />)
      expect(screen.getByText('Wer sind wir?')).toBeInTheDocument()
    })

    it('displays the main description text', () => {
      render(<UberUnsPage />)
      expect(
        screen.getByText(/Wir sind ein aktiver muslimischer Mädchen- und Frauenverein/i)
      ).toBeInTheDocument()
    })

    it('displays the "Seit 2011" text with emoji', () => {
      render(<UberUnsPage />)
      expect(
        screen.getByText(/💚 Seit 2011 schaffen wir Räume für Austausch/i)
      ).toBeInTheDocument()
    })
  })

  describe('Vereinsphilosophie Section', () => {
    it('displays the "Vereinsphilosophie" heading', () => {
      render(<UberUnsPage />)
      expect(screen.getByText('Vereinsphilosophie')).toBeInTheDocument()
    })

    it('displays the philosophy description mentioning the founding year', () => {
      render(<UberUnsPage />)
      expect(
        screen.getByText(/Der Verein wurde im Februar 2011 mit dem Ziel gegründet/i)
      ).toBeInTheDocument()
    })

    it('mentions Sayeda Fatima and Sayeda Zainab as inspirations', () => {
      render(<UberUnsPage />)
      const philosophyText = screen.getByText(/Sayeda Fatima \(as\) und Sayeda Zainab \(as\)/i)
      expect(philosophyText).toBeInTheDocument()
    })

    it('displays the community belief statement', () => {
      render(<UberUnsPage />)
      expect(
        screen.getByText(/✨ Wir glauben an die Kraft der Gemeinschaft/i)
      ).toBeInTheDocument()
    })
  })

  describe('Kernziele Section', () => {
    it('displays the "Unsere Kernziele" heading', () => {
      render(<UberUnsPage />)
      expect(screen.getByText('Unsere Kernziele')).toBeInTheDocument()
    })

    it('displays the subtitle "Die Säulen unserer Gemeinschaft"', () => {
      render(<UberUnsPage />)
      expect(screen.getByText('Die Säulen unserer Gemeinschaft')).toBeInTheDocument()
    })

    describe('Goal Cards', () => {
      it('displays the "Bildung" goal card', () => {
        render(<UberUnsPage />)
        expect(screen.getByText('Bildung')).toBeInTheDocument()
        expect(screen.getByText('Wissensaustausch und Fortbildung')).toBeInTheDocument()
      })

      it('displays the "Gemeinschaft" goal card', () => {
        render(<UberUnsPage />)
        expect(screen.getByText('Gemeinschaft')).toBeInTheDocument()
        expect(screen.getByText('Unterstützung und Zusammenhalt')).toBeInTheDocument()
      })

      it('displays the "Hilfe" goal card', () => {
        render(<UberUnsPage />)
        expect(screen.getByText('Hilfe')).toBeInTheDocument()
        expect(screen.getByText('Beratung in schwierigen Zeiten')).toBeInTheDocument()
      })

      it('displays the "Wachstum" goal card', () => {
        render(<UberUnsPage />)
        expect(screen.getByText('Wachstum')).toBeInTheDocument()
        expect(screen.getByText('Persönliche und spirituelle Entwicklung')).toBeInTheDocument()
      })

      it('renders all four goal cards', () => {
        render(<UberUnsPage />)
        const goals = ['Bildung', 'Gemeinschaft', 'Hilfe', 'Wachstum']
        goals.forEach((goal) => {
          expect(screen.getByText(goal)).toBeInTheDocument()
        })
      })
    })

    describe('Goal Card Icons', () => {
      it('renders BookOpen icon for Bildung', () => {
        const { container } = render(<UberUnsPage />)
        // Check for icon container with sage-600 background (Bildung)
        const iconContainers = container.querySelectorAll('.bg-sage-600')
        expect(iconContainers.length).toBeGreaterThan(0)
      })

      it('renders Users icon for Gemeinschaft', () => {
        const { container } = render(<UberUnsPage />)
        // Check for icon container with coral-500 background (Gemeinschaft)
        const iconContainers = container.querySelectorAll('.bg-coral-500')
        expect(iconContainers.length).toBeGreaterThan(0)
      })

      it('renders Heart icon for Hilfe', () => {
        const { container } = render(<UberUnsPage />)
        // Check for icon container with warm-500 background (Hilfe)
        const iconContainers = container.querySelectorAll('.bg-warm-500')
        expect(iconContainers.length).toBeGreaterThan(0)
      })

      it('renders Sparkles icon for Wachstum', () => {
        const { container } = render(<UberUnsPage />)
        // Check for icon container with gradient background (Wachstum)
        const iconContainers = container.querySelectorAll('.bg-gradient-to-br.from-sage-600.to-warm-500')
        expect(iconContainers.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Social Media Section Integration', () => {
    it('renders the SocialMediaSection component', () => {
      render(<UberUnsPage />)
      expect(screen.getByTestId('social-media-section')).toBeInTheDocument()
    })

    it('places the social media section at the end of the page', () => {
      const { container } = render(<UberUnsPage />)
      const sections = container.querySelectorAll('section')
      const lastSection = sections[sections.length - 1]
      expect(lastSection).toContainElement(screen.getByTestId('social-media-section'))
    })
  })

  describe('Styling and Layout', () => {
    it('applies correct gradient background to the page', () => {
      const { container } = render(<UberUnsPage />)
      const pageContainer = container.querySelector('.bg-gradient-to-br.from-cream-50.via-white.to-sage-50')
      expect(pageContainer).toBeInTheDocument()
    })

    it('includes animated background elements', () => {
      const { container } = render(<UberUnsPage />)
      const animatedDivs = container.querySelectorAll('.absolute.inset-0.overflow-hidden.pointer-events-none')
      expect(animatedDivs.length).toBeGreaterThan(0)
    })

    it('applies card styling with backdrop-blur', () => {
      const { container } = render(<UberUnsPage />)
      const cards = container.querySelectorAll('.backdrop-blur-sm')
      expect(cards.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('uses semantic HTML elements', () => {
      const { container } = render(<UberUnsPage />)
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelectorAll('section').length).toBeGreaterThan(0)
    })

    it('includes proper heading hierarchy', () => {
      const { container } = render(<UberUnsPage />)
      expect(container.querySelector('h1')).toBeInTheDocument()
      expect(container.querySelector('h2')).toBeInTheDocument()
      expect(container.querySelector('h3')).toBeInTheDocument()
    })

    it('provides descriptive text content for all sections', () => {
      render(<UberUnsPage />)
      // Main sections should have meaningful text
      expect(screen.getByText(/Wir sind ein aktiver muslimischer/i)).toBeInTheDocument()
      expect(screen.getByText(/Der Verein wurde im Februar 2011/i)).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('includes responsive text sizing classes', () => {
      const { container } = render(<UberUnsPage />)
      const responsiveHeading = container.querySelector('.text-4xl.md\\:text-6xl')
      expect(responsiveHeading).toBeInTheDocument()
    })

    it('includes responsive grid layout for goals', () => {
      const { container } = render(<UberUnsPage />)
      const gridLayout = container.querySelector('.grid.md\\:grid-cols-3')
      expect(gridLayout).toBeInTheDocument()
    })

    it('includes responsive padding classes', () => {
      const { container } = render(<UberUnsPage />)
      const responsiveSection = container.querySelector('.px-4.sm\\:px-6.lg\\:px-8')
      expect(responsiveSection).toBeInTheDocument()
    })
  })
})
