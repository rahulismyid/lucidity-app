import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/store";

const InventoryLayout = React.lazy(() => import("./layouts/InventoryLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...{/* fallback UI */}</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InventoryLayout />}>
              <Route path="dashboard" element={<Dashboard />} />{" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}

export default App;
