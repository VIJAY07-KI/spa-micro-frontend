import React, { useState } from "react";
import "./styles.css";

interface CommentItem { story: string; comment: string; }

const App: React.FC = () => {
  const [story, setStory] = useState("");
  const [comment, setComment] = useState("");
  const [list, setList] = useState<CommentItem[]>([]);

  const addComment = () => {
    if (!story.trim() || !comment.trim()) return;
    setList([...list, { story, comment }]);
    setStory("");
    setComment("");
  };

  const deleteComment = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="comments-container">
      <h2>Story + Comments</h2>
      <input
        className="comments-input"
        value={story}
        placeholder="Enter story name..."
        onChange={(e) => setStory(e.target.value)}
      />
      <textarea
        className="comments-textarea"
        value={comment}
        placeholder="Enter comment..."
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="comments-add-btn" onClick={addComment}>Add</button>
      <ul className="comments-list">
        {list.map((item, idx) => (
          <li className="comments-item" key={idx}>
            <div>
              <p className="comments-story">{item.story}</p>
              <p className="comments-text">{item.comment}</p>
            </div>
            <button className="comments-delete-btn" onClick={() => deleteComment(idx)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
