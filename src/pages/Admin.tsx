import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Bus, Users, MapPin, Ticket, RefreshCw, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for admin dashboard
const mockBuses = [
  {
    id: "BUS-101",
    driver: "John Martinez",
    route: "Route A",
    status: "active",
    passengers: 23,
    capacity: 45,
    lastUpdate: "2 min ago",
    location: "Downtown Terminal"
  },
  {
    id: "BUS-102", 
    driver: "Sarah Chen",
    route: "Route B",
    status: "active",
    passengers: 31,
    capacity: 45,
    lastUpdate: "1 min ago", 
    location: "Shopping Mall"
  },
  {
    id: "BUS-103",
    driver: "Mike Johnson",
    route: "Route C", 
    status: "delayed",
    passengers: 18,
    capacity: 40,
    lastUpdate: "5 min ago",
    location: "Medical District"
  },
  {
    id: "BUS-104",
    driver: "Lisa Rodriguez",
    route: "Route D",
    status: "offline",
    passengers: 0,
    capacity: 40,
    lastUpdate: "15 min ago",
    location: "Depot"
  }
];

const mockBookings = [
  {
    id: "BK-001",
    passenger: "Alice Johnson",
    phone: "+1-555-0123",
    bus: "BUS-101",
    pickup: "Downtown Terminal",
    destination: "University Campus",
    time: "3:45 PM",
    status: "confirmed"
  },
  {
    id: "BK-002", 
    passenger: "Bob Smith",
    phone: "+1-555-0124",
    bus: "BUS-102",
    pickup: "Shopping Mall",
    destination: "Airport Terminal", 
    time: "4:15 PM",
    status: "confirmed"
  },
  {
    id: "BK-003",
    passenger: "Carol Davis",
    phone: "+1-555-0125",
    bus: "BUS-103",
    pickup: "Medical District",
    destination: "Beach Avenue",
    time: "4:30 PM", 
    status: "pending"
  }
];

const Admin = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

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
      case "offline": return "secondary";
      default: return "secondary";
    }
  };

  const totalPassengers = mockBuses.reduce((sum, bus) => sum + bus.passengers, 0);
  const activeBuses = mockBuses.filter(bus => bus.status === "active").length;
  const totalBookings = mockBookings.length;
  const averageOccupancy = Math.round((totalPassengers / mockBuses.reduce((sum, bus) => sum + bus.capacity, 0)) * 100);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl p-6">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
              <Bus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBuses}/{mockBuses.length}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((activeBuses / mockBuses.length) * 100)}% operational
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPassengers}</div>
              <p className="text-xs text-muted-foreground">
                {averageOccupancy}% average occupancy
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                {mockBookings.filter(b => b.status === "confirmed").length} confirmed
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">Online</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="buses" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buses">Bus Fleet</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Bus Fleet Tab */}
          <TabsContent value="buses" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bus className="h-5 w-5" />
                  Fleet Management
                </CardTitle>
                <CardDescription>
                  Real-time status and location of all buses in the fleet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bus ID</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Occupancy</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Update</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBuses.map((bus) => (
                      <TableRow key={bus.id}>
                        <TableCell className="font-medium">{bus.id}</TableCell>
                        <TableCell>{bus.driver}</TableCell>
                        <TableCell>{bus.route}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(bus.status)}>
                            {bus.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{bus.passengers}/{bus.capacity}</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${(bus.passengers / bus.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{bus.location}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{bus.lastUpdate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Passenger Bookings
                </CardTitle>
                <CardDescription>
                  Manage and monitor all passenger ticket bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Passenger</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Bus</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.passenger}</TableCell>
                        <TableCell className="text-sm">{booking.phone}</TableCell>
                        <TableCell>{booking.bus}</TableCell>
                        <TableCell className="text-sm">
                          {booking.pickup} → {booking.destination}
                        </TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-time Performance</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Occupancy</span>
                      <span className="font-medium">{averageOccupancy}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${averageOccupancy}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Customer Satisfaction</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Today's Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Trips:</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Passengers Served:</span>
                    <span className="font-medium">834</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Revenue:</span>
                    <span className="font-medium">$2,085</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Delays:</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Hours:</span>
                    <span className="font-medium">16h 30m</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="text-sm font-medium">BUS-103 experiencing delays</span>
                    </div>
                    <Badge variant="destructive">Delayed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent"></div>
                      <span className="text-sm">All other systems operational</span>
                    </div>
                    <Badge variant="default">OK</Badge>
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

export default Admin;