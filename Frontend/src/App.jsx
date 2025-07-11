import { useState, useEffect } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
// Import PrismJS for syntax highlighting
import prism from "prismjs";
import rehypeHightlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // You can choose any style you like

function App() {
  const [count, setCount] = useState(0);
  const [code, SetCode] = useState(` function sum() {
            return 1 + 1
            }`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  });
  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3006/ai/get-review", {
        code,
      });
      // http://localhost:3006/ai/get-review

      setReview(response.data);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 503) {
        setReview(
          "🚫 Gemini API is overloaded. Please try again in a few seconds."
        );
      } else {
        setReview("❌ Error occurred while reviewing code.");
      }
      console.error("Review error:", error);
    }
    //this function will send the code to the backend for review and then ai will review the code
    // console.log(response.data);
    // this will give the response from the backend and then we will display it in the frontend
    //use this review in right side of the editor in the frontend ok
    //but we get a cors error because as express dont share resource with other domains so we need to use cors middleware as it wont send to frontend
    //so we need to install cors in backend and then use it in app.js file
    //we will use cors middleware in app.js file and then we will use it in ai
    //we will use axios to send the code to the backend and then we will get the response from the backend
    //after that we will display the response in the frontend not in the console
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => SetCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "5px",
                color: "#fff",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            {" "}
            Review
          </div>
        </div>
        <div className="right">
          <Markdown
            style={{
              fontSize: 16,
            }}
            rehypePlugins={[rehypeHightlight]}
          >
            {review.message}
          </Markdown>
        </div>
      </main>
    </>
  );
}
function sum() {
  return 1 + 1;
}
export default App;
