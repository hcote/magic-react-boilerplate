import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import '@magiclabs/ui/dist/cjs/index.css';
import { ThemeProvider } from '@magiclabs/ui';

import "./styles.css";

render(
  <ThemeProvider root>
    <App />
  </ThemeProvider>, 
  document.getElementById("root")
);
