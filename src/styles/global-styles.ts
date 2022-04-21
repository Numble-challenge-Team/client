import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
      ${reset}
      * {
        box-sizing: border-box;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      input, button {
        background-color: transparent;
        border: none;
        outline: none;
      }
      /* h1, h2, h3, h4, h5, h6{
        font-family:'Maven Pro', sans-serif;
      } */
      ol, ul {
        list-style: none;
      }
    `;

export default GlobalStyle;
