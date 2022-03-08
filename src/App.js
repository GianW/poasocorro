import * as React from "react";
import { AppRouter } from "./components/AppRouter";
import { gaTrack } from "./contexts/gaTrack";

export default function App() {
  React.useEffect(() => {
    gaTrack.pageview(window.location.pathname + window.location.search);
  }, []);

  return <AppRouter />;
}
