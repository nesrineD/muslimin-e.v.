import React from 'react'
import { render, screen } from '@testing-library/react'
import VeranstaltungenPage from '@/app/veranstaltungen/page'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    main: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => <main {...props}>{children}</main>,
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
  containerVariants: {},
  itemVariants: {},
}))

// Mock the child components to isolate the page test
jest.mock('@/components/landing/EventCard', () => ({
  EventCard: ({ name, icon }: { name: string; icon: string }) => (
    <div data-testid="event-card">
      <span>{icon}</span>
      <h3>{name}</h3>
    </div>
  ),
}))

jest.mock('@/components/landing/SocialMediaCTA', () => ({
  SocialMediaCTA: () => <div data-testid="social-media-cta">Social Media CTA</div>,
}))

describe('VeranstaltungenPage', () => {
  it('renders the page heading', () => {
    render(<VeranstaltungenPage />)
    
    const heading = screen.getByRole('heading', { name: /unsere veranstaltungen/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the page description', () => {
    render(<VeranstaltungenPage />)
    
    const description = screen.getByText(/entdecke die vielen möglichkeiten/i)
    expect(description).toBeInTheDocument()
  })

  it('renders all 5 event cards', () => {
    render(<VeranstaltungenPage />)
    
    const eventCards = screen.getAllByTestId('event-card')
    expect(eventCards).toHaveLength(5)
  })

  it('renders each event with correct name', () => {
    render(<VeranstaltungenPage />)
    
    // Check that all event names are present
    expect(screen.getByText('Monatsvortrag')).toBeInTheDocument()
    expect(screen.getByText('Online-Vortragsformat')).toBeInTheDocument()
    expect(screen.getByText('Ramadan Connects')).toBeInTheDocument()
    expect(screen.getByText('Aschura-Frauenveranstaltung')).toBeInTheDocument()
    expect(screen.getByText('Koranunterricht für Frauen und Mädchen')).toBeInTheDocument()
  })

  it('renders social media CTA section', () => {
    render(<VeranstaltungenPage />)
    
    const socialMediaCTA = screen.getByTestId('social-media-cta')
    expect(socialMediaCTA).toBeInTheDocument()
  })

  it('uses correct semantic HTML structure', () => {
    render(<VeranstaltungenPage />)
    
    // Check for main element
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    
    // Check for heading hierarchy
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/unsere veranstaltungen/i)
  })
})
