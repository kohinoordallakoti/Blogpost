import React from "react";
import { Routes, Route } from "react-router-dom";
import publicRoutes from "./routes/Publicroutes";
import privateRoutes from "./routes/Privateroutes";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element}>
          {route.children?.map((child, j) => (
            <Route key={j} index={child.index} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}

      {/* Private routes */}
      {privateRoutes.map((route, i) => (
        <Route key={i} element={route.element}>
          {route.children?.map((child, j) =>
            child.children ? (
              <Route key={j} path={child.path} element={child.element}>
                {child.children.map((grand, k) => (
                  <Route key={k} path={grand.path} element={grand.element} />
                ))}
              </Route>
            ) : (
              <Route key={j} path={child.path} element={child.element} />
            )
          )}
        </Route>
      ))}
    </Routes>
  );
};

export default App;
