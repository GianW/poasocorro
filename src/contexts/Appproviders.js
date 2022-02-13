import React from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "./ThemeContext";

export const AppProviders = ({ children }) => (
  <ThemeContext>{children}</ThemeContext>
);

AppProviders.propTypes = {
  children: PropTypes.node
};
