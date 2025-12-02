const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => window.localStorage.getItem('token');

const setToken = (token) => {
  if (token) {
    window.localStorage.setItem('token', token);
  }
};

const clearToken = () => {
  window.localStorage.removeItem('token');
};

const buildHeaders = (customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async (endpoint, options = {}) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: buildHeaders(options.headers || {}),
    });
  } catch (networkError) {
    throw new Error('Unable to reach the server. Please check your connection.');
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Unable to parse server response');
  }

  if (!response.ok || data.success === false) {
    throw new Error(data?.message || 'Something went wrong. Please try again.');
  }

  return data;
};

export const authApi = {
  login: ({ email, password }) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: ({ name, email, password, confirmPassword }) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirmPassword }),
    }),
  me: () => request('/auth/me'),
};

export const courseApi = {
  getAll: () => request('/courses'),
  search: (query) => request(`/courses/search?q=${encodeURIComponent(query)}`),
};

export { getToken, setToken, clearToken };

