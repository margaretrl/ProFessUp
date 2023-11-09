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


    const nameInput = document.getElementById("nameInput");
    const addProfessorButton = document.getElementById("addProfessorButton");

    // Add a click event listener to the "Add Professor" button
    addProfessorButton.addEventListener("click", async function () {
        // Get the selected title and name from the input fields
        const professorName = nameInput.value;

        const newProfessor = new Professors({
            fullName: professorName,
            joinedDate: Date.now
          });

        newProfessor.save()
        .then((result) => {
            console.log('New professor added:', result);
            nameInput.value = "";
        })
        .catch((err) => {
            console.error('Error adding professor:', err);
        });
    });

    const clickProfessorButton = document.getElementById("clickProfessorButton");
    const content = document.getElementById("content");

    // click a click event listener to the "Click Professor" button
    clickProfessorButton.addEventListener("click", async function () {
        const title = "Professor's Title";

        // Open a new window in the current window
        var myWindow = window.open("/professor", "_self");

        // Write content to the new window
        if (myWindow) {
            myWindow.document.write(`
                <h1>${title}</h1>
                <p>This is a professor's introduction.</p>
            `);
        } else {
            console.error("Popup window blocked or not supported by the browser.");
        }
    });
});
