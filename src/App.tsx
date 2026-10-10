import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersonSchema } from "@/components/person-schema";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProjectPage from "@/pages/ProjectPage";
import DemoOne from "@/pages/demo";

export default function App() {
  return (
    <BrowserRouter>
      <PersonSchema />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoOne />} />
        <Route path="/proyecto/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
