// js/auth-protection.js
document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged((user) => {
        // If on a protected page and no user, redirect to login
        if (!user && window.location.pathname !== '/login.html') {
            window.location.href = '/login.html';
        }
        
        // Optionally, add admin-specific checks
        if (window.location.pathname === '/admin.html') {
            // Implement additional admin verification
            checkAdminStatus(user);
        }
    });

    function checkAdminStatus(user) {
        if (!user) return;
        
        // Example admin check (you'd implement this server-side ideally)
        user.getIdTokenResult().then((idTokenResult) => {
            if (!(idTokenResult.claims.admin === true)) {
                window.location.href = '/login.html';
            }
        });
    }
});