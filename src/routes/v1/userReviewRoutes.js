import express from "express"
import reviewController from "../../controllers/reviewController.js";


const userReviewRoutes = express.Router();


userReviewRoutes.get('/reviews', reviewController.getReviews);
userReviewRoutes.post('/reviews', reviewController.createReview);

export default userReviewRoutes;
