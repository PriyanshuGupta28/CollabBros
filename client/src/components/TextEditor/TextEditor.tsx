import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { MenuItem, Stack, TextField } from "@mui/material";
import "codemirror/lib/codemirror.css"; // Core styles
import "codemirror/theme/dracula.css"; // Optional theme
import "codemirror/mode/javascript/javascript"; // JavaScript syntax
import "codemirror/mode/xml/xml"; // XML syntax
import "codemirror/mode/css/css"; // CSS syntax
import "codemirror/addon/edit/closebrackets"; // Auto-close brackets
import "codemirror/addon/edit/closetag"; // Auto-close tags
import "codemirror/addon/comment/comment"; // Comment functionality
import "codemirror/addon/display/fullscreen"; // Fullscreen mode
import "codemirror/addon/selection/active-line"; // Highlight active line
import "codemirror/addon/display/placeholder"; // Placeholder text
import "codemirror/lib/codemirror.css"; // Core styles
import "codemirror/mode/javascript/javascript"; // JavaScript syntax
import "codemirror/mode/xml/xml"; // XML syntax
import "codemirror/mode/css/css"; // CSS syntax
import "codemirror/mode/python/python"; // Python syntax
import "codemirror/mode/markdown/markdown"; // Markdown syntax
import "codemirror/theme/dracula.css"; // Dracula theme
import "codemirror/theme/material.css"; // Material theme
import "codemirror/theme/monokai.css"; // Monokai theme
import "./TextEditor.css";

const TextEditor: React.FC = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dracula");

  const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "XML", value: "xml" },
    { label: "CSS", value: "css" },
    { label: "Python", value: "python" },
    { label: "Markdown", value: "markdown" },
  ];

  const themes = [
    { label: "Dracula", value: "dracula" },
    { label: "Material", value: "material" },
    { label: "Monokai", value: "monokai" },
  ];

  return (
    <>
      <Stack sx={{ flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        <TextField
          id="outlined-select-currency"
          select
          label="Theme"
          defaultValue="dracula"
          helperText="Please select your theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {themes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Language"
          defaultValue="javascript"
          helperText="Please select your language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack
        component={CodeMirror}
        value={code}
        options={{
          mode: language, // Language mode
          theme: theme, // Editor theme
          lineNumbers: true, // Show line numbers
          lineWrapping: true, // Wrap long lines
          autoCloseBrackets: true, // Automatically close brackets
          autoCloseTags: true, // Automatically close tags
          styleActiveLine: true, // Highlight the active line
          tabSize: 2, // Set tab size
          indentWithTabs: true, // Use tabs for indentation
          lint: true, // Enable linting
          matchBrackets: true, // Match brackets
          matchTags: true, // Match tags
          autoMatchParens: true, // Automatically match parentheses
          extraKeys: {
            "Ctrl-/": "toggleComment", // Toggle comment shortcut
          },
          placeholder: "Write your code here...",
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        onChange={(editor, data, value) => {
          setCode(value);
        }}
      />
    </>
  );
};

export default TextEditor;
