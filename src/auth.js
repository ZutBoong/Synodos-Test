// Authentication Module - Complete
const api = require('./api');

class AuthService {
    constructor() {
        this.user = null;
        this.token = null;
        this.refreshToken = null;
        this.loadFromStorage();
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

    async register(email, password, name) {
        const response = await api.post('/auth/register', { email, password, name });
        return response;
    }

    async refreshAccessToken() {
        if (!this.refreshToken) return false;
        const response = await api.post('/auth/refresh', { refreshToken: this.refreshToken });
        if (response.token) {
            this.token = response.token;
            api.setToken(this.token);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    logout() {
        this.user = null;
        this.token = null;
        this.refreshToken = null;
        api.setToken(null);
        this.clearStorage();
    }

    isAuthenticated() {
        return !!this.token;
    }

    saveToStorage() {
        localStorage.setItem('token', this.token);
        localStorage.setItem('refreshToken', this.refreshToken);
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    loadFromStorage() {
        this.token = localStorage.getItem('token');
        this.refreshToken = localStorage.getItem('refreshToken');
        const userStr = localStorage.getItem('user');
        this.user = userStr ? JSON.parse(userStr) : null;
        if (this.token) {
            api.setToken(this.token);
        }
    }

    clearStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
}

module.exports = new AuthService();
