const coll1 = require('../models/hyperlinksModel')

const showall = async (req, res) => {
    try {
        const all_posts = await coll1.find({});
        res.status(200).json(all_posts); // Send response with all posts
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response
    }
};

const showspecific = async (req, res) => {
    try {
        const postId = req.params.id; // Get the ID parameter from the request URL
        const post = await coll1.findById(postId); // Find the post by ID
        if (!post) {
            return res.status(404).json({ error: 'Post not found' }); // Return 404 if post is not found
        }
        res.status(200).json(post); // Send response with the found post
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response
    }
};



const add_new = async (req, res) => {
    // console.log(req.body, req.file, 18);
    const { name, domain, heading, subheading, extra } = req.body;
    let imageUrl = null;
    if (req.file && req.file.path) {
        imageUrl = req.file.path;
    }

    try {
        if (!name || !domain) { // Check if name, domain and heading is missing
            throw new Error("Title, body and imageUrl are required fields.");
        }

        const new_carpool_post = await coll1.create({ name, domain, heading, subheading, extra, imageUrl }); // Create new post
        res.status(200).json(new_carpool_post); // Send response with new post
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response
    }
};


const delete_post = async (req, res) => {
    const { id } = req.params;

    try {
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ error: 'Invalid post ID' });
        // }

        const deletedPost = await coll1.findByIdAndDelete(id);

        // if (!deletedPost) {
        //     return res.status(404).json({ error: 'No post found with the provided ID' });
        // }

        res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const update_favourite = async (req, res) => {
    const postId = req.params.id; // Get the ID of the post from the request parameters

    try {
        const post = await coll1.findById(postId); // Find the post by ID
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Toggle the value of the favourite field
        post.favourite = !post.favourite;

        // Save the updated post
        await post.save();

        res.status(200).json(post); // Send the updated post as response
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response
    }
};


const update_hyperlink_partial = async (req, res) => {
    const { id } = req.params;
    const { name, domain, heading, subheading, extra } = req.body;
    let imageUrl = null;

    if (req.file && req.file.path) {
        imageUrl = req.file.path;
    }

    try {
        if (!id) {
            throw new Error("Post ID is required.");
        }

        // Find the existing post
        const existing_post = await coll1.findById(id);

        if (!existing_post) {
            throw new Error("Post not found.");
        }

        // Update the fields only if they are provided
        if (name) existing_post.name = name;
        if (domain) existing_post.domain = domain;
        if (heading) existing_post.heading = heading;
        if (subheading) existing_post.subheading = subheading;
        if (extra) existing_post.extra = extra;
        if (imageUrl) existing_post.imageUrl = imageUrl;

        // Save the updated post
        const updated_post = await existing_post.save();

        res.status(200).json(updated_post); // Send response with updated post
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response
    }
};



module.exports = { showall, showspecific, add_new, delete_post, update_favourite, update_hyperlink_partial };