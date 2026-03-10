"use client";

import { useState, useEffect } from "react";

const NAMES = [
  "María", "Carlos", "Ana", "Juan", "Laura", "Andrés", "Camila", "Diego",
  "Valentina", "Santiago", "Daniela", "Sebastián", "Paola", "Felipe",
];
const CITIES = [
  "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
  "Bucaramanga", "Pereira", "Manizales", "Santa Marta",
];
const TIMES = ["hace 2 min", "hace 5 min", "hace 8 min", "hace 12 min", "hace 15 min"];

export function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState({ name: "", city: "", time: "" });

  useEffect(() => {
    function showNotification() {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const time = TIMES[Math.floor(Math.random() * TIMES.length)];
      setNotification({ name, city, time });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }

    const initialDelay = setTimeout(showNotification, 8000);
    const interval = setInterval(showNotification, 25000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 max-w-xs transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">
            {notification.name} de {notification.city}
          </p>
          <p className="text-xs text-gray-400">
            Realizó un pedido {notification.time}
          </p>
        </div>
      </div>
    </div>
  );
}
