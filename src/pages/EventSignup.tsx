
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";

const EventSignup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample data - in a real app, this would come from an API
  const event = {
    id,
    title: "Conférence Tech 2025",
    date: "2025-06-15",
    location: "Paris Expo",
    price: 99.99
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    toast.success("Inscription réussie !");
    navigate(`/events/${id}/participants`);
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
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{event.price} €</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formulaire d'inscription</CardTitle>
            <CardDescription>
              Remplissez les informations ci-dessous pour vous inscrire à l'événement
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" type="tel" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Entreprise (optionnel)</Label>
                <Input id="company" />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full">
                Confirmer l'inscription
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EventSignup;
