
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Pencil, 
  Trash2, 
  ArrowUpDown,
  Download,
  ImageIcon,
  X,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { eventAPI } from '@/services/api';

// Event type definition
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  category: string;
  image?: string;
}

interface Participant {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  attended: boolean;
}

const EventsList: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([
    // Sample data - this would come from your Laravel API in a real app
    {
      id: 1,
      title: 'Annual Tech Conference',
      date: '2025-06-15',
      time: '09:00',
      location: 'San Francisco, CA',
      capacity: 500,
      registered: 342,
      status: 'upcoming',
      category: 'conference',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 2,
      title: 'Developer Meetup',
      date: '2025-07-10',
      time: '18:30',
      location: 'Online',
      capacity: 100,
      registered: 78,
      status: 'upcoming',
      category: 'networking',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 3,
      title: 'Product Design Workshop',
      date: '2025-05-22',
      time: '10:00',
      location: 'New York, NY',
      capacity: 50,
      registered: 50,
      status: 'ongoing',
      category: 'workshop',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 4,
      title: 'Past Marketing Webinar',
      date: '2025-01-05',
      time: '15:00',
      location: 'Online',
      capacity: 200,
      registered: 143,
      status: 'past',
      category: 'seminar'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false);
  const [currentEventParticipants, setCurrentEventParticipants] = useState<Participant[]>([]);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);

  const openDeleteDialog = (id: number) => {
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    // In a real app, you would call your API to delete the event
    if (eventToDelete !== null) {
      setEvents(events.filter(event => event.id !== eventToDelete));
      setDeleteDialogOpen(false);
      setEventToDelete(null);
      toast.success('Event deleted successfully');
    }
  };

  const handleExport = () => {
    // In a real app, you would generate a CSV or PDF export
    toast.success('Events exported successfully');
  };

  const handleViewParticipants = (eventId: number) => {
    // In a real app, you would fetch participants from API
    const mockParticipants = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        registrationDate: "2025-01-15",
        attended: true
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        registrationDate: "2025-01-20",
        attended: false
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        registrationDate: "2025-02-01",
        attended: true
      }
    ];
    
    setCurrentEventParticipants(mockParticipants);
    setCurrentEventId(eventId);
    setParticipantsDialogOpen(true);
  };

  const handleRemoveParticipant = (participantId: number) => {
    setCurrentEventParticipants(participants => 
      participants.filter(p => p.id !== participantId)
    );
    toast.success('Participant removed successfully');
  };

  const handleCancelEvent = (eventId: number) => {
    setEvents(prevEvents => prevEvents.map(event => 
      event.id === eventId ? {...event, status: 'cancelled'} : event
    ));
    toast.success('Event cancelled successfully');
  };

  // Filter events based on search term and status filter
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Status badge color mapping
  const statusColors = {
    upcoming: 'bg-green-100 text-green-800',
    ongoing: 'bg-blue-100 text-blue-800',
    past: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Events</h1>
          <p className="text-gray-500">Manage and monitor your events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Link to="/dashboard/events/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Events List</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search events..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="past">Past</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <div className="flex items-center space-x-1">
                      Event Name
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {event.image && (
                            <div className="h-10 w-10 rounded overflow-hidden mr-3 flex-shrink-0">
                              <img 
                                src={event.image} 
                                alt={event.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          {event.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        {event.registered}/{event.capacity}
                        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[event.status]}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Event Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link to={`/dashboard/events/${event.id}`} className="flex w-full items-center">
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/dashboard/events/${event.id}/edit`} className="flex w-full items-center">
                                <Pencil className="mr-2 h-4 w-4" /> Edit Event
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <button 
                                className="flex w-full items-center"
                                onClick={() => handleViewParticipants(event.id)}
                              >
                                <User className="mr-2 h-4 w-4" /> Participants
                              </button>
                            </DropdownMenuItem>
                            {event.status !== 'cancelled' && (
                              <DropdownMenuItem>
                                <button 
                                  className="flex w-full items-center text-orange-600"
                                  onClick={() => handleCancelEvent(event.id)}
                                >
                                  <X className="mr-2 h-4 w-4" /> Cancel Event
                                </button>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <button 
                                className="flex w-full items-center text-red-600"
                                onClick={() => openDeleteDialog(event.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Calendar className="h-8 w-8 mb-2" />
                        <span>No events found</span>
                        <Link to="/dashboard/events/create">
                          <Button variant="link" className="mt-2">
                            Create your first event
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Event Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Participants Dialog */}
      <Dialog open={participantsDialogOpen} onOpenChange={setParticipantsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Event Participants
              {currentEventId && ` (${events.find(e => e.id === currentEventId)?.title})`}
            </DialogTitle>
            <DialogDescription>
              Manage participants for this event.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEventParticipants.length > 0 ? (
                  currentEventParticipants.map(participant => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>{new Date(participant.registrationDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={participant.attended ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {participant.attended ? "Attended" : "Registered"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-1 h-8 w-8" 
                          onClick={() => handleRemoveParticipant(participant.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-20 text-center">
                      No participants found for this event.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsList;
