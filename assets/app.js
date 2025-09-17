document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Low data toggle state
  const lowDataToggle = document.getElementById("lowDataToggle");
  let lowDataMode = false;
  if (lowDataToggle) {
    lowDataMode = localStorage.getItem("lowDataMode") === "1";
    lowDataToggle.checked = lowDataMode;
    lowDataToggle.addEventListener("change", () => {
      lowDataMode = !!lowDataToggle.checked;
      localStorage.setItem("lowDataMode", lowDataMode ? "1" : "0");
    });
  }

  // Simple mock data
  // Jaipur approx center lat/lng
  const JAIPUR = { lat: 26.9124, lng: 75.7873 };
  const stops = [
    { id: "A", name: "Jaipur Junction", lat: 26.9196, lng: 75.7878 },
    { id: "B", name: "Sindhi Camp", lat: 26.9209, lng: 75.7962 },
    { id: "C", name: "MI Road", lat: 26.9157, lng: 75.8072 },
    { id: "D", name: "Raja Park", lat: 26.8999, lng: 75.8269 },
    { id: "E", name: "Gopalpura", lat: 26.8645, lng: 75.7892 },
  ];
  const routes = [
    { id: "R1", name: "Route 1: Jaipur Jn → Gopalpura", stopIds: ["A", "B", "C", "E"] },
    { id: "R5", name: "Route 5: Sindhi Camp → Raja Park", stopIds: ["B", "C", "D"] },
    { id: "R7", name: "Route 7: MI Road Loop", stopIds: ["C", "B", "A"] },
  ];
  const buses = [
    { id: "BUS-12", routeId: "R1", lat: 26.917, lng: 75.792, speedKmh: 28 },
    { id: "BUS-8", routeId: "R5", lat: 26.906, lng: 75.815, speedKmh: 24 },
    { id: "BUS-21", routeId: "R7", lat: 26.914, lng: 75.801, speedKmh: 22 },
  ];

  function getStop(id) { return stops.find(s => s.id === id); }
  function getRoute(id) { return routes.find(r => r.id === id); }

  function haversineKm(a, b) {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const lat1 = a.lat * Math.PI / 180;
    const lat2 = b.lat * Math.PI / 180;
    const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function estimateEtaMinutes(bus, targetStopId) {
    const route = getRoute(bus.routeId);
    if (!route) return null;
    const current = { lat: bus.lat, lng: bus.lng };
    const idxTarget = route.stopIds.indexOf(targetStopId);
    if (idxTarget === -1) return null;
    // Approximate distance: current -> next stop in route path to target
    let totalKm = 0;
    let lastPoint = current;
    for (let i = 0; i <= idxTarget; i++) {
      const s = getStop(route.stopIds[i]);
      if (!s) continue;
      totalKm += haversineKm(lastPoint, s);
      lastPoint = { lat: s.lat, lng: s.lng };
    }
    const speed = Math.max(12, bus.speedKmh); // cap minimum speed
    const minutes = (totalKm / speed) * 60;
    const congestion = lowDataMode ? 1.1 : 1.25; // simple factor
    return Math.round(minutes * congestion);
  }

  // Initialize maps if Leaflet available
  function initMap(id) {
    if (typeof L === 'undefined') return null;
    const map = L.map(id).setView([JAIPUR.lat, JAIPUR.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    return map;
  }

  const mapHome = document.getElementById('mapHome') ? initMap('mapHome') : null;
  const mapPassenger = document.getElementById('mapPassenger') ? initMap('mapPassenger') : null;
  const mapDriver = document.getElementById('mapDriver') ? initMap('mapDriver') : null;

  // Add stop markers
  function addStopsToMap(map) {
    if (!map) return;
    stops.forEach(s => {
      L.marker([s.lat, s.lng]).addTo(map).bindPopup(`${s.name}`);
    });
  }
  addStopsToMap(mapHome); addStopsToMap(mapPassenger); addStopsToMap(mapDriver);

  // Bus markers
  const busMarkers = {};
  function upsertBusMarker(map, bus) {
    if (!map) return;
    const key = bus.id + '@' + map._leaflet_id;
    if (!busMarkers[key]) {
      busMarkers[key] = L.marker([bus.lat, bus.lng], { title: bus.id }).addTo(map);
    } else {
      busMarkers[key].setLatLng([bus.lat, bus.lng]);
    }
    busMarkers[key].bindPopup(`${bus.id} • ${bus.routeId}`);
  }

  function stepSimulation() {
    const stepMeters = lowDataMode ? 25 : 60; // smaller steps in low data
    buses.forEach(b => {
      // crude random walk towards a pseudo-target
      const target = getStop(getRoute(b.routeId).stopIds.slice(-1)[0]);
      const dirLat = Math.sign(target.lat - b.lat) * (Math.random()*0.0003 + 0.0001);
      const dirLng = Math.sign(target.lng - b.lng) * (Math.random()*0.0003 + 0.0001);
      b.lat += dirLat;
      b.lng += dirLng;
      b.speedKmh = 18 + Math.random()*15;
      upsertBusMarker(mapHome, b);
      upsertBusMarker(mapPassenger, b);
      upsertBusMarker(mapDriver, b);
    });
  }

  if (mapHome || mapPassenger || mapDriver) {
    // initial render
    buses.forEach(b => { upsertBusMarker(mapHome, b); upsertBusMarker(mapPassenger, b); upsertBusMarker(mapDriver, b); });
    const intervalMs = lowDataMode ? 4000 : 1500;
    setInterval(stepSimulation, intervalMs);
  }

  const trackingStatus = document.getElementById("trackingStatus");
  const startBtn = document.getElementById("startTracking");
  const stopBtn = document.getElementById("stopTracking");
  if (startBtn && stopBtn && trackingStatus) {
    startBtn.addEventListener("click", () => {
      trackingStatus.className = "alert alert-success mt-4";
      trackingStatus.textContent = "Tracking active: sending location updates...";
    });
    stopBtn.addEventListener("click", () => {
      trackingStatus.className = "alert alert-info mt-4";
      trackingStatus.textContent = "Tracking is inactive.";
    });
  }

  const findBtn = document.getElementById("findBuses");
  const results = document.getElementById("results");
  if (findBtn && results) {
    findBtn.addEventListener("click", () => {
      const from = (document.getElementById('fromStop')||{}).value || '';
      const to = (document.getElementById('toStop')||{}).value || '';
      const routeSel = document.getElementById('routeSelect');
      const selectedRouteId = routeSel && routeSel.value ? routeSel.value : null;
      const filtered = selectedRouteId ? buses.filter(b => b.routeId === selectedRouteId) : buses;
      const candidates = filtered.map(b => {
        // naive: ETA to first route stop if 'to' matches any stop name
        const route = getRoute(b.routeId);
        const toMatch = stops.find(s => s.name.toLowerCase().includes((to||'').toLowerCase())) || stops[0];
        const eta = estimateEtaMinutes(b, toMatch.id);
        return { bus: b, route, eta, toStop: toMatch };
      }).sort((a,b)=>a.eta-b.eta).slice(0,3);
      results.innerHTML = [
        `<div class="alert alert-secondary">Showing nearby buses${lowDataMode?" (low data mode)":""}.</div>`,
        '<ul class="list-group">',
        ...candidates.map(c => `<li class="list-group-item d-flex justify-content-between align-items-center">
          ${c.bus.id} • ${c.route.name} → ${c.toStop.name}
          <span class="badge bg-primary rounded-pill">ETA ${c.eta}m</span>
        </li>`),
        '</ul>'
      ].join('');
    });
  }

  // Populate route dropdown if present
  const routeSelect = document.getElementById('routeSelect');
  if (routeSelect) {
    routes.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id; opt.textContent = r.name;
      routeSelect.appendChild(opt);
    });
  }
});


