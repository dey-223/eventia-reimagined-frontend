
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Tags, 
  Loader2, 
  ArrowLeft,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

// Form schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string().min(1, { message: 'Time is required' }),
  endTime: z.string().min(1, { message: 'End time is required' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  capacity: z.coerce.number().min(1, { message: 'Capacity must be at least 1' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  ticketPrice: z.coerce.number().min(0, { message: 'Ticket price must be a positive number' }),
  status: z.enum(['upcoming', 'ongoing', 'past', 'cancelled']),
  isOnline: z.boolean().default(false),
  isPrivate: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      endTime: '',
      location: '',
      capacity: 100,
      category: '',
      ticketPrice: 0,
      status: 'upcoming',
      isOnline: false,
      isPrivate: false,
    },
  });

  useEffect(() => {
    // Simulate API fetch for event data
    setTimeout(() => {
      // This would be an API call in a real application
      const eventData = {
        title: 'Annual Tech Conference 2025',
        description: 'Join us for the biggest tech conference of the year. Learn from industry experts, network with peers, and discover the latest innovations in technology.',
        date: '2025-06-15',
        time: '09:00',
        endTime: '18:00',
        location: 'San Francisco Convention Center, 747 Howard St, San Francisco, CA 94103',
        capacity: 500,
        category: 'conference',
        ticketPrice: 299.99,
        status: 'upcoming',
        isOnline: false,
        isPrivate: false,
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500',
      };
      
      form.reset(eventData as FormValues);
      setImagePreview(eventData.image);
      setIsLoading(false);
    }, 1000);
  }, [form, id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateEventMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      // In a real app, this would call the API and upload the image if changed
      console.log('Updating event with values:', values);
      console.log('Selected image:', selectedImage);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { success: true };
      // return eventAPI.updateEvent(id, values);
    },
    onSuccess: () => {
      toast.success('Event updated successfully!');
      navigate(`/dashboard/events/${id}`);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update event');
    }
  });

  const onSubmit = (values: FormValues) => {
    updateEventMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-500">Loading event data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate(`/dashboard/events/${id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Event
        </Button>
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-gray-500">Update the details of your event</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Make changes to your event information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="mb-6">
                <FormLabel>Event Image</FormLabel>
                <div className="mt-2 flex items-center">
                  <div className="relative w-full">
                    <div className={`border-2 border-dashed rounded-lg p-4 text-center ${imagePreview ? 'border-green-500' : 'border-gray-300'}`}>
                      {imagePreview ? (
                        <div className="relative">
                          <img 
                            src={imagePreview} 
                            alt="Event preview" 
                            className="mx-auto h-40 w-full object-cover rounded"
                          />
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white"
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4">
                          <ImageIcon className="h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">Click to upload event image</p>
                          <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your event" 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="seminar">Seminar</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="networking">Networking</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="past">Past</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Start Time
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        End Time
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Event location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Capacity
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ticketPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Tags className="h-4 w-4" />
                        Ticket Price
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(`/dashboard/events/${id}`)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={updateEventMutation.isPending}
                >
                  {updateEventMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : 'Update Event'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEvent;
