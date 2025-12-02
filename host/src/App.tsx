import React, { Suspense, lazy } from "react";

// Lazy load remote apps
const StoryApp = lazy(() => import("story_app/App"));
const CommentsApp = lazy(() => import("comments_app/App"));

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}> SPA Micro Frontend Host</h1>

      <h2 style={{ textAlign: "center" }}>📚 Story App</h2>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading Story App...</p>}>
        <StoryApp />
      </Suspense>

      <h2 style={{ textAlign: "center" }}>💬 Comments App</h2>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading Comments...</p>}>
        <CommentsApp />
      </Suspense>
    </div>
  );
}
