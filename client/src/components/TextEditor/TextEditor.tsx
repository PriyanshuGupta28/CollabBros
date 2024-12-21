import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import {
  MenuItem,
  Stack,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { io, Socket } from "socket.io-client";
import axios from "axios"; // Import axios
import { useParams } from "react-router-dom"; // Import useParams
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/comment/comment";
import "codemirror/addon/display/fullscreen";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/display/placeholder";
import "./TextEditor.css";
import GenrateButton from "../GenrateButton/GenrateButton";
import toast, { Toaster } from "react-hot-toast";

const TextEditor: React.FC = () => {
  const [code, setCode] = useState<string>(""); // State for code
  const [language, setLanguage] = useState<string>("javascript"); // Code language
  const [theme, setTheme] = useState<string>("dracula"); // Code theme
  const [socket, setSocket] = useState<Socket | null>(null); // WebSocket connection
  const [room, setRoom] = useState<string>(""); // Room ID
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [generatedLink, setGeneratedLink] = useState(""); // Generated link
  const [codeMirrorReadOnly, setCodeMirrorReadOnly] = useState(false);

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
  const VITE_APP_FRONTEND_URL = import.meta.env.VITE_APP_FRONTEND_URL;

  // UseParams hook to extract roomId from URL
  const { roomId } = useParams<{ roomId: string }>();

  // make CODEMIRROR TEXTEDITOR READONLY

  // Effect to initialize socket, join the room, and fetch room data if roomId exists
  useEffect(() => {
    const socketIo: Socket = io(VITE_APP_SOCKET_SERVER);
    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Connected to WebSocket server!");
    });

    socketIo.on("disconnect", () => {
      console.log("Disconnected from WebSocket server!");
    });

    // If roomId exists, join the room and fetch initial room data
    if (roomId) {
      setRoom(roomId); // Set the roomId from the URL
      socketIo.emit("joinRoom", { room: roomId });

      // Fetch initial code from the backend if room exists
      axios
        .get(`${VITE_APP_SOCKET_SERVER}/api/rooms/${roomId}`)
        .then((response) => {
          // Assuming the backend sends back the code for the room
          if (response.data.success && response.data.data) {
            setCode(response.data.data.data); // Set the code to the editor
          } else {
            setCode(""); // In case there's no code in the room, set an empty code
          }
        })
        .catch((error) => {
          console.error("Error fetching room data:", error);
          toast.error("Wrong Room URL");
        });
    } else {
      setCodeMirrorReadOnly(true);
    }
    socketIo.on("codeUpdate", (newCode: string) => {
      setCode(newCode); // Update the code when received from WebSocket
    });

    return () => {
      socketIo.disconnect();
    };
  }, [roomId]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (socket && room) {
      // Emit the code change to others in the room via socket
      socket.emit("codeChange", { room, code: newCode });

      // Send an update request to the backend to update the code in the database
      axios
        .put(`${VITE_APP_SOCKET_SERVER}/api/rooms/${room}`, { data: newCode }) // Ensure we're updating the specific room
        .then((response) => {
          if (response.data.success) {
            console.log("Room data updated successfully");
          } else {
            console.error("Failed to update room data");
          }
        })
        .catch((error) => {
          console.error("Error updating room data:", error);
          toast.error("Network Error");
        });
    }
  };

  // Function to handle the button click and show the popup for generating a new room
  const handleGenerateLink = async () => {
    try {
      const response = await axios.post(`${VITE_APP_SOCKET_SERVER}/api/rooms`);
      const newRoomId = response.data.roomId;
      setRoom(newRoomId);
      setGeneratedLink(`${VITE_APP_FRONTEND_URL}/room/${newRoomId}`);
      setOpenDialog(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios Error:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Toaster />
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          marginTop: { xs: "0rem", md: "1rem" },
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
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
        <Stack>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Generated Link</DialogTitle>
            <DialogContent>
              <p>Click the link below to join the room:</p>
              <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                {generatedLink}
              </a>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <GenrateButton
            onClick={handleGenerateLink}
            btnName={"Gerrate Room"}
          />
        </Stack>
      </Stack>

      <CodeMirror
        value={code}
        options={{
          mode: language,
          theme: theme,
          readOnly: codeMirrorReadOnly,
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
