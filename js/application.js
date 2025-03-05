// js/application.js
document.addEventListener('DOMContentLoaded', function() {
    const interestConfirmation = document.getElementById('interestConfirmation');
    const proceedBtn = document.getElementById('proceedBtn');
    const applicationForm = document.getElementById('scpApplicationForm');
    const introSection = document.getElementById('introSection');
    const scpApplicationForm = document.getElementById('scpApplicationForm');
    const discordModal = document.getElementById('discordModal');
    const finalSubmitBtn = document.getElementById('finalSubmitBtn');
    const discordUsername = document.getElementById('discordUsername');
    const discordConfirmation = document.getElementById('discordConfirmation');
    const friendRequestConfirmation = document.getElementById('friendRequestConfirmation');

    // Discord Webhook URL (do not share publicly)
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1346634411688460360/Wqjrmu4tGsC8nrPUncCsjn7FXnR8LDAU8fDTlImDhlQsT3Z28raKJNHFXp3SoX7h_Div';

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

    // Interest confirmation enables proceed button
    interestConfirmation.addEventListener('change', function() {
        proceedBtn.disabled = !this.checked;
    });

    // Proceed button shows application form
    proceedBtn.addEventListener('click', function() {
        if (interestConfirmation.checked) {
            applicationForm.style.display = 'block';
            introSection.style.display = 'none';
        }
    });

    // Submit application form shows Discord modal
    scpApplicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        discordModal.style.display = 'flex';
    });

    // Close modal if clicking outside
    discordModal.addEventListener('click', function(e) {
        if (e.target === discordModal) {
            discordModal.style.display = 'none';
        }
    });

    // Discord username input and confirmation handling
    discordUsername.addEventListener('input', validateDiscordSubmission);
    discordConfirmation.addEventListener('change', validateDiscordSubmission);
    friendRequestConfirmation.addEventListener('change', validateDiscordSubmission);

    function validateDiscordSubmission() {
        const usernameValue = discordUsername.value.trim();
        finalSubmitBtn.disabled = !(usernameValue && discordConfirmation.checked && friendRequestConfirmation.checked);
    }

    // Final submit button with webhook
    finalSubmitBtn.addEventListener('click', function() {
        const discordUsernameValue = discordUsername.value.trim();
        
        if (discordUsernameValue && discordConfirmation.checked && friendRequestConfirmation.checked) {
            // Collect all form data
            const formData = new FormData(scpApplicationForm);
            const applicationData = Object.fromEntries(formData.entries());

            // Prepare webhook payload with ALL form fields
            const payload = {
                content: "🔒 New SCP Foundation Application 🔒",
                embeds: [{
                    title: "Application Details",
                    color: 0x8B0000, // Dark red color
                    fields: [
                        // Discord Information
                        { name: "Discord Username", value: discordUsernameValue, inline: false },
                        
                        // Personal Information
                        { name: "Real Age", value: applicationData.realAge, inline: true },
                        { name: "Role", value: applicationData.role, inline: true },
                        
                        // Character Information
                        { name: "Character Name", value: applicationData.characterName, inline: false },
                        { name: "Character Age", value: applicationData.characterAge, inline: true },
                        { name: "Character Gender", value: applicationData.characterGender || "Not Specified", inline: true },
                        
                        // Detailed Character Description
                        { name: "Physical Appearance", value: applicationData.physicalAppearance || "Not Provided", inline: false },
                        { name: "Background/Origin", value: applicationData.background || "Not Provided", inline: false },
                        { name: "Personality Traits", value: applicationData.personalityTraits || "Not Provided", inline: false },
                        { name: "Skills & Abilities", value: applicationData.skillsAbilities || "Not Provided", inline: false }
                    ]
                }]
            };

            // Send webhook
            fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (response.ok) {
                    alert('Application submitted successfully.\n\n[PROCESSING COMPLETE]');
                    discordModal.style.display = 'none';
                    
                    // Reset the form and go back to intro section
                    scpApplicationForm.reset();
                    applicationForm.style.display = 'none';
                    introSection.style.display = 'block';
                    interestConfirmation.checked = false;
                    proceedBtn.disabled = true;
                } else {
                    alert('Submission failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Submission failed. Please try again.');
            });
        } else {
            alert('Please enter your Discord username and confirm its accuracy and friend request settings.');
        }
    });
});