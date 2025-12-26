import { Navbar } from "./components/layouts/Navbar";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
