export const mockData = {
  rover: {
    fieldName: "North Field - Block 4",
    missionStatus: "Active",
    coverage: "82 / 120 ha",
    progress: 68,
    battery: 82,
    currentTask: "Spraying",
    scanningRow: 15,
    estCompletion: "11:30 AM",
  },
  latestSprayEvent: {
    id: 1216,
    totalEvents: 1240,
    targetSpecies: "Nutgrass (Cyperus rotundus)",
    confidence: 94,
    location: "North Field - Row 15",
    timestamp: "10:42:15 AM",
    gps: "27.4698° S, 153.0251° E",
    currentAction: "Spraying Applied",
    image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=3087&auto=format&fit=crop", // Placeholder for actual weed image
  },
  activityLog: [
    { id: 1, type: "detection", message: "Weed detected", detail: "Confidence: 94%", timestamp: "10:42 AM", status: "warning" },
    { id: 2, type: "spray", message: "Spray applied", detail: "Row 15, Sec C-04", timestamp: "10:41 AM", status: "success" },
    { id: 3, type: "mission", message: "Row 14 completed", detail: "Coverage: 110/120 ha", timestamp: "10:35 AM", status: "success" },
    { id: 4, type: "detection", message: "Weed detected", detail: "Confidence: 88%", timestamp: "10:30 AM", status: "warning" },
    { id: 5, type: "spray", message: "Spray applied", detail: "Row 14, Sec B-02", timestamp: "10:28 AM", status: "success" },
    { id: 6, type: "mission", message: "Mission paused", detail: "Manual override", timestamp: "10:15 AM", status: "warning" },
  ],
  missionSummary: {
    totalWeeds: 1240,
    totalSprays: 1240,
    areaCovered: "82 ha",
    rowsCompleted: 42,
    totalRows: 65
  },
  fieldMap: {
    markers: [
      { 
        id: 1, 
        row: 2, 
        pos: 30, 
        species: "Nutgrass", 
        timestamp: "10:15:30 AM" 
      },
      { 
        id: 2, 
        row: 5, 
        pos: 60, 
        species: "Crowsfoot", 
        timestamp: "10:32:10 AM" 
      },
      { 
        id: 3, 
        row: 10, 
        pos: 45, 
        species: "Nutgrass", 
        timestamp: "10:42:15 AM" 
      }
    ],
    roverPosition: { row: 15, pos: 80 },
    totalRows: 20
  }
};
