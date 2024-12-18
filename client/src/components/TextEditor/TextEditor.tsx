import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { MenuItem, Stack, TextField } from "@mui/material";
import { io, Socket } from "socket.io-client"; // Import socket.io-client and the Socket type
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
import "codemirror/theme/dracula.css"; // Dracula theme
import "codemirror/theme/material.css"; // Material theme
import "codemirror/theme/monokai.css"; // Monokai theme
import "./TextEditor.css";

const TextEditor: React.FC = () => {
  const [code, setCode] = useState<string>(""); // Specify type for code state
  const [language, setLanguage] = useState<string>("javascript"); // Specify type for language state
  const [theme, setTheme] = useState<string>("dracula"); // Specify type for theme state

  const [socket, setSocket] = useState<Socket | null>(null); // Specify type for socket state
  const [username, setUsername] = useState<string>("User1"); // Set dynamically as needed
  const [room, setRoom] = useState<string>("room1"); // Set dynamically as needed

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
  const VITE_APP_SOCKET_SERVER = import.meta.env.VITE_APP_SOCKET_SERVER;
  useEffect(() => {
    // Connect to the server and set up the socket
    const socketIo: Socket = io(VITE_APP_SOCKET_SERVER); // Replace with your server URL

    setSocket(socketIo);

    // Join the room and notify others when a user joins
    socketIo.emit("joinRoom", { room, username });

    // Listen for code updates from the server
    socketIo.on("codeUpdate", (newCode: string) => {
      setCode(newCode); // Update code in the editor when a codeUpdate event is received
    });

    // Clean up on component unmount
    return () => {
      socketIo.disconnect();
    };
  }, [room, username]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (socket) {
      // Emit the code change to the server
      socket.emit("codeChange", { room, code: newCode });
    }
  };

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
      <CodeMirror
        value={code}
        options={{
          mode: language,
          theme: theme,
          lineNumbers: true,
          lineWrapping: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
          styleActiveLine: true,
          tabSize: 2,
          indentWithTabs: true,
          lint: true,
          matchBrackets: true,
          matchTags: true,
          autoMatchParens: true,
          extraKeys: {
            "Ctrl-/": "toggleComment",
          },
          placeholder: "Write your code here...",
        }}
        onBeforeChange={(editor, data, value) => {
          handleCodeChange(value);
        }}
      />
    </>
  );
};

export default TextEditor;
