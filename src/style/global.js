import { injectGlobal } from 'emotion';

injectGlobal`
  a {
    color: black;
    text-decoration-skip: ink;
  }

  a:hover {
    text-decoration: none;
  }
`;
