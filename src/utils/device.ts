"use client";

export function getDeviceId(): string | null {
  if (typeof window === "undefined") {
    return null; // SSR guard
  }

  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
}
