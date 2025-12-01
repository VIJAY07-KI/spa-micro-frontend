import React, { Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorBoundary";

// Must match remote module names from webpack.config.js
const CommentsApp = lazy(() => import("comments_app/App"));
const StoryApp = lazy(() => import("story_app/App"));

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Micro Frontend Host</h1>

      <h2>💬 Comments App</h2>
      <Suspense fallback={<p>Loading Comments...</p>}>
        <ErrorBoundary>
          <CommentsApp />
        </ErrorBoundary>
      </Suspense>

      <h2>📚 Story App</h2>
      <Suspense fallback={<p>Loading Story App...</p>}>
        <ErrorBoundary>
          <StoryApp />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
