// Authentication Module - Step 3
const api = require('./api');

class AuthService {
    constructor() {
        this.user = null;
        this.token = null;
    }

    async login(email, password) {
        const response = await api.post('/auth/login', { email, password });
        if (response.token) {
            this.token = response.token;
            this.user = response.user;
            api.setToken(this.token);
        }
        return response;
    }

    logout() {
        this.user = null;
        this.token = null;
        api.setToken(null);
    }
}
module.exports = AuthService;
