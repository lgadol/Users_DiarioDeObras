import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
    overflow-x: hidden;
    min-height: 100vh !important;
    position: relative !important;
  }

  body.dark-mode {
    filter: invert(1) hue-rotate(180deg);
    background-color: #121212;
    color: black;
  }

  body.dark-mode img {
    filter: invert(1) hue-rotate(180deg);
  }
`;

export default Global;