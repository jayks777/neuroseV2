class ApiRequests {
    constructor() {
        this.apiUrl = import.meta.env.VITE_API_URL;
    }

    getHeaders() {
        const token =
            localStorage.getItem(
                "token"
            );

        return {
            "Content-Type":
                "application/json",

            ...(token && {
                Authorization:
                    `Bearer ${token}`
            })
        };
    }

    //GET
    async getData(endpoint, params) {

        try {

            const url =
                new URL(
                    `${this.apiUrl}${endpoint}`
                );

            if (params) {

                Object.keys(params)
                    .forEach(key => {

                        url.searchParams.append(
                            key,
                            params[key]
                        );

                    });
            }

            const response =
                await fetch(url, {
                    headers:
                        this.getHeaders()
                });

            return response.json();

        } catch (error) {

            console.error(error);

            throw error;
        }
    }

    //POST
    async postData(endpoint, data) {

        const response =
            await fetch(
                `${this.apiUrl}${endpoint}`,
                {
                    method: "POST",
                    headers:
                        this.getHeaders(),
                    body:
                        JSON.stringify(data)
                }
            );

        return response.json();
    }

    //PUT
    async putData(endpoint, data) {

        const response =
            await fetch(
                `${this.apiUrl}${endpoint}`,
                {
                    method: "PUT",
                    headers:
                        this.getHeaders(),
                    body:
                        JSON.stringify(data)
                }
            );

        return response.json();
    }
    //DELETE
    async deleteData(endpoint) {

        const response =
            await fetch(
                `${this.apiUrl}${endpoint}`,
                {
                    method: "DELETE",
                    headers:
                        this.getHeaders()
                }
            );

        return response.json();
    }
}
const api = new ApiRequests();
export default api;