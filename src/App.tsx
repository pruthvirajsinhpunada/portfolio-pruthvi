import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";

const MainContainer = lazy(() => import("./components/MainContainer"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));

const App = () => {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="*" element={<MainContainer />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LoadingProvider>
  );
};

export default App;
