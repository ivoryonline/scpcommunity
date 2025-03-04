// js/application.js
document.addEventListener('DOMContentLoaded', function() {
    const interestConfirmation = document.getElementById('interestConfirmation');
    const proceedBtn = document.getElementById('proceedBtn');
    const applicationForm = document.getElementById('scpApplicationForm');
    const introSection = document.getElementById('introSection');
    const scpApplicationForm = document.getElementById('scpApplicationForm');
    const discordModal = document.getElementById('discordModal');
    const finalSubmitBtn = document.getElementById('finalSubmitBtn');

    // Number input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            if (!/^\d+$/.test(char)) {
                e.preventDefault();
            }
        });
    });

    interestConfirmation.addEventListener('change', function() {
        proceedBtn.disabled = !this.checked;
    });

    proceedBtn.addEventListener('click', function() {
        if (interestConfirmation.checked) {
            applicationForm.style.display = 'block';
            introSection.style.display = 'none';
        }
    });

    scpApplicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        discordModal.style.display = 'flex';
    });

    discordModal.addEventListener('click', function(e) {
        if (e.target === discordModal) {
            discordModal.style.display = 'none';
        }
    });

    finalSubmitBtn.addEventListener('click', function() {
        const discordUsername = document.getElementById('discordUsername').value.trim();
        if (discordUsername) {
            alert('Application submitted. Processing...\n\n[FURTHER DETAILS REDACTED]');
            discordModal.style.display = 'none';
            // In a real scenario, this would send data to a server
        } else {
            alert('Please enter your Discord username.');
        }
    });
});
