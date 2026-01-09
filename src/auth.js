// Authentication Module - Step 2
class AuthService {
    constructor() {
        this.user = null;
        this.token = null;
    }

    async login(email, password) {
        // TODO: Implement login
        return { success: true };
    }
}
module.exports = AuthService;
