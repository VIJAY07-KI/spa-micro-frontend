import React from "react";
import StoryApp from "story_app/App";
import CommentsApp from "comments_app/App";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Micro Frontend Host</h1>

      <h2>📚 Story App</h2>
      <StoryApp />

      <h2>💬 Comments App</h2>
      <CommentsApp />
    </div>
  );
}
