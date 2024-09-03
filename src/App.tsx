import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import useAuthStatus from "./hooks/useAuthStatus";
import "./App.css";

import {
  color,
  background,
  layout,
  flexbox,
  space,
  ColorProps,
  LayoutProps,
  BackgroundProps,
  SpaceProps,
  FlexboxProps,
} from "styled-system";
import { useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar";
import SongPlayerFooter from "./components/SongPlayerFooter/SongPlayerFooter";

const App: React.FC = () => {
  const { isLoggedIn } = useAuthStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setUserReq());
  }, [isLoggedIn, dispatch]);

  type ContainerProps = ColorProps &
    LayoutProps &
    BackgroundProps &
    FlexboxProps &
    SpaceProps;

  const Container = styled.div<ContainerProps>`
    ${color}
    ${layout}
    ${background}
    ${flexbox}
    ${space}
  `;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Container
            display="flex"
            bg="primary"
            width="100%"
            minHeight="100vh"
            style={{
              gap: "10px",
              paddingInline: "10px",
            }}
          >
            <Sidebar />
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
            <SongPlayerFooter />
          </Container>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
