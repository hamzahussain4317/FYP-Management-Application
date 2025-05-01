"use client";
import { useState } from "react";

export default function SchedulePage() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    timeStart: "08:00",
    timeEnd: "16:00",
    slotDuration: 60,
    rooms: [""],
    evaluationType: "mid",
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/schedule-evaluations", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    console.log(result); // You can render it in a table
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Schedule Evaluations</h1>

      <label>Evaluation Type</label>
      <select
        value={formData.evaluationType}
        onChange={(e) =>
          setFormData({ ...formData, evaluationType: e.target.value })
        }
        className="border p-2"
      >
        <option value="mid">Mid</option>
        <option value="final">Final</option>
      </select>

      <label>Date Range</label>
      <input
        type="date"
        value={formData.startDate}
        onChange={(e) =>
          setFormData({ ...formData, startDate: e.target.value })
        }
      />
      <input
        type="date"
        value={formData.endDate}
        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
      />

      <label>Time Slot</label>
      <input
        type="time"
        value={formData.timeStart}
        onChange={(e) =>
          setFormData({ ...formData, timeStart: e.target.value })
        }
      />
      <input
        type="time"
        value={formData.timeEnd}
        onChange={(e) => setFormData({ ...formData, timeEnd: e.target.value })}
      />

      <label>Slot Duration (minutes)</label>
      <input
        type="number"
        value={formData.slotDuration}
        onChange={(e) =>
          setFormData({ ...formData, slotDuration: Number(e.target.value) })
        }
        className="border p-2"
      />

      <label>Rooms (comma-separated)</label>
      <input
        type="text"
        value={formData.rooms.join(",")}
        onChange={(e) =>
          setFormData({ ...formData, rooms: e.target.value.split(",") })
        }
        className="border p-2 w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-2 rounded-md"
      >
        Generate Schedule
      </button>
    </div>
  );
}
