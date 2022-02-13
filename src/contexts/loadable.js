import Loadable from "react-loadable";

export const Main = Loadable({
  loader: () => import("components/Layout/Layout"),
  loading: true
});
