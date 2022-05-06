import { createPortal } from 'react-dom';

interface SVGSpriteProps {}

function SVGSprite(prop: SVGSpriteProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" display="none">
      <symbol id="heart" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M10.604 6.133a3.869 3.869 0 0 0-5.47 5.471L12 18.471l6.867-6.867a3.869 3.869 0 0 0-5.471-5.47l-.689.688a1 1 0 0 1-1.414 0l-.689-.689zM12 4.7a5.869 5.869 0 0 0-8.281 8.319l7.574 7.574a1 1 0 0 0 1.414 0l7.574-7.574A5.869 5.869 0 0 0 12 4.7z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="video" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M6 8a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H6zM3 9a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M17.75 7.519C19.06 6.47 21 7.404 21 9.08v5.838c0 1.677-1.94 2.61-3.25 1.562l-3-2.4a2 2 0 0 1-.75-1.56v-1.038a2 2 0 0 1 .75-1.562l3-2.4zM19 9.08l-3 2.4v1.038l3 2.4V9.081z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="home" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M10.586 4a2 2 0 0 1 2.828 0L16.5 7.086V6a1 1 0 1 1 2 0v3.086l2.207 2.207a1 1 0 0 1-1.414 1.414l-.07-.07V18a3 3 0 0 1-3 3H7.777a3 3 0 0 1-3-3v-5.364l-.07.071a1 1 0 0 1-1.415-1.414L10.586 4zm-3.808 6.636V18a1 1 0 0 0 1 1H11v-4a1 1 0 1 1 2 0v4h3.222a1 1 0 0 0 1-1v-7.364L12 5.414l-5.222 5.222z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="user" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7zm3 8a4 4 0 0 0-4 4v1a1 1 0 1 1-2 0v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1a1 1 0 1 1-2 0v-1a4 4 0 0 0-4-4h-4z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="warning" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="17" r="1" fill="#DC3232" />
        <path d="M12 10L12 14" stroke="#DC3232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path
          fillRule="evenodd"
          d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z"
          stroke="#DC3232"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipRule="evenodd"
        />
      </symbol>
    </svg>
  );
}

export default SVGSprite;
