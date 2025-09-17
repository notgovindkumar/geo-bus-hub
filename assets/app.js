document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

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
      results.innerHTML = `
        <div class="alert alert-secondary">Showing example results for your route.</div>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Bus 12 to Downtown
            <span class="badge bg-primary rounded-pill">ETA 5m</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Bus 8 to Central Park
            <span class="badge bg-primary rounded-pill">ETA 11m</span>
          </li>
        </ul>
      `;
    });
  }
});


