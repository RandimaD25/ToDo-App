export function isAuthenticated() {
    return localStorage.getItem('user') !== null;
}