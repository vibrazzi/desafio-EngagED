import { createGlobalStyle, DefaultTheme } from 'styled-components';

const GlobalStyles = createGlobalStyle<{ theme: DefaultTheme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: 1.6;
    transition: background-color 0.3s, color 0.3s;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.link};
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.linkHover};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.buttonHover};
    }
  }
`;

export default GlobalStyles;
