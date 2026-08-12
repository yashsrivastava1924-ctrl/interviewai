import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import InterviewSetupPage from "./pages/InterviewSetupPage";
import InterviewPage from "./pages/InterviewPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        {/* Interview Setup */}
        <Route
          path="/interview/setup"
          element={<InterviewSetupPage />}
        />

        {/* Actual Interview */}
        <Route
          path="/interview"
          element={<InterviewPage />}
        />

        {/* Results */}
        <Route
          path="/results"
          element={<ResultsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;