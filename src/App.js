import * as React from "react";
import { Main } from "./components/Main";
import { pageView } from "./contexts/gaTrack";

export default function App() {
  React.useEffect(() => {
    pageView();
  }, []);

  return <Main />;
}
