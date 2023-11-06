const express = require('express');
const router = express.Router();
const { Reviewers, Reviews, Professors } = require('../models/schemas.js'); // Make sure this path is correct

// ----------------
// REVIEWERS ROUTES
// ----------------

// GET all reviewers
router.get('/reviewers', async (req, res) => {
    try {
        const reviewers = await Reviewers.find({});
        res.json(reviewers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET one reviewer
router.get('/reviewers/:id', async (req, res) => {
    try {
        const reviewer = await Reviewer.findById(req.params.id);
        if (reviewer) {
            res.json(reviewer);
        } else {
            res.status(404).json({ message: 'Reviewer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST (NEW) Reviewer
router.post('/reviewers', async (req, res) => {
    try {
        const newReviewer = new Reviewers({
            username: req.body.username,
            fullName: req.body.fullName,
            password: req.body.password // Remember to hash passwords in production!
        });

        // Save the new Reviewer to the database
        const savedReviewer = await newReviewer.save();

        // Send back the created Reviewer data with a 201 status code (Created)
        res.status(201).json(savedReviewer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT to update a reviewer by ID
router.put('/reviewers/:id', async (req, res) => {
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
router.delete('/reviewers/:id', async (req, res) => {
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
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Reviews.find({}).populate('reviewer');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET one review by id
router.get('/reviews/:id', async (req, res) => {
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
router.get('/reviews/reviewer/:reviewerId', async (req, res) => {
  try {
    // Using `.populate()` to include reviewer information from the Reviewers collection
    const reviews = await Reviews.find({ reviewer: req.params.reviewerId }).populate('reviewer');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET reviews of professor
router.get('/reviews/professor/:professorId', async (req, res) => {
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
router.post('/reviews', async (req, res) => {
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
            professor: req.body.professor
            //course: req.body.course, // Uncomment when the course table is included lol
        });

        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT request to update a review
router.put('/reviews/:id', async (req, res) => {
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
  router.delete('/reviews/:id', async (req, res) => {
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
router.post('/professors', async (req, res) => {
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


module.exports = router;