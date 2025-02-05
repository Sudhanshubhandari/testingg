import { API_CONFIG } from '../config/constants';

/**
 * Handles API errors and provides consistent error messages
 */
const handleApiError = (error) => {
  // Don't log the raw error object to avoid empty object in console
  if (error?.message) {
    console.error('API Error:', error.message);
  }
  
  // Handle network errors
  if (!navigator.onLine) {
    return 'No internet connection. Please check your network.';
  }

  // Handle API response errors
  if (error?.response) {
    return error.response.data?.message || 'Server returned an error';
  }

  // Handle other errors
  return error?.message || 'An unexpected error occurred. Please try again.';
};

/**
 * Makes an API request with error handling
 */
async function makeRequest(endpoint, payload) {
  if (!API_CONFIG.BASE_URL) {
    throw new Error('API base URL is not configured');
  }

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorMessage = `Server error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If parsing fails, use the default error message
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

/**
 * Saves the text field configuration to the backend
 */
export async function saveTextConfiguration(payload) {
  if (!payload) {
    throw new Error('No configuration data provided');
  }
  return makeRequest(API_CONFIG.ENDPOINTS.SAVE_TEXT_CONFIGURATION, payload);
}

/**
 * Saves the DB field configuration to the backend
 */
export async function saveDbConfiguration(payload) {
  if (!payload) {
    throw new Error('No configuration data provided');
  }
  return makeRequest(API_CONFIG.ENDPOINTS.SAVE_DB_CONFIGURATION, payload);
}