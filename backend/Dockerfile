# Base image
FROM python:3.11-slim

WORKDIR /app

# Install dependencies (compiled from requirements.in with pip-tools)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]