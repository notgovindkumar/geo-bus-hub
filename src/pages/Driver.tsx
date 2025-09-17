import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Power, PowerOff, User, Bus, Clock, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Driver = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [loginForm, setLoginForm] = useState({ busId: "", driverId: "" });
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Mock driver data
  const driverInfo = {
    name: "John Martinez",
    busId: "BUS-101",
    route: "Route A: Downtown ↔ University",
    shift: "Morning Shift (6:00 AM - 2:00 PM)"
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.busId && loginForm.driverId) {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${driverInfo.name}!`,
      });
    }
  };

  const handleStartSharing = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsSharing(true);
          setLocationError(null);
          toast({
            title: "Location Sharing Started",
            description: "Your bus location is now being tracked.",
          });
          
          // Simulate location updates every 10 seconds
          const interval = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                setCurrentLocation({
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
                });
                // In real app, this would update Firebase Realtime Database
                console.log("Location updated:", pos.coords);
              },
              (error) => {
                console.error("Location update error:", error);
              }
            );
          }, 10000);

          // Store interval ID for cleanup
          (window as any).locationInterval = interval;
        },
        (error) => {
          setLocationError(error.message);
          toast({
            title: "Location Access Denied",
            description: "Please enable GPS and location permissions.",
            variant: "destructive"
          });
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const handleStopSharing = () => {
    setIsSharing(false);
    if ((window as any).locationInterval) {
      clearInterval((window as any).locationInterval);
    }
    toast({
      title: "Location Sharing Stopped",
      description: "Your bus is no longer being tracked.",
    });
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if ((window as any).locationInterval) {
        clearInterval((window as any).locationInterval);
      }
    };
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-subtle p-6">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Driver Login</h1>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <Bus className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Bus Driver Portal</CardTitle>
              <CardDescription>
                Enter your credentials to start sharing your bus location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="busId">Bus ID</Label>
                  <Input
                    id="busId"
                    placeholder="e.g., BUS-101"
                    value={loginForm.busId}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, busId: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverId">Driver ID</Label>
                  <Input
                    id="driverId"
                    placeholder="Your driver ID"
                    value={loginForm.driverId}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, driverId: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Demo credentials: BUS-101 / any driver ID
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Driver Dashboard</h1>
          </div>
          <Badge variant={isSharing ? "default" : "secondary"}>
            {isSharing ? "Active" : "Offline"}
          </Badge>
        </div>

        {/* Driver Info */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Driver Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Driver:</span>
              <span className="font-medium">{driverInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Bus ID:</span>
              <span className="font-medium">{driverInfo.busId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Route:</span>
              <span className="font-medium">{driverInfo.route}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Shift:</span>
              <span className="font-medium">{driverInfo.shift}</span>
            </div>
          </CardContent>
        </Card>

        {/* Location Sharing Control */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              GPS Location Sharing
            </CardTitle>
            <CardDescription>
              Share your real-time location to help passengers track the bus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isSharing ? (
              <Button
                onClick={handleStartSharing}
                className="w-full bg-gradient-primary hover:shadow-glow"
                size="lg"
              >
                <Power className="mr-2 h-5 w-5" />
                Start Location Sharing
              </Button>
            ) : (
              <Button
                onClick={handleStopSharing}
                variant="destructive"
                className="w-full"
                size="lg"
              >
                <PowerOff className="mr-2 h-5 w-5" />
                Stop Location Sharing
              </Button>
            )}

            {locationError && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <strong>Error:</strong> {locationError}
              </div>
            )}

            {currentLocation && (
              <div className="rounded-lg bg-muted p-3">
                <h4 className="mb-2 text-sm font-medium">Current Location:</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>Lat: {currentLocation.lat.toFixed(6)}</div>
                  <div>Lng: {currentLocation.lng.toFixed(6)}</div>
                  <div className="flex items-center gap-1 text-accent">
                    <Navigation className="h-3 w-3" />
                    Location updated every 10 seconds
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status & Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Today's Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Hours Active:</span>
                <span className="font-medium">{isSharing ? "2.5 hrs" : "0 hrs"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Passengers:</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Stops Completed:</span>
                <span className="font-medium">12/24</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">GPS Signal:</span>
                <Badge variant={currentLocation ? "default" : "secondary"}>
                  {currentLocation ? "Strong" : "No Signal"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Network:</span>
                <Badge variant="default">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Update:</span>
                <span className="text-sm font-medium">
                  {isSharing ? "Just now" : "Not active"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Driver;