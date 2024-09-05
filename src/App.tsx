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
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import SongPlayerFooter from "./components/SongPlayerFooter/SongPlayerFooter";
import { getItem } from "./lib/localStorage";
import { setIsAuth } from "./app/features/auth/authSlice";
import { Spinner } from "theme-ui";

const App: React.FC = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      dispatch(setIsAuth());
    }
  }, [isAuth]);

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
        <Suspense
          fallback={
            <Container height={"100vh"} background={"#000"}>
              <Spinner />
            </Container>
          }
        >
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
