// Notification Service
class NotificationService {
    constructor() {
        this.notifications = [];
        this.listeners = [];
    }

    add(notification) {
        const id = Date.now();
        const newNotification = { id, ...notification, read: false, createdAt: new Date() };
        this.notifications.unshift(newNotification);
        this.notify();
        return id;
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.notify();
        }
    }

    remove(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.notify();
    }

    getUnreadCount() {
        return this.notifications.filter(n => !n.read).length;
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.notifications));
    }
}

module.exports = new NotificationService();
