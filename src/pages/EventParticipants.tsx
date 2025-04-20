
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft, User, Calendar, MapPin } from 'lucide-react';

interface Participant {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  company?: string;
  attended: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  participantsCount: number;
  maxParticipants: number;
  category: string;
  description: string;
}

const EventParticipants: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  
  // Fetch event data - in a real app this would come from an API
  useEffect(() => {
    // Mock data for the specific event
    const eventData: Event = {
      id: Number(id),
      title: id === "1" ? "Conférence Tech 2025" : id === "2" ? "Workshop Design" : `Événement ${id}`,
      date: "2025-06-15",
      location: "Paris Expo",
      participantsCount: 150,
      maxParticipants: 200,
      category: "Technologie",
      description: "Une conférence dédiée aux dernières innovations technologiques et aux tendances futures de l'industrie tech."
    };
    
    // Mock participants data
    const participantsData: Participant[] = [
      {
        id: 1,
        name: "Marie Dubois",
        email: "marie.dubois@example.com",
        registrationDate: "2025-02-15",
        company: "TechCorp",
        attended: true
      },
      {
        id: 2,
        name: "Pierre Martin",
        email: "pierre.martin@example.com",
        registrationDate: "2025-02-20",
        company: "DesignStudio",
        attended: false
      },
      {
        id: 3,
        name: "Sophie Bernard",
        email: "sophie.bernard@example.com",
        registrationDate: "2025-03-01",
        attended: true
      },
      {
        id: 4,
        name: "Lucas Petit",
        email: "lucas.petit@example.com",
        registrationDate: "2025-03-05",
        company: "InnovTech",
        attended: false
      },
      {
        id: 5,
        name: "Emma Richard",
        email: "emma.richard@example.com",
        registrationDate: "2025-03-10",
        attended: true
      }
    ];
    
    setEvent(eventData);
    setParticipants(participantsData);
  }, [id]);
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const filteredParticipants = participants.filter(participant => 
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (participant.company && participant.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!event) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="text-center">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="mb-6">
        <Link to="/events" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux événements
        </Link>
        
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-gray-600 mb-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            <span>{participants.length} participants</span>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des Participants</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher un participant..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map(participant => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>{participant.company || "-"}</TableCell>
                      <TableCell>{formatDate(participant.registrationDate)}</TableCell>
                      <TableCell>
                        <Badge className={participant.attended ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {participant.attended ? "Présent" : "Non confirmé"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <User className="h-8 w-8 mb-2" />
                        <span>Aucun participant trouvé</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventParticipants;
