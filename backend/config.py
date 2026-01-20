"""
Configuration for Cuerpo Sonoro Web Backend
"""

# Feature extraction parameters
FEATURES_CONFIG = {
    # Temporal smoothing (0.0 = no smoothing, 1.0 = no change)
    "smoothing_factor": 0.3,

    # Energy calculation
    "energy_multiplier": 10.0,
    "energy_key_points": [0, 15, 16, 27, 28],  # nose, wrists, ankles

    # Symmetry calculation
    "symmetry_multiplier": 2.0,

    # Smoothness calculation
    "smoothness_multiplier": 5.0,
    "smoothness_key_points": [15, 16],  # wrists

    # Arm angle calculation
    "arm_angle_offset": 0.5,

    # Vertical extension calculation
    "vertical_extension_multiplier": 1.5,
}

# Server configuration
SERVER_CONFIG = {
    "host": "0.0.0.0",
    "port": 8000,
    "log_level": "INFO",
}
