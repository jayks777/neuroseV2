const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchData(endpoint) {
    const response = await fetch(`${apiUrl}${endpoint}`);
    return response.json();
}