import os
import shutil
from typing import List
from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from app.inference import predictor
from app.models.schemas import TelemetryPayload, TelemetryItem, AnalysisResultResponse
from app.utils.helpers import save_upload_file, generate_mock_telemetry_history

router = APIRouter()

# Keep track of uploaded and analyzed files in memory for mock persistence
analyses_history = []

@router.get("/telemetry", response_model=List[TelemetryItem])
async def get_telemetry_history(days: int = 30):
    """
    Fetch historical telemetry data (soil moisture, temperature, rainfall, NDVI)
    over a specified number of days.
    """
    try:
        return generate_mock_telemetry_history(days)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating telemetry: {str(e)}")

@router.post("/upload-satellite", response_model=AnalysisResultResponse)
async def upload_satellite_image(
    file: UploadFile = File(...), 
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    """
    Upload a satellite imagery file (JPEG, PNG, TIFF) to process it through the ML inference engine.
    """
    # Verify file extension
    allowed_extensions = {".jpg", ".jpeg", ".png", ".tif", ".tiff"}
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file format. Please upload one of: {', '.join(allowed_extensions)}"
        )
    
    try:
        # Save file to uploads folder
        saved_path = await save_upload_file(file)
        
        # Run synchronous mock ML inference
        analysis_result = predictor.analyze_satellite_image(saved_path)
        
        # Map output to schema response format
        response_data = {
            "id": f"anlyz-{len(analyses_history) + 1}",
            "filename": file.filename,
            "file_url": f"/uploads/{os.path.basename(saved_path)}",
            "ndvi_mean": analysis_result["ndvi"]["mean"],
            "ndvi_status": analysis_result["ndvi"]["status"],
            "crop_distribution": analysis_result["crop_distribution_percentage"],
            "estimated_yield_deviation": analysis_result["estimated_yield_deviation_percentage"],
            "soil_moisture_index": analysis_result["soil_moisture_index"],
            "pest_threat_level": analysis_result["pest_threat_level"],
            "processed_at": analysis_result["analysis_timestamp"]
        }
        
        # Store in local history limit to last 20 records
        analyses_history.insert(0, response_data)
        if len(analyses_history) > 20:
            analyses_history.pop()
            
        return response_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process image: {str(e)}")

@router.get("/history", response_model=List[AnalysisResultResponse])
async def get_analysis_history():
    """
    Get the list of recently processed satellite analysis runs.
    """
    return analyses_history

@router.post("/predict-yield")
async def predict_yield_trend(payload: TelemetryPayload):
    """
    Take current and historical telemetry series to run yield projections.
    """
    if not payload.records:
        raise HTTPException(status_code=400, detail="Telemetry records list cannot be empty.")
    
    # Map models to format needed by predictor
    telemetry_dicts = [
        {"timestamp": item.timestamp, "soil_moisture": item.soil_moisture, "temperature": item.temperature}
        for item in payload.records
    ]
    
    result = predictor.predict_yield_trend(telemetry_dicts)
    return result
