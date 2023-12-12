//const express = require('express')
//const cors = require('cors')
//const bodyParser = require('body-parser') //we could use express stuff instead
//const router = require('./routes/router')
const mongoose = require('mongoose')
/*require('dotenv/config')

const app = express();
app.use(cors()); // This will enable CORS for all routes and origins
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', router);*/


mongoose.connect('mongodb+srv://margaretrl:Magy2001@professup.vmcgywa.mongodb.net/professup_db?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});

// Reviewer Schema
const reviewerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  entryDate: { type: Date, default: Date.now },
  password: { type: String, required: true }
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'Reviewers', required: true },
  workload: { type: Number, required: false },
  participation: { type: Boolean, required: false },
  popQuizzes: { type: Boolean, required: false },
  difficulty: { type: Number, required: false },
  overallScore: { type: Number, required: false },
  groupProject: { type: Boolean, required: false },
  professorAccessibility: { type: Number, required: false },
  quizQType: { type: String, required: false },
  anonymousReviews: { type: Boolean, required: false },
  attendance: { type: Boolean, required: false },
  textbook: { type: Boolean, required: false },
  extraCredit: { type: Boolean, required: false },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professors', required: false },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: false },
});

// Professor Schema
const professorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  joinedDate: { type: Date, default: Date.now }
});

// Courses Schema
const coursesSchema = new mongoose.Schema({
  name: { type: String, required: true }
});


// Create models
const Reviewers = mongoose.model('Reviewers', reviewerSchema);
const Reviews = mongoose.model('Reviews', reviewSchema);
const Professors = mongoose.model('Professors', professorSchema);
const Courses = mongoose.model('Courses', coursesSchema);

const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
const path = require("path"); // Make sure to require 'path' module
app.get("/", (req, resp) => {
 
    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000
     
    // If you see App is working means
    // backend working properly
});

