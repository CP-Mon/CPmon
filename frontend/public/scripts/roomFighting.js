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

// function updateHPBars(player1CurrentHP, player1MaxHP, player2CurrentHP, player2MaxHP) {
//     const player1HPBar = document.getElementById('player1-hp-bar');
//     const player2HPBar = document.getElementById('player2-hp-bar');

//     const player1Percentage = (player1CurrentHP / player1MaxHP) * 100;
//     const player2Percentage = (player2CurrentHP / player2MaxHP) * 100;

//     player1HPBar.style.width = player1Percentage + '%';
//     player1HPBar.innerText = player1CurrentHP + '/' + player1MaxHP; // Update HP text
//     player2HPBar.style.width = player2Percentage + '%';
//     player2HPBar.innerText = player2CurrentHP + '/' + player2MaxHP; // Update HP text
// }
