import { renderToStaticMarkup } from "react-dom/server";
import { ReactElement } from "react";

const iconColor = "white";

function encodeSvg(reactElement: ReactElement) {
  return `url(data:image/svg+xml,${escape(renderToStaticMarkup(reactElement))})`;
}

// test
function encodeSvg2(reactElement: ReactElement) {
  return `data:image/svg+xml,${escape(renderToStaticMarkup(reactElement))}`;
}

function CommonIcon(props: any) {
  const path = props.path;
  const path2 = props.path2;
  const color = props.color;
  return (
    <svg
      id="myID"
      style={{ color: iconColor, height: "100px" }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      focusable="false"
      height={40}
      width={40}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 20 20"
    >
      <rect width="20" height="20" rx="5" ry="5" fill={color} />
      <path d={path} fill="currentColor" />
      <path d={path2} fill="currentColor" />
    </svg>
  );
}

// test
function CommonIcon2(props: any) {
  const path = props.path;
  const path2 = props.path2;
  const color = props.color;
  return (
    <svg
      id="myID"
      style={{ color: color, height: "100px" }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      focusable="false"
      height={40}
      width={40}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 512 512"
    >
      <rect width="512" height="512" rx="10" ry="10" fill={iconColor} />
      <path d={path} fill="currentColor" />
      <path d={path2} fill="currentColor" />
    </svg>
  );
}

export const startIcon = (color: string) => {
  return encodeSvg(
    <CommonIcon
      color={color}
      path="M17.22 8.687a1.498 1.498 0 0 1 0 2.626l-9.997 5.499A1.5 1.5 0 0 1 5 15.499V4.501a1.5 1.5 0 0 1 2.223-1.313l9.997 5.499zm-.482 1.75a.5.5 0 0 0 0-.875L6.741 4.063A.5.5 0 0 0 6 4.501v10.998a.5.5 0 0 0 .741.438l9.997-5.5z"
    />
  );
};
export const endIcon = (color: string) => {
  return encodeSvg(
    <CommonIcon
      color={color}
      path="M15.5 4a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3h-11z"
    />
  );
};

export const bottleIcon = (color: string) => {
  return encodeSvg(
    <CommonIcon
      color={color}
      path="M10.002 4.43a.5.5 0 0 1 .566-.425a2.86 2.86 0 0 1 2.424 2.421a.5.5 0 0 1-.99.143a1.86 1.86 0 0 0-1.575-1.574a.5.5 0 0 1-.425-.565z"
      path2="M5 7a5 5 0 0 1 10 0a8.313 8.313 0 0 1-1.598 4.859c-.791 1.074-1.837 1.892-2.902 2.093V14a1 1 0 0 0 1 1H14a2 2 0 0 1 2 2v.5a.5.5 0 0 1-1 0V17a1 1 0 0 0-1-1h-2.5a2 2 0 0 1-2-2v-.048c-1.065-.2-2.11-1.017-2.902-2.091A8.311 8.311 0 0 1 5 7zm5-4a4 4 0 0 0-4 4c0 1.637.585 3.16 1.402 4.268C8.237 12.399 9.232 13 10 13c.768 0 1.763-.602 2.598-1.734A7.313 7.313 0 0 0 14 7a4 4 0 0 0-4-4z"
    />
  );
};

export const umbrellaIcon = (color: string) => {
  return encodeSvg(
    <CommonIcon
      color={color}
      path="M8.263 4.608a5.214 5.214 0 0 1 9.032 5.214l-.197.34a.5.5 0 0 1-.683.183l-3.465-2l-1.931 3.38c1.34.407 2.492 1.331 3.315 2.528a1.499 1.499 0 0 0-1.01.307c-.96-1.254-2.336-2.06-3.824-2.06s-2.864.806-3.824 2.06a1.498 1.498 0 0 0-1.01-.307C5.786 12.625 7.513 11.5 9.5 11.5c.163 0 .324.008.483.022l2.101-3.677L8.25 5.63a.5.5 0 0 1-.183-.683l.196-.34zm.921.408l1.703.983a.596.596 0 0 1 .011-.017c.536-.741 1.04-1.31 1.699-1.808a9.21 9.21 0 0 1 1.574-.938a4.216 4.216 0 0 0-4.987 1.78zm4.82 2.782c.465-.816.688-1.46.766-2.085c.063-.503.035-1.016-.059-1.627c-.629.299-1.106.579-1.51.885c-.536.406-.963.873-1.444 1.53l2.247 1.297zm.866.5l1.611.93a4.216 4.216 0 0 0-.742-5.014c.071.56.09 1.088.023 1.623c-.099.791-.38 1.563-.892 2.461zm-9.632 7.295a.5.5 0 0 0-.96.038c-.17.695-.492 1.076-.859 1.297c-.384.232-.873.322-1.419.322a.5.5 0 0 0 0 1c.638 0 1.333-.102 1.936-.465a2.66 2.66 0 0 0 .884-.873c1.193 1.521 3.522 1.514 4.68-.016c1.177 1.554 3.56 1.537 4.735-.057A3.46 3.46 0 0 0 17 18.25a.5.5 0 0 0 0-1c-.983 0-1.963-.64-2.287-1.652a.5.5 0 0 0-.95-.005c-.643 1.939-3.16 1.914-3.79.08a.5.5 0 0 0-.946 0c-.63 1.834-3.147 1.859-3.79-.08z"
    />
  );
};

export const bookIcon = (color: string) => {
  return encodeSvg(
    <CommonIcon
      color={color}
      path="M10 16c-.456.607-1.182 1-2 1H3.5A1.5 1.5 0 0 1 2 15.5v-11A1.5 1.5 0 0 1 3.5 3H8c.818 0 1.544.393 2 1c.456-.607 1.182-1 2-1h4.5A1.5 1.5 0 0 1 18 4.5v11a1.5 1.5 0 0 1-1.5 1.5H12a2.496 2.496 0 0 1-2-1zM3 4.5v11a.5.5 0 0 0 .5.5H8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 8 4H3.5a.5.5 0 0 0-.5.5zm7.5 10A1.5 1.5 0 0 0 12 16h4.5a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5H12a1.5 1.5 0 0 0-1.5 1.5v9z"
    />
  );
};

export const hatIcon = (color: string) => {
  return encodeSvg(
    <CommonIcon
      color={color}
      path="M8.506 3.401a3 3 0 0 1 2.988 0l7.255 4.166a.5.5 0 0 1 0 .867L16 10.012V14.5a.5.5 0 0 1-.146.354l-.002.001l-.002.003l-.007.006l-.023.022l-.08.074c-.07.061-.17.147-.301.248a8.104 8.104 0 0 1-1.141.733A9.092 9.092 0 0 1 10 17.001a9.092 9.092 0 0 1-4.298-1.06a8.1 8.1 0 0 1-1.14-.733a5.832 5.832 0 0 1-.382-.322A.532.532 0 0 1 4 14.5v-4.488L2 8.864V13.5a.5.5 0 1 1-1 0V8a.5.5 0 0 1 .26-.439l7.246-4.16zm2.988 9.198a3 3 0 0 1-2.988 0L5 10.586v3.691a7.11 7.11 0 0 0 1.173.782c.88.47 2.175.941 3.827.941a8.093 8.093 0 0 0 3.827-.94A7.106 7.106 0 0 0 15 14.276v-3.69l-3.506 2.012zm-.498-8.33a2 2 0 0 0-1.992 0L2.504 8l6.5 3.732a2 2 0 0 0 1.992 0L17.496 8l-6.5-3.732z"
    />
  );
};

// test
export const homeIcon = (color: string) => {
  return encodeSvg2(
    <CommonIcon2
      color={color}
      path="m498.699219 222.695312c-.015625-.011718-.027344-.027343-.039063-.039062l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.808594-33.328126-13.808594-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.144532.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.441406 13.234375 31.273437 13.746093.484375.046876.96875.070313 1.457031.070313h8.320313v153.695313c0 30.417968 24.75 55.164062 55.167969 55.164062h81.710937c8.285157 0 15-6.71875 15-15v-120.5c0-13.878906 11.292969-25.167969 25.171875-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.28125 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.164062v-153.695313h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.8125 18.359375-18.367187 18.367187-48.253906.027344-66.632813zm-21.242188 45.421876c-3.238281 3.238281-7.542969 5.023437-12.117187 5.023437h-22.71875c-8.285156 0-15 6.714844-15 15v168.695313c0 13.875-11.289063 25.164062-25.167969 25.164062h-66.710937v-105.5c0-30.417969-24.746094-55.167969-55.167969-55.167969h-48.195313c-30.421875 0-55.171875 24.75-55.171875 55.167969v105.5h-66.710937c-13.875 0-25.167969-11.289062-25.167969-25.164062v-168.695313c0-8.285156-6.714844-15-15-15h-22.328125c-.234375-.015625-.464844-.027344-.703125-.03125-4.46875-.078125-8.660156-1.851563-11.800781-4.996094-6.679688-6.679687-6.679688-17.550781 0-24.234375.003906 0 .003906-.003906.007812-.007812l.011719-.011719 208.847656-208.839844c3.234375-3.238281 7.535157-5.019531 12.113281-5.019531 4.574219 0 8.875 1.78125 12.113282 5.019531l208.800781 208.796875c.03125.03125.066406.0625.097656.09375 6.644531 6.691406 6.632813 17.539063-.03125 24.207032zm0 0"
    />
  );
};
export const partyIcon = (color: string) => {
  return encodeSvg2(
    <CommonIcon2
      color={color}
      path="M108.052,104.435a9.386,9.386,0,0,0-2.3.294L90.687,71.855h0v0l-7.6-16.578h0L68.568,23.6a10.1,10.1,0,0,0,5.321-7.074c3.778.31,8.09,2.612,9.924,10.689a1.75,1.75,0,0,0,1.7,1.363,1.73,1.73,0,0,0,.388-.044,1.75,1.75,0,0,0,1.32-2.094C84.8,15.738,78.42,13.313,73.932,13.018A10.024,10.024,0,0,0,73.3,10.77C79.194,8.588,84.632,9.8,89.485,14.4a1.75,1.75,0,0,0,2.407-2.54C84.421,4.775,76.8,5.546,71.353,7.767A10.062,10.062,0,1,0,59.432,23.6L22.245,104.728a9.5,9.5,0,1,0,4,16.322,9.471,9.471,0,0,0,12.586,0,9.484,9.484,0,0,0,12.586.009A9.486,9.486,0,0,0,64,121.05a9.486,9.486,0,0,0,12.586.01,9.487,9.487,0,0,0,12.587-.01,9.471,9.471,0,0,0,12.586,0,9.5,9.5,0,1,0,6.293-16.615Zm-5.477,1.755a9.425,9.425,0,0,0-.816.638,9.471,9.471,0,0,0-12.586,0,9.486,9.486,0,0,0-12.587-.009A9.484,9.484,0,0,0,64,106.828a9.6,9.6,0,0,0-1.062-.8L95.816,91.444ZM50.382,51.742,73.017,41.7l6.142,13.4L41.106,71.978ZM38.9,76.783l41.713-18.5,6.141,13.4L29.628,97.02ZM57.427,14.63A6.573,6.573,0,1,1,64,21.2,6.58,6.58,0,0,1,57.427,14.63ZM64,24.7a9.951,9.951,0,0,0,1.19-.077l6.369,13.9L52.584,46.936,62.81,24.626A9.951,9.951,0,0,0,64,24.7ZM27.425,101.825,88.217,74.864l6.141,13.4L57.874,104.443c-.056,0-.111-.008-.167-.008a9.535,9.535,0,0,0-6.293,2.384,9.486,9.486,0,0,0-12.587.009,9.471,9.471,0,0,0-12.586,0,9.581,9.581,0,0,0-.816-.638Zm80.627,18.118a6.019,6.019,0,0,1-4.872-2.507,1.751,1.751,0,0,0-2.841,0,5.987,5.987,0,0,1-9.745,0,1.816,1.816,0,0,0-2.842,0,6,6,0,0,1-9.745.012,1.748,1.748,0,0,0-1.419-.728h0a1.751,1.751,0,0,0-1.419.727,6,6,0,0,1-9.747-.011,1.816,1.816,0,0,0-2.842,0,6,6,0,0,1-9.745.012,1.751,1.751,0,0,0-1.419-.727h0a1.75,1.75,0,0,0-1.419.726,6,6,0,0,1-9.747-.011,1.816,1.816,0,0,0-2.842,0,5.987,5.987,0,0,1-9.745,0,1.814,1.814,0,0,0-2.841,0,6,6,0,1,1,0-6.994,1.749,1.749,0,0,0,2.841,0,5.987,5.987,0,0,1,9.745,0,1.816,1.816,0,0,0,2.842,0,6,6,0,0,1,9.713-.056,1.948,1.948,0,0,0,.119.156,1.751,1.751,0,0,0,2.783-.153,6,6,0,0,1,9.716.053,1.816,1.816,0,0,0,2.842,0,6,6,0,0,1,9.733-.028,1.784,1.784,0,0,0,.2.232,1.75,1.75,0,0,0,2.371.1,1.782,1.782,0,0,0,.332-.376,6,6,0,0,1,9.7.076,1.816,1.816,0,0,0,2.842,0,5.987,5.987,0,0,1,9.745,0,1.814,1.814,0,0,0,2.841,0,6,6,0,1,1,4.872,9.5Z"
    />
  );
};
