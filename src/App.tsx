import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/landing/theme-provider";
import Home from "./components/pages/Home";
import { Navbar } from "./components/common/Navbar";
import Blogs from "./components/pages/Blogs";
import ProjectContent from "./app/projects/ProjectContent";
import Work from "./components/pages/Work";
import BlogContent from "./app/blog/BlogContent";
import Projects from "./components/pages/Projects";
import Footer from "./components/common/Footer";
import { Quote } from "./components/common/Quote";
import Contact from "./components/pages/Contact";
import ResumePage from "./components/layouts/ResumePage";
import Container from "./components/layouts/Container";
import Layout from "./components/common/Layout";
import GearsPage from "./app/gear/Gear";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (window.va) {
      window.va("send", "pageview");
    }
  }, [location.pathname]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <Container>
          <Layout>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects/:slug" element={<ProjectContent />} />
              <Route path="/blogs/:slug" element={<BlogContent />} />
              <Route path="/gear" element={<GearsPage />} />
            </Routes>
            <Quote />
            <Footer />
          </Layout>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
