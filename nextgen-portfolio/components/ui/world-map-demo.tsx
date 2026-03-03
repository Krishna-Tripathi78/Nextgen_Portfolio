"use client";
import { motion } from "motion/react";
import WorldMap from "@/components/ui/world-map";

export default function WorldMapDemo() {
  return (
    <div className="py-40 w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Break free from traditional boundaries. Work from anywhere, at the
          comfort of your own studio apartment. Perfect for Nomads and
          Travellers.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: { lat: 26.4499, lng: 80.3319, label: "Kanpur, India" },
            end: { lat: 37.7749, lng: -122.4194, label: "San Francisco, USA" },
          },
          {
            start: { lat: 26.4499, lng: 80.3319, label: "Kanpur, India" },
            end: { lat: 51.5074, lng: -0.1278, label: "London, UK" },
          },
          {
            start: { lat: 26.4499, lng: 80.3319, label: "Kanpur, India" },
            end: { lat: 40.7128, lng: -74.006, label: "New York, USA" },
          },
          {
            start: { lat: 26.4499, lng: 80.3319, label: "Kanpur, India" },
            end: { lat: 35.6762, lng: 139.6503, label: "Tokyo, Japan" },
          },
          {
            start: { lat: 26.4499, lng: 80.3319, label: "Kanpur, India" },
            end: { lat: -33.8688, lng: 151.2093, label: "Sydney, Australia" },
          },
        ]}
      />
    </div>
  );
}
