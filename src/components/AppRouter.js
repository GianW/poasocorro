import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { Details } from "./Details";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/details/:nome" element={<Details />} />
      <Route path="*" element={<Main />} />
    </Routes>
  </BrowserRouter>
);