app.get('/reviewers', async (req, res) => {
    try {
        const reviewers = await Reviewers.find({});
        res.json(reviewers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET one reviewer
app.get('/reviewers/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    try {
        const reviewer = await Reviewers.findById(id);
        if (!reviewer) {
          return res.status(404).json({ message: 'Reviewer not found' });
        } 
        res.json(reviewer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST (NEW) Reviewer
app.post('/reviewers', async (req, res) => {
    try {
        const { username, fullName, password } = req.body;
        console.error('username:', username);
        console.error('fullName:', fullName),
        console.error('password:', password);
        if(!username || !fullName || !password)
        {
          return res.status(400).send({ message: 'User data is required'});
        }
        const newReviewer = new Reviewers({
            username: username,
            fullName: fullName,
            password: password // Remember to hash passwords in production!
        });

        // Save the new Reviewer to the database
        await newReviewer.save();

        // Send back the created Reviewer data with a 201 status code (Created)
        res.status(201).json(newReviewer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT to update a reviewer by ID
app.put('/reviewers/:id', async (req, res) => {
    try {
      const updatedReviewer = await Reviewers.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // return the updated document
        runValidators: true // run validators on update
      });
  
      if (!updatedReviewer) {
        return res.status(404).json({ message: 'Reviewer not found' });
      }
  
      res.json(updatedReviewer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
// DELETE a reviewer by ID
app.delete('/reviewers/:id', async (req, res) => {
    try {
        const reviewer = await Reviewers.findByIdAndDelete(req.params.id);
        if (reviewer) {
            res.json({ message: 'Reviewer deleted successfully' });
        } else {
            res.status(404).json({ message: 'Reviewer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// --------------
// REVIEWS ROUTES
// --------------

// GET all reviews
app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Reviews.find({}).populate('reviewer');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET one review by id
app.get('/reviews/:id', async (req, res) => {
    try {
      const review = await Reviews.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// GET reviews by reviewer
app.get('/reviews/reviewer/:reviewerId', async (req, res) => {
  try {
    // Using `.populate()` to include reviewer information from the Reviewers collection
    const reviews = await Reviews.find({ reviewer: req.params.reviewerId }).populate('reviewer');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET reviews of professor
app.get('/reviews/professor/:professorId', async (req, res) => {
    try {
      // Using `.populate()` to include professor information from the Professors collection
      const reviews = await Reviews.find({ professor: req.params.professorId }).populate('professor');
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get all reviews by course -- IMPLEMENT


// POST new review
app.post('/reviews', async (req, res) => {
    try {
        const review = new Reviews({
            reviewer: req.body.reviewer,
            workload: req.body.workload,
            participation: req.body.participation,
            popQuizzes: req.body.popQuizzes,
            difficulty: req.body.difficulty,
            overallScore: req.body.overallScore,
            groupProject: req.body.groupProject,
            professorAccessibility: req.body.professorAccessibility,
            quizQType: req.body.quizQType,
            anonymousReviews: req.body.anonymousReviews,
            attendance: req.body.attendance,
            textbook: req.body.textbook,
            extraCredit: req.body.extraCredit,
            professor: req.body.professor,
            course: req.body.course, // Uncomment when the course table is included lol
        });

        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT request to update a review
app.put('/reviews/:id', async (req, res) => {
    try {
      const updatedReview = await Reviews.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true, // return the updated document
          runValidators: true // run validators on update
        }
      );
  
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.json(updatedReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE by id
  app.delete('/reviews/:id', async (req, res) => {
    try {
      const review = await Reviews.findByIdAndDelete(req.params.id);
      if (review) {
        res.json({ message: 'Reviewer deleted successfully' });
    } else {
        res.status(404).json({ message: 'Reviewer not found' });
    }
 } catch (error) {
    res.status(500).json({ message: error.message });
}
    });

// ----------------
// PROFESSOR ROUTES
// ----------------

// POST New professor
app.post('/professors', async (req, res) => {
  try {
    const { fullName } = req.body;
    if (!fullName) {
      return res.status(400).send({ message: 'Full name is required' });
    }
    const newProfessor = new Professors({
      fullName: fullName
    });
    await newProfessor.save();
    res.status(201).send(newProfessor);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET all professors
app.get('/professors', async (req, res) => {
  try {
      const professors = await Professors.find({});
      res.json(professors);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// GET one reviewer
app.get('/professors/:id', async (req, res) => {
  try {
      const professor = await Professor.findById(req.params.id);
      if (professor) {
          res.json(professor);
      } else {
          res.status(404).json({ message: 'Professor not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// DELETE professor by id
app.delete('/professors/:id', async (req, res) => {
  try {
      const professor = await Professors.findByIdAndDelete(req.params.id);
      if (professor) {
          res.json({ message: 'Professor deleted successfully' });
      } else {
          res.status(404).json({ message: 'Professor not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// PUT request to update a review
app.put('/professors/:id', async (req, res) => {
  try {
    const updatedProfessor = await Professors.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return the updated document
        runValidators: true // run validators on update
      }
    );

    if (!updatedProfessor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    res.json(updatedProfessor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ----------------
// COURSES ROUTES
// ----------------

// POST NEW COURSE
app.post('/courses', async (req, res) => {
  try {
    const { name, course_id } = req.body;
    if (!name) {
      return res.status(400).send({ message: 'Course name is required' });
    }
    const newCourse = new Courses({
      name,        
      course_id     
    });
    await newCourse.save();
    res.status(201).send(newCourse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Courses.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one course
app.get('/courses/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
      const course = await Courses.findById(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      } 
      res.json(course);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Middlewares
//app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/search-results', function(req, res) {
    const filePath = path.join(__dirname, '../pro_fess_up/public', 'searchResults.html');
    
    console.log(`Request received for /search-results. Serving file: ${filePath}`);
    
    res.sendFile(filePath, function(err) {
        if (err) {
            console.error(`Error sending file: ${err.message}`);
            res.status(500).send(err);
        } else {
            console.log(`File sent successfully: ${filePath}`);
        }
    });
});


const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
