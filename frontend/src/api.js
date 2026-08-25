const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  // Self-drive
  getVehicles: (params = {}) => request('/vehicles?' + new URLSearchParams(params)),
  getVehicle: (id) => request(`/vehicles/${id}`),
  bookSelfDrive: (body) => request('/bookings/self-drive', { method: 'POST', body: JSON.stringify(body) }),

  // Cars with driver
  getDriverVehicles: () => request('/driver-vehicles'),
  bookCarsWithDriver: (body) => request('/bookings/cars-with-driver', { method: 'POST', body: JSON.stringify(body) }),

  // Roadside
  getMechanics: () => request('/mechanics'),
  getMechanic: (id) => request(`/mechanics/${id}`),
  createRoadsideRequest: (body) => request('/roadside-requests', { method: 'POST', body: JSON.stringify(body) }),
  advanceRoadsideStatus: (id, status) => request(`/roadside-requests/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Delivery
  getDeliveryItems: (category) => request('/delivery-items' + (category ? `?category=${category}` : '')),
  createDeliveryRequest: (body) => request('/delivery-requests', { method: 'POST', body: JSON.stringify(body) }),
  advanceDelivery: (id) => request(`/delivery-requests/${id}/advance`, { method: 'PATCH' }),

  // SOS
  getAmbulances: () => request('/ambulances'),
  createSOSRequest: (body) => request('/sos-requests', { method: 'POST', body: JSON.stringify(body) }),
  advanceSOS: (id) => request(`/sos-requests/${id}/advance`, { method: 'PATCH' }),

  // Generic bookings
  getBookings: (type) => request('/bookings' + (type ? `?type=${type}` : '')),
  getBooking: (id) => request(`/bookings/${id}`),
  cancelBooking: (id) => request(`/bookings/${id}/cancel`, { method: 'PATCH' }),
};
