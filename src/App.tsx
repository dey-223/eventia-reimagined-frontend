import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard related imports
import Dashboard from "./pages/Dashboard";
import EventsList from "./pages/EventsList";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import EditEvent from "./pages/EditEvent";
import DashboardSettings from "./pages/DashboardSettings";
import Navbar from "./components/Navbar";

// New pages for events
import Events from "./pages/Events";
import EventParticipants from "./pages/EventParticipants";
import EventSignup from "./pages/EventSignup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Public Event Routes */}
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id/participants" element={<EventParticipants />} />
          <Route path="/events/:id/signup" element={<EventSignup />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/events" element={<EventsList />} />
          <Route path="/dashboard/events/create" element={<CreateEvent />} />
          <Route path="/dashboard/events/:id" element={<EventDetail />} />
          <Route path="/dashboard/events/:id/edit" element={<EditEvent />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
