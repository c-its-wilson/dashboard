import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import SuspenseLoader from "../components/SuspenceLoader";
import { RouteObject } from "react-router";
import Status404 from "../pages/status404";
import BaseLayout from "../layouts/BaseLayout";

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Dashboard = Loader(lazy(() => import("../pages/dashboard")));
const Blog = Loader(lazy(() => import("../pages/blog")));

const mainRoutes: RouteObject[] = [
  {
    path: "",
    caseSensitive: false,
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
];

export const Routes = () => {
  return useRoutes(mainRoutes);
};

export default Routes;
