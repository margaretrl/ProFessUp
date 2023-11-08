document.addEventListener('DOMContentLoaded', function() {
    // Sign In Button
    var signInButton = document.querySelector('.sign-in-button');
    if (signInButton) {
        signInButton.addEventListener('click', function() {
            window.location.href = 'signIn.html';
        });
    } else {
        console.error('.sign-in-button not found');
    }

    // Sign Up Button
    var signUpButton = document.querySelector('.sign-up-button');
    if (signUpButton) {
        signUpButton.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    } else {
        console.error('.sign-up-button not found');
    }

    // Search Button
    var searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            window.location.href = 'searchResults.html';
        });
    } else {
        console.error('.search-button not found');
    }

    // REVIEW TEST BUTTON - DELETE AFTER
    var reviewButton = document.querySelector('.review-button');
    if (searchButton) {
        reviewButton.addEventListener('click', function() {
            window.location.href = 'review.html';
        });
    } else {
        console.error('.review-button not found');
    }




    var addProfessorButton = document.querySelector('.add-professor-link');
    if (addProfessorButton) {
        addProfessorButton.addEventListener('click', function () {
            window.location.href = 'addProfessor.html';
        });
    } else {
        console.error('.search-button not found');
    }
});
