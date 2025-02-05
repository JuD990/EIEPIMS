import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import LoginForm from "../js/components/Login/LoginForm";
{/* ESL Champ Imports*/}
import EslChampionDashboard from "../js/components/esl_champion/EslChampionDashboard/EslChampionDashboard";
{/* Student Imports*/}
import StudentDashboard from "../js/components/student/StudentDashboard";
import StudentViewScores from "../js/components/student/eie-evaluations-scores/view-scores"
{/* Head POC Imports*/}
import HeadEiePocDashboard from "../js/components/head_eie_poc/eie-head-dashboard/HeadEiePocDashboard";
import EIEHeadReporting from "../js/components/head_eie_poc/eie-head-eie-reporting/eie-head-eie-reporting";
import MasterClassList from "../js/components/head_eie_poc/master-class-list/master-class-list"
import ImplementingSubjects from "../js/components/head_eie_poc/implementing-subjects/implementing-subjects";
import EIEHeadStudentManagement from "../js/components/head_eie_poc/eie-head-student-management/eie-head-student-management"
{/* Lead POC Imports*/}
import LeadEiePocDashboard from "../js/components/lead_eie_poc/LeadEiePocDashboard";
{/* College POC Imports*/}
import CollegePocDashboard from "../js/components/college_poc/CollegePocDashboard/CollegePocDashboard";
import CollegePocImplementingSubject from "../js/components/college_poc/CollegePocClassManagement/CollegePocClassManagement";
import EPGFScorecard from "../js/components/college_poc/EPGFScorecard/EPGFScorecard";
import CollegePocEieReporting from "../js/components/college_poc/EIEreporting/EIEreporting"
import CollegePocStudentManagement from "../js/components/college_poc/StudentManagement/StudentManagement"
{/* ESL Imports*/}
import EslPrimeEieReporting from "../js/components/esl_prime/EIE-reporting/esl-prime-eie-reporting";
import ElPrimeEPGFRubricVersion from "../js/components/esl_prime/EIE-management/epgf-rubric-version/esl-prime-epgf-rubric-versioning";
import EslCertification from "../js/components/esl_prime/EIE-management/certification/esl-prime-certification";
import EslTemplate from "../js/components/esl_prime/EIE-management/template/esl-template-champion";
import EslPrimeAccountManagement from "../js/components/esl_prime/EIE-management/accounts/esl-prime-account-management";
import EslPrimeDashboard from "../js/components/esl_prime/EslPrimeDashboard/EslPrimeDashboard";
import EslInterviewScorecard from "../js/components/esl_prime/EIE-diagnostic/esl-interview-scorecard/esl-interview-scorecard";
import EslDiagnosticReports from "../js/components/esl_prime/EIE-diagnostic/eie-diagnostic-reports/eie-diagnostic-reports";

// PrivateRoute Import
import PrivateRoute from "../js/components/routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* Student */}
        <Route path="/student-dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
        <Route path="/view-scores/:historicalScorecardId" element={<PrivateRoute><StudentViewScores /></PrivateRoute>} />
        {/* College POC */}
        <Route path="/college-poc-dashboard" element={<PrivateRoute><CollegePocDashboard /></PrivateRoute>} />
        <Route path="/class-management" element={<PrivateRoute><CollegePocImplementingSubject /></PrivateRoute>} />
        <Route path="/epgf-scorecard" element={<PrivateRoute><EPGFScorecard /></PrivateRoute>} />
        <Route path="/college-poc-eie-reporting" element={<PrivateRoute><CollegePocEieReporting /></PrivateRoute>} />
        <Route path="/college-poc-student-management" element={<PrivateRoute><CollegePocStudentManagement /></PrivateRoute>} />

        {/* ESL */}
        <Route path="/esl-dashboard" element={<PrivateRoute><EslChampionDashboard /></PrivateRoute>} />
        <Route path="/esl-dashboard" element={<PrivateRoute><EslPrimeDashboard /></PrivateRoute>} />
        <Route path="/esl-eie-reporting" element={<PrivateRoute><EslPrimeEieReporting /></PrivateRoute>} />

        {/* ESL Diagnostcs*/}
        <Route path="/esl-diagnostic-reports" element={<PrivateRoute><EslDiagnosticReports /></PrivateRoute>} />
        <Route path="/esl-interview-scorecard" element={<PrivateRoute><EslInterviewScorecard /></PrivateRoute>} />

        {/* ESL EIE Management*/}
        <Route path="/esl-epgf-versioning" element={<PrivateRoute><ElPrimeEPGFRubricVersion /></PrivateRoute>} />
        <Route path="/esl-certification" element={<PrivateRoute><EslCertification /></PrivateRoute>} />
        <Route path="/esl-template" element={<PrivateRoute><EslTemplate /></PrivateRoute>} />
        <Route path="/esl-account-management" element={<PrivateRoute><EslPrimeAccountManagement /></PrivateRoute>} />

        {/* EIE Head */}
        <Route path="/eie-head-poc-dashboard" element={<PrivateRoute><HeadEiePocDashboard /></PrivateRoute>} />
        <Route path="/eie-head-reporting" element={<PrivateRoute><EIEHeadReporting /></PrivateRoute>} />
        <Route path="/eie-head-student-management" element={<PrivateRoute><EIEHeadStudentManagement /></PrivateRoute>} />
        <Route path="/eie-head-master-class-list" element={<PrivateRoute><MasterClassList /></PrivateRoute>} />
        <Route path="/implementing-subjects" element={<PrivateRoute><ImplementingSubjects /></PrivateRoute>} />
        {/* Lead POC */}
        <Route path="/lead-eie-poc-dashboard" element={<PrivateRoute><LeadEiePocDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
