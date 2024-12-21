import {
  Stack,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  ArrowForward,
  Undo,
  Redo,
  Home,
  KeyboardArrowDown,
  Pageview,
  Search,
  Code,
  Comment,
  Keyboard,
  FileCopy,
  SelectAll,
} from "@mui/icons-material";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import logo from '../../../public/logo.png'

// Transition for the Dialog
const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Toggle the modal state
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        component={"nav"}
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          boxSizing: "border-box",
          padding: "1rem 2rem",
          width: "100%",
          height: "4rem",
          alignItems: "center",
          top: 0,
          position: "sticky",
          zIndex: 1000,
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
          transition: "background-color 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#f4f4f4",
          },
        }}
      >
        <Stack>
          <Stack
          component={'img'}
            src={logo}
            sx={{ width: "100%", height: "4rem",objectFit: "contain" }}
            alt={"CollabBros Logo"}
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {navLinks.map((link) => (
            <Typography
              component={Link}
              to={link.path}
              key={link.title + link.path}
              sx={{
                color: "inherit",
                textDecoration: "none",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                fontSize: "1.2rem",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#1976d2",
                },
              }}
            >
              {link.title}
            </Typography>
          ))}
          {/* Button to open the shortcuts dialog */}

          <Button
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "500",
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "gray", // Optionally add hover effect
              },
            }}
            onClick={handleClickOpen}
            title="Shortcuts"
            variant="contained" // Added the 'variant' prop for proper button styling
          >
            <ShortcutIcon sx={{ fontSize: 20 }} />
            Shortcuts
          </Button>
        </Stack>
      </Stack>

      {/* Modal Dialog for CodeMirror Shortcuts with Animation */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        sx={{
          "& .MuiDialog-paper": {
            animation: "fadeIn 0.5s ease-out",
          },
        }}
      >
        <DialogTitle>CodeMirror Keyboard Shortcuts</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
            Here are the available CodeMirror shortcuts:
          </Typography>

          {/* Grid to display each shortcut with icons */}
          <Grid container spacing={2}>
            {shortcuts.map((shortcut, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <shortcut.icon sx={{ fontSize: 24, color: "#1976d2" }} />
                  <Typography variant="body2" sx={{ fontWeight: "500" }}>
                    <strong>{shortcut.key}</strong>: {shortcut.description}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;

// List of CodeMirror shortcuts with icons
const shortcuts = [
  {
    key: "Ctrl + Arrow Left/Right",
    description: "Move the cursor one word left or right.",
    icon: ArrowForward,
  },
  {
    key: "Ctrl + Arrow Up/Down",
    description: "Scroll the editor up or down one line.",
    icon: Keyboard,
  },
  {
    key: "Home",
    description: "Move to the beginning of the current line.",
    icon: Home,
  },
  {
    key: "End",
    description: "Move to the end of the current line.",
    icon: KeyboardArrowDown,
  }, // Changed to a valid icon
  {
    key: "Page Up/Page Down",
    description: "Scroll the editor up or down by one page.",
    icon: Pageview,
  },
  { key: "Ctrl + Z", description: "Undo the last action.", icon: Undo },
  {
    key: "Ctrl + Shift + Z (or Ctrl + Y)",
    description: "Redo the last undone action.",
    icon: Redo,
  },
  { key: "Ctrl + X", description: "Cut the selected text.", icon: FileCopy },
  { key: "Ctrl + C", description: "Copy the selected text.", icon: FileCopy },
  {
    key: "Ctrl + V",
    description: "Paste the copied/cut text.",
    icon: FileCopy,
  },
  {
    key: "Ctrl + A",
    description: "Select all text in the editor.",
    icon: SelectAll,
  },
  {
    key: "Ctrl + D",
    description: "Duplicate the current line or selected text.",
    icon: Code,
  },
  {
    key: "Ctrl + Shift + K",
    description: "Delete the current line.",
    icon: Keyboard,
  },
  {
    key: "Ctrl + F",
    description: "Open the find dialog to search for text.",
    icon: Search,
  },
  {
    key: "Ctrl + G",
    description: "Find the next occurrence of the search term.",
    icon: Search,
  },
  { key: "Ctrl + H", description: "Open the replace dialog.", icon: Search },
  {
    key: "Ctrl + Shift + [",
    description: "Fold the current block of code.",
    icon: Code,
  },
  {
    key: "Ctrl + Shift + ]",
    description: "Unfold the current block of code.",
    icon: Code,
  },
  {
    key: "Ctrl + /",
    description: "Toggle comments on the selected lines.",
    icon: Comment,
  },
  {
    key: "Ctrl + Shift + M",
    description: "Select matching bracket or parenthesis.",
    icon: Keyboard,
  },
  {
    key: "Ctrl + Space",
    description: "Trigger autocomplete suggestions.",
    icon: Keyboard,
  },
];

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Support",
    path: "/Support",
  },
];
