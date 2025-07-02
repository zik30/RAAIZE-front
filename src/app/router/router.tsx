import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { paths } from "../../shared/constants/constants";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <div>Error</div>,
        children: [
            {
                path: paths.homePage,
                element: <div>Home</div>
            }
        ]
    }
])