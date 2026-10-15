const API_BASE = 'http://localhost:5000/api';

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem('pulse_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const request = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(options.isJson !== false),
        ...(options.headers || {})
      }
    });

    // Check if CSV or raw download
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('text/csv')) {
      return await res.text();
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (error) {
    console.warn(`[API Call ${endpoint}]`, error.message);
    throw error;
  }
};

export const api = {
  // Health
  checkHealth: () => request('/health'),

  // Auth
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  getMe: () => request('/auth/me'),

  // Dashboard
  getStats: () => request('/dashboard/stats'),
  getCharts: (timeframe = '30d') => request(`/dashboard/charts?timeframe=${timeframe}`),
  getActivity: () => request('/dashboard/activity'),

  // Reports
  getReports: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    return request(`/reports?${query.toString()}`);
  },

  createReport: (reportData) =>
    request('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData)
    }),

  getReportById: (id) => request(`/reports/${id}`),

  updateReport: (id, updates) =>
    request(`/reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }),

  deleteReport: (id) =>
    request(`/reports/${id}`, {
      method: 'DELETE'
    }),

  exportReport: async (id, format = 'json') => {
    if (format === 'csv') {
      const csvText = await request(`/reports/${id}/export?format=csv`, { isJson: false });
      const blob = new Blob([csvText], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${id}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      return true;
    }

    const data = await request(`/reports/${id}/export?format=json`);
    const blob = new Blob([JSON.stringify(data.exportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${id}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return data;
  }
};
