// index.js

GoogleGenerativeAI = require("@google/generative-ai");
MarkdownIt = require("markdown-it");

// Replace this with your actual API key
const API_KEY = "AIzaSyA4yQdMZoyFNQT7QS5d0ERQNHBBEGBeVkg"; 

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const query = `what is rgb?`;

const getResponse = async (query) => {
  try {
    const result = await model.generateContent(query);
    const generatedText = result.response.text(); // Ensure this correctly accesses the text
    const md = new MarkdownIt();
    const renderedMarkdown = md.render(generatedText);
    console.log(renderedMarkdown);   
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

// Call the function to get response
getResponse(query);
