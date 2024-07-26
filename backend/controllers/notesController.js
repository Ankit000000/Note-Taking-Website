const coll2 = require('../models/notesModel')

const showall2 = async (req, res) => {
    try {
        const all_posts = await coll2.find({});
        res.status(200).json(all_posts); // Send response with all posts
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response
    }
};

const showspecific2 = async (req, res) => {
    try {
        const postId = req.params.id; // Get the ID parameter from the request URL
        const post = await coll2.findById(postId); // Find the post by ID
        if (!post) {
            return res.status(404).json({ error: 'Post not found' }); // Return 404 if post is not found
        }
        res.status(200).json(post); // Send response with the found post
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response
    }
};


const add_new2 = async (req, res) => {
    // console.log(req.body, req.files, 18);
    const { title, body } = req.body;
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
        imageUrls = req.files.map(file => file.path);
    }

    try {
        if (!body) {
            throw new Error("Title, body, and imageUrl are required fields.");
        }

        const new_notes_post = await coll2.create({ title, body, imageUrls }); // Use imageUrls array
        res.status(200).json(new_notes_post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



const delete_post2 = async (req, res) => {
    const { id } = req.params;

    try {

        const deletedPost = await coll2.findByIdAndDelete(id);

        res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const update_favourite2 = async (req, res) => {
    const postId = req.params.id; // Get the ID of the post from the request parameters

    try {
        const post = await coll2.findById(postId); // Find the post by ID
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


const update_note_partial = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    let newImageUrls = [];

    if (req.files && req.files.length > 0) {
        newImageUrls = req.files.map(file => file.path);
    }

    try {
        if (!updates.body) {
            throw new Error("Body is a required field.");
        }

        // Fetch the existing note to merge image URLs
        const existingNote = await coll2.findById(id);
        if (!existingNote) {
            throw new Error("Note not found.");
        }

        const updatedImageUrls = [...existingNote.imageUrls, ...newImageUrls];
        updates.imageUrls = updatedImageUrls;

        // Use findByIdAndUpdate to perform a partial update
        const updatedNote = await coll2.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { add_new2, showspecific2, showall2, delete_post2, update_favourite2, update_note_partial };