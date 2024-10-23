import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For fetching file content
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // VSCode-like dark theme


const fetchFileContent = async (fileUrl) => {
  try {
    const response = await axios.get(fileUrl);
    return response.data; 
  } catch (error) {
    console.error("Error fetching file content:", error);
    return ""; 
  }
};

const FetchAndDisplayFile = ({ fileUrl }) => {
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    const getFileContent = async () => {
      const content = await fetchFileContent(fileUrl);
      setFileContent(content);
    };

    getFileContent();
  }, [fileUrl]);

  return (
    <SyntaxHighlighter
      language="javascript" 
      style={vscDarkPlus}
      className="p-3 mt-2 rounded"
    >
      {fileContent || "No content available"}
    </SyntaxHighlighter>
  );
};

export default FetchAndDisplayFile;
