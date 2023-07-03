import ReactGA from "react-ga";

const TRACKING_ID = "G-V74WZS2RM8";
ReactGA.initialize(TRACKING_ID);

export const gaTrack = ReactGA;
