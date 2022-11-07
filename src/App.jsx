import { createRef } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";

const routes = [
  { path: "/", name: "Home", element: <Home />, nodeRef: createRef() },
  { path: "/about", name: "About", element: <About />, nodeRef: createRef() },
  {
    path: "/contact",
    name: "Contact",
    element: <Contact />,
    nodeRef: createRef(),
  },
];

const Example = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};
  return (
    <>
      <Navbar bg="light">
        <Nav className="mx-auto">
          {routes.map((route) => (
            <Nav.Link
              key={route.path}
              as={NavLink}
              to={route.path}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              {route.name}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
      <Container className="container">
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className="page">
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Example />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
