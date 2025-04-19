
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, Users, Filter, Search, CalendarCheck, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ProgramEvent {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  speakers: string[];
  description: string;
  capacity: number;
  registered: number;
}

const EventProgram: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dayFilter, setDayFilter] = useState('all');
  
  // Sample program data that would come from an API in a real app
  const events: ProgramEvent[] = [
    {
      id: 1,
      title: "Opening Keynote: Future of Tech",
      date: "2025-06-15",
      startTime: "09:00",
      endTime: "10:30",
      location: "Main Hall",
      category: "keynote",
      speakers: ["John Smith", "Maria Garcia"],
      description: "Join us for our opening keynote where industry leaders will discuss the future of technology and innovation.",
      capacity: 500,
      registered: 345
    },
    {
      id: 2,
      title: "Building Scalable Applications",
      date: "2025-06-15",
      startTime: "11:00",
      endTime: "12:30",
      location: "Workshop Room A",
      category: "workshop",
      speakers: ["David Chen"],
      description: "Learn how to design and implement applications that can scale to millions of users.",
      capacity: 100,
      registered: 89
    },
    {
      id: 3,
      title: "AI Ethics Panel",
      date: "2025-06-15",
      startTime: "14:00",
      endTime: "15:30",
      location: "Panel Room",
      category: "panel",
      speakers: ["Emily Johnson", "Michael Rodriguez", "Sarah Lee"],
      description: "A thought-provoking discussion on the ethical considerations in artificial intelligence development.",
      capacity: 200,
      registered: 178
    },
    {
      id: 4,
      title: "Networking Lunch",
      date: "2025-06-15",
      startTime: "12:30",
      endTime: "14:00",
      location: "Garden Terrace",
      category: "networking",
      speakers: [],
      description: "Connect with fellow attendees over a catered lunch in our beautiful garden terrace.",
      capacity: 350,
      registered: 320
    },
    {
      id: 5,
      title: "Web Development Trends",
      date: "2025-06-16",
      startTime: "09:30",
      endTime: "11:00",
      location: "Workshop Room B",
      category: "workshop",
      speakers: ["Alex Turner"],
      description: "Discover the latest trends and technologies shaping the future of web development.",
      capacity: 100,
      registered: 95
    },
    {
      id: 6,
      title: "Startup Pitch Competition",
      date: "2025-06-16",
      startTime: "11:30",
      endTime: "13:00",
      location: "Main Hall",
      category: "competition",
      speakers: ["Various Startups"],
      description: "Watch innovative startups pitch their ideas to our panel of investors and industry experts.",
      capacity: 400,
      registered: 380
    },
    {
      id: 7,
      title: "Closing Remarks & Awards",
      date: "2025-06-16",
      startTime: "16:00",
      endTime: "17:30",
      location: "Main Hall",
      category: "keynote",
      speakers: ["Conference Organizers"],
      description: "Join us as we wrap up the conference, share key takeaways, and present awards to participants.",
      capacity: 500,
      registered: 420
    }
  ];
  
  // Get unique days from events
  const uniqueDays = Array.from(new Set(events.map(event => event.date)));
  
  // Get unique categories from events
  const uniqueCategories = Array.from(new Set(events.map(event => event.category)));
  
  // Filter events based on search term, category and day
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm.toLowerCase()));
                          
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const matchesDay = dayFilter === 'all' || event.date === dayFilter;
    
    return matchesSearch && matchesCategory && matchesDay;
  });
  
  // Group events by day for the tabs
  const eventsByDay = uniqueDays.reduce((acc, day) => {
    acc[day] = filteredEvents.filter(event => event.date === day);
    return acc;
  }, {} as Record<string, ProgramEvent[]>);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  // Get category display name
  const getCategoryDisplayName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'keynote': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'panel': return 'bg-purple-100 text-purple-800';
      case 'networking': return 'bg-yellow-100 text-yellow-800';
      case 'competition': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Event Program</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our comprehensive program of keynotes, workshops, panels, and networking opportunities.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search events, topics, speakers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <Select 
            value={categoryFilter} 
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {getCategoryDisplayName(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={dayFilter} 
            onValueChange={setDayFilter}
          >
            <SelectTrigger className="w-[180px]">
              <CalendarDays className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Days</SelectItem>
              {uniqueDays.map(day => (
                <SelectItem key={day} value={day}>
                  {formatDate(day).split(',')[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue={uniqueDays[0]} className="space-y-4">
        <TabsList className="flex overflow-x-auto pb-2 space-x-2">
          {uniqueDays.map(day => (
            <TabsTrigger key={day} value={day} className="whitespace-nowrap">
              {formatDate(day).split(',')[0]}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {uniqueDays.map(day => (
          <TabsContent key={day} value={day} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">{formatDate(day)}</h2>
            
            {eventsByDay[day]?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {eventsByDay[day].sort((a, b) => a.startTime.localeCompare(b.startTime)).map(event => (
                  <Card key={event.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.startTime} - {event.endTime}</span>
                            <span className="mx-1">|</span>
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <CardTitle className="text-xl">{event.title}</CardTitle>
                        </div>
                        <Badge className={getCategoryColor(event.category)}>
                          {getCategoryDisplayName(event.category)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        {event.speakers.length > 0 && (
                          <div className="flex items-start gap-1 mb-2 text-sm">
                            <Users className="h-4 w-4 mt-0.5 text-gray-500" />
                            <div>
                              <span className="text-gray-700">Speakers: </span>
                              <span>{event.speakers.join(', ')}</span>
                            </div>
                          </div>
                        )}
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{event.registered}/{event.capacity} registered</span>
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full ml-2">
                            <div 
                              className="h-full bg-blue-600 rounded-full" 
                              style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        <Link to={`/register-event/${event.id}`}>
                          <Button className="flex items-center gap-2">
                            <Ticket className="h-4 w-4" />
                            Register Now
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <CalendarCheck className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No events found with the current filters.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EventProgram;
