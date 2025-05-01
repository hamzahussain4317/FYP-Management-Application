"use client";
import { useState } from "react";
import Papa from "papaparse";

export default function SchedulePage() {
  const [sampleShow, setSampleShow] = useState(false);
  const [csvRooms, setCsvRooms] = useState<RoomAvailability[]>([]);
  const [formData, setFormData] = useState<SchedulerFormData>({
    startDate: "",
    endDate: "",
    timeSlots: [],
    csvRooms: [],
    slotDuration: 60,
    rooms: [""],
    evaluationType: "Mid",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("File selected:", file.name);
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (result) => {
        const rawData: string[][] = result.data as string[][];

        const timeSlots = rawData[0].slice(1); // Skip the first cell (header row)
        const roomsData = rawData.slice(1); // Skip header row

        const parsedRooms = roomsData.map((row) => {
          const roomName = row[0];
          const availability: Record<string, number> = {};

          timeSlots.forEach((slot, index) => {
            const value = row[index + 1];
            if (value == "Empty") {
              availability[slot] = 1; // Available
            } else if (value == "Booked") {
              availability[slot] = 0; // Unavailable
            }
            // Handle if there is 1 or 0
            else {
              availability[slot] = Number(value);
            }
          });

          return { room: roomName, availability };
        });

        setCsvRooms(parsedRooms);
        setFormData((prev) => ({
          ...prev,
          timeSlots: timeSlots,
          csvRooms: parsedRooms,
        }));

        console.log("Structured Room Availability:", parsedRooms);
      },
    });
    console.log(csvRooms.length);
  };

  return (
    <div className="wrapper [&_*]:global-text-size  mx-auto p-4 h-full">
      <div className="w-full flex flex-col items-start justify-between p-2 mb-6 space-y-4 ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-light-text dark:text-dark-text text-start">
          Project Evaluation Schedule
        </h1>
        <p className=" text-gray-500 dark:text-gray-400 mb-4">
          Schedule the project evaluation for students. Please fill in the
          details below.
        </p>
        <p className=" text-gray-500 dark:text-gray-400 mb-4 font-bold">
          Note: The time slots are in 12-hour format.
        </p>
      </div>
      <div className="mb-4 p-6 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-background  md:grid grid-cols-2 gap-12 space-y-4 md:space-y-0">
        <div className="col-span-1">
          <label className="block text-dark-primary mb-2">
            Evaluation Type
          </label>
          <select
            value={formData.evaluationType}
            onChange={(e) =>
              setFormData({ ...formData, evaluationType: e.target.value })
            }
            className="border p-2 rounded-md w-full "
          >
            <option value="mid" className="">
              Mid
            </option>
            <option value="final" className="">
              Final
            </option>
          </select>
        </div>
        <div>
          <label className="block text-dark-primary mb-2">Date Range</label>
          <div className="rounded-md w-full flex items-center justify-between space-x-2">
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full rounded-md p-1"
            />
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full rounded-md p-1"
            />
          </div>
        </div>
        <div className="col-span-1">
          <label className="block text-dark-primary mb-2">
            Slot Duration (minutes)
          </label>
          <input
            type="number"
            value={formData.slotDuration}
            onChange={(e) =>
              setFormData({ ...formData, slotDuration: Number(e.target.value) })
            }
            className="border p-2 rounded-md w-full "
          />
        </div>
        <div className="col-span-1 ">
          <label className="block text-dark-primary mb-2">
            Upload Room Availability CSV
          </label>
          <div className="w-full flex items-center justify-between space-x-2">
            {" "}
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="p-1 rounded-md w-full text-light-text dark:text-dark-text "
            />
            <button
              onClick={() => {
                setSampleShow(!sampleShow);
              }}
              className="bg-dark-primary text-dark-surface p-2 rounded-md col-start-2 col-end-3 w-1/2 ml-auto dark:hover:bg-dark-primary-hover disabled:bg-dark-muted dark:disabled:hover:bg-dark-muted transition-colors duration-300 "
              disabled={csvRooms.length > 0 ? true : false}
            >
              Sample
            </button>
          </div>
        </div>
        {/* Sample Table */}
        {sampleShow && (
          <div className="col-span-2 mt-4 p-4 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-md">
            <h2 className="text-lg font-bold mb-2 text-light-text dark:text-dark-text">
              Sample CSV Format
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="[&_*]:border [&_*]:border-gray-300 [&_*]:p-2 [&_*]:text-center">
                  <th>Room</th>
                  <th>8:00 - 9:00</th>
                  <th>9:00 - 10:00</th>
                  <th>10:00 - 11:00</th>
                </tr>
              </thead>
              <tbody>
                <tr className="[&_*]:border [&_*]:border-gray-300 [&_*]:p-2 [&_*]:text-center">
                  <td>Room 1</td>
                  <td>Empty</td>
                  <td>Booked</td>
                  <td>Booked</td>
                </tr>
                <tr className="[&_*]:border [&_*]:border-gray-300 [&_*]:p-2 [&_*]:text-center">
                  <td>Room 2</td>
                  <td>Booked</td>
                  <td>Empty</td>
                  <td>Booked</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-dark-primary text-dark-surface p-2 rounded-md col-start-2 col-end-3 w-1/2 ml-auto dark:hover:bg-dark-primary-hover transition-colors duration-200 "
        >
          Generate Schedule
        </button>
      </div>
      {/* Parsed Rooms Availability */}
      {csvRooms.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h2 className="text-xl font-semibold dark:text-dark-text mb-2">
            Rooms Availability
          </h2>
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Room</th>
                {/* Dynamically create headers from first room's availability keys */}
                {Object.keys(csvRooms[0]?.availability).map((slot) => (
                  <th key={slot} className="px-4 py-2 border">
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvRooms.map((room) => (
                <tr key={room?.room} className="even:bg-white/20">
                  <td className="px-4 py-2 border font-medium">{room?.room}</td>
                  {Object.entries(room?.availability).map(([slot, value]) => (
                    <td
                      key={slot}
                      className={`px-4 py-2 border text-center ${
                        value === 1 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {value === 1 ? "Available" : "Unavailable"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
