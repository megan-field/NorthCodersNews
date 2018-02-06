const updateCommentVotes = () => {
    const {comment_id} = req.params;
    let {vote} = req.query;
    let num;
        if (vote === 'up') num = 1;
        if (vote === 'down') num = -1;
      
    Comment.findByIdAndUpdate({_id: comment_id}, { $inc: {votes: num}})
      .then(comment => res.send(comment));
}

const deleteCommentById = () => {
    const {comment_id} = req.params;
    Comment.remove({_id: comment_id})
      .then(comment => {
        console.log(comment);
        res.send(comment);
        console.log(`comment ${comment_id} was deleted`);
      });
}

module.exports = {deleteCommentById, updateCommentVotes}