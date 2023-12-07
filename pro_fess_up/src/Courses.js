import React, { useState, useEffect } from 'react';
import './Courses.css'; //Path to Courses.css

/*function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Using environment variable for API URL or a default value
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

    //Fetch the courses from backend
    fetch(`${apiUrl}/courses`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data); //Save the courses to state
        setLoading(false); //Set loading to false after the data is received
      })
      .catch((error) => {
        setError(error.message); //Save errors to current state
        setLoading(false); //Ensure loading is set to false if there's an error
      });
  }, []); //Empty dependency array (this effect will only run once after the initial render)

  //Display a loading message if the data is still loading
  if (loading) return <div className="loading">Loading...</div>;

  //Display an error message if there was an error fetching the data
  if (error) return <div className="error">Error: {error}</div>;
*/

function Courses() {
  // Mock data to simulate fetched data
  const mockCourses = [
    { _id: '1', name: 'Introduction to React' },
    { _id: '2', name: 'Advanced JavaScript' },
    { _id: '3', name: 'Web Development Basics' },
    // Add more mock courses as needed
  ];

  // Initialize courses state with mock data
  const [courses, setCourses] = useState(mockCourses);
  //Render the list of courses if there are any, otherwise indicate that there are no courses
  return (
    <div className="courses">
      <h1>Courses</h1>
      {courses.length > 0 ? (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course._id} className="course-item">
              {/* Display course details */}
              <p>{course.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}

export default Courses;

