import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Clock, Ticket, Bus, Users, Navigation, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock bus data
const mockBuses = [
  {
    id: "BUS-101",
    route: "Route A: Downtown ↔ University", 
    currentLocation: "Downtown Terminal",
    nextStop: "Central Station",
    eta: "3 min",
    status: "active",
    passengers: 23,
    capacity: 45,
    lat: 40.7128,
    lng: -74.0060
  },
  {
    id: "BUS-102", 
    route: "Route B: Airport ↔ Mall",
    currentLocation: "Shopping Mall",
    nextStop: "City Center",
    eta: "8 min",
    status: "active", 
    passengers: 31,
    capacity: 45,
    lat: 40.7589,
    lng: -73.9851
  },
  {
    id: "BUS-103",
    route: "Route C: Hospital ↔ Beach",
    currentLocation: "Medical District", 
    nextStop: "Beach Avenue",
    eta: "15 min",
    status: "delayed",
    passengers: 18,
    capacity: 40,
    lat: 40.6892,
    lng: -74.0445
  }
];

const busStops = [
  "Downtown Terminal", "Central Station", "University Campus", "Shopping Mall", 
  "City Center", "Medical District", "Beach Avenue", "Airport Terminal"
];

const Passenger = () => {
  const { toast } = useToast();
  const [selectedBus, setSelectedBus] = useState<string>("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    busId: ""
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBookTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingForm.name && bookingForm.pickup && bookingForm.destination && bookingForm.busId) {
      toast({
        title: "Ticket Booked Successfully!",
        description: `Booking confirmed for ${bookingForm.name} on ${bookingForm.busId}`,
      });
      setBookingForm({ name: "", phone: "", pickup: "", destination: "", busId: "" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-bus-active";
      case "delayed": return "bg-bus-delayed"; 
      default: return "bg-bus-inactive";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "delayed": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Passenger Portal</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4" />
            Updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-6">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Live Map
            </TabsTrigger>
            <TabsTrigger value="booking" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Book Ticket
            </TabsTrigger>
          </TabsList>

          {/* Live Map Tab */}
          <TabsContent value="map" className="space-y-6">
            {/* Map Container */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Live Bus Tracking Map
                </CardTitle>
                <CardDescription>
                  Real-time locations of all active buses in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 w-full rounded-lg bg-gradient-to-br from-muted/50 to-muted border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 text-primary mx-auto" />
                    <p className="text-lg font-medium text-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Google Maps integration would display here with real-time bus markers.
                      Add your Google Maps API key to enable the live map.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      {mockBuses.map((bus) => (
                        <div key={bus.id} className="flex items-center gap-2 bg-card p-2 rounded-md border">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(bus.status)}`}></div>
                          <span className="text-xs font-medium">{bus.id}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Bus Status */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockBuses.map((bus) => (
                <Card key={bus.id} className="shadow-card hover:shadow-glow transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{bus.id}</CardTitle>
                      <Badge variant={getStatusVariant(bus.status)}>
                        {bus.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {bus.route}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current Location:</span>
                        <span className="text-sm font-medium">{bus.currentLocation}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Next Stop:</span>
                        <span className="text-sm font-medium">{bus.nextStop}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          ETA:
                        </span>
                        <span className="text-sm font-medium text-primary">{bus.eta}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Occupancy:
                        </span>
                        <span className="text-sm font-medium">
                          {bus.passengers}/{bus.capacity}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(bus.passengers / bus.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        setSelectedBus(bus.id);
                        setBookingForm(prev => ({ ...prev, busId: bus.id }));
                      }}
                    >
                      <Ticket className="mr-2 h-3 w-3" />
                      Book This Bus
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Booking Tab */}
          <TabsContent value="booking" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Book Your Ticket
                </CardTitle>
                <CardDescription>
                  Reserve your seat on any available bus route
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBookTicket} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="busId">Select Bus</Label>
                    <Select 
                      value={bookingForm.busId} 
                      onValueChange={(value) => setBookingForm(prev => ({ ...prev, busId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a bus" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBuses.map((bus) => (
                          <SelectItem key={bus.id} value={bus.id}>
                            {bus.id} - {bus.route}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Stop</Label>
                      <Select 
                        value={bookingForm.pickup} 
                        onValueChange={(value) => setBookingForm(prev => ({ ...prev, pickup: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select pickup stop" />
                        </SelectTrigger>
                        <SelectContent>
                          {busStops.map((stop) => (
                            <SelectItem key={stop} value={stop}>
                              {stop}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Select 
                        value={bookingForm.destination} 
                        onValueChange={(value) => setBookingForm(prev => ({ ...prev, destination: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {busStops.map((stop) => (
                            <SelectItem key={stop} value={stop}>
                              {stop}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow">
                    <Ticket className="mr-2 h-4 w-4" />
                    Book Ticket ($2.50)
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">BUS-101 • Downtown → University</p>
                      <p className="text-sm text-muted-foreground">Booked today at 2:30 PM</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">BUS-102 • Mall → Airport</p>
                      <p className="text-sm text-muted-foreground">Completed yesterday</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Passenger;