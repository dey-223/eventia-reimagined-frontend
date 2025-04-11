
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '../Dashboard';
import '@testing-library/jest-dom';

// Mock the DashboardLayout component
jest.mock('../../components/DashboardLayout', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="dashboard-layout">{children}</div>,
  };
});

describe('Dashboard Page', () => {
  const queryClient = new QueryClient();
  
  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it('renders dashboard content', () => {
    renderComponent();
    
    // Check if the main dashboard heading is rendered
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    
    // Check for some key elements
    expect(screen.getByText("Welcome back to your event management console")).toBeInTheDocument();
    expect(screen.getByText("Total Events")).toBeInTheDocument();
    expect(screen.getByText("Total Attendees")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    
    // Check that layout is used
    expect(screen.getByTestId("dashboard-layout")).toBeInTheDocument();
  });
});
