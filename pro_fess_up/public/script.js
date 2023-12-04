document.addEventListener('DOMContentLoaded', function() {

    if (window.location.pathname.endsWith('index.html')) {
        // REVIEW TEST BUTTON - DELETE AFTER
        var reviewButton = document.querySelector('.review-button');
        if (reviewButton) { // Corrected condition
            reviewButton.addEventListener('click', function() {
                window.location.href = 'review.html';
            });
        } else {
            console.error('.review-button not found');
        }
    }
    
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
    //var searchButton = document.getElementById('search-click');
    var searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            window.location.href = 'searchResults.html';
           /*// Make a GET request to the /search-results route on the server
            fetch('/search-results')
                .then(function(response) {
                    if (response.ok) {
                        // Redirect to the search-results page if the response is successful
                        window.location.href = '/search-results';
                    } else {
                        console.error('Error fetching /search-results:', response.statusText);
                    }
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });*/
        });
    } else {
        console.error('.search-button not found');
    }

    // Function to create a professor button
    function createProfessorButton(professor) {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-professor-button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginTop = "2px";
        deleteButton.style.backgroundColor = "#28a745";
        
        const button = document.createElement("button");
        button.style.border = "none";
        button.style.borderRadius = "0";
        button.classList.add("result-box");

        const titleElement = document.createElement("div");
        titleElement.classList.add("result-title");
        titleElement.textContent = professor.fullName;

        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("result-description");
        descriptionElement.textContent = professor.course;

        button.appendChild(titleElement);
        button.appendChild(descriptionElement);
        button.appendChild(deleteButton);
    
        button.addEventListener("click", async function () {
            // Open a new window with professor details
            const title = professor.fullName;
            var myWindow = window.open("/professor", "_self");

            if (myWindow) {
                myWindow.document.write(`
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                        }

                        h1 {
                            font-size: 50px;
                            margin-left: 20px;
                        }
                        
                        .prof-data {
                            font-family: Arial, sans-serif;
                            color: #f5f5f5;
                            background-color: #28a745;
                            display: flex;
                            align-items: center;
                        }
                        
                        .edit-button {
                            position: absolute;
                            top: 15px;
                            right: 40px;
                            padding: 8px 16px;
                            font-size: 16px;
                            background-color: #007bff;
                            color: white;
                            border: none;
                            cursor: pointer;
                        }           
                    </style>
                    <div class="prof-data">
                        <h1>${title}</h1>
                        <button class="edit-button">Edit Title</button>
                    </div>
                    <div class="course-selection">
                        <h2>Select a Course</h2>
                        <select id="courseSelectDropdown">
                            <option value="">Select a course</option>
                            <!-- Course options will be added here -->
                        </select>    
                        <button id="addCourseButton">Add Course</button>
                    </div>    
                    <div class="professor-reviews">
                    <h2>Reviews for ${title}</h2>
                    <div id="reviewsContainer"></div>
                    </div>
                `);
                //displayProfessorReviewsInMyWindow(myWindow, professor._id);
                populateCoursesDropdownInMyWindow(myWindow, professor._id);
                displayReviews(myWindow, professor._id);
                const updateButton = myWindow.document.querySelector(".edit-button");
                updateButton.classList.add("update-button");
                updateButton.textContent = "Update";

                updateButton.addEventListener("click", async function () {
                    const newTitle = prompt("Enter the new title for the professor:", professor.fullName);
                    if (newTitle !== null) {
                        try {
                            const response = await fetch(`/professors/${professor._id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ fullName: newTitle }),
                            });
        
                            if (response.ok) {
                                titleElement.textContent = newTitle;
                            } else {
                                console.error("Error updating professor title:", response.statusText);
                            }
                        } catch (error) {
                            console.error("Error updating professor title:", error);
                        }
                    }
                });
                //Courses code
                // Start of code for course selection in myWindow
                myWindow.onload = function() {
                    
                    // Call to populate the course dropdown
                    populateCoursesDropdownInMyWindow(myWindow, professor._id);

                    // Add event listeners for course selection and adding a new course
                    const courseSelectDropdown = myWindow.document.getElementById("courseSelectDropdown");
                    courseSelectDropdown.addEventListener("change", function() {
                        const selectedCourseName = courseSelectDropdown.options[courseSelectDropdown.selectedIndex].text;

                    });

                    const addCourseButton = myWindow.document.getElementById("addCourseButton");
                    addCourseButton.addEventListener("click", function() {
                        const courseName = prompt("Enter the name of the new course:");
                        if (courseName) {
                            // Construct the course data object
                            const courseData = { name: courseName };
        
                            // Make an API call to add the new course
                            fetch('/courses', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(courseData)
                            })
                            .then(response => {
                                if (response.ok) {
                                    // Optionally, re-populate the course dropdown to include the new course
                                    //populateCoursesDropdownInMyWindow(myWindow, professorId);
                                } else {
                                    console.error('Error adding course:', response.statusText);
                                }
                            })
                            .catch(error => console.error('Error adding course:', error.message));
                        }
                    });
            };
            // End of code for course selection
            } else {
                console.error("Popup window blocked or not supported by the browser.");
            }
        });

        deleteButton.addEventListener("click", async function () {
            event.stopPropagation();
            try {
                console.error("Id:", professor._id);
                const response = await fetch(`/professors/${professor._id}`, {
                    method: "DELETE",
                });
    
                if (response.ok) {
                    button.remove();
                } else {
                    console.error("Error deleting professor1:", response.statusText);
                }
            } catch (error) {
                console.error("Error deleting professor2:", error);
            }
        });

        return button;
    }

    if (window.location.pathname.endsWith('searchResults.html')) {
        const nameInput = document.getElementById("nameInput");
        const addProfessorButton = document.getElementById("addProfessorButton");

        // Add a click event listener to the "Add Professor" button
        addProfessorButton.addEventListener("click", async function () {
            // Get the selected title and name from the input fields
            const professorName = nameInput.value;

            const professorData = {
                fullName: professorName,
                joinedDate: Date.now
            };

            // Make a POST request to the server's /professors endpoint
            try {
                const response = await fetch('/professors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(professorData)
                });

                if (response.ok) {
                    // Professor successfully added to the database
                    nameInput.value = "";
                    console.log('Professor added successfully');
                } else {
                    console.error('Error adding professor1:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding professor:', error.message);
            }
        });
    }

    if (window.location.pathname.endsWith('searchResults.html')) {
        const professorsContainer = document.getElementById("professors-container");
        const professorSearchInput = document.getElementById("professor-search");
    
        // Fetch professors from the server and create buttons
        fetch("/professors")
            .then((response) => response.json())
            .then((professors) => {
                // Store the original list of professors for filtering
                const originalProfessors = professors;
    
                // Function to filter professors based on the search input
                function filterProfessors(searchQuery) {
                    const filteredProfessors = originalProfessors.filter((professor) =>
                        professor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
                    );
    
                    // Clear the professors container
                    professorsContainer.innerHTML = "";
    
                    // Create buttons for filtered professors
                    filteredProfessors.forEach((professor) => {
                        const button = createProfessorButton(professor);
                        professorsContainer.appendChild(button);
                    });
                }
    
                // Initial loading of professors
                filterProfessors("");
    
                // Add an input event listener for live search
                professorSearchInput.addEventListener("input", function () {
                    const searchQuery = professorSearchInput.value;
                    filterProfessors(searchQuery);
                });
            })
            .catch((error) => {
                console.error("Error fetching professors:", error);
            });
    }

});

// Define the populateCoursesDropdownInMyWindow function (Jeyma's)
function populateCoursesDropdownInMyWindow(myWindow, professorId) {
    fetch("/courses")
        .then(response => response.json())
        .then(courses => {
            const courseSelectDropdown = myWindow.document.getElementById("courseSelectDropdown");
            // Clear existing options
            courseSelectDropdown.innerHTML = '<option value="">Select a course</option>';
            courses.forEach(course => {
                const option = document.createElement("option");
                option.value = course._id;
                option.textContent = course.name;
                courseSelectDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching courses:", error));
}

// Function to fetch and display professor reviews in the new window
function displayReviews(myWindow, professorId) {
    fetch(`/reviews/professor/${professorId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(reviews => {
            const reviewsContainer = myWindow.document.getElementById("reviewsContainer");
            reviewsContainer.innerHTML = ''; // Clear any existing content

            reviews.forEach(review => {
                const reviewDiv = myWindow.document.createElement("div");
                reviewDiv.classList.add("review");
                console.log(`Processing review:`, review);

                // Populate reviewDiv with review details
                reviewDiv.innerHTML = `
                <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px; background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px;">Review Details</h3>
                    <p><strong>Workload:</strong> ${review.workload}</p>
                    <p><strong>Participation:</strong> ${review.participation ? 'Required' : 'Not Required'}</p>
                    <p><strong>Pop Quizzes:</strong> ${review.popQuizzes ? 'Yes' : 'No'}</p>
                    <p><strong>Difficulty:</strong> ${review.difficulty}</p>
                    <p><strong>Overall Score:</strong> ${review.overallScore}</p>
                    <p><strong>Group Project:</strong> ${review.groupProject ? 'Yes' : 'No'}</p>
                    <p><strong>Professor Accessibility:</strong> ${review.professorAccessibility}</p>
                    <p><strong>Quiz Question Type:</strong> ${review.quizQType}</p>
                    <p><strong>Anonymous Reviews:</strong> ${review.anonymousReviews ? 'Yes' : 'No'}</p>
                    <p><strong>Attendance:</strong> ${review.attendance ? 'Required' : 'Not Required'}</p>
                    <p><strong>Textbook Use:</strong> ${review.textbook ? 'Required' : 'Not Required'}</p>
                    <p><strong>Extra Credit:</strong> ${review.extraCredit ? 'Available' : 'Not Available'}</p>
                </div>
                `;
                

                reviewsContainer.appendChild(reviewDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching reviews:", error);
            myWindow.alert("Error fetching reviews: " + error.message);
        });
}
