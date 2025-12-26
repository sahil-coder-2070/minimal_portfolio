import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layouts/Navbar";
import { ThemeProvider } from "./components/ui/theme-provider";
import Home from "./components/pages/Home";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
