import * as React from "react";
import { AppProviders } from "./contexts/Appproviders";
import { Main } from "./components/Main/Main";

export default function App() {
  return (
    <AppProviders>
      <Main />
    </AppProviders>
  );
}
