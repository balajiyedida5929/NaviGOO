// Simple JSON-file-backed data store.
// No native compilation needed (unlike better-sqlite3), so `npm install`
// just works everywhere — Windows, Mac, Linux, no Python/build tools required.

const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const DATA_FILE = path.join(__dirname, 'navigoo-data.json');

function seedData() {
  const vehicles = [
    ['Maruti Swift', 'Hatchback', 'Manual', 'Petrol', 5, 1599, 4.6, 120, '🚗'],
    ['Hyundai i20', 'Hatchback', 'Manual', 'Petrol', 5, 1799, 4.6, 98, '🚗'],
    ['Kia Seltos', 'SUV', 'Automatic', 'Diesel', 5, 2999, 4.7, 210, '🚙'],
    ['Tata Nexon', 'SUV', 'Manual', 'Petrol', 5, 2499, 4.7, 156, '🚙'],
    ['Honda City', 'Sedan', 'Automatic', 'Petrol', 5, 2299, 4.5, 88, '🚘'],
    ['Mercedes C-Class', 'Luxury', 'Automatic', 'Petrol', 5, 8999, 4.9, 34, '🏎️'],
  ].map(([name, category, transmission, fuel, seats, price_per_day, rating, reviews_count, image_emoji]) => ({
    id: uuid(), name, category, transmission, fuel, seats, price_per_day, rating, reviews_count, image_emoji,
    features: ['Bluetooth', 'AC', 'USB Charger', 'Airbags', 'GPS', 'Rear Camera', 'Central Locking'],
    available: true,
  }));

  const driverVehicles = [
    ['Hatchback', 'Hyundai i10', 4, 'Petrol', 1499],
    ['Sedan', 'Honda City', 4, 'Petrol', 1899],
    ['SUV', 'Kia Seltos', 6, 'Diesel', 2399],
    ['7 Seater', 'Toyota Innova Crysta', 7, 'Diesel', 2499],
    ['7 Seater', 'Kia Carnival', 7, 'Diesel', 2899],
    ['7 Seater', 'Mahindra Marazzo', 7, 'Diesel', 2199],
    ['Tempo Traveller', 'Force Tempo Traveller', 12, 'Diesel', 4499],
  ].map(([category, name, seats, fuel, price_one_way]) => ({ id: uuid(), category, name, seats, fuel, price_one_way }));

  const drivers = [
    ['Suresh Kumar', '+91 98765 43210', 4.9, 'TS10 AB 5678', 'Toyota Innova Crysta', 'White'],
    ['Ramesh Kumar', '+91 98765 43210', 4.8, 'TS10 AB 1234', 'Maruti Swift', 'White'],
  ].map(([name, phone, rating, vehicle_no, vehicle_name, vehicle_color]) => ({
    id: uuid(), name, phone, rating, vehicle_no, vehicle_name, vehicle_color, avatar_emoji: '🧑\u200d✈️',
  }));

  const mechanics = [
    ['Ramesh Kumar', 12, 4.8, 2.1, 150, 10, 852, 'Skilled in all types of car repairs. Battery, tyre, engine and general maintenance.'],
    ['Suresh Yadav', 8, 4.6, 2.7, 120, 12, 611, 'Specialist in two & three wheeler roadside repairs.'],
    ['Imran Ali', 10, 4.7, 3.2, 150, 15, 734, 'Experienced with SUVs, trucks and heavy vehicles.'],
    ['Mahesh R.', 6, 4.5, 3.8, 100, 18, 402, 'Quick fixes for battery jumpstarts and tyre punctures.'],
  ].map(([name, experience_years, rating, distance_km, price, eta_min, jobs_done, about]) => ({
    id: uuid(), name, experience_years, rating, distance_km, price, eta_min, jobs_done, about,
    services: ['Battery Jumpstart', 'Tyre Puncture', 'Engine Repair', 'Fuel Assistance', 'General Repair'],
  }));

  const deliveryItems = [
    ['Sweets', 'Pure Ghee Sweets', 'Vijayawada (Local Famous)', 450],
    ['Sweets', 'Kaja / Bellam Sweets', 'Vijayawada', 350],
    ['Food', 'Pesarattu Mix', 'Vijayawada', 120],
    ['Snacks', 'Andhra Mixture', 'Vijayawada', 180],
    ['Gifts', 'Handloom Gift Box', 'Vijayawada', 650],
  ].map(([category, name, source_location, price]) => ({ id: uuid(), category, name, source_location, price }));

  const deliveryPartners = [
    { id: uuid(), name: 'Raju Kumar', phone: '+91 98765 43210', rating: 4.8, vehicle: 'Activa 125 – Scooter', base_location: 'Vijayawada, Andhra Pradesh' },
  ];

  const ambulances = [
    { id: uuid(), provider_name: 'Sri Sai Emergency Care', ambulance_no: 'AP39 EM 1234', type: 'Advanced Life Support', rating: 4.8, driver_name: 'Ramesh Kumar', driver_phone: '+91 98765 43210', distance_km: 2.4, eta_min: 6 },
  ];

  return { vehicles, driverVehicles, drivers, mechanics, deliveryItems, deliveryPartners, ambulances, bookings: [] };
}

function load() {
  if (!fs.existsSync(DATA_FILE)) {
    const data = seedData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return data;
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    const data = seedData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return data;
  }
}

const data = load();

function save() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = { data, save, uuid };
