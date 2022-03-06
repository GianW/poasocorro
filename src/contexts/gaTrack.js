import ReactGA from "react-ga";

const TRACKING_ID = "UA-57710189-1";
ReactGA.initialize(TRACKING_ID);

export const gaTrack = ReactGA;

export const pageView = gaTrack.pageview(
  window.location.pathname + window.location.search
);
