
import React from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Participant {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  status: "confirmed" | "pending" | "cancelled";
}

const EventParticipants = () => {
  const { id } = useParams();
  
  // Sample data - in a real app, this would come from an API
  const event = {
    id,
    title: "Conférence Tech 2025",
    date: "2025-06-15",
    location: "Paris Expo",
  };
  
  const participants: Participant[] = [
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@example.com",
      registrationDate: "2025-03-15",
      status: "confirmed"
    },
    {
      id: 2,
      name: "Pierre Martin",
      email: "pierre.martin@example.com",
      registrationDate: "2025-03-16",
      status: "pending"
    }
  ];
  
  const getStatusBadge = (status: Participant["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-600">
            <p>Date : {formatDate(event.date)}</p>
            <p>Lieu : {event.location}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des participants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{formatDate(participant.registrationDate)}</TableCell>
                  <TableCell>{getStatusBadge(participant.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventParticipants;
