
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Plus } from 'lucide-react';

// Event type definition
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    // Sample data - this would come from your Laravel API in a real app
    {
      id: 1,
      title: 'Annual Tech Conference',
      date: '2025-06-15',
      location: 'San Francisco, CA',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Developer Meetup',
      date: '2025-07-10',
      location: 'Online',
      status: 'upcoming'
    }
  ]);

  // In a real app, you would fetch data from your Laravel API:
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/api/events', {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //           'Accept': 'application/json'
  //         }
  //       });
  //       const data = await response.json();
  //       if (response.ok) {
  //         setEvents(data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //     }
  //   };
  //   fetchEvents();
  // }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Events</h1>
        <Link to="/dashboard/events/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map(event => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                      event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/events/${event.id}`} className="text-blue-600 hover:text-blue-800 mr-3">
                      View
                    </Link>
                    <Link to={`/dashboard/events/${event.id}/edit`} className="text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
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
    </div>
  );
};

export default EventsList;
