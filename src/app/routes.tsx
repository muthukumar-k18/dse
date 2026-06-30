import { createBrowserRouter } from "react-router";
import LandingPage from "./LandingPage";
import LandingPagePreview from "./LandingPagePreview";
import BusinessUserLanding from "./BusinessUser/Landingpage";
import ApplicationAssessment from "./BusinessUser/ApplicationAssesment";
import SpendBudget from "./BusinessUser/SpendBudget";
import BudgetSummary from "./BusinessUser/BudgetSummary";
import PredictiveAnalytics from "./BusinessUser/PredictiveAnalytics";
import PredictiveAnalyticsReport from "./BusinessUser/PredictiveAnalyticsReport";
import AAFRoleNavigation from "./AAFUser/AAFRoleNavigation";
import AAFMigrationExpert_Dashboard from "./AAFUser/AAFMigrationExpert_Dashboard";
import CreateProject from "./Create_Project";
import ProjectPipeline from "./ProjectPipeline";
import StageDetails from "./StageDetails";
import DocumentViewer from "./DocumentViewer";
import Code360 from "./Code360";
import ScopeSummaryViewer from "./components/ScopeSummaryViewer";
import ResourcePlanViewer from "./components/ResourcePlanViewer";
import RiskRegisterViewer from "./components/RiskRegisterViewer";
import ScopeSignoffViewer from "./components/ScopeSignoffViewer";
import TechnicalAssessmentViewer from "./TechnicalAssessmentViewer";
import BottomUpEstimation from "./BottomUpEstimation";
import EstimationMethodSelection from "./EstimationMethodSelection";
import EstimationSignoff from "./EstimationSignoff";
import RemediationScreen from "./RemediationScreen";
import InitiationScreen from "./InitiationScreen";
import ReAnalysisScreen from "./ReAnalysisScreen";
import ReAnalyseStepsDetail from "./ReAnalyseStepsDetail";
import MapAgentsToSteps from "./MapAgentsToSteps";
import FinaliseAgents from "./FinaliseAgents";
import CreateNewPattern from "./CreateNewPattern";
import ManageLegos from "./ManageLegos";
import CreatePipeline from "./CreatePipeline";
import AgenticConversation from "./AgenticConversation";
import ErrorBoundary from "./ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/preview-designs",
    element: <LandingPagePreview />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/business-user",
    element: <BusinessUserLanding />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/business-user/assess-application",
    element: <ApplicationAssessment />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/business-user/spend-budget",
    element: <SpendBudget />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/business-user/budget-summary",
    element: <BudgetSummary />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/business-user/predictive-analytics",
    element: <PredictiveAnalytics />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/business-user/predictive-analytics-report",
    element: <PredictiveAnalyticsReport />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/aaf-user",
    element: <AAFRoleNavigation />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/aaf-migration-expert",
    element: <AAFMigrationExpert_Dashboard />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/create-project",
    element: <CreateProject />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/project-pipeline/:projectId",
    element: <ProjectPipeline />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/project-pipeline/:projectId/stage/:stageId",
    element: <StageDetails />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/stage-details/:projectId/:stageId",
    element: <StageDetails />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/document-viewer/:projectId/:stageId/:documentType",
    element: <DocumentViewer />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/scope-summary-viewer/:projectId/:stageId",
    element: <ScopeSummaryViewer />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/resource-plan-viewer/:projectId/:stageId",
    element: <ResourcePlanViewer />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/risk-register-viewer/:projectId/:stageId",
    element: <RiskRegisterViewer />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/code360/:projectId",
    element: <Code360 />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/scope-signoff-viewer/:projectId/:stageId",
    element: <ScopeSignoffViewer />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/technical-assessment-viewer/:projectId/:stageId",
    element: <TechnicalAssessmentViewer />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/bottom-up-estimation/:projectId",
    element: <BottomUpEstimation />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/bottom-up-estimation/:projectId/:method",
    element: <BottomUpEstimation />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/estimation-method-selection/:projectId",
    element: <EstimationMethodSelection />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/estimation-signoff/:projectId",
    element: <EstimationSignoff />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/remediation-screen/:projectId",
    element: <RemediationScreen />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/initiation-screen/:projectId",
    element: <InitiationScreen />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/re-analysis-screen/:projectId",
    element: <ReAnalysisScreen />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/re-analyse-steps-detail/:projectId",
    element: <ReAnalyseStepsDetail />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/map-agents-to-steps/:projectId",
    element: <MapAgentsToSteps />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/finalise-agents/:projectId",
    element: <FinaliseAgents />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/create-new-pattern/:projectId",
    element: <CreateNewPattern />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/manage-legos/:projectId",
    element: <ManageLegos />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/create-pipeline/:projectId",
    element: <CreatePipeline />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/agentic-conversation/:projectId",
    element: <AgenticConversation />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);