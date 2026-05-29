//requests.js

const apiUrl = import.meta.env.VITE_API_URL;

export async function getData(endpoint, params) {
  try {
    const url = new URL(`${apiUrl}${endpoint}`);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function postData(endpoint, data) {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function putData(endpoint, data) {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    console.error("Error putting data:", error);
    throw error;
  }
}

export async function deleteData(endpoint) {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'DELETE'
    });
    return response.json();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}