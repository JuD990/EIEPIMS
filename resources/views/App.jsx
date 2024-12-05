import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import LoginForm from "../js/components/Login/LoginForm";
import EslChampionDashboard from "../js/components/esl_champion/EslChampionDashboard";
import EslPrimeDashboard from "../js/components/esl_prime/EslPrimeDashboard";
import StudentDashboard from "../js/components/student/StudentDashboard";
import CollegePocDashboard from "../js/components/college_poc/CollegePocDashboard/CollegePocDashboard";
import CollegePocImplementingSubject from "../js/components/college_poc/CollegePocClassManagement/CollegePocClassManagement";
import EPGFScorecard from "../js/components/college_poc/EPGFScorecard/EPGFScorecard";
import HeadEiePocDashboard from "../js/components/head_eie_poc/HeadEiePocDashboard";
import LeadEiePocDashboard from "../js/components/lead_eie_poc/LeadEiePocDashboard";
import CollegePocEieReporting from "../js/components/college_poc/EIEreporting/EIEreporting"
import CollegePocStudentManagement from "../js/components/college_poc/StudentManagement/StudentManagement"

// Import PrivateRoute
import PrivateRoute from "../js/components/routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* Use PrivateRoute for all protected routes */}
        <Route path="/student-dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
        <Route path="/college-poc-dashboard" element={<PrivateRoute><CollegePocDashboard /></PrivateRoute>} />
        <Route path="/class-management" element={<PrivateRoute><CollegePocImplementingSubject /></PrivateRoute>} />
        <Route path="/epgf-scorecard" element={<PrivateRoute><EPGFScorecard /></PrivateRoute>} />
        <Route path="/esl-champion-dashboard" element={<PrivateRoute><EslChampionDashboard /></PrivateRoute>} />
        <Route path="/esl-prime-dashboard" element={<PrivateRoute><EslPrimeDashboard /></PrivateRoute>} />
        <Route path="/head-eie-poc-dashboard" element={<PrivateRoute><HeadEiePocDashboard /></PrivateRoute>} />
        <Route path="/college-poc-eie-reporting" element={<PrivateRoute><CollegePocEieReporting /></PrivateRoute>} />
        <Route path="/college-poc-student-management" element={<PrivateRoute><CollegePocStudentManagement /></PrivateRoute>} />
        <Route path="/lead-eie-poc-dashboard" element={<PrivateRoute><LeadEiePocDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
