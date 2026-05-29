from pydantic import BaseModel, Field
from typing import Dict, List, Optional

class TelemetryItem(BaseModel):
    timestamp: str = Field(..., description="ISO 8601 timestamp format")
    soil_moisture: float = Field(..., ge=0.0, le=1.0, description="Normalized soil moisture percentage")
    temperature: float = Field(..., description="Air temperature in Celsius")
    humidity: float = Field(..., ge=0.0, le=100.0, description="Relative humidity in percentage")
    precipitation: float = Field(..., ge=0.0, description="Precipitation level in mm")
    ndvi: float = Field(..., ge=-1.0, le=1.0, description="NDVI value calculated for this period")

class TelemetryPayload(BaseModel):
    records: List[TelemetryItem]

class AnalysisResultResponse(BaseModel):
    id: str
    filename: str
    file_url: str
    ndvi_mean: float
    ndvi_status: str
    crop_distribution: Dict[str, float] = Field(..., description="Mapping of crop type to estimated percentage")
    estimated_yield_deviation: float = Field(..., description="Estimated percentage deviation in yield")
    soil_moisture_index: float
    pest_threat_level: str
    processed_at: float
