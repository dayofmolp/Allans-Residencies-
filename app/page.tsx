'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, MapPin, Wifi, Coffee, Users, Clock, ChevronDown } from 'lucide-react';

const PropertyCard = ({ property, onSelect }: { 
  property: any; 
  onSelect: (property: any) => void;
}) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="absolute right-3 top-3 z-10 space-x-2">
        {property.tags.map((tag: any, index: number) => (
          <Badge key={index} variant={tag.variant} className="animate-fade-in">
            {tag.label}
          </Badge>
        ))}
      </div>
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="mt-2 flex items-center text-gray-600">
          <MapPin className="mr-2 h-4 w-4" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {property.amenities.map((amenity: any, index: number) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              {amenity.icon}
              <span className="ml-2">{amenity.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 p-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-sm text-gray-600">Starting from</span>
            <p className="text-lg font-bold text-primary">R{property.price}/month</p>
          </div>
          <Button onClick={() => onSelect(property)} variant="default">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const PropertyDialog = ({ 
  property, 
  isOpen, 
  onClose 
}: {
  property: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!property) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{property.name}</DialogTitle>
          <DialogDescription>{property.location}</DialogDescription>
        </DialogHeader>
        <div className="relative h-64">
          <img
            src={property.image}
            alt={property.name}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="grid gap-4">
          <div>
            <h4 className="mb-2 font-semibold">Amenities</h4>
            <div className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity: any, index: number) => (
                <div key={index} className="flex items-center rounded-lg bg-gray-50 p-2">
                  {amenity.icon}
                  <span className="ml-2 text-sm">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Description</h4>
            <p className="text-sm text-gray-600">{property.description}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>Contact Agent</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="text-gray-600">Get in touch with our team</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input placeholder="Your Name" required />
          </div>
          <div>
            <Input type="email" placeholder="Your Email" required />
          </div>
          <div>
            <Textarea placeholder="Your Message" className="min-h-[100px]" required />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
        {submitted && (
          <Alert className="mt-4">
            <AlertDescription>
              Thank you for your message! We'll get back to you soon.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const properties = [
    {
      id: 1,
      name: "Student Haven",
      location: "32 Kasselvlei, Cape Town",
      price: "4,000",
      image: "/api/placeholder/600/400",
      tags: [
        { label: "NSFAS Accredited", variant: "default" },
        { label: "Available", variant: "secondary" }
      ],
      amenities: [
        { icon: <Wifi className="h-4 w-4" />, label: "Free WiFi" },
        { icon: <Shield className="h-4 w-4" />, label: "24/7 Security" },
        { icon: <Coffee className="h-4 w-4" />, label: "Study Areas" },
        { icon: <Users className="h-4 w-4" />, label: "Common Room" }
      ],
      description: "Modern student accommodation with all essential amenities for comfortable living and studying. Features include high-speed WiFi, 24/7 security, and dedicated study spaces."
    },
    {
      id: 2,
      name: "Academia House",
      location: "Fourie Street, Cape Town",
      price: "5,500",
      image: "/api/placeholder/600/400",
      tags: [
        { label: "NSFAS Accredited", variant: "default" },
        { label: "Popular", variant: "secondary" }
      ],
      amenities: [
        { icon: <Wifi className="h-4 w-4" />, label: "Free WiFi" },
        { icon: <Shield className="h-4 w-4" />, label: "Security" },
        { icon: <Clock className="h-4 w-4" />, label: "24/7 Access" },
        { icon: <Coffee className="h-4 w-4" />, label: "Study Areas" }
      ],
      description: "Premium student living space with en-suite bathrooms and modern facilities. Ideal location near major universities and transport routes."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 py-32 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold sm:text-5xl">Allan's Accommodation</h1>
          <p className="mt-4 max-w-xl text-xl">Premium Student Housing in Bellville South, Cape Town</p>
          <Button
            variant="secondary"
            className="mt-8"
            onClick={() => {
              document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Properties
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16">
        <section id="properties" className="scroll-mt-16">
          <h2 className="mb-8 text-3xl font-bold">Our Properties</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={setSelectedProperty}
              />
            ))}
          </div>
        </section>

        <section id="contact" className="mt-16 scroll-mt-16">
          <ContactForm />
        </section>
      </main>

      <PropertyDialog
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
}
