function animateAttack() {
    
    const card = document.getElementById('player1-card');

    // Remove inline animation style
    card.style.animation = '';

    // Add the class to trigger both animations simultaneously
    card.classList.add("attack-sequence");

    // Listen for animation end event
    card.addEventListener("animationend", function() {
        // After the animation ends, remove the animation class
        card.classList.remove("attack-sequence");
    }, { once: true }); // Make sure the event listener only runs once
}

function animateGuard() {
    
    const card = document.getElementById('player1-card');

    // Remove inline animation style
    card.style.animation = '';

    // Add the class to trigger both animations simultaneously
    card.classList.add("guard-sequence");

    // Listen for animation end event
    card.addEventListener("animationend", function() {
        // After the animation ends, remove the animation class
        card.classList.remove("guard-sequence");
    }, { once: true }); // Make sure the event listener only runs once
}


function animateMagic() {
    
    const card = document.getElementById('player1-card');

    // Remove inline animation style
    card.style.animation = '';

    // Add the class to trigger both animations simultaneously
    card.classList.add("magic-sequence");

    // Listen for animation end event
    card.addEventListener("animationend", function() {
        // After the animation ends, remove the animation class
        card.classList.remove("magic-sequence");
    }, { once: true }); // Make sure the event listener only runs once
}




