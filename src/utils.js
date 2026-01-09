// Utility Functions
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { formatDate, generateId, delay };
