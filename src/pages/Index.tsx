import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bus, Shield, Clock, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero px-6 py-20 text-center">
        <div className="absolute inset-0 bg-overlay/10"></div>
        <div className="relative mx-auto max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-overlay-foreground/20 text-overlay-foreground">
            Real-Time Bus Tracking
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-overlay-foreground md:text-6xl">
            Smart Transit for Small Cities
          </h1>
          <p className="mb-8 text-xl text-overlay-foreground/90 md:text-2xl">
            Track buses in real-time, get accurate ETAs, and book tickets seamlessly
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/passenger">
                <Users className="mr-2 h-5 w-5" />
                Passenger Portal
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-overlay-foreground/20 text-overlay-foreground hover:bg-overlay-foreground/10">
              <Link to="/driver">
                <Bus className="mr-2 h-5 w-5" />
                Driver Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Modern Public Transport Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bridging the gap between passengers and public transportation with real-time data and smart booking
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Live GPS Tracking</CardTitle>
                <CardDescription>
                  Real-time bus locations updated every few seconds for accurate positioning
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Smart ETA Calculation</CardTitle>
                <CardDescription>
                  Intelligent arrival time estimates based on live traffic and route data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Mobile Optimized</CardTitle>
                <CardDescription>
                  Lightweight design that works perfectly on mobile devices with low bandwidth
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="bg-muted/50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Choose Your Portal
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <Users className="h-16 w-16 text-primary mb-4" />
                <CardTitle className="text-2xl">Passengers</CardTitle>
                <CardDescription className="text-lg">
                  Track buses, get ETAs, and book tickets easily
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    View live bus locations on map
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Get real-time arrival estimates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Book tickets for upcoming journeys
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Mobile-friendly interface
                  </li>
                </ul>
                <Button asChild className="w-full" variant="default">
                  <Link to="/passenger">
                    Open Passenger Portal
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <Bus className="h-16 w-16 text-primary mb-4" />
                <CardTitle className="text-2xl">Bus Drivers</CardTitle>
                <CardDescription className="text-lg">
                  Share location and manage your route efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Secure driver authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    One-click location sharing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Battery-optimized GPS updates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Route status management
                  </li>
                </ul>
                <Button asChild className="w-full" variant="secondary">
                  <Link to="/driver">
                    Open Driver Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admin Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="shadow-elegant">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4 mx-auto" />
              <CardTitle className="text-2xl">System Administration</CardTitle>
              <CardDescription className="text-lg">
                Monitor all buses, routes, and passenger bookings in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="lg">
                <Link to="/admin">
                  <Shield className="mr-2 h-5 w-5" />
                  Admin Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Real-Time Bus Tracking System • Prototype Demo
        </p>
      </footer>
    </div>
  );
};

export default Index;