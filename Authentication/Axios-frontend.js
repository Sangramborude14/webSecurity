import axios from 'axios';

let applicationAccessToken = null; // Stored securely in-memory only

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    withCredentials: true // Crucial: forces Axios to attach the HttpOnly refresh cookie automatically
});

// Request Interceptor: Attach the current access token to every outgoing request
apiClient.interceptors.request.use(
    (config) => {
        if (applicationAccessToken) {
            config.headers['Authorization'] = `Bearer ${applicationAccessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Catch 401s and handle the silent refresh flow
apiClient.interceptors.response.use(
    (response) => response, // If request succeeds, just return it
    async (error) => {
        const originalRequest = error.config;

        // If the error is a 401 and we haven't already retried this request yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark request so we don't loop infinitely

            try {
                // Call the backend refresh endpoint. 
                // The browser automatically attaches the httpOnly refresh cookie behind the scenes.
                const response = await axios.post(
                    'https://api.example.com/api/refresh', 
                    {}, 
                    { withCredentials: true }
                );

                // Extract new access token and save it to memory
                applicationAccessToken = response.data.accessToken;

                // Update the authorization header of the original failed request
                originalRequest.headers['Authorization'] = `Bearer ${applicationAccessToken}`;

                // Re-run and return the original request seamlessly
                return apiClient(originalRequest);
            } catch (refreshError) {
                // The refresh token is invalid or expired too -> User must log in again
                applicationAccessToken = null;
                window.location.href = '/login'; 
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;