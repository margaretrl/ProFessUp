// Initialize variables from session storage
var reviewerId = sessionStorage.getItem('reviewerId') || null;


document.addEventListener('DOMContentLoaded', function() {
    console.error('session id:', sessionStorage.getItem('reviewerId') || null);
    
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

    // Sign Out Button
    var signOutButton = document.querySelector('.sign-out-button');
    if (signOutButton) {
        signOutButton.addEventListener('click', function() {
            sessionStorage.removeItem('reviewerId');
            if (window.location.pathname.endsWith('account.html'))
            {
                window.location.href = '/searchResults.html';
            }
            else
                window.location.reload();
        });
    } else {
        console.error('.sign-out-button not found');
    }

    // Sign In Button
    var accountButton = document.querySelector('.account-button');
    if (accountButton) {
        accountButton.addEventListener('click', function() {
            window.location.href = 'account.html';
            console.error('_id:', sessionStorage.getItem('reviewerId'));
        });
    } else {
        console.error('.account-button not found');
    }

    if (window.location.pathname.endsWith('account.html'))
    {
        var deleteButton = document.getElementById("deleteButton");
        deleteButton.addEventListener("click", async function () {
            if (!reviewerId) {
                alert('Error: No user ID provided.');
                return;
            }
            if (confirm('Are you sure you want to delete this user?')) {
                 try {
                    const response = await fetch(`/reviewers/${reviewerId}`, {
                        method: "DELETE",
                    });
        
                    if (response.ok) {
                        alert('User deleted successfully.');
                        sessionStorage.removeItem('reviewerId');
                        window.location.href = '/searchResults.html';
                    } else {
                        console.error("Error deleting professor1:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error deleting professor2:", error);
                }
            }
            
        });
    }

    // Check conditions for showing/hiding buttons
    if(!sessionStorage.getItem('reviewerId')) {
        if (signInButton) {
            signInButton.style.visibility = 'visible';
            signInButton.style.display = 'block';
        }
        if (signUpButton) {
            signUpButton.style.visibility = 'visible';
            signUpButton.style.display = 'block';
        }
        if (signOutButton) {
            signOutButton.style.visibility = 'hidden';
            signOutButton.style.display = 'none';
        }
        if (accountButton) {
            accountButton.style.visibility = 'hidden';
            accountButton.style.display = 'none';
        }
    } else {
        if (signInButton) {
            signInButton.style.visibility = 'hidden';
            signInButton.style.display = 'none';
        }
        if (signUpButton) {
            signUpButton.style.visibility = 'hidden';
            signUpButton.style.display = 'none';
        }
        if (signOutButton) {
            signOutButton.style.visibility = 'visible';
            signOutButton.style.display = 'block';
        }
        if (accountButton) {
            accountButton.style.visibility = 'visible';
            accountButton.style.display = 'block';
        }
    }

    // Search Button
    //var searchButton = document.getElementById('search-click');
    var searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            window.location.href = 'searchResults.html';
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
                        .add-review-container {
                            font-family: Arial, sans-serif;
                            align-items: center;
                            font-size: 20px;
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
                        <input type="text" id="courseNameInput" placeholder="Enter course name" />   
                        <button id="addCourseButton">Add Course</button>
                    </div>    
                    <div class="professor-reviews">
                    <h2>Overall Score <span id="overallRating">Loading...</span></h2>
                    <div id="reviewsContainer"></div>
                    </div>
                    <div class="professor-reviews">
                    <div id="reviewsContainer"></div>
                    </div>
                    <div class="add-review-container">
                    </div>
                `);
                getOverallRatingForProfessor(myWindow, professor._id);
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

                    const addCourseButton = myWindow.document.getElementById('addCourseButton');
                    const courseNameInput = myWindow.document.getElementById('courseNameInput');
                    addCourseButton.addEventListener("click", async function() {
                        const courseName = courseNameInput.value;
                        
                        // Construct the course data object
                        const courseData = { name: courseName };
        
                        // Make a POST request to the server's /courses endpoint
                        try {
                            const response = await fetch('/courses', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(courseData)
                            });

                            if (response.ok) {
                                courseNameInput.value = ""; // Clear the input field
                                console.log('Course added successfully');
                                // Optionally, refresh the courses dropdown
                            } else {
                                console.error('Error adding course:', response.statusText);
                            }
                        } catch (error) {
                            console.error('Error adding course:', error.message);
                        }    
                        
                    });
                };
            // End of code for course selection
            } else {
                console.error("Popup window blocked or not supported by the browser.");
            }

            //ADD REVIEW CONTAINER DYNAMIC ALLOCATION & LOGIC
            const addReviewContainer = document.querySelector('.add-review-container');
            addReviewContainer.style.border = '8px solid #28a745';

            //error message when not logged in
            if(!sessionStorage.getItem('reviewerId'))
            {
                const errorMessage = document.createElement('span');
                errorMessage.style.color = 'red';
                errorMessage.textContent = "Please login first to write a review";
                errorMessage.style.display = 'flex';
                errorMessage.style.justifyContent = 'center';
                errorMessage.style.alignItems = 'center';
                addReviewContainer.appendChild(errorMessage);
                addReviewContainer.appendChild(document.createElement('br'));
                
            }
            //name field (reviewer name)
            const fullNameLabel = document.createElement('span');
            fullNameLabel.style.marginBottom = '3%';
            fullNameLabel.style.marginTop = '2.5%';
            fullNameLabel.style.marginLeft = '1.5%';
            fullNameLabel.textContent = 'Full Name: ';
            addReviewContainer.appendChild(fullNameLabel);
            const fullNameInput = document.createElement('input');
            fullNameInput.setAttribute('type', 'text');
            fullNameInput.setAttribute('placeholder', 'Full Name');
            fullNameInput.classList.add('review-input');
            fullNameInput.style.marginBottom = '3%';
            fullNameInput.style.marginTop = '2.5%';
            fullNameInput.style.marginRight = '15%';
            fullNameInput.disabled = true;
            addReviewContainer.appendChild(fullNameInput);
            if(sessionStorage.getItem('reviewerId'))
            {
                try {
                    const response = await fetch(`/reviewers/${sessionStorage.getItem('reviewerId')}`);
                    if (response.ok) {
                        const reviewer = await response.json();
                        fullNameInput.value = reviewer.fullName || '';
                        console.error('fullName:', reviewer.fullName);
                    } else {
                        console.error('Failed to fetch reviewer data:', response.statusText, response.status);
                    }
                } catch (error) {
                    console.error('Error fetching reviewer data:', error);
                }
            }

            //course dropdown
            const courseLabel = document.createElement('span');
            courseLabel.textContent = 'Course: ';
            courseLabel.style.marginBottom = '3%';
            courseLabel.style.marginTop = '2.5%';
            addReviewContainer.appendChild(courseLabel);
            const courseDropdown = document.createElement('select');
            courseDropdown.style.marginBottom = '3%';
            courseDropdown.style.marginTop = '2.5%';
            courseDropdown.classList.add('review-select'); // Add your desired class for styling
            // Add options to the dropdown
            const courses = ['Course 1', 'Course 2', 'Course 3']; // Replace with actual course names
            fetch("/courses")
            .then(response => response.json())
            .then(courses => {
                // Clear existing options
                courseDropdown.innerHTML = '<option value="">Select a course</option>';
                courses.forEach(course => {
                    const option = document.createElement("option");
                    option.value = course._id;
                    option.textContent = course.name;
                    courseDropdown.appendChild(option);
                });
            })
            .catch(error => console.error("Error fetching courses:", error));
            courseDropdown.style.marginRight = '15%';
            addReviewContainer.appendChild(courseDropdown);

            //anonymous review toggle
            const anonymousReviewLabel = document.createElement('span');
            anonymousReviewLabel.style.marginBottom = '3%';
            anonymousReviewLabel.style.marginTop = '2.5%';
            anonymousReviewLabel.textContent = 'Anonymous review: ';
            addReviewContainer.appendChild(anonymousReviewLabel);
            const anonymousReviewToggle = document.createElement('input');
            anonymousReviewToggle.style.marginBottom = '3%';
            anonymousReviewToggle.style.marginTop = '2.5%';
            anonymousReviewToggle.setAttribute('type', 'checkbox');
            anonymousReviewToggle.classList.add('review-checkbox');
            addReviewContainer.appendChild(anonymousReviewToggle);
            addReviewContainer.appendChild(document.createElement('br'));

            //professor accessibility slider
            const professorAccessibilityLabel = document.createElement('span');
            professorAccessibilityLabel.style.marginBottom = '3%';
            professorAccessibilityLabel.style.marginLeft = '1.5%';
            professorAccessibilityLabel.textContent = 'Professor accessibility: ';
            addReviewContainer.appendChild(professorAccessibilityLabel);
            const professorAccessibilitySlider = document.createElement('input');
            professorAccessibilitySlider.style.marginBottom = '3%';
            professorAccessibilitySlider.setAttribute('type', 'range');
            professorAccessibilitySlider.setAttribute('min', '1');
            professorAccessibilitySlider.setAttribute('max', '5');
            professorAccessibilitySlider.classList.add('review-slider');
            professorAccessibilitySlider.style.marginRight = '6%';
            addReviewContainer.appendChild(professorAccessibilitySlider);

            //workload toggle
            const workloadLabel = document.createElement('span');
            workloadLabel.style.marginBottom = '3%';
            workloadLabel.textContent = 'Workload: ';
            addReviewContainer.appendChild(workloadLabel);
            const workloadSlider = document.createElement('input');
            workloadSlider.style.marginBottom = '3%';
            workloadSlider.setAttribute('type', 'range');
            workloadSlider.setAttribute('min', '1');
            workloadSlider.setAttribute('max', '5');
            workloadSlider.classList.add('review-slider');
            workloadSlider.style.marginRight = '6%';
            addReviewContainer.appendChild(workloadSlider);

            //difficulty slider
            const difficultyLabel = document.createElement('span');
            difficultyLabel.style.marginBottom = '3%';
            difficultyLabel.textContent = 'Difficulty: ';
            addReviewContainer.appendChild(difficultyLabel);
            const difficultySlider = document.createElement('input');
            difficultySlider.style.marginBottom = '3%';
            difficultySlider.setAttribute('type', 'range');
            difficultySlider.setAttribute('min', '1');
            difficultySlider.setAttribute('max', '5');
            difficultySlider.classList.add('review-slider');
            difficultySlider.style.marginRight = '6%';
            addReviewContainer.appendChild(difficultySlider);

            //overall score slider
            const overallScoreLabel = document.createElement('span');
            overallScoreLabel.style.marginBottom = '3%';
            overallScoreLabel.textContent = 'Overall score: ';
            addReviewContainer.appendChild(overallScoreLabel);
            const overallScoreSlider = document.createElement('input');
            overallScoreSlider.style.marginBottom = '3%';
            overallScoreSlider.setAttribute('type', 'range');
            overallScoreSlider.setAttribute('min', '1');
            overallScoreSlider.setAttribute('max', '5');
            overallScoreSlider.classList.add('review-slider');
            addReviewContainer.appendChild(overallScoreSlider);
            addReviewContainer.appendChild(document.createElement('br'));

            //textbook required toggle
            const textbookRequiredLabel = document.createElement('span');
            textbookRequiredLabel.style.marginBottom = '3%';
            textbookRequiredLabel.style.marginLeft = '1.5%';
            textbookRequiredLabel.textContent = 'Textbook: ';
            addReviewContainer.appendChild(textbookRequiredLabel);
            const textbookRequiredToggle = document.createElement('input');
            textbookRequiredToggle.style.marginBottom = '3%';
            textbookRequiredToggle.setAttribute('type', 'checkbox');
            textbookRequiredToggle.classList.add('review-checkbox');
            textbookRequiredToggle.style.marginRight = '11%';
            addReviewContainer.appendChild(textbookRequiredToggle);
    
            //participation toggle
            const participationLabel = document.createElement('span');
            participationLabel.style.marginBottom = '3%';
            participationLabel.textContent = 'Participation: ';
            addReviewContainer.appendChild(participationLabel);
            const participationToggle = document.createElement('input');
            participationToggle.style.marginBottom = '3%';
            participationToggle.setAttribute('type', 'checkbox');
            participationToggle.classList.add('review-checkbox');
            participationToggle.style.marginRight = '11%';
            addReviewContainer.appendChild(participationToggle);
            
            //attendance toggle
            const attendanceLabel = document.createElement('span');
            attendanceLabel.style.marginBottom = '3%';
            attendanceLabel.textContent = 'Attendance: ';
            addReviewContainer.appendChild(attendanceLabel);
            const attendanceToggle = document.createElement('input');
            attendanceToggle.style.marginBottom = '3%';
            attendanceToggle.setAttribute('type', 'checkbox');
            attendanceToggle.classList.add('review-checkbox');
            attendanceToggle.style.marginRight = '11%';
            addReviewContainer.appendChild(attendanceToggle);

            //group project toggle
            const groupProjectLabel = document.createElement('span');
            groupProjectLabel.style.marginBottom = '3%';
            groupProjectLabel.textContent = 'Group project: ';
            addReviewContainer.appendChild(groupProjectLabel);
            const groupProjectToggle = document.createElement('input');
            groupProjectToggle.style.marginBottom = '3%';
            groupProjectToggle.setAttribute('type', 'checkbox');
            groupProjectToggle.classList.add('review-checkbox');
            groupProjectToggle.style.marginRight = '11%';
            addReviewContainer.appendChild(groupProjectToggle);

            //extra credit toggle
            const extraCreditLabel = document.createElement('span');
            extraCreditLabel.style.marginBottom = '3%';
            extraCreditLabel.textContent = 'Extra Credit: ';
            addReviewContainer.appendChild(extraCreditLabel);
            const extraCreditToggle = document.createElement('input');
            extraCreditToggle.style.marginBottom = '3%';
            extraCreditToggle.setAttribute('type', 'checkbox');
            extraCreditToggle.classList.add('review-checkbox');
            addReviewContainer.appendChild(extraCreditToggle);
            addReviewContainer.appendChild(document.createElement('br'));

            //pop quiz toggle
            const popQuizzesLabel = document.createElement('span');
            popQuizzesLabel.style.marginBottom = '2.5%';
            popQuizzesLabel.style.marginLeft = '1.5%';
            popQuizzesLabel.textContent = 'Pop-quizzes: ';
            addReviewContainer.appendChild(popQuizzesLabel);
            const popQuizzesToggle = document.createElement('input');
            popQuizzesToggle.style.marginBottom = '2.5%';
            popQuizzesToggle.setAttribute('type', 'checkbox');
            popQuizzesToggle.classList.add('review-checkbox');
            popQuizzesToggle.style.marginRight = '14%';
            addReviewContainer.appendChild(popQuizzesToggle);

            //quiz question type selector
            const quizQTypeLabel = document.createElement('span');
            quizQTypeLabel.style.marginBottom = '4%';
            quizQTypeLabel.textContent = 'Question type: ';
            quizQTypeLabel.style.marginRight = '1%';
            addReviewContainer.appendChild(quizQTypeLabel);
            const quizQTypeWrapper = document.createElement('div');
            quizQTypeWrapper.style.marginBottom = '2.5%';
            quizQTypeWrapper.style.display = 'inline';
            const quizTypes = ['Multiple Choice', 'Short Response', 'Both'];
            quizTypes.forEach(type => {
            const radioInput = document.createElement('input');
            radioInput.setAttribute('type', 'radio');
            radioInput.setAttribute('name', 'quizQType');
            radioInput.value = type;
            radioInput.style.marginBottom = '2.5%';
            quizQTypeWrapper.appendChild(radioInput);
            quizQTypeWrapper.style.fontSize = '16px';
            const label = document.createElement('label');
            label.style.marginRight = '3%';
            label.textContent = type;
            quizQTypeWrapper.appendChild(label);
            });
            quizQTypeWrapper.style.marginRight = '3%';
            addReviewContainer.appendChild(quizQTypeWrapper);

            //add reviewer button
            const addReviewButton = document.createElement('button');
            addReviewButton.style.marginLeft = '17%';
            addReviewButton.style.marginBottom = '2.5%';
            addReviewButton.textContent = 'Add Review';
            addReviewButton.classList.add('review-submit-button');
            addReviewButton.style.padding = '8px 16px';
            addReviewButton.style.fontSize = '16px';
            addReviewButton.style.backgroundColor = '#007bff';
            addReviewButton.style.color = 'white';
            addReviewButton.style.border = 'none';
            if(!sessionStorage.getItem('reviewerId'))
                addReviewButton.disabled = true;
            else
                addReviewButton.style.cursor = 'pointer';
            addReviewButton.addEventListener('click', async function() {
                if (!sessionStorage.getItem('reviewerId')) {
                    alert('Please log in to add a review.');
                    return;
                }
            
                // Gather data from the form
                const reviewData = {
                    reviewer: sessionStorage.getItem('reviewerId'),
                    professor: professor._id,
                    fullName: fullNameInput.value, // This seems like additional data not in your schema
                    course: courseDropdown.value || undefined, // If no course is selected, send undefined
                    anonymousReviews: anonymousReviewToggle.checked,
                    professorAccessibility: parseInt(professorAccessibilitySlider.value),
                    workload: parseInt(workloadSlider.value),
                    difficulty: parseInt(difficultySlider.value),
                    overallScore: parseInt(overallScoreSlider.value),
                    textbook: textbookRequiredToggle.checked,
                    participation: participationToggle.checked,
                    attendance: attendanceToggle.checked,
                    groupProject: groupProjectToggle.checked,
                    extraCredit: extraCreditToggle.checked,
                    popQuizzes: popQuizzesToggle.checked,
                    quizQType: document.querySelector('input[name="quizQType"]:checked').value
                };
                console.error('review data1', JSON.stringify(reviewData));
            
                // Make a POST request to add the review
                try {
                    const response = await fetch('/reviews', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(reviewData)
                    });
            
                    if (response.ok) {
                        //reset dropdown, toggles, and sliders
                        courseDropdown.selectedIndex = 0;
                        document.querySelectorAll('input[name="quizQType"]').forEach(radio => {
                            radio.checked = false;
                        });
                        [anonymousReviewToggle, textbookRequiredToggle, participationToggle, attendanceToggle, groupProjectToggle, extraCreditToggle, popQuizzesToggle].forEach(toggle => {
                            toggle.checked = false;
                        });
                        [professorAccessibilitySlider, workloadSlider, difficultySlider, overallScoreSlider].forEach(slider => {
                            slider.value = slider.min; // Resets to the minimum value
                        });
                    } else {
                        console.error('review data', JSON.stringify(reviewData));
                        console.error('Failed to add review:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error during adding review:', error);
                }
            });
            addReviewContainer.appendChild(addReviewButton);

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

    if (window.location.pathname.endsWith('signup.html')) {

        const addReviewerButton = document.getElementById('addReviewerButton');
        const errorMessageElement = document.getElementById('errorMessage');

        addReviewerButton.addEventListener("click", async function () {
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Check if any field is empty
            if (!fullName || !email || !password) {
                errorMessageElement.textContent = 'Please fill in fullname, username and password';
                return; // Exit the function if validation fails
            } 

            const reviewerData = {
                username: email,
                fullName: fullName,
                password: password
            };
            
            try {
                const reviewersResponse = await fetch('/reviewers');
                if (reviewersResponse.ok) {
                    const reviewers = await reviewersResponse.json();
                    const emailExists = reviewers.some(reviewer => reviewer.username === email);
        
                    if (emailExists) {
                        errorMessageElement.textContent = 'Email already in use. Please use a different email.';
                        return; // Exit the function if the email already exists
                    }
                    else
                    {
                        // Make a POST request to the server's /professors endpoint
                        try {
                            const response = await fetch('/reviewers', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(reviewerData)
                            });

                            if (response.ok) {
                                const responseData = await response.json();
                                sessionStorage.setItem('reviewerId', responseData._id);
                                // Perform the actual form submission here
                                // For simplicity, just display a success message
                                errorMessageElement.textContent = ''; // Clear any previous error messages
                                // Redirect to the searchResults.html page
                                window.location.href='/searchResults.html';
                                console.log('Reviewer added successfully');
                            } else {
                                console.error('Stringified data:', JSON.stringify(reviewerData));
                                console.error('Error adding reviewer1:', response.statusText, response.status);
                            }
                        } catch (error) {
                            console.error('Error adding reviewer:', error.message);
                        }
                    }
                } else {
                    console.error('Error fetching reviewers:', reviewersResponse.statusText);
                    return; // Exit the function if there's an error fetching reviewers
                }
            } catch (error) {
                console.error('Error:', error);
                return; // Exit the function if there's an error
            }
        });
    }

    if (window.location.pathname.endsWith('signIn.html')) {

        const signInButton = document.getElementById('signInButton');
        const errorMessageElement = document.getElementById('errorMessage');
    
        signInButton.addEventListener("click", async function () {
            console.error('Error: here');
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
    
            // Check if any field is empty
            if (!email || !password) {
                errorMessageElement.textContent = 'Please fill in username and password';
                return; // Exit the function if validation fails
            } //testing coauthor
    
            try {
                const reviewersResponse = await fetch('/reviewers');
                if (reviewersResponse.ok) {
                    const reviewers = await reviewersResponse.json();
                    const matchingReviewer = reviewers.find(reviewer => reviewer.username === email && reviewer.password === password);
        
                    if (matchingReviewer) {
                        // Set the global variables with the data of the matching reviewer
                        sessionStorage.setItem('reviewerId', matchingReviewer._id);
    
                        // Perform the actual sign-in success actions
                        errorMessageElement.textContent = ''; // Clear any previous error messages
                        window.location.href='/searchResults.html';
                        console.log('Sign-in successful');
                    } else {
                        // No matching reviewer found
                        errorMessageElement.textContent = 'Invalid username or password';
                    }
                } else {
                    console.error('Error fetching reviewers:', reviewersResponse.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
                errorMessageElement.textContent = 'An error occurred during sign-in';
            }
        });
    }    
    if (window.location.pathname.endsWith('account.html')) {
        if(!sessionStorage.getItem('reviewerId'))
        {
            window.location.href = 'searchResults.html';
        }
        var userPasswordField = document.getElementById('userPassword');
        userPasswordField.type = 'password';
        const errorMessageElement = document.getElementById('errorMessage');
        var submitButton = document.getElementById('submitButton');
        submitButton.style.visibility = 'hidden';
        errorMessageElement.textContent = "";
        fetchAndFillUserData();
        var editButton = document.getElementById('editButton');
        if (editButton) {
            editButton.addEventListener('click', function() {
                // Enable the username and full name fields for editing
                var userEmailField = document.getElementById('userEmail');
                var userFullNameField = document.getElementById('userFullName');
                if (userEmailField) userEmailField.disabled = false;
                if (userFullNameField) userFullNameField.disabled = false;
                submitButton.style.visibility = 'visible';
            });
        } else {
            console.error('#editButton not found');
        }

        var editPasswordButton = document.getElementById('editPasswordButton');
        if (editPasswordButton) {
            editPasswordButton.addEventListener('click', function() {
                // Prompt the user to enter their password
                var password = window.prompt("Please enter your password to edit:");

                // Check if a password was entered
                if (password !== null && password !== "") {
                    // Enable the password field for editing
                    if(password == userPasswordField.value)
                    {
                        if (userPasswordField) userPasswordField.disabled = false;
                        submitButton.style.visibility = 'visible';
                        errorMessageElement.textContent = "";
                        userPasswordField.type = 'text';
                    }
                    else
                        errorMessageElement.textContent = "Invalid password, please try again.";
                }
            });
        } else {
            console.error('#editPasswordButton not found');
        }

        if (submitButton) {
            submitButton.addEventListener('click', async function() {
                var userEmail = document.getElementById('userEmail').value;
                var userFullName = document.getElementById('userFullName').value;
                var userPassword = document.getElementById('userPassword').value;
    
                // Construct the data object to send
                var data = {
                    username: userEmail,
                    fullName: userFullName,
                    password: userPassword // Ensure you handle password updates securely
                };
    
                try {
                    const response = await fetch(`/reviewers/${reviewerId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
    
                    if (response.ok) {
                        console.log('Reviewer updated successfully');
                        // Handle successful update here, e.g., display a success message
                        var userEmailField = document.getElementById('userEmail');
                        var userFullNameField = document.getElementById('userFullName');
                        var userPasswordField = document.getElementById('userPassword');
                        if (userEmailField) userEmailField.disabled = true;
                        if (userFullNameField) userFullNameField.disabled = true;
                        if (userPasswordField) userPasswordField.disabled = true;
                        userPasswordField.type = 'password';
                    } else {
                        console.error('Failed to update reviewer:', response.statusText);
                        // Handle errors here, e.g., display an error message
                    }
                } catch (error) {
                    console.error('Error during update:', error);
                    // Handle errors here, e.g., display an error message
                }
            });
        } else {
            console.error('#submitButton not found');
        }
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
            //const overallRating = getOverallRatingForProfessor(professorId);
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
function getOverallRatingForProfessor(myWindow, professorId) {
    fetch(`/reviews/professor/${professorId}`)
        .then(response => response.json())
        .then(reviews => {
            let overallRating = 0;
            if (reviews.length > 0) {
                overallRating = reviews.reduce((acc, review) => acc + (review.overallScore || 0), 0) / reviews.length;
            }
            // Update the overall rating display in the window
            const ratingDisplay = myWindow.document.getElementById("overallRating");
            if (ratingDisplay) {
                ratingDisplay.textContent = `Overall Rating: ${overallRating.toFixed(1)}`;
            }
        })
        .catch(error => {
            console.error("Error fetching reviews:", error);
            myWindow.alert("Error fetching reviews: " + error.message);
        });
}

async function fetchAndFillUserData() {
    if (reviewerId) {
        try {
            const response = await fetch(`/reviewers/${reviewerId}`);
            if (response.ok) {
                const reviewer = await response.json();
                // Autofill the input fields with the retrieved data
                document.getElementById('userEmail').value = reviewer.username || '';
                console.error('username:', reviewer.username);
                document.getElementById('userFullName').value = reviewer.fullName || '';
                console.error('fullName:', reviewer.fullName);

                // Since the actual password should not be sent from the server,
                // you can use a placeholder (like asterisks) to indicate a password is set
                document.getElementById('userPassword').value = reviewer.password; // Placeholder for password
                console.error('password:', reviewer.password);
            } else {
                console.error('Failed to fetch reviewer data:', response.statusText, response.status);
            }
        } catch (error) {
            console.error('Error fetching reviewer data:', error);
        }
    }
}

