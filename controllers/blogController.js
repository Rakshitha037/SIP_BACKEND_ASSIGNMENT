// controllers/blogController.js
import Blog from '../model/Blog.js';

const getBlogStats = async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'blog',
          as: 'reviews',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          numReviews: { $size: '$reviews' },
          overallRating: { $avg: '$reviews.rating' },
        },
      },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBlogsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const blogs = await Blog.find({
      publishDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getBlogStats, getBlogsByDateRange };
