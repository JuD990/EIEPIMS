import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import LoginForm from "../js/components/Login/LoginForm";
{/* ESL Champ Imports*/}
import EslChampionDashboard from "../js/components/esl_champion/EslChampionDashboard";
{/* Student Imports*/}
import StudentDashboard from "../js/components/student/StudentDashboard";
{/* Head POC Imports*/}
import HeadEiePocDashboard from "../js/components/head_eie_poc/HeadEiePocDashboard";
{/* Lead POC Imports*/}
import LeadEiePocDashboard from "../js/components/lead_eie_poc/LeadEiePocDashboard";
{/* College POC Imports*/}
import CollegePocDashboard from "../js/components/college_poc/CollegePocDashboard/CollegePocDashboard";
import CollegePocImplementingSubject from "../js/components/college_poc/CollegePocClassManagement/CollegePocClassManagement";
import EPGFScorecard from "../js/components/college_poc/EPGFScorecard/EPGFScorecard";
import CollegePocEieReporting from "../js/components/college_poc/EIEreporting/EIEreporting"
import CollegePocStudentManagement from "../js/components/college_poc/StudentManagement/StudentManagement"
{/* ESL Prime Imports*/}
import EslPrimeEieReporting from "../js/components/esl_prime/EIE-reporting/esl-prime-eie-reporting";
import ElPrimeEPGFRubricVersion from "../js/components/esl_prime/EIE-management/epgf-rubric-version/esl-prime-epgf-rubric-versioning";
import EslCertification from "../js/components/esl_prime/EIE-management/certification/esl-prime-certification";
import EslMonthlyChampions from "../js/components/esl_prime/EIE-management/monthly-champion/esl-prime-monthly-champion";
import EslPrimeDiagnostics from "../js/components/esl_prime/EIE-diagnostic/esl-prime-eie-diagnostic";
import EslPrimeAccountManagement from "../js/components/esl_prime/EIE-management/accounts/esl-prime-account-management";
import EslPrimeDashboard from "../js/components/esl_prime/EslPrimeDashboard/EslPrimeDashboard";

// PrivateRoute Import
import PrivateRoute from "../js/components/routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* Student */}
        <Route path="/student-dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
        {/* College POC */}
        <Route path="/college-poc-dashboard" element={<PrivateRoute><CollegePocDashboard /></PrivateRoute>} />
        <Route path="/class-management" element={<PrivateRoute><CollegePocImplementingSubject /></PrivateRoute>} />
        <Route path="/epgf-scorecard" element={<PrivateRoute><EPGFScorecard /></PrivateRoute>} />
        <Route path="/college-poc-eie-reporting" element={<PrivateRoute><CollegePocEieReporting /></PrivateRoute>} />
        <Route path="/college-poc-student-management" element={<PrivateRoute><CollegePocStudentManagement /></PrivateRoute>} />
        {/* ESL Champ */}
        <Route path="/esl-champion-dashboard" element={<PrivateRoute><EslChampionDashboard /></PrivateRoute>} />
        {/* ESL Prime */}
        <Route path="/esl-prime-dashboard" element={<PrivateRoute><EslPrimeDashboard /></PrivateRoute>} />
        <Route path="/esl-prime-eie-reporting" element={<PrivateRoute><EslPrimeEieReporting /></PrivateRoute>} />
        <Route path="/esl-prime-eie-diagnostics" element={<PrivateRoute><EslPrimeDiagnostics /></PrivateRoute>} />
        {/* ESL Prime EIE Management*/}
        <Route path="/esl-epgf-versioning" element={<PrivateRoute><ElPrimeEPGFRubricVersion /></PrivateRoute>} />
        <Route path="/esl-certification" element={<PrivateRoute><EslCertification /></PrivateRoute>} />
        <Route path="/esl-monthly-champions" element={<PrivateRoute><EslMonthlyChampions /></PrivateRoute>} />
        <Route path="/esl-prime-account-management" element={<PrivateRoute><EslPrimeAccountManagement /></PrivateRoute>} />

        {/* EIE Head */}
        <Route path="/head-eie-poc-dashboard" element={<PrivateRoute><HeadEiePocDashboard /></PrivateRoute>} />
        {/* Lead POC */}
        <Route path="/lead-eie-poc-dashboard" element={<PrivateRoute><LeadEiePocDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
