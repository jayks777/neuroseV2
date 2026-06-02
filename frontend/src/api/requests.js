class ApiRequests {
    constructor() {
        this.apiUrl = import.meta.env.VITE_API_URL;
    }

    //GET
    async getData(endpoint, params) {
        try {
            const url = new URL(`${this.apiUrl}${endpoint}`);
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

    //POST
    async postData(endpoint, data) {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`, {
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

    //PUT
    async putData(endpoint, data) {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`, {
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

    //DELETE
    async deleteData(endpoint) {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`, {
                method: 'DELETE'
            });
            return response.json();
        } catch (error) {
            console.error("Error deleting data:", error);
            throw error;
        }
    }
}

const api = new ApiRequests();
export default api;