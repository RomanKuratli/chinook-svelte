export class RestClient {
    private baseUrl: string;

    constructor(host: string, port: number) {
        this.baseUrl = `http://${host}:${port}/api`;
    }
    
    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}
