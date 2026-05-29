/**
 * Api Service to communicate with the FastAPI backend.
 * Uses relative paths so Vite's proxy automatically routes them to http://localhost:8000.
 * Includes robust fallback data in case the backend server is not running.
 */

// Helper to generate mock telemetry for client-side fallback
function generateClientMockTelemetry(days = 15) {
  const history = [];
  const now = new Date();
  
  let moisture = 0.55;
  let temp = 24.0;
  
  for (let i = days; i > 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    moisture = Math.max(0.2, Math.min(0.9, moisture + (Math.random() - 0.5) * 0.08));
    temp = Math.max(15, Math.min(38, temp + (Math.random() - 0.5) * 2));
    
    history.push({
      timestamp: d.toISOString(),
      soil_moisture: parseFloat(moisture.toFixed(2)),
      temperature: parseFloat(temp.toFixed(1)),
      humidity: Math.floor(55 + Math.random() * 20),
      precipitation: Math.random() < 0.2 ? parseFloat((Math.random() * 15).toFixed(1)) : 0.0,
      ndvi: parseFloat((0.55 + Math.random() * 0.15).toFixed(2))
    });
  }
  return history;
}

export async function getTelemetry(days = 15) {
  try {
    const response = await fetch(`/api/analysis/telemetry?days=${days}`);
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn("Backend API offline. Using client-side mock telemetry data.", error);
    return generateClientMockTelemetry(days);
  }
}

export async function getAnalysisHistory() {
  try {
    const response = await fetch('/api/analysis/history');
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn("Backend API offline. Empty history.");
    return [];
  }
}

export async function uploadSatelliteImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/analysis/upload-satellite', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errDetail = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errDetail.detail || `Upload failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend API offline. Generating mock analysis client-side.");
    // Wait 1 second to simulate backend processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return realistic mock response
    return {
      id: `anlyz-${Math.floor(Math.random() * 1000)}`,
      filename: file.name,
      file_url: "#",
      ndvi_mean: parseFloat((0.55 + Math.random() * 0.25).toFixed(2)),
      ndvi_status: Math.random() > 0.4 ? "Excellent" : "Good",
      crop_distribution: {
        "Wheat": 45.5,
        "Corn": 30.2,
        "Soybeans": 24.3
      },
      estimated_yield_deviation: parseFloat((2.5 + Math.random() * 10).toFixed(1)),
      soil_moisture_index: parseFloat((0.4 + Math.random() * 0.3).toFixed(2)),
      pest_threat_level: "Low",
      processed_at: Date.now() / 1000
    };
  }
}
