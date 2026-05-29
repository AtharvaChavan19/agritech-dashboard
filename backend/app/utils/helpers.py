import os
import uuid
import math
import random
from datetime import datetime, timedelta
from fastapi import UploadFile

def get_uploads_path() -> str:
    """
    Returns the absolute path to the backend uploads directory.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    upload_dir = os.path.join(base_dir, "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    return upload_dir

async def save_upload_file(upload_file: UploadFile) -> str:
    """
    Saves an uploaded file to the uploads directory with a unique UUID name
    to prevent file naming collisions.
    """
    upload_dir = get_uploads_path()
    
    # Generate unique filename retaining original extension
    ext = os.path.splitext(upload_file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{ext}"
    dest_path = os.path.join(upload_dir, unique_filename)
    
    with open(dest_path, "wb") as buffer:
        # Read in chunks to avoid blocking main thread for large files
        while True:
            chunk = await upload_file.read(1024 * 1024)  # 1MB chunks
            if not chunk:
                break
            buffer.write(chunk)
            
    return dest_path

def generate_mock_telemetry_history(days: int = 30) -> list:
    """
    Generates simulated time-series data representing farm environmental readings.
    Features gradual shifts to look like realistic climate behavior.
    """
    history = []
    base_date = datetime.now() - timedelta(days=days)
    
    # Seed base values for realistic trends
    moisture = 0.52
    temp = 24.5
    humidity = 60.0
    ndvi = 0.65
    
    for i in range(days):
        current_date = base_date + timedelta(days=i)
        
        # Add random walk variants
        moisture = max(0.15, min(0.95, moisture + random.uniform(-0.06, 0.06)))
        temp = max(10.0, min(42.0, temp + random.uniform(-1.5, 1.5)))
        humidity = max(20.0, min(100.0, humidity + random.uniform(-4.0, 4.0)))
        
        # Precipitation occurs on random days (correlation with high humidity/low temp)
        if random.random() < 0.15:
            precipitation = round(random.uniform(2.5, 45.0), 1)
            # Moisture rises after rain
            moisture = min(0.95, moisture + 0.25)
        else:
            precipitation = 0.0
            # Moisture decays on dry days
            moisture = max(0.15, moisture - 0.02)
            
        # NDVI shifts slowly
        ndvi = max(0.0, min(1.0, ndvi + random.uniform(-0.02, 0.02) + (0.01 if moisture > 0.5 else -0.01)))
        
        history.append({
            "timestamp": current_date.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "soil_moisture": round(moisture, 2),
            "temperature": round(temp, 1),
            "humidity": round(humidity, 1),
            "precipitation": precipitation,
            "ndvi": round(ndvi, 2)
        })
        
    return history
