// Authentication Module - Step 4
const api = require('./api');

class AuthService {
    constructor() {
        this.user = null;
        this.token = null;
        this.refreshToken = null;
    }

    async login(email, password) {
        const response = await api.post('/auth/login', { email, password });
        if (response.token) {
            this.token = response.token;
            this.refreshToken = response.refreshToken;
            this.user = response.user;
            api.setToken(this.token);
            this.saveToStorage();
        }
        return response;
    }

    logout() {
        this.user = null;
        this.token = null;
        this.refreshToken = null;
        api.setToken(null);
        this.clearStorage();
    }

    saveToStorage() {
        localStorage.setItem('token', this.token);
        localStorage.setItem('refreshToken', this.refreshToken);
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    clearStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
}
module.exports = AuthService;
