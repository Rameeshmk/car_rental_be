import Review from "../models/reviewModel.js"

// Get all reviews
 const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new review
const createReview = async (req, res) => {
  const { username, rating, comment } = req.body;
  try {
    const review = new Review({ username, rating, comment });
    await review.save();
    console.log("review",review);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const reviewController ={createReview,getReviews};
export default reviewController
