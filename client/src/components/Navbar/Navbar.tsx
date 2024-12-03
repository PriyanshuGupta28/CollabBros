import { Link, Stack, Typography } from "@mui/material";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <Stack
      component={"nav"}
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: "1rem 2rem",
        width: "100%",
        alignItems: "center",
        top: 0,
        position: "sticky",
        zIndex: 1000,
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Typography>CollabBros</Typography>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        {navLinks.map((link) => (
          <Typography
            component={Link}
            href={link.path}
            key={link.title + link.path}
          >
            {link.title}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};

export default Navbar;

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
