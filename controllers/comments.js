const updateCommentVotes = () => {
    const {comment_id} = req.params;
    let {vote} = req.query;
    let num;
        if (vote === 'up') num = 1;
        if (vote === 'down') num = -1;
      
    Comment.findByIdAndUpdate({_id: comment_id}, { $inc: {votes: num}})
      .then(comment => res.send(comment));
}

const deleteCommentById = () => {}

module.exports = {deleteCommentById, updateCommentVotes}