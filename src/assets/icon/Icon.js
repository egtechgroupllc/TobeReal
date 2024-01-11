import * as React from 'react';
import Svg, {
  Path,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  G,
  ClipPath,
  Circle,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import {COLORS, scale} from '../constants';

export function IconExplore({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_99_2042)" fill="#F0B90B">
        <Path d="M19.435 19.432c-.56.563-1.29.735-1.634.39l-.642-.646 2-2.054.667.668c.343.345.168 1.08-.388 1.642h-.003zM18.59 16.478l-4.148-4.17a7.917 7.917 0 001.319-4.382C15.76 3.546 12.232 0 7.88 0 3.526 0-.068 3.547 0 7.923c.066 4.457 3.58 7.985 7.88 7.923 1.706-.025 3.281-.55 4.572-1.475l4.142 4.165 2-2.055-.004-.003zm-5.17-8.446c0 3.076-2.48 5.57-5.54 5.57s-5.54-2.494-5.54-5.57c0-3.077 2.48-5.571 5.54-5.571s5.54 2.494 5.54 5.57z" />
        <Path d="M7.92 13.174c-2.828 0-5.129-2.314-5.129-5.156 0-2.843 2.301-5.153 5.128-5.153s5.128 2.313 5.128 5.156c0 2.842-2.3 5.156-5.128 5.156v-.003zm0-10.025c-2.673 0-4.846 2.185-4.846 4.872 0 2.686 2.173 4.872 4.845 4.872 2.672 0 4.846-2.186 4.846-4.872 0-2.687-2.174-4.872-4.846-4.872z" />
      </G>
      <Defs>
        <ClipPath id="clip0_99_2042">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function IconExploreInactive({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_99_2048)">
        <Path
          d="M19.435 19.432c-.56.563-1.29.735-1.634.39l-.642-.646 2-2.054.667.668c.343.345.168 1.08-.388 1.642h-.003zM18.59 16.478l-4.148-4.17a7.917 7.917 0 001.319-4.382C15.76 3.546 12.232 0 7.88 0 3.526 0-.068 3.547 0 7.923c.066 4.457 3.58 7.985 7.88 7.923 1.706-.025 3.281-.55 4.572-1.475l4.142 4.165 2-2.055-.004-.003zm-5.17-8.446c0 3.076-2.48 5.57-5.54 5.57s-5.54-2.494-5.54-5.57c0-3.077 2.48-5.571 5.54-5.571s5.54 2.494 5.54 5.57z"
          fill="#000"
        />
        <Path
          d="M7.92 13.174c-2.828 0-5.129-2.314-5.129-5.156 0-2.843 2.301-5.153 5.128-5.153s5.128 2.313 5.128 5.156c0 2.842-2.3 5.156-5.128 5.156v-.003zm0-10.025c-2.673 0-4.846 2.185-4.846 4.872 0 2.686 2.173 4.872 4.845 4.872 2.672 0 4.846-2.186 4.846-4.872 0-2.687-2.174-4.872-4.846-4.872z"
          fill="#4D4E50"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_99_2048">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function IconBookings({fill, ...props}) {
  return (
    <Svg
      width={scale(17)}
      height={scale(21)}
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_99_2053)">
        <Path
          d="M1.243 0C.558 0 0 .561 0 1.251v18.494c0 .69.558 1.252 1.243 1.252h11.096V18.54a1.96 1.96 0 011.952-1.965H17V1.25C17 .561 16.442 0 15.757 0H1.243zM13.76 11.456H3.24v-.862h10.517v.862h.003zm0-3.014H3.24v-.863h10.517v.863h.003zm0-3.015H3.24v-.863h10.517v.863h.003z"
          fill="#F0B90B"
        />
        <Path
          d="M13.048 18.54v1.985l3.411-3.24h-2.168c-.686 0-1.243.561-1.243 1.251v.004z"
          fill="#4D4E50"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_99_2053">
          <Path fill="#fff" d="M0 0H17V21H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function IconBookingsInactive({fill, ...props}) {
  return (
    <Svg
      width={scale(17)}
      height={scale(21)}
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_99_2057)">
        <Path
          d="M1.243 0C.558 0 0 .561 0 1.251v18.494c0 .69.558 1.252 1.243 1.252h11.096V18.54a1.96 1.96 0 011.952-1.965H17V1.25C17 .561 16.442 0 15.757 0H1.243zM13.76 11.456H3.24v-.862h10.517v.862h.003zm0-3.014H3.24v-.863h10.517v.863h.003zm0-3.015H3.24v-.863h10.517v.863h.003z"
          fill="#000"
        />
        <Path
          d="M13.048 18.54v1.985l3.411-3.24h-2.168c-.686 0-1.243.561-1.243 1.251v.004z"
          fill="#4D4E50"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_99_2057">
          <Path fill="#fff" d="M0 0H17V21H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function IconSearch({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.325 3.325a7.317 7.317 0 000 10.348C7.94 18.288 15.817 14.966 15.817 8.5A7.317 7.317 0 003.325 3.325zm11.588 10.752l4.907 4.907c.55.55-.286 1.386-.836.836l-4.907-4.907a8.5 8.5 0 11.836-.836z"
        fill={fill || '#000'}
      />
    </Svg>
  );
}

export function IconCity({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M19.355 19.355v-4.839a.323.323 0 00-.323-.322h-.322V1.613a.323.323 0 00-.323-.323h-.968V.323A.323.323 0 0017.097 0h-3.871a.323.323 0 00-.323.323v.967h-.968a.323.323 0 00-.322.323v5.484H9.355a.323.323 0 00-.323.322v5.807h-.645v-6.13a.323.323 0 00-.322-.322h-.988A2.58 2.58 0 004.84 4.54V3.226h-.645v1.313a2.58 2.58 0 00-2.24 2.235H.969a.323.323 0 00-.323.323v12.258H0V20h20v-.645h-.645zm-5.162-16.13v3.872h-.645V3.226h.646zm.646 4.194V3.226h.645v10.968h-.645V7.418zm1.29 6.775V3.226h.645v10.968h-.645zm2.58.645v4.516h-5.483v-4.516h5.484zm-1.29-.646V3.226h.645v10.968h-.645zM13.226 1.936a.322.322 0 00.322-.322V.645h3.226v.968a.323.323 0 00.323.322h.967v.646h-5.806v-.646h.968zm-.968 1.29h.645v3.872h-.645V3.226zm-2.58 4.517h4.515v6.452h-1.29a.323.323 0 00-.322.322v4.839h-1.29v-5.807a.323.323 0 00-.323-.322h-1.29V7.742zm.967 11.613H5.484V13.87h5.161v5.484zM4.516 5.16a1.935 1.935 0 011.936 1.936.323.323 0 00.322.322h.968v3.871h-.484a.484.484 0 01-.484-.483 1.129 1.129 0 00-1.129-1.13h-.968a.484.484 0 01-.483-.483 1.129 1.129 0 00-1.13-1.13.484.484 0 01-.483-.483v-.484A1.935 1.935 0 014.516 5.16zM1.29 7.42h.645v.162a1.13 1.13 0 001.13 1.129.484.484 0 01.483.484 1.129 1.129 0 001.13 1.129h.967a.487.487 0 01.455.322h-.939a.323.323 0 00-.322.323v1.29a.323.323 0 00.322.323h1.29a.322.322 0 00.323-.323v-.435c.15.073.316.112.484.112h.484v1.29h-2.58a.323.323 0 00-.323.323v5.807H1.29V7.419zM6.13 11.29v.646h-.645v-.646h.645z"
        fill={fill || '#474747'}
      />
      <Path
        d="M3.871 10.645h-1.29a.323.323 0 00-.323.323v1.29a.323.323 0 00.323.323h1.29a.323.323 0 00.323-.323v-1.29a.322.322 0 00-.323-.323zm-.323 1.29h-.645v-.645h.645v.646zM3.871 13.226h-1.29a.323.323 0 00-.323.322v1.29a.322.322 0 00.323.323h1.29a.323.323 0 00.323-.322v-1.29a.323.323 0 00-.323-.323zm-.323 1.29h-.645v-.645h.645v.645zM3.871 15.806h-1.29a.322.322 0 00-.323.323v1.29a.323.323 0 00.323.323h1.29a.323.323 0 00.323-.323v-1.29a.323.323 0 00-.323-.323zm-.323 1.29h-.645v-.644h.645v.645zM7.097 14.516h-.645v1.29h.645v-1.29zM8.387 14.516h-.645v1.29h.645v-1.29zM9.677 14.516h-.645v1.29h.645v-1.29zM7.097 16.452h-.645v1.29h.645v-1.29zM8.387 16.452h-.645v1.29h.645v-1.29zM9.677 16.452h-.645v1.29h.645v-1.29zM18.064 15.484h-4.193v.645h4.193v-.645zM18.064 16.774h-4.193v.645h4.193v-.645zM18.064 18.064h-4.193v.646h4.193v-.646zM13.548 8.387h-3.225v.645h3.225v-.645zM13.548 9.677h-3.225v.646h3.225v-.646zM13.548 10.968h-3.225v.645h3.225v-.645zM13.548 12.258h-3.225v.645h3.225v-.645zM8.387 5.484a.968.968 0 100-1.935.968.968 0 000 1.935zm0-1.29a.323.323 0 110 .645.323.323 0 010-.645zM1.935 2.903a.968.968 0 100-1.935.968.968 0 000 1.935zm0-1.29a.323.323 0 110 .645.323.323 0 010-.645z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}

export function IconApartment({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(17)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M.578 19.42H0V20h15.055v-.58h-.326v-2.767a.198.198 0 00-.198-.198h-2.235a.198.198 0 00-.199.198v2.768H7.89v-3.922a.266.266 0 00-.266-.263H3.246a.265.265 0 00-.266.263v3.921H0V.422A.462.462 0 01.459 0h9.947a.46.46 0 01.326.137l.02.02a.46.46 0 01.118.309v5.16h5.733a.39.39 0 01.389.387v13.72a.265.265 0 01-.265.265h-1.672v-.58h1.385V6.185h-5.568v13.24h-.58V.578H.578V19.42zm13.76 0h-1.843v-2.575h1.844v2.576zM13.91 7.324h1.434c.011 0 .021.016.021.036v.93c0 .016-.01.034-.021.034h-1.434c-.011 0-.021-.015-.021-.035V7.36c0-.02.01-.036.021-.036zm0 6.446h1.434c.011 0 .021.016.021.034v.93c0 .018-.01.035-.021.035h-1.434c-.011 0-.021-.016-.021-.035v-.93c0-.018.01-.034.021-.034zm-2.417 0h1.432c.013 0 .023.016.023.034v.93c0 .018-.01.035-.023.035h-1.432c-.013 0-.023-.016-.023-.035v-.93c0-.018.01-.034.023-.034zm2.417-2.149h1.434c.011 0 .021.017.021.036v.93c0 .018-.01.035-.021.035h-1.434c-.011 0-.021-.016-.021-.035v-.93c0-.02.01-.036.021-.036zm0-2.148h1.434c.011 0 .021.016.021.036v.929c0 .018-.01.036-.021.036h-1.434c-.011 0-.021-.016-.021-.036v-.93c0-.019.01-.035.021-.035zm-2.417-2.149h1.432c.013 0 .023.016.023.036v.93c0 .016-.01.034-.023.034h-1.432c-.013 0-.023-.015-.023-.035V7.36c0-.02.01-.036.023-.036zm0 4.297h1.432c.013 0 .023.017.023.036v.93c0 .018-.01.035-.023.035h-1.432c-.013 0-.023-.016-.023-.035v-.93c0-.02.01-.036.023-.036zm0-2.148h1.432c.013 0 .023.016.023.036v.929c0 .018-.01.036-.023.036h-1.432c-.013 0-.023-.016-.023-.036v-.93c0-.019.01-.035.023-.035zM7.359 19.42H3.511v-3.656h3.848v3.655zM1.974 2.035h1.56a.046.046 0 01.044.044v1.561a.046.046 0 01-.044.044h-1.56a.046.046 0 01-.043-.044v-1.56a.046.046 0 01.043-.045zm5.362 0h1.56a.046.046 0 01.044.044v1.561a.046.046 0 01-.044.044h-1.56a.046.046 0 01-.044-.044v-1.56a.046.046 0 01.044-.045zm-2.68 0h1.559a.046.046 0 01.044.044v1.561a.046.046 0 01-.044.044h-1.56a.046.046 0 01-.044-.044v-1.56a.046.046 0 01.044-.045zm-2.682 3.38h1.56a.046.046 0 01.044.043V7.02a.046.046 0 01-.044.044h-1.56a.046.046 0 01-.043-.044V5.46a.046.046 0 01.043-.045zm5.362 0h1.56a.046.046 0 01.044.043V7.02a.046.046 0 01-.044.044h-1.56a.046.046 0 01-.044-.044V5.46a.046.046 0 01.044-.045zm-2.68 0h1.559a.046.046 0 01.044.043V7.02a.046.046 0 01-.044.044h-1.56a.046.046 0 01-.044-.044V5.46a.046.046 0 01.044-.045zm-2.682 6.758h1.56a.044.044 0 01.044.044v1.56a.044.044 0 01-.044.043h-1.56a.044.044 0 01-.043-.044v-1.56a.044.044 0 01.043-.043zm5.362 0h1.56a.044.044 0 01.044.044v1.56a.044.044 0 01-.044.043h-1.56a.044.044 0 01-.044-.044v-1.56a.044.044 0 01.044-.043zm-2.68 0h1.559a.044.044 0 01.044.044v1.56a.044.044 0 01-.044.043h-1.56a.044.044 0 01-.044-.044v-1.56a.044.044 0 01.044-.043zM1.973 8.788h1.56a.044.044 0 01.044.044V10.4a.045.045 0 01-.044.044h-1.56a.045.045 0 01-.043-.044V8.839a.044.044 0 01.043-.044v-.007zm5.362 0h1.56a.044.044 0 01.044.044V10.4a.046.046 0 01-.044.044h-1.56a.045.045 0 01-.044-.044V8.839a.044.044 0 01.044-.044v-.007zm-2.68 0h1.559a.044.044 0 01.044.044V10.4a.046.046 0 01-.044.044h-1.56a.045.045 0 01-.044-.044V8.839a.044.044 0 01.044-.05z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}
export function IconViewablePassword({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(18)}
      height={props?.style?.height || scale(18)}
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.813 9a2.812 2.812 0 11-5.625 0 2.812 2.812 0 015.625 0z"
        fill={fill || '#474747'}
      />
      <Path
        d="M0 9s3.375-6.188 9-6.188S18 9 18 9s-3.375 6.188-9 6.188S0 9 0 9zm9 3.938a3.937 3.937 0 100-7.875 3.937 3.937 0 000 7.875z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}
export function IconProfile({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(22)}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_99_2035)" fill="#F0B90B">
        <Path d="M15.657 12.693l-.199.165-.209.166c-.144.11-.295.215-.45.316l-3.18 6.113-.632-3.52.938-1.415c-.113.025-.23.045-.343.065-.295.05-.6.085-.906.1a8.752 8.752 0 01-2.402-.196l.954 1.445-.595 3.586-3.523-6.474c-.16-.12-.322-.251-.472-.381l-.064.05C1.142 15.48.236 19.753 0 22h20c-.66-6.57-3.582-8.826-4.338-9.302l-.005-.005z" />
        <Path d="M10.166 0C5.984 0 2.584 3.18 2.584 7.086s3.4 7.09 7.582 7.09 7.582-3.178 7.582-7.09S14.343 0 10.166 0z" />
      </G>
      <Defs>
        <ClipPath id="clip0_99_2035">
          <Path fill="#fff" d="M0 0H20V22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function IconProfileInactive({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(22)}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_99_2039)" fill="#000">
        <Path d="M15.657 12.693l-.199.165-.209.166c-.144.11-.295.215-.45.316l-3.18 6.113-.632-3.52.938-1.415c-.113.025-.23.045-.343.065-.295.05-.6.085-.906.1a8.752 8.752 0 01-2.402-.196l.954 1.445-.595 3.586-3.523-6.474c-.16-.12-.322-.251-.472-.381l-.064.05C1.142 15.48.236 19.753 0 22h20c-.66-6.57-3.582-8.826-4.338-9.302l-.005-.005z" />
        <Path d="M10.166 0C5.984 0 2.584 3.18 2.584 7.086s3.4 7.09 7.582 7.09 7.582-3.178 7.582-7.09S14.343 0 10.166 0z" />
      </G>
      <Defs>
        <ClipPath id="clip0_99_2039">
          <Path fill="#fff" d="M0 0H20V22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function IconNotification({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(19)}
      height={props?.style?.height || scale(19)}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 0a5.938 5.938 0 00-5.938 5.938v3.5a.297.297 0 01-.05.164L1.49 12.636a1.802 1.802 0 001.5 2.802h13.02a1.802 1.802 0 001.5-2.802l-2.023-3.034a.296.296 0 01-.05-.165v-3.5A5.937 5.937 0 009.5 0zM5.344 5.938a4.156 4.156 0 118.312 0v3.5c0 .41.122.81.35 1.152l2.022 3.034a.02.02 0 01.003.011v.006l-.001.002s-.002.005-.005.007c-.002.003-.007.005-.007.005l-.008.001H2.99l-.008-.001s-.005-.002-.007-.005a.034.034 0 01-.005-.007l-.001-.008c0-.004.001-.008.003-.011l2.023-3.034c.227-.341.349-.742.349-1.153v-3.5z"
        fill={fill || '#fff'}
      />
      <Path
        d="M11.857 16.921a2.375 2.375 0 01-4.714 0c-.02-.162.115-.296.279-.296h4.156c.164 0 .299.134.279.296z"
        fill={fill || '#fff'}
      />
    </Svg>
  );
}
export function IconRight({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(7)}
      height={props?.style?.height || scale(11)}
      viewBox="0 0 9 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1.598 11.49a.604.604 0 00.374-.13l5.795-4.661a.598.598 0 000-.931l-5.77-4.636a.597.597 0 00-.748.93l5.19 4.172-5.216 4.194a.597.597 0 00.375 1.063z"
        fill="#000"
        stroke="#000"
      />
    </Svg>
  );
}
export function IconShare({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(23)}
      height={props?.style?.height || scale(23)}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={23} height={23} rx={11.5} fill="#000" />
      <G clipPath="url(#clip0_123_2818)">
        <Path
          d="M14.167 14.217c-.465 0-.88.195-1.198.502l-4.357-2.708c.03-.15.055-.3.055-.457 0-.157-.025-.307-.055-.457l4.308-2.682c.33.326.764.528 1.247.528C15.18 8.943 16 8.07 16 6.986c0-1.084-.819-1.958-1.833-1.958-1.015 0-1.834.874-1.834 1.958 0 .156.025.306.055.456L8.08 10.125a1.765 1.765 0 00-1.247-.529C5.82 9.596 5 10.471 5 11.554s.819 1.958 1.833 1.958c.483 0 .917-.203 1.247-.529l4.351 2.715c-.03.137-.049.28-.049.424 0 1.05.8 1.906 1.785 1.906.984 0 1.784-.855 1.784-1.906 0-1.05-.8-1.905-1.784-1.905z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_123_2818">
          <Path fill="#fff" transform="translate(2 2.5)" d="M0 0H19V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function IconFacebook({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(24)}
      height={props?.style?.height || scale(23)}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={11.8158} cy={11.4305} r={11.4305} fill="#3D5A96" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.59 16.12h-2.08v-4.429H9.471V9.985h1.04V8.96c0-1.391.586-2.22 2.252-2.22h1.388v1.707h-.867c-.65 0-.692.238-.692.683l-.003.854h1.572l-.184 1.706h-1.388v4.43z"
        fill="#fff"
      />
    </Svg>
  );
}
export function IconTwitter({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(24)}
      height={props?.style?.height || scale(23)}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12.4002} cy={11.4305} r={11.4305} fill="#2AA3EF" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.09 8.522a3.86 3.86 0 01-1.106.303 1.93 1.93 0 00.846-1.064c-.372.22-.783.38-1.222.467a1.924 1.924 0 00-3.279 1.755 5.462 5.462 0 01-3.965-2.01 1.922 1.922 0 00.595 2.568 1.906 1.906 0 01-.87-.241v.024c0 .932.662 1.71 1.542 1.887a1.92 1.92 0 01-.869.032c.245.764.956 1.32 1.798 1.337a3.866 3.866 0 01-2.85.796 5.445 5.445 0 002.95.865c3.54 0 5.475-2.932 5.475-5.474a6.21 6.21 0 00-.006-.249 3.91 3.91 0 00.96-.995z"
        fill="#fff"
      />
    </Svg>
  );
}
export function IconCamera({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(14)}
      height={props?.style?.height || scale(11)}
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_308_175)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.243 8.844a2.962 2.962 0 002.365 0 3.18 3.18 0 001.706-1.761 2.845 2.845 0 000-2.308 3.152 3.152 0 00-1.706-1.755c-.22-.056-.386-.11-.604-.169a3.252 3.252 0 00-1.761.169A3.097 3.097 0 006.48 4.775a3.381 3.381 0 000 2.308 3.122 3.122 0 001.762 1.761zM6.48 7.083V4.775L8.243 3.02h2.365l1.706 1.755v2.308l-1.706 1.761M8.19 4.118a2.148 2.148 0 012.418 0 2.186 2.186 0 11-2.418 0zm-4.458-.497c-.326 0-.657.058-.875-.218-.5-.383-.168-1.15.497-1.15a1.33 1.33 0 01.93.217.682.682 0 01.207.494.693.693 0 01-.77.657h.011zM.875 10.376H13.14a.841.841 0 00.828-.828V2.523a.796.796 0 00-.77-.828h-.991L11.983.508a.646.646 0 00-.605-.497H7.2a.72.72 0 00-.665.497l-.218 1.209h-1.98l-.157-.334c0-.387-.665-.494-1.051-.494-.553 0-1.21-.11-1.657.107-.383.221-.218.387-.383.72H.762a.828.828 0 00-.77.829v7.03a.856.856 0 00.875.829l.008-.028z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_308_175">
          <Path fill="#fff" d="M0 0H13.9622V10.3737H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function IconYoutube({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(24)}
      height={props?.style?.height || scale(23)}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={11.985} cy={11.4305} r={11.4305} fill="#F52929" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.733 7.943c.31.354.418 1.156.418 1.156s.11.951.11 1.902v.877c0 .933-.11 1.884-.11 1.884s-.109.802-.418 1.156c-.38.426-.81.464-1.024.482l-.031.003c-1.474.13-3.693.13-3.693.13s-2.747-.018-3.584-.111c-.044-.01-.099-.019-.161-.028-.27-.038-.678-.097-1.003-.476-.31-.354-.418-1.156-.418-1.156s-.11-.933-.11-1.884v-.877c0-.95.11-1.902.11-1.902s.09-.802.418-1.156c.38-.426.81-.464 1.024-.483l.031-.002c1.474-.112 3.693-.13 3.693-.13s2.22.018 3.693.13l.05.004c.219.017.635.05 1.005.48zm-6.022 5.65V9.548l3.457 2.07-3.457 1.977z"
        fill="#fff"
      />
    </Svg>
  );
}
export function IconInstagram({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(24)}
      height={props?.style?.height || scale(23)}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle
        cx={11.5694}
        cy={11.4305}
        r={11.4305}
        fill="url(#paint0_linear_123_2765)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.583 6.448H9.555a2.972 2.972 0 00-2.968 2.968v4.028a2.972 2.972 0 002.968 2.969h4.028a2.972 2.972 0 002.969-2.969V9.416a2.972 2.972 0 00-2.969-2.968zm1.966 6.996c0 1.086-.88 1.966-1.966 1.966H9.555a1.966 1.966 0 01-1.966-1.966V9.416c0-1.086.88-1.966 1.966-1.966h4.028c1.086 0 1.966.88 1.966 1.966v4.028zM8.992 11.43a2.58 2.58 0 012.577-2.577 2.58 2.58 0 012.577 2.577 2.58 2.58 0 01-2.577 2.578 2.58 2.58 0 01-2.577-2.578zm2.577 1.575a1.575 1.575 0 110-3.15 1.575 1.575 0 010 3.15zm2.583-3.515a.618.618 0 100-1.236.618.618 0 000 1.236z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_123_2765"
          x1={0.215296}
          y1={-0.0381896}
          x2={0.138916}
          y2={22.8228}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#7024C4" />
          <Stop offset={0.415461} stopColor="#C21975" />
          <Stop offset={0.702206} stopColor="#C74C4D" />
          <Stop offset={1} stopColor="#E09B3D" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
export function IconAdd({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(14)}
      height={props?.style?.height || scale(14)}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.122 1v11.755M13 6.877H1.245"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
export function IconSupporter({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(46)}
      height={props?.style?.height || scale(50)}
      viewBox="0 0 46 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_123_2784)">
        <Path d="M22.996 32.637H14.35V50h8.646V32.637z" fill="#ACE2EC" />
        <Path
          d="M22.996 36.731l-6.018-2.127v-11.72h6.018v13.847z"
          fill="#fff"
        />
        <Path
          d="M22.172 40.665l-2.895 5.81L21.631 50h1.365V34.24l-3.013 4.352 2.19 2.073z"
          fill="#204451"
        />
        <Path
          d="M15.794 31.027l7.202 3.213-3.013 5.24-5.633-6.843 1.444-1.61z"
          fill="#DEFDFF"
        />
        <Path
          d="M0 50h22.996L12.46 35.54h-2.157C0 35.539 0 50 0 50z"
          fill="#28A5B2"
        />
        <Path
          d="M10.176 35.25l4.174-2.613L22.996 50l-9.713-7.724 2.087-2.795-3.86.463-1.334-4.694z"
          fill="#5ECCE5"
        />
        <Path d="M31.642 32.637h-8.646V50h8.646V32.637z" fill="#82D3E2" />
        <Path
          d="M22.996 36.731l6.026-2.127v-11.72h-6.026v13.847z"
          fill="#fff"
        />
        <Path
          d="M23.828 40.665l2.887 5.81L24.361 50h-1.365V34.24l3.013 4.352-2.181 2.073z"
          fill="#113240"
        />
        <Path
          d="M30.198 31.027l-7.202 3.213 3.013 5.24 5.633-6.843-1.444-1.61z"
          fill="#BDE2E5"
        />
        <Path
          d="M46 50H23.004L33.54 35.54h2.157c9.486 0 10.31 14.461 10.31 14.461H46z"
          fill="#1E7C85"
        />
        <Path
          d="M35.824 35.25l-4.182-2.613L22.996 50l9.721-7.724-2.087-2.795 3.852.463 1.342-4.694z"
          fill="#3DB5C9"
        />
        <Path
          d="M14.091 14.621l-.22-.09c-1.192-.495-1.482-.555-1.396 2.035 0 0-.016 4.663 1.773 4.899.173.744.4 1.45.738 2.043 1.757 3.099 4.848 6.668 8.01 6.668V7.778c-9.8-1.17-7.963 2.924-8.905 6.843zM31.901 14.621l.22-.09c1.192-.495 1.483-.555 1.396 2.035 0 0 .016 4.663-1.773 4.899-.172.744-.4 1.45-.737 2.043-1.758 3.099-4.85 6.668-8.01 6.668V7.778c9.798-1.17 7.963 2.924 8.904 6.843z"
          fill="#fff"
        />
        <Path
          d="M21.043 3.03c-1.06 0-2.119.145-3.107.517-6.654 2.492-4.041 11.196-3.845 13.535.055.6.353-3.615.879-5.886.33-1.413 2.267-1.717 3.507-.904 1.875 1.215 4.52.904 4.52.904V3.03h-1.954z"
          fill="#113240"
        />
        <Path
          d="M24.95 3.03c1.059 0 2.118.145 3.107.517 6.653 2.492 4.04 11.196 3.844 13.535-.055.6-.353-3.615-.879-5.886-.321-1.413-2.267-1.717-3.507-.904-1.875 1.215-4.527.904-4.527.904V3.03h1.962z"
          fill="#113240"
        />
        <Path
          d="M29.343 26.333h-5.382v-.76h5.382c1.209 0 2.291-.744 2.7-1.845l.956-2.62.738.25-.957 2.62c-.51 1.406-1.899 2.355-3.437 2.355z"
          fill="#15BAAC"
        />
        <Path
          d="M24.753 27.214h1.264c.721 0 1.31-.57 1.31-1.269H23.45c0 .7.588 1.269 1.31 1.269h-.008z"
          fill="#0BAF9B"
        />
        <Path
          d="M26.017 24.685h-1.264c-.721 0-1.31.57-1.31 1.268h3.876c0-.699-.588-1.268-1.31-1.268h.008zM22.094 0C16.39 0 11.745 4.52 11.745 10.071v1.694h1.507v-1.694c0-4.747 3.97-8.613 8.842-8.613h.902V0h-.902z"
          fill="#15BAAC"
        />
        <Path
          d="M23.898 0h-.902v1.466h.902c4.873 0 8.843 3.866 8.843 8.613v1.694h1.506v-1.694c0-5.552-4.645-10.071-10.349-10.071V0z"
          fill="#0A9B86"
        />
        <Path
          d="M36.71 11.947c-.776-.941-2.063-1.025-2.063-1.025a2.51 2.51 0 00-1.279 0V21.92c.385.106.816.114 1.28 0 0 0 1.286-.084 2.063-1.025.776-.942.776-8.006 0-8.948z"
          fill="#4BE0CA"
        />
        <Path
          d="M31.815 13.079v6.684c0 1.101.635 1.906 1.553 2.157V10.922c-.918.25-1.553 1.048-1.553 2.157z"
          fill="#15BAAC"
        />
        <Path
          d="M11.353 10.922s-1.287.083-2.064 1.025c-.776.942-.776 8.006 0 8.948.777.942 2.064 1.025 2.064 1.025.463.114.894.106 1.279 0V10.922a2.51 2.51 0 00-1.28 0z"
          fill="#4BE0CA"
        />
        <Path
          d="M12.632 10.922V21.92c.918-.25 1.553-1.056 1.553-2.157v-6.684c0-1.101-.635-1.907-1.553-2.157z"
          fill="#0A9B86"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_123_2784">
          <Path fill="#fff" d="M0 0H46V50H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function IconSupporterYellow({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(46)}
      height={props?.style?.height || scale(50)}
      viewBox="0 0 46 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_123_3829)">
        <Path d="M22.996 32.637H14.35V50h8.646V32.637z" fill="#ECE6AC" />
        <Path
          d="M22.996 36.731l-6.018-2.127v-11.72h6.018v13.847z"
          fill="#fff"
        />
        <Path
          d="M22.172 40.665l-2.895 5.81L21.631 50h1.365V34.24l-3.013 4.352 2.19 2.073z"
          fill="#514C20"
        />
        <Path
          d="M15.794 31.027l7.202 3.213-3.013 5.24-5.633-6.843 1.444-1.61z"
          fill="#FFFEDE"
        />
        <Path
          d="M0 50h22.996L12.46 35.54h-2.157C0 35.539 0 50 0 50z"
          fill="#B29428"
        />
        <Path
          d="M10.176 35.25l4.174-2.613L22.996 50l-9.713-7.724 2.087-2.795-3.86.463-1.334-4.694z"
          fill="#E5C75E"
        />
        <Path d="M31.642 32.637h-8.646V50h8.646V32.637z" fill="#E0E282" />
        <Path
          d="M22.996 36.731l6.026-2.127v-11.72h-6.026v13.847z"
          fill="#fff"
        />
        <Path
          d="M23.828 40.665l2.887 5.81L24.361 50h-1.365V34.24l3.013 4.352-2.181 2.073z"
          fill="#403811"
        />
        <Path
          d="M30.199 31.027l-7.203 3.213 3.013 5.24 5.633-6.843-1.443-1.61z"
          fill="#E5DFBD"
        />
        <Path
          d="M46 50H23.004L33.54 35.54h2.157c9.486 0 10.31 14.461 10.31 14.461H46z"
          fill="#856E1E"
        />
        <Path
          d="M35.824 35.25l-4.182-2.613L22.996 50l9.721-7.724-2.087-2.795 3.852.463 1.342-4.694z"
          fill="#C9AA3D"
        />
        <Path
          d="M14.091 14.621l-.22-.09c-1.192-.495-1.482-.555-1.396 2.035 0 0-.016 4.663 1.773 4.899.173.744.4 1.45.738 2.043 1.757 3.099 4.848 6.668 8.01 6.668V7.778c-9.8-1.17-7.963 2.924-8.905 6.843zM31.901 14.621l.22-.09c1.192-.495 1.483-.555 1.396 2.035 0 0 .016 4.663-1.773 4.899-.172.744-.4 1.45-.737 2.043-1.758 3.099-4.849 6.668-8.01 6.668V7.778c9.798-1.17 7.963 2.924 8.904 6.843z"
          fill="#fff"
        />
        <Path
          d="M21.043 3.03c-1.06 0-2.119.145-3.107.517-6.654 2.492-4.041 11.196-3.845 13.535.055.6.353-3.615.879-5.886.33-1.413 2.267-1.717 3.507-.904 1.875 1.215 4.52.904 4.52.904V3.03h-1.954z"
          fill="#403811"
        />
        <Path
          d="M24.95 3.03c1.059 0 2.118.145 3.107.517 6.653 2.492 4.04 11.196 3.844 13.535-.055.6-.353-3.615-.879-5.886-.321-1.413-2.267-1.717-3.507-.904-1.875 1.215-4.527.904-4.527.904V3.03h1.962z"
          fill="#403811"
        />
        <Path
          d="M29.343 26.333h-5.382v-.76h5.382c1.208 0 2.291-.744 2.7-1.845l.956-2.62.738.25-.957 2.62c-.51 1.406-1.9 2.355-3.437 2.355z"
          fill="#FFE55A"
        />
        <Path
          d="M24.753 27.214h1.264c.721 0 1.31-.57 1.31-1.269H23.45c0 .7.588 1.269 1.31 1.269h-.008z"
          fill="#AF8B0B"
        />
        <Path
          d="M26.017 24.685h-1.264c-.721 0-1.31.57-1.31 1.268h3.876c0-.699-.588-1.268-1.31-1.268h.008zM22.094 0C16.39 0 11.745 4.52 11.745 10.071v1.694h1.507v-1.694c0-4.747 3.97-8.613 8.842-8.613h.902V0h-.902z"
          fill="#FFE55A"
        />
        <Path
          d="M23.898 0h-.902v1.466h.902c4.873 0 8.843 3.866 8.843 8.613v1.694h1.506v-1.694c0-5.552-4.645-10.071-10.349-10.071V0z"
          fill="#9B8D0A"
        />
        <Path
          d="M36.71 11.947c-.776-.941-2.063-1.025-2.063-1.025a2.51 2.51 0 00-1.279 0V21.92c.385.106.816.114 1.279 0 0 0 1.287-.084 2.064-1.025.776-.942.776-8.006 0-8.948z"
          fill="#E0D14B"
        />
        <Path
          d="M31.815 13.079v6.684c0 1.101.635 1.906 1.553 2.157V10.922c-.918.25-1.553 1.048-1.553 2.157z"
          fill="#FFE55A"
        />
        <Path
          d="M11.353 10.922s-1.287.083-2.064 1.025c-.776.942-.776 8.006 0 8.948.777.942 2.064 1.025 2.064 1.025.463.114.894.106 1.279 0V10.922a2.51 2.51 0 00-1.28 0z"
          fill="#E0D14B"
        />
        <Path
          d="M12.632 10.922V21.92c.918-.25 1.553-1.056 1.553-2.157v-6.684c0-1.101-.635-1.907-1.553-2.157z"
          fill="#9B8D0A"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_123_3829">
          <Path fill="#fff" d="M0 0H46V50H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function IconEditProfile({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(14)}
      height={props?.style?.height || scale(16)}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_123_1897)">
        <Path
          d="M1.343 12.158a.083.083 0 00-.053.054l-.682 2.16-.173.545a.086.086 0 00.026.09.08.08 0 00.09.008l.484-.286 1.915-1.134a.085.085 0 00.01-.139l-1.543-1.285a.08.08 0 00-.074-.013z"
          fill="#F0B90B"
        />
        <Path
          d="M3.189 13.356c1.092-1.002 2.405-2.426 3.76-4.101l-2.47-2.056c-1.29 1.728-2.351 3.362-3.064 4.68l1.774 1.477z"
          fill="#000"
        />
        <Path
          d="M9.298.97L4.695 6.896a.225.225 0 00-.046.163.227.227 0 00.079.15l2.158 1.796a.21.21 0 00.302-.034L13.655.647a.227.227 0 00-.057-.33.209.209 0 00-.117-.032L9.835.404a.207.207 0 00-.161.083L9.578.61l.012.01-.28.36-.012-.01z"
          fill="#F0B90B"
        />
        <Path
          d="M8.845 0L4.982 4.973l.403.335L8.968.696l.33.275.012.01.28-.361-.012-.01-.33-.275L8.845 0zM.31 15.358a.305.305 0 00-.22.094.327.327 0 000 .454c.059.06.138.094.22.094h13.38a.301.301 0 00.22-.094.321.321 0 00.09-.227.33.33 0 00-.09-.227.311.311 0 00-.22-.094H.31z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_123_1897">
          <Path fill="#fff" d="M0 0H14V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function Avatar({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(122)}
      height={props?.style?.height || scale(122)}
      viewBox="0 0 122 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Circle cx={61} cy={61} r={58.5} fill="#C4C4C4" />
      <Circle cx={61} cy={61} r={58.5} fill="url(#pattern0)" />
      <Circle cx={61} cy={61} r={58.5} stroke="#fff" strokeWidth={5} />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use
            xlinkHref="#image0_123_2854"
            transform="translate(0 -.227) scale(.00303)"
          />
        </Pattern>
        <Image
          id="image0_123_2854"
          width={330}
          height={480}
          xlinkHref="data:image/jpeg;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export function IconUnViewablePassword({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(19)}
      height={props?.style?.height || scale(18)}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.418 16.825c-.618.117-1.246.175-1.875.175C6.065 17 2.275 14.057 1 10a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M8.421 7.879l4.243 4.243M8.421 7.879l4.242 4.241m.001.002l3.291 3.29M8.423 7.88l-3.29-3.29m0 0L1.543 1m3.59 3.59A9.953 9.953 0 0110.543 3c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411M5.133 4.59l10.821 10.821m0 0L19.543 19"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function IconUnCheckBox({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect x={0.5} y={0.5} width={19} height={19} rx={4.5} stroke="#CDD1E0" />
    </Svg>
  );
}
export function IconCheckBox({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect x={0.5} y={0.5} width={19} height={19} rx={4.5} stroke="#CDD1E0" />
      <Path
        d="M4 8l3.281 4.922a1 1 0 001.58.11L16 5"
        stroke="#0C9648"
        strokeWidth={2}
      />
    </Svg>
  );
}
export function IconGoBack({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(30)}
      height={props?.style?.height || scale(31)}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.141 19h19.5M15.641 26.5l-6.5-7.5 6.5-7.5"
        stroke={fill || '#000'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={18}
        cy={18}
        r={16.5}
        stroke={fill || '#000'}
        strokeWidth={3}
      />
    </Svg>
  );
}
export function IconHouse({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M20 10V8.387l-1.365-5.161H17.42v-1.29h.645V0h-4.516v1.935h.646v1.29H13.17l-.342-1.29H1.365L.01 7.014 0 8.71h.645v9.354H0V20h20v-1.936h-.645V10H20zM14.194.645h3.225v.645h-3.226V.645zm2.58 1.29v1.29H14.84v-1.29h1.935zM.645 7.42h10.968v-.645H.743L1.86 2.581h10.472l1.118 4.193h-1.193v.645h1.29v.646H.645v-.646zM13.548 10h5.162v8.064h-5.162V10zm-7.096.645v7.42H1.29V8.71h11.613v9.354h-.645v-7.419H6.452zm5.16.645v6.774H7.098V11.29h4.516zm7.743 8.065H.645v-.645h18.71v.645zm-5.807-10V8.71h3.871v-.645h-3.226v-.968L13.34 3.87h4.799l1.118 4.194h-1.193v.645h1.29v.645h-5.806z"
        fill={fill || '#474747'}
      />
      <Path
        d="M14.194 15.806h3.87V11.29h-3.87v4.516zm2.258-3.87h.967v1.29h-.967v-1.29zm0 1.935h.967v1.29h-.967v-1.29zm-1.613-1.936h.967v1.29h-.967v-1.29zm0 1.936h.967v1.29h-.967v-1.29zM1.935 15.806h3.871V11.29h-3.87v4.516zm2.259-3.87h.967v1.29h-.967v-1.29zm0 1.935h.967v1.29h-.967v-1.29zM2.58 11.935h.967v1.29h-.967v-1.29zm0 1.936h.967v1.29h-.967v-1.29z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}
export function IconVilla({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(25)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.267 19.588h2.548v-4.38h4.465v4.38h2.547V5.06l-4.892-3.473-4.668 3.34v14.661zm9.972 0h5.44V9.21l-5.44-1.084v11.462zm0-12.538l6.516 1.327a.52.52 0 01-.362.975l-.301-.06V20H.944V9.311l-.242.04a.52.52 0 11-.363-.974L6.855 7.23V5.222l-.429.307A.713.713 0 015.6 4.37L11.508.14c.24-.18.58-.193.838-.01l5.92 4.204a.713.713 0 01-.825 1.16l-.202-.142V7.05zM6.855 8.306l-5.499.935v10.347h5.499V8.306zm5.381 7.281v4.001h1.665v-4h-1.665zm-.378 4.001v-4h-1.665v4h1.665zM13.9 8.69h-1.665v3.38h1.665V8.69zm-2.043 0h-1.665v3.38h1.665V8.69zm-1.665-.379h1.665V5.403c-.435.045-.827.241-1.12.535a1.85 1.85 0 00-.545 1.31V8.31zm2.043 0h1.665V7.248c0-.51-.208-.973-.545-1.31a1.85 1.85 0 00-1.12-.535v2.908zm-.189-3.296c.614 0 1.172.251 1.577.656.405.404.655.963.655 1.577v5.2H9.816v-5.2c0-.614.25-1.173.655-1.577a2.225 2.225 0 011.577-.656zM5.361 17.594H4.184v1.114h1.177v-1.114zm-1.444 0H2.741v1.114h1.176v-1.114zm-1.176-.267h1.176v-1.115H2.741v1.115zm1.443 0h1.177v-1.115H4.184v1.115zm1.445-1.249v2.898H2.473v-3.032H5.63v.134zm-.268-3.336H4.184v1.611h1.177v-1.61zm-1.444 0H2.741v1.611h1.176v-1.61zm-1.176-.267h1.176V10.42c-.307.031-.584.17-.791.378a1.309 1.309 0 00-.385.925v.752zm1.443 0h1.177v-.752a1.311 1.311 0 00-1.177-1.303v2.055zm-.133-2.33c.434 0 .828.178 1.114.464.286.286.464.68.464 1.114v2.898H2.473v-2.898c0-.434.178-.828.464-1.114.286-.286.68-.463 1.114-.463zm16.5-4.34h1.587v1.929L20.55 7.41V5.805zm.66 11.789h-1.177v1.114h1.176v-1.114zm-1.444 0H18.59v1.114h1.177v-1.114zm-1.177-.267h1.177v-1.115H18.59v1.115zm1.444 0h1.176v-1.115h-1.176v1.115zm1.444-1.249v2.898h-3.155v-3.032h3.155v.134zm-.268-3.336h-1.176v1.611h1.176v-1.61zm-1.443 0H18.59v1.611h1.177v-1.61zm-1.177-.267h1.177V10.42c-.308.031-.584.17-.792.378a1.307 1.307 0 00-.385.925v.752zm1.444 0h1.176v-.752a1.31 1.31 0 00-1.177-1.303v2.055zm-.134-2.33c.434 0 .829.178 1.115.464.285.286.463.68.463 1.114v2.898h-3.155v-2.898c0-.434.177-.828.463-1.114a1.576 1.576 0 011.114-.463z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}

export function IconRoom({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(25)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M2.5 0C1.678 0 1 .678 1 1.5v7.594a.522.522 0 00.016.094v.015c-.225.354-.409.73-.547 1.14C.159 11.26.025 12.31 0 13.5V20h3.5v-2c0-.416.102-.633.234-.766.133-.132.35-.234.766-.234h16c.416 0 .633.102.766.234.132.133.234.35.234.766v2H25v-5.922A.51.51 0 0025 14c0-.172.004-.334 0-.5-.025-1.19-.158-2.24-.469-3.156a5.217 5.217 0 00-.547-1.125.538.538 0 00.016-.125V1.5c0-.822-.678-1.5-1.5-1.5h-20zm0 1h20c.281 0 .5.219.5.5v6.578a6.556 6.556 0 00-1.5-.922V5c0-.352-.23-.625-.484-.797-.254-.172-.565-.29-.953-.39-.778-.2-1.87-.313-3.313-.313s-2.535.113-3.313.313c-.378.097-.687.208-.937.374-.25-.166-.559-.277-.938-.375-.777-.199-1.869-.312-3.312-.312-1.443 0-2.535.113-3.313.313-.388.1-.699.218-.953.39-.254.172-.484.445-.484.797v2.156a6.555 6.555 0 00-1.5.922V1.5c0-.281.219-.5.5-.5zm5.75 3.5c1.39 0 2.422.117 3.063.281.32.082.54.182.64.25.041.028.043.032.047.032V6c-3.287.021-5.72.268-7.5.813v-1.75c.004 0 .006-.004.047-.032.1-.068.32-.168.64-.25C5.829 4.617 6.86 4.5 8.25 4.5zm8.5 0c1.39 0 2.422.117 3.063.281.32.082.54.182.64.25.041.028.043.032.047.032v1.75C18.72 6.268 16.287 6.02 13 6v-.938c.004 0 .006-.003.047-.03.1-.07.32-.169.64-.25.641-.165 1.672-.282 3.063-.282zM12.406 7a.524.524 0 00.156 0h.047c5.004.008 7.895.531 9.438 1.594.777.535 1.248 1.199 1.547 2.078.26.765.365 1.709.39 2.828H1.016c.025-1.12.13-2.063.39-2.828.3-.879.77-1.543 1.547-2.078C4.496 7.529 7.393 7.006 12.406 7zM1 14.5h23V19h-1.5v-1c0-.584-.148-1.117-.516-1.484-.367-.368-.9-.516-1.484-.516h-16c-.584 0-1.117.148-1.484.516-.368.367-.516.9-.516 1.484v1H1v-4.5z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}

export function IconAccommodationOther({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(21)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.343 16.572V7.39a.323.323 0 00-.646 0v9.183a.323.323 0 00.646 0zm14.504-9.184v2.98a.323.323 0 00.646 0v-2.98a.323.323 0 00-.646 0z"
        fill={fill || '#474747'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.107 15.078H3.02a.323.323 0 000 .646h13.087a.323.323 0 000-.646zM3.974 7.066H1.965a.11.11 0 01-.082-.183c1.82-2.045 3.035-4.096 3.44-6.142V.736A.108.108 0 015.43.647L15.762.646a.11.11 0 01.107.09l.001.004c.403 2.047 1.618 4.098 3.437 6.144a.108.108 0 01-.08.18c-2.451.002-9.427.002-13.966.002a.323.323 0 000 .645h13.965a.754.754 0 00.564-1.256c-1.731-1.947-2.903-3.891-3.286-5.839A.755.755 0 0015.761 0C14.086 0 7.104 0 5.429.002a.754.754 0 00-.74.614C4.304 2.564 3.133 4.508 1.4 6.455a.755.755 0 00.564 1.256h2.009a.323.323 0 000-.645z"
        fill={fill || '#474747'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.157 10.175a2.46 2.46 0 00-.068.575v4.651c0 .178.145.323.323.323h4.366a.323.323 0 00.323-.323v-4.65a2.469 2.469 0 00-2.47-2.47h-.073c-.655 0-1.283.26-1.746.724a.323.323 0 00.457.456 1.824 1.824 0 011.29-.534h.073a1.824 1.824 0 011.823 1.824v4.327h-3.72v-4.327c0-.145.017-.287.05-.426a.323.323 0 00-.628-.15z"
        fill={fill || '#474747'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.412 12.716h4.366a.323.323 0 000-.646H8.412a.323.323 0 000 .646z"
        fill={fill || '#474747'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.918 15.401V8.604a.323.323 0 00-.646 0v6.797a.323.323 0 00.646 0zM.932 19.943a.323.323 0 00.183.057h5.609c.114 0 .219-.06.277-.158a1.405 1.405 0 00-1.35-2.115 1.406 1.406 0 00-1.827-.893 2.148 2.148 0 10-2.892 3.11zm.288-.589a1.502 1.502 0 112.22-1.943.323.323 0 00.455.106.76.76 0 011.175.612.323.323 0 00.443.29.759.759 0 011.004.935H1.22zM7.025 17.556a1.133 1.133 0 011.635.346.322.322 0 00.456.105.54.54 0 01.837.436.323.323 0 00.442.29.54.54 0 01.665.778.323.323 0 00.554.331 1.187 1.187 0 00-1.088-1.79 1.187 1.187 0 00-1.482-.72 1.775 1.775 0 00-2.395-.301.323.323 0 00.376.525zM16.298 13.58a3.47 3.47 0 00-.405 1.653c0 1.62 1.047 2.898 2.277 2.898 1.23 0 2.277-1.278 2.277-2.898 0-.617-.151-1.187-.404-1.654a1.753 1.753 0 01-.182-1.045v-.001c.013-.109.02-.22.02-.334 0-1.21-.794-2.153-1.711-2.153s-1.711.944-1.711 2.153c0 .114.007.226.021.335.047.367-.018.743-.182 1.045zm.567.308a2.41 2.41 0 00.256-1.435v-.002a1.953 1.953 0 01-.016-.252c0-.51.18-.965.47-1.245a.858.858 0 01.595-.262c.223 0 .428.1.595.262.29.28.47.735.47 1.245 0 .087-.005.172-.015.255-.064.503.03 1.019.256 1.434.205.379.325.843.325 1.345 0 1.222-.703 2.252-1.631 2.252s-1.631-1.03-1.631-2.252c0-.502.12-.966.326-1.345z"
        fill={fill || '#474747'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.847 13.747v5.93a.323.323 0 00.646 0v-5.93a.323.323 0 00-.646 0z"
        fill={fill || '#474747'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.124 19.354H4.716a.323.323 0 000 .646h15.408a.323.323 0 000-.646z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}

export function IconMarker({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(15)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 15 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.215 3.714a3.503 3.503 0 013.502 3.502c0 1.93-1.57 3.502-3.502 3.502a3.503 3.503 0 010-7.004zm0 1.006a2.495 2.495 0 100 4.994 2.495 2.495 0 000-4.994z"
        fill={fill || '#474747'}
      />
      <Path
        d="M7.215 0a7.216 7.216 0 017.217 7.216c0 4-2.844 9.091-5.469 11.995-1.04 1.058-2.447 1.047-3.499-.001C2.842 16.302 0 11.217 0 7.216A7.215 7.215 0 017.216 0h-.001zm0 1.006a6.21 6.21 0 00-6.21 6.21c0 3.744 2.75 8.61 5.205 11.325.612.602 1.404.604 2.008 0 2.457-2.714 5.207-7.582 5.207-11.325a6.21 6.21 0 00-6.21-6.21z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}

export function IconCalendar({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.283.77c0-.425.42-.77.939-.77.52 0 .94.345.94.77v3.372c0 .425-.42.77-.94.77s-.94-.345-.94-.77V.77zM10.76 16.896c-.055 0-.1-.233-.1-.52 0-.289.045-.522.1-.522h2.57c.055 0 .1.233.1.521 0 .288-.045.521-.1.521h-2.57zM2.58 10.92c-.056 0-.1-.233-.1-.521 0-.288.044-.521.1-.521h2.57c.055 0 .099.233.099.52 0 .289-.044.522-.1.522H2.58zm4.09 0c-.055 0-.1-.233-.1-.521 0-.288.045-.521.1-.521h2.57c.055 0 .1.233.1.52 0 .289-.045.522-.1.522H6.67zm4.09 0c-.055 0-.1-.233-.1-.521 0-.288.045-.521.1-.521h2.57c.055 0 .1.233.1.52 0 .289-.045.522-.1.522h-2.57zm4.092 0c-.056 0-.1-.233-.1-.521 0-.288.044-.521.1-.521h2.57c.055 0 .1.233.1.52 0 .289-.045.522-.1.522h-2.57zM2.58 13.908c-.056 0-.1-.233-.1-.521 0-.288.044-.52.1-.52h2.57c.055 0 .099.232.099.52 0 .288-.044.52-.1.52H2.58zm4.09 0c-.055 0-.1-.233-.1-.521 0-.288.045-.52.1-.52h2.57c.055 0 .1.232.1.52 0 .288-.045.52-.1.52H6.67zm4.09 0c-.055 0-.1-.233-.1-.521 0-.288.045-.52.1-.52h2.57c.055 0 .1.232.1.52 0 .288-.045.52-.1.52h-2.57zm4.092 0c-.056 0-.1-.233-.1-.521 0-.288.044-.52.1-.52h2.57c.055 0 .1.232.1.52 0 .288-.045.52-.1.52h-2.57zM2.58 16.896c-.056 0-.1-.233-.1-.52 0-.289.044-.522.1-.522h2.57c.055 0 .099.233.099.521 0 .288-.044.521-.1.521H2.58zm4.09 0c-.055 0-.1-.233-.1-.52 0-.289.045-.522.1-.522h2.57c.055 0 .1.233.1.521 0 .288-.045.521-.1.521H6.67zM4.82.77c0-.425.42-.77.938-.77.52 0 .94.345.94.77v3.372c0 .425-.42.77-.94.77-.519 0-.939-.345-.939-.77V.77zM1.041 7.376h17.915V3.494a.48.48 0 00-.477-.476h-1.716a.52.52 0 110-1.042h1.717c.419 0 .798.17 1.073.446.275.275.446.654.446 1.072v14.989c0 .418-.17.798-.446 1.073a1.513 1.513 0 01-1.073.446H1.52A1.52 1.52 0 010 18.482V3.493c0-.418.17-.797.446-1.072a1.513 1.513 0 011.073-.446h1.834a.52.52 0 110 1.042H1.519a.48.48 0 00-.477.476v3.882zM18.958 8.42H1.042V18.48a.48.48 0 00.477.477H18.48a.48.48 0 00.477-.477V8.42zM8.208 3.018a.52.52 0 110-1.042h3.498a.52.52 0 110 1.042H8.208z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}

export function IconFurniture({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(20)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M19.31 10h-1.379v-.345a2.416 2.416 0 00-2.414-2.414H12.07A2.414 2.414 0 0010 8.418a2.414 2.414 0 00-2.069-1.177H4.286A2.22 2.22 0 002.07 9.46V10H.689a.69.69 0 00-.689.69v7.241a.69.69 0 00.69.69h1.034v.69a.69.69 0 00.69.689h.69a.69.69 0 00.69-.69v-.69h12.413v.69a.69.69 0 00.69.69h.69a.69.69 0 00.689-.69v-.69h1.034a.69.69 0 00.69-.689V10.69a.69.69 0 00-.69-.69zm0 .69v3.448h-1.379V10.69h1.38zM12.07 7.93h3.448a1.726 1.726 0 011.724 1.724v3.457a1.707 1.707 0 00-1.034-.353h-4.828a1.707 1.707 0 00-1.034.353V9.655a1.727 1.727 0 011.724-1.724zm5.113 6.207h-6.778a1.037 1.037 0 01.975-.69h4.828a1.036 1.036 0 01.975.69zM2.76 9.458a1.53 1.53 0 011.527-1.527h3.645a1.726 1.726 0 011.724 1.724v3.457a1.706 1.706 0 00-1.034-.353H3.793a1.706 1.706 0 00-1.034.353V9.46zm6.837 4.68H2.818a1.037 1.037 0 01.975-.69h4.828a1.037 1.037 0 01.975.69zM.69 10.69h1.379v3.448H.689V10.69zm2.413 8.62h-.69v-.69h.69v.69zm14.483 0h-.69v-.69h.69v.69zm1.724-1.379H.69v-3.103h18.62v3.103zM6.552 6.207h6.896a.69.69 0 00.69-.69V.69a.69.69 0 00-.69-.69H6.552a.69.69 0 00-.69.69v4.827a.69.69 0 00.69.69zm0-5.517h6.896v4.827H6.552V.69z"
        fill={fill || '#474747'}
      />
      <Path
        d="M12.178 2.776c-.793-.263-1.418.246-1.874.617-.15.132-.311.248-.483.35.037-.16.11-.38.16-.53.175-.525.326-.978.11-1.276a.52.52 0 00-.436-.213c-.82 0-1.81 1.264-2 1.517a.345.345 0 10.552.414c.34-.485.777-.894 1.283-1.2-.034.16-.11.385-.162.54-.175.523-.326.976-.11 1.275a.52.52 0 00.437.213 1.853 1.853 0 001.085-.555c.475-.388.817-.632 1.22-.497a.345.345 0 00.218-.655z"
        fill={fill || '#474747'}
      />
    </Svg>
  );
}

export function IconBorderBottom({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(106)}
      height={props?.style?.height || scale(12)}
      viewBox="0 0 106 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M.667 6a5.333 5.333 0 1010.666 0A5.333 5.333 0 00.667 6zm94 0a5.333 5.333 0 1010.666 0 5.333 5.333 0 00-10.666 0zM6 7h94V5H6v2z"
        fill="#F0B90B"
      />
    </Svg>
  );
}

export function IconStar({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(12)}
      height={props?.style?.height || scale(12)}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5 0l1.123 3.455h3.632L6.816 5.59 7.94 9.045 5 6.91 2.061 9.045 3.184 5.59.244 3.455h3.633L5 0z"
        fill={fill || '#D9D9D9'}
      />
    </Svg>
  );
}

export function IconPlayVideo({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(23)}
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M0 19.934c.046 2.11 2.132 3.388 3.96 2.384l14.697-8.643A2.71 2.71 0 0020 11.328a2.71 2.71 0 00-1.343-2.347L3.96.351C2.132-.654.046.61 0 2.722v17.212z"
        fill={fill || '#D9D9D9'}
      />
    </Svg>
  );
}

// export function IconShare({fill, ...props}) {
//   return (
//     <Svg
//       width={props?.style?.width || scale(20)}
//       height={props?.style?.height || scale(18)}
//       viewBox="0 0 20 18"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}>
//       <Path
//         d="M12.243.085a.336.336 0 00-.56.247v3.393h-2.09a9.52 9.52 0 00-6.74 2.777 9.46 9.46 0 00-2.836 6.776L0 17.308v.057c0 .183.15.333.333.333.184 0 .334-.15.334-.333v-.05a6.507 6.507 0 011.92-4.583 6.511 6.511 0 014.636-1.927h4.46v3.393c0 .134.08.25.2.304.12.056.26.033.36-.057l7.647-6.937a.334.334 0 000-.493L12.243.085z"
//         fill={fill || '#fff'}
//       />
//     </Svg>
//   );
// }

export function IconHeart({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(20)}
      height={props?.style?.height || scale(18)}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.65 9.615l8.007 8.007c.19.19.496.19.686 0l8.007-8.007a5.632 5.632 0 10-7.965-7.965c-.304.304-.385.438-.385.438s-.242-.295-.385-.438A5.632 5.632 0 001.65 9.615z"
        fill={fill || '#fff'}
      />
    </Svg>
  );
}

export function IconNodata({fill, ...props}) {
  return (
    <Svg
      width={props?.style?.width || scale(155)}
      height={props?.style?.height || scale(184)}
      viewBox="0 0 155 184"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M60.99 178h-2.1l-4.755-7.185V178h-2.1v-10.485h2.1l4.755 7.2v-7.2h2.1V178zm5.765.135c-.8 0-1.52-.175-2.16-.525a3.938 3.938 0 01-1.515-1.515c-.36-.65-.54-1.4-.54-2.25 0-.85.185-1.6.555-2.25.38-.65.895-1.15 1.545-1.5.65-.36 1.375-.54 2.175-.54.8 0 1.525.18 2.175.54.65.35 1.16.85 1.53 1.5.38.65.57 1.4.57 2.25 0 .85-.195 1.6-.585 2.25-.38.65-.9 1.155-1.56 1.515-.65.35-1.38.525-2.19.525zm0-1.83c.38 0 .735-.09 1.065-.27.34-.19.61-.47.81-.84.2-.37.3-.82.3-1.35 0-.79-.21-1.395-.63-1.815a2.01 2.01 0 00-1.515-.645c-.6 0-1.105.215-1.515.645-.4.42-.6 1.025-.6 1.815s.195 1.4.585 1.83c.4.42.9.63 1.5.63zm8.91-2.49c0-.84.165-1.585.495-2.235.34-.65.8-1.15 1.38-1.5a3.673 3.673 0 011.935-.525c.54 0 1.055.12 1.545.36.49.23.88.54 1.17.93V166.9h2.13V178h-2.13v-1.23c-.26.41-.625.74-1.095.99s-1.015.375-1.635.375c-.7 0-1.34-.18-1.92-.54a3.824 3.824 0 01-1.38-1.515c-.33-.66-.495-1.415-.495-2.265zm6.54.03c0-.51-.1-.945-.3-1.305-.2-.37-.47-.65-.81-.84-.34-.2-.705-.3-1.095-.3s-.75.095-1.08.285c-.33.19-.6.47-.81.84-.2.36-.3.79-.3 1.29s.1.94.3 1.32c.21.37.48.655.81.855.34.2.7.3 1.08.3.39 0 .755-.095 1.095-.285.34-.2.61-.48.81-.84.2-.37.3-.81.3-1.32zm3.626-.03c0-.84.165-1.585.495-2.235.34-.65.795-1.15 1.365-1.5a3.673 3.673 0 011.935-.525c.62 0 1.16.125 1.62.375.47.25.845.565 1.125.945v-1.185h2.115V178H92.37v-1.215c-.27.39-.645.715-1.125.975-.47.25-1.015.375-1.635.375-.7 0-1.34-.18-1.92-.54-.57-.36-1.025-.865-1.365-1.515-.33-.66-.495-1.415-.495-2.265zm6.54.03c0-.51-.1-.945-.3-1.305-.2-.37-.47-.65-.81-.84-.34-.2-.705-.3-1.095-.3s-.75.095-1.08.285c-.33.19-.6.47-.81.84-.2.36-.3.79-.3 1.29s.1.94.3 1.32c.21.37.48.655.81.855.34.2.7.3 1.08.3.39 0 .755-.095 1.095-.285.34-.2.61-.48.81-.84.2-.37.3-.81.3-1.32zm6.611-2.43v4.02c0 .28.065.485.195.615.14.12.37.18.69.18h.975V178h-1.32c-1.77 0-2.655-.86-2.655-2.58v-4.005h-.99v-1.725h.99v-2.055h2.115v2.055h1.86v1.725h-1.86zm2.83 2.4c0-.84.165-1.585.495-2.235.34-.65.795-1.15 1.365-1.5a3.673 3.673 0 011.935-.525c.62 0 1.16.125 1.62.375.47.25.845.565 1.125.945v-1.185h2.115V178h-2.115v-1.215c-.27.39-.645.715-1.125.975-.47.25-1.015.375-1.635.375-.7 0-1.34-.18-1.92-.54-.57-.36-1.025-.865-1.365-1.515-.33-.66-.495-1.415-.495-2.265zm6.54.03c0-.51-.1-.945-.3-1.305-.2-.37-.47-.65-.81-.84-.34-.2-.705-.3-1.095-.3s-.75.095-1.08.285c-.33.19-.6.47-.81.84-.2.36-.3.79-.3 1.29s.1.94.3 1.32c.21.37.48.655.81.855.34.2.7.3 1.08.3.39 0 .755-.095 1.095-.285.34-.2.61-.48.81-.84.2-.37.3-.81.3-1.32z"
        fill="#000"
      />
      <G clipPath="url(#clip0_123_2518)">
        <Path
          d="M94.996 1.224L52.938 4.04l6.692 99.997 42.058-2.817-6.692-99.996z"
          fill="#000"
        />
        <Path
          d="M143.772 98.43l-5.116-76.35L113.411 0l-18.39 1.228 6.675 100.016 42.076-2.815z"
          fill="#F0F0F0"
        />
        <Path
          d="M114.997 23.667l23.659-1.586L113.411 0l1.586 23.667z"
          fill="#000"
        />
        <Path
          d="M133.157 62.34l-67.808 4.54.724 10.825 67.808-4.54-.724-10.825z"
          fill="#36528A"
        />
        <Path
          d="M131.905 43.536l-33.916 2.272.724 10.824 33.917-2.271-.725-10.825z"
          fill="#1E2D4F"
        />
        <Path
          d="M97.987 45.823l-33.916 2.271.724 10.825 33.917-2.272-.725-10.824z"
          fill="#36528A"
        />
        <Path
          d="M130.654 24.78l-33.916 2.27.724 10.825 33.917-2.271-.725-10.825z"
          fill="#1E2D4F"
        />
        <Path
          d="M96.736 27.04l-33.917 2.272.725 10.824 33.916-2.271-.724-10.824zM95.546 8.817l-33.917 2.27.725 10.825 33.916-2.271-.724-10.824z"
          fill="#36528A"
        />
        <Path
          d="M16.242 59.59l49.441-3.429c3.734-.28 8.083 2.073 9.668 5.246l3.556 7.087 54.454-4.145c3.914-.307 7.341 2.456 7.648 6.166l2.302 68.52c.281 3.53-2.532 6.652-6.266 6.959l-110.495 8.75c-3.735.307-7.009-2.354-7.265-5.884L9.668 66.882c-.281-3.71 2.66-6.985 6.574-7.292z"
          fill="#DE8E0D"
        />
        <Path
          d="M39.116 27.63L-.002 43.335l37.32 93.008 39.118-15.707-37.32-93.008z"
          fill="#000"
        />
        <Path
          d="M78.242 11.923l28.493 71.001-13.147 30.831-17.137 6.883-37.317-93.005 39.108-15.71z"
          fill="#F0F0F0"
        />
        <Path
          d="M84.739 91.751l21.996-8.827-13.147 30.831-8.85-22.004z"
          fill="#000"
        />
        <Path
          d="M80.304 38.977L17.235 64.3l4.04 10.068 63.069-25.323-4.04-10.068z"
          fill="#36528A"
        />
        <Path
          d="M87.326 56.449l-31.548 12.66 4.038 10.07 31.548-12.662-4.038-10.068z"
          fill="#1E2D4F"
        />
        <Path
          d="M55.796 69.087L24.25 81.752l4.04 10.068 31.546-12.667-4.04-10.067z"
          fill="#36528A"
        />
        <Path
          d="M94.33 73.925L62.785 86.592l4.04 10.067L98.37 83.993l-4.04-10.068z"
          fill="#1E2D4F"
        />
        <Path
          d="M62.797 86.556L31.25 99.223l4.04 10.067 31.545-12.666-4.04-10.068z"
          fill="#36528A"
        />
        <Path
          d="M69.608 103.544L38.06 116.205l4.038 10.068 31.548-12.661-4.038-10.068z"
          fill="#FF4140"
        />
        <Path
          d="M69.397 23.935l-14.324 99.19 41.718 6.029 14.325-99.19-41.719-6.03z"
          fill="#000"
        />
        <Path
          d="M138.528 135.196l10.922-75.734-20.079-26.866-18.262-2.635-14.323 99.197 41.742 6.038z"
          fill="#F0F0F0"
        />
        <Path
          d="M125.995 56.084l23.455 3.377-20.079-26.865-3.376 23.488z"
          fill="#000"
        />
        <Path
          d="M68.383 87.98l-1.55 10.736 67.261 9.72 1.551-10.737-67.262-9.72z"
          fill="#36528A"
        />
        <Path
          d="M104.703 74.18l-1.549 10.738 33.644 4.856 1.549-10.737-33.644-4.856z"
          fill="#1E2D4F"
        />
        <Path
          d="M71.113 69.32l-1.551 10.737 33.643 4.862 1.551-10.737-33.643-4.862z"
          fill="#36528A"
        />
        <Path
          d="M107.421 55.569l-1.55 10.737 33.643 4.861 1.551-10.737-33.644-4.861z"
          fill="#1E2D4F"
        />
        <Path
          d="M73.785 50.716l-1.55 10.737 33.618 4.858 1.55-10.737-33.618-4.858z"
          fill="#36528A"
        />
        <Path
          d="M76.416 32.629l-1.55 10.737 33.617 4.858 1.551-10.737-33.618-4.858z"
          fill="#FF4140"
        />
        <Path
          d="M147.429 68.903l-52.638.435c-3.965 0-8.364 2.43-9.797 5.399l-3.171 6.601v73.637h62.665c3.964 0 7.213-2.61 7.213-5.783L155 74.967c0-3.352-3.402-6.064-7.571-6.064z"
          fill="url(#paint0_linear_123_2518)"
        />
        <Path
          d="M23.787 81.517c-4.169 0-7.57 2.738-7.57 6.064l3.299 61.637c0 3.173 3.248 5.782 7.213 5.782h55.068V81.364l-58.01.153z"
          fill="url(#paint1_linear_123_2518)"
        />
        <Path
          d="M19.132 141.875l.384 7.317c0 3.173 3.248 5.783 7.213 5.783h55.068v-13.1H19.132z"
          fill="url(#paint2_linear_123_2518)"
        />
        <Path
          d="M148.81 76.349a3.723 3.723 0 01-3.734 3.735H95.814a3.723 3.723 0 01-3.735-3.735 3.723 3.723 0 013.735-3.736h49.262a3.723 3.723 0 013.734 3.736zM72.026 105.491c-1.585 0-2.864 1.305-2.864 2.891v24.921c0 1.586 1.279 2.891 2.864 2.891 1.586 0 2.865-1.305 2.865-2.891v-24.921c0-1.586-1.279-2.891-2.865-2.891z"
          fill="#000"
        />
        <Path
          d="M63.432 110.915l8.594-14.968 8.595 14.968H63.432zM98.346 126.088a3.08 3.08 0 01-3.07-3.071V96.638a3.079 3.079 0 013.07-3.07 3.062 3.062 0 013.069 3.07v26.379a3.08 3.08 0 01-3.07 3.071z"
          fill="#000"
        />
        <Path
          d="M89.215 120.356l9.13 15.838 9.158-15.838H89.215zM39.44 113.039c0 3.786-3.069 6.882-6.88 6.882a6.883 6.883 0 01-6.88-6.882v-15.07c0-3.787 3.07-6.883 6.88-6.883 3.786 0 6.88 3.07 6.88 6.883v15.07z"
          fill="#000"
        />
        <Path
          d="M145 39l-13 14M146 52l-14-13"
          stroke="red"
          strokeWidth={6}
          strokeLinecap="round"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_123_2518"
          x1={118.411}
          y1={68.9033}
          x2={118.411}
          y2={154.975}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#CCFF02" />
          <Stop offset={1} stopColor="#FFE602" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_123_2518"
          x1={49.0067}
          y1={81.3638}
          x2={49.0067}
          y2={155}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#CCFF02" />
          <Stop offset={1} stopColor="#FFE602" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_123_2518"
          x1={50.4646}
          y1={141.875}
          x2={50.4646}
          y2={154.975}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFE602" stopOpacity={0} />
          <Stop offset={1} stopColor="#FFD702" />
        </LinearGradient>
        <ClipPath id="clip0_123_2518">
          <Path fill="#fff" d="M0 0H155V155H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
