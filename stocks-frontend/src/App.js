import {
    BrowserRouter,
    Routes,
    Route, Navigate,
} from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import paths from "./constants/paths";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Portfolios from "./pages/Portfolios";
import Stocks from "./pages/Stocks";
import Bonds from "./pages/Bonds";
import Profile from "./pages/Profile";
import PortfoliosAnalyst from "./pages/PortfoliosAnalyst";
import PortfolioDetails from "./pages/PortfolioDetails";

const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem('userId')) {
        return <Navigate to={paths.LOGIN} replace />;
    }

    return (
        <Layout>
            {children}
        </Layout>
    );
};

function App() {
  return (
      <>
          <NotificationContainer/>
          <BrowserRouter>
              <Routes>
                  <Route path={paths.LOGIN} element={<Login />} />
                  <Route path={paths.REGISTER} element={<Register />} />
                  <Route
                      path={paths.MAIN}
                      element={
                          <ProtectedRoute>
                              <Main />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path={paths.PORTFOLIO}
                      element={
                          <ProtectedRoute>
                              <Portfolios />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path={paths.ANALYST_PORTFOLIO}
                      element={
                          <ProtectedRoute>
                              <PortfoliosAnalyst />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path={paths.PORTFOLIO_DETAILS}
                      element={
                          <ProtectedRoute>
                              <PortfolioDetails />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path={paths.STOCKS}
                      element={
                          <ProtectedRoute>
                              <Stocks />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path={paths.BONDS}
                      element={
                          <ProtectedRoute>
                              <Bonds />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path={paths.PROFILE}
                      element={
                          <ProtectedRoute>
                              <Profile />
                          </ProtectedRoute>
                      }
                  />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
