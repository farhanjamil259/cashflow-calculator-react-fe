import {renderToStaticMarkup} from "react-dom/server";
import {ReactElement} from "react";

export function encodeSvg(reactElement: ReactElement) {
    return `url(data:image/svg+xml,${escape(renderToStaticMarkup(reactElement))})`;
}

export  const startIcon = encodeSvg(
    <svg
        style={{ backgroundColor: "red", color: "black" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        focusable="false"
        width="50"
        height="50"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <rect
            width="24"
            height="24"
            fill="rgba(0, 0, 0, 0)"
            style={{ strokeWidth: "1", stroke: "rgb(0,0,0)" }}
        />
        <path
            d="M5 5.274c0-1.707 1.826-2.792 3.325-1.977l12.362 6.726c1.566.853 1.566 3.101 0 3.953L8.325 20.702C6.826 21.518 5 20.432 5 18.726V5.274z"
            fill="currentColor"
        />
     </svg>
)
export  const endIcon = encodeSvg(
    <svg
        style={{ backgroundColor: "red", color: "black" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        focusable="false"
        width="50"
        height="50"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <rect
            width="24"
            height="24"
            fill="rgba(0, 0, 0, 0)"
            style={{ strokeWidth: "1", stroke: "rgb(0,0,0)" }}
        />
        <path
            d="M4.75 3A1.75 1.75 0 0 0 3 4.75v14.5c0 .966.784 1.75 1.75 1.75h14.5A1.75 1.75 0 0 0 21 19.25V4.75A1.75 1.75 0 0 0 19.25 3H4.75z"
            fill="currentColor"
        />
     </svg>
)

export  const bottleIcon = encodeSvg(
    <svg
        style={{ backgroundColor: "red", color: "black" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        focusable="false"
        width="50"
        height="50"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <rect
            width="24"
            height="24"
            fill="rgba(0, 0, 0, 0)"
            style={{ strokeWidth: "1", stroke: "rgb(0,0,0)" }}
        />
        <path
            d="M11.28 2.8l-.5.5a5.5 5.5 0 0 0-4.37-.43l-.08-.07A2.5 2.5 0 0 0 2.8 6.33l.07.08a5.5 5.5 0 0 0 .43 4.37l-.5.5a1.5 1.5 0 0 0 0 2.12l1.41 1.42a1.5 1.5 0 0 0 2.12 0l.35-.36l7.08 7.07a1.5 1.5 0 0 0 2.12 0l5.65-5.65a1.5 1.5 0 0 0 0-2.12l-7.07-7.08l.36-.35a1.5 1.5 0 0 0 0-2.12L13.4 2.8a1.5 1.5 0 0 0-2.12 0m2.48 2.47l-8.49 8.49l-1.41-1.42l8.48-8.48m2.48 7.77l-3.19 3.19l-1.06-1.06l3.19-3.19m3.18 3.19l-3.18 3.18l-1.07-1.06l3.19-3.19z"
            fill="currentColor"
        />
     </svg>
)

export  const umbrellaIcon = encodeSvg(
    <svg
        style={{ backgroundColor: "red", color: "black" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        focusable="false"
        width="50"
        height="50"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 64 64"
    >
        <rect
            width="64"
            height="64"
            fill="rgba(0, 0, 0, 0)"
            style={{ strokeWidth: "1", stroke: "rgb(0,0,0)" }}
        />
        <path
            d="M32.938 6.708v-3.77a.937.937 0 1 0-1.876 0v3.77C16.781 7.126 4.957 17.053 2 30.229A9.675 9.675 0 0 1 8.963 27.3a9.654 9.654 0 0 1 7.68 3.763a9.647 9.647 0 0 1 7.678-3.763c2.637 0 5.01 1.05 6.742 2.729v18.846h-.938V54.5a3.755 3.755 0 0 1-3.75 3.75a3.756 3.756 0 0 1-3.75-3.75a1.874 1.874 0 1 0-3.75 0c0 4.136 3.365 7.5 7.5 7.5c4.137 0 7.5-3.364 7.5-7.5v-5.625h-.938V30.029a9.652 9.652 0 0 1 6.742-2.729a9.652 9.652 0 0 1 7.68 3.763a9.65 9.65 0 0 1 7.68-3.763A9.67 9.67 0 0 1 62 30.229C59.045 17.053 47.221 7.126 32.938 6.708"
            fill="currentColor"
        />
     </svg>
)

export  const bookIcon = encodeSvg(
    <svg
        style={{ backgroundColor: "red", color: "black" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        focusable="false"
        width="50"
        height="50"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <rect
            width="24"
            height="24"
            fill="rgba(0, 0, 0, 0)"
            style={{ strokeWidth: "1", stroke: "rgb(0,0,0)" }}
        />
        <path
            d="M19 2l-5 4.5v11l5-4.5V2M6.5 5C4.55 5 2.45 5.4 1 6.5v14.66c0 .25.25.5.5.5c.1 0 .15-.07.25-.07c1.35-.65 3.3-1.09 4.75-1.09c1.95 0 4.05.4 5.5 1.5c1.35-.85 3.8-1.5 5.5-1.5c1.65 0 3.35.31 4.75 1.06c.1.05.15.03.25.03c.25 0 .5-.25.5-.5V6.5c-.6-.45-1.25-.75-2-1V19c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V6.5C10.55 5.4 8.45 5 6.5 5z"
            fill="currentColor"
        />
     </svg>
)

export  const hatIcon = encodeSvg(
    <svg
        style={{ backgroundColor: "red", color: "black" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        focusable="false"
        width="50"
        height="50"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <rect
            width="24"
            height="24"
            fill="rgba(0, 0, 0, 0)"
            style={{ strokeWidth: "1", stroke: "rgb(0,0,0)" }}
        />
        <path
            d="M5 17.75v-3.766l4.06 2.653a5.375 5.375 0 0 0 5.88 0L19 13.984v3.766a.75.75 0 0 1-.15.45l-.001.001l-.001.002l-.003.004l-.009.01l-.012.016l-.013.017l-.086.101a5.325 5.325 0 0 1-.317.33c-.277.267-.69.614-1.25.958C16.037 20.329 14.339 21 12 21c-2.339 0-4.036-.67-5.159-1.361a7.433 7.433 0 0 1-1.25-.957a5.313 5.313 0 0 1-.427-.464l-.009-.01l-.003-.005v-.002A.755.755 0 0 1 5 17.75z" fill="#626262"/><path d="M22.16 10.128l-8.04 5.253a3.875 3.875 0 0 1-4.24 0L3 10.886v5.364a.75.75 0 0 1-1.5 0V10c0-.088.015-.172.043-.25a.75.75 0 0 1 .302-.881l8.064-5.17a3.875 3.875 0 0 1 4.182 0l8.064 5.17a.75.75 0 0 1 .005 1.259z"
            fill="currentColor"
        />
     </svg>
)
