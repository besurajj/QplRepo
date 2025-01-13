import React, { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { PrimaryLayouts } from "../component/common/layouts";
import { ErrorPage } from "../component/pages";
import NoAuthGaurd from "./NoAuthGaurd";
import AuthGuard from "./AuthGuard";
import ExamManagement from "../component/pages/Private/ExamManagement/ExamManagement";
import ViewQuestions from "../component/pages/Private/ExamManagement/ViewQuestions";
import { ROUTES } from "../utils/constants";
import Login from "../component/pages/public/AuthPages/Login.js";
// import Dashboard from "../component/pages/Private/Dashboard/Dashboard";
import ProfileSetting from "../component/pages/Private/ProfileSetting/ProfileSetting";
import CreatePaper from "../component/pages/Private/CreatePaper/CreatePaper";
import QuestionPaper from "../component/pages/Private/QuestionPaper/QuestionPaper";
// import TopicQuiz from "../component/pages/Private/QuestionPaper/TopicQuiz";
import QuizData from "../component/pages/Private/QuestionPaper/QuizData";
import CreateExam from "../component/pages/Private/CreateExam/CreateExam";
const router = createBrowserRouter([
  //* Public Pages
  {
    path: "/",
    element: (
      <NoAuthGaurd>
        <Login />
      </NoAuthGaurd>
    ),
    errorElement: <ErrorPage />,
  },
  //* Private Routes
  {
    path: ROUTES.ADMIN,
    element: (
      <AuthGuard>
      <PrimaryLayouts />
      </AuthGuard>
    ),
    children: [
      // Redirect /admin to Dashboard
      {
        path: ROUTES.ADMIN,
        element: <Navigate to={ROUTES.EXAM_MANAGEMENT} />,
      },
      // Dashboard
      // {
      //   path: ROUTES.DASHBOARD,
      //   element: <Dashboard />,
      // },
      // Profile Settings
      {
        path: ROUTES.PROFILE_SETTING,
        element: <ProfileSetting />,
      },
      // User Management
      {
        path: ROUTES.EXAM_MANAGEMENT,
        element: <ExamManagement />,
      },
      {
        path: `${ROUTES.VIEW_QUESTIONS}/:subject`,
        element: <ViewQuestions />,
      },

      //Points Managment
      {
        path: ROUTES.QUEST_PAPER,
        element: <QuestionPaper />,
      },

      //Result Managment
      {
        path: ROUTES.CREATE_EXAM,
        element: <CreateExam />,
      },

      //setting
      {
        path: ROUTES.CREATE_PAPER,
        element: <CreatePaper />,
      },

      {
        path: `${ROUTES.TOPIC}/:name`,
        element: <QuizData />,
      },
    ],
  },
]);

const Routes = () => {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;
