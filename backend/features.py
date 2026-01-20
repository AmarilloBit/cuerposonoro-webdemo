"""
Feature extraction from pose landmarks.
This is a simplified version for the web demo.
"""

import math
from typing import Optional
from config import FEATURES_CONFIG


class FeatureExtractor:
    """Extracts musical features from MediaPipe pose landmarks."""

    def __init__(self):
        self.config = FEATURES_CONFIG
        self.prev_landmarks = None
        self.prev_features = None

    def calculate(self, landmarks: list, prev_landmarks: Optional[list] = None) -> dict:
        """
        Calculate all features from landmarks.

        Args:
            landmarks: List of 33 landmarks, each with {x, y, z, visibility}
            prev_landmarks: Previous frame landmarks for velocity calculation

        Returns:
            dict with normalized features (0.0 - 1.0)
        """
        if not landmarks or len(landmarks) < 33:
            return self._empty_features()

        features = {
            "energy": self._calculate_energy(landmarks, prev_landmarks),
            "symmetry": self._calculate_symmetry(landmarks),
            "smoothness": self._calculate_smoothness(landmarks, prev_landmarks),
            "armAngle": self._calculate_arm_angle(landmarks),
            "verticalExtension": self._calculate_vertical_extension(landmarks),
        }

        # Apply temporal smoothing
        features = self._smooth_features(features)

        return features

    def _calculate_energy(self, landmarks: list, prev_landmarks: Optional[list]) -> float:
        """Overall motion energy based on velocity of key points."""
        if prev_landmarks is None:
            return 0.0

        key_indices = self.config["energy_key_points"]
        multiplier = self.config["energy_multiplier"]

        total_velocity = 0.0
        for idx in key_indices:
            if idx < len(landmarks) and idx < len(prev_landmarks):
                dx = landmarks[idx]["x"] - prev_landmarks[idx]["x"]
                dy = landmarks[idx]["y"] - prev_landmarks[idx]["y"]
                velocity = math.sqrt(dx ** 2 + dy ** 2)
                total_velocity += velocity

        energy = min(total_velocity * multiplier, 1.0)
        return energy

    def _calculate_symmetry(self, landmarks: list) -> float:
        """
        Left-right symmetry index.
        Returns: -1.0 (left heavy) to 1.0 (right heavy), 0.0 = balanced
        """
        multiplier = self.config["symmetry_multiplier"]

        left_wrist = landmarks[15]
        right_wrist = landmarks[16]

        left_x = left_wrist["x"]
        right_x = right_wrist["x"]

        center = 0.5
        left_dev = center - left_x
        right_dev = right_x - center

        symmetry = right_dev - left_dev

        return max(-1.0, min(1.0, symmetry * multiplier))

    def _calculate_smoothness(self, landmarks: list, prev_landmarks: Optional[list]) -> float:
        """
        Movement smoothness (inverse of jerk).
        High value = smooth, flowing movement
        Low value = abrupt, jerky movement
        """
        if prev_landmarks is None:
            return 0.5

        key_indices = self.config["smoothness_key_points"]
        multiplier = self.config["smoothness_multiplier"]

        total_jerk = 0.0
        for idx in key_indices:
            dx = landmarks[idx]["x"] - prev_landmarks[idx]["x"]
            dy = landmarks[idx]["y"] - prev_landmarks[idx]["y"]
            movement = math.sqrt(dx ** 2 + dy ** 2)
            total_jerk += movement

        smoothness = 1.0 - min(total_jerk * multiplier, 1.0)
        return max(0.0, smoothness)

    def _calculate_arm_angle(self, landmarks: list) -> float:
        """Average arm elevation angle (0 = down, 1 = horizontal or above)."""
        offset = self.config["arm_angle_offset"]

        left_shoulder = landmarks[11]
        right_shoulder = landmarks[12]
        left_wrist = landmarks[15]
        right_wrist = landmarks[16]

        def arm_elevation(shoulder, wrist):
            dy = shoulder["y"] - wrist["y"]
            return max(0.0, min(1.0, dy + offset))

        left_angle = arm_elevation(left_shoulder, left_wrist)
        right_angle = arm_elevation(right_shoulder, right_wrist)

        return (left_angle + right_angle) / 2

    def _calculate_vertical_extension(self, landmarks: list) -> float:
        """How vertically extended the body is (crouching vs stretching)."""
        multiplier = self.config["vertical_extension_multiplier"]

        nose = landmarks[0]
        left_ankle = landmarks[27]
        right_ankle = landmarks[28]

        ankle_y = (left_ankle["y"] + right_ankle["y"]) / 2
        height = ankle_y - nose["y"]

        extension = max(0.0, min(1.0, height * multiplier))
        return extension

    def _smooth_features(self, features: dict) -> dict:
        """Apply exponential smoothing to reduce jitter."""
        smoothing = self.config["smoothing_factor"]

        if self.prev_features is None:
            self.prev_features = features.copy()
            return features

        smoothed = {}
        for key, value in features.items():
            prev_value = self.prev_features.get(key, value)
            smoothed[key] = smoothing * value + (1 - smoothing) * prev_value

        self.prev_features = smoothed.copy()
        return smoothed

    def _empty_features(self) -> dict:
        """Return zero features when no valid pose detected."""
        return {
            "energy": 0.0,
            "symmetry": 0.0,
            "smoothness": 0.5,
            "armAngle": 0.0,
            "verticalExtension": 0.5,
        }
