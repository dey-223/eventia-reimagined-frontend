
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  participantsCount: number;
  maxParticipants: number;
  category: string;
}

const Events = () => {
  // Sample data - in a real app, this would come from an API
  const events: Event[] = [
    {
      id: 1,
      title: "Conférence Tech 2025",
      date: "2025-06-15",
      location: "Paris Expo",
      participantsCount: 150,
      maxParticipants: 200,
      category: "Technologie"
    },
    {
      id: 2,
      title: "Workshop Design",
      date: "2025-07-01",
      location: "Lyon Centre",
      participantsCount: 45,
      maxParticipants: 50,
      category: "Design"
    }
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Événements à venir</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <Badge variant="secondary">{event.category}</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{event.participantsCount}/{event.maxParticipants} participants</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-4">
              <Link to={`/events/${event.id}/participants`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Voir les participants
                </Button>
              </Link>
              <Link to={`/events/${event.id}/signup`} className="flex-1">
                <Button className="w-full">S'inscrire</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
