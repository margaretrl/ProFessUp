module.exports = Professors;

// Function to add a professor using POST request
async function addProfessor(professorData) {
    try {
        const response = await fetch('http://localhost:4000/professor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(professorData),
        });
  
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Professor added:', jsonResponse);
            // Reset the form fields
            titleSelect.value = "N/A";
            nameInput.value = "";
        } else {
            console.error('Failed to add professor');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Get references to the HTML elements
    const titleSelect = document.getElementById("titleSelect");
    const nameInput = document.getElementById("nameInput");
    const addProfessorButton = document.getElementById("addProfessorButton");

    // Add a click event listener to the "Add Professor" button
    addProfessorButton.addEventListener("click", async function () {
        // Get the selected title and name from the input fields
        const selectedTitle = titleSelect.value;
        const professorName = nameInput.value;

        const professorData = {
            fullName: professorName,
        };

        // Call the function to add a professor
        await addProfessor(professorData);
    });
});
