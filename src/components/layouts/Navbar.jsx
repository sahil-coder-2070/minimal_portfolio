import React from "react";
import Container from "./Container";
import ThemeToggel from "./ThemeToggel";


export const Navbar = () => {
  return (
    <Container className={`flex gap-2`}>
      <div>
        Nav
      </div>
      <div>
        <ThemeToggel/>
      </div>
      
    </Container>
  );
};
