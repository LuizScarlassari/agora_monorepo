import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const ArrowLeft: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export const CheckCircle: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const XCircle: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const MinusCircle: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const StopCircle: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);


export const QuestionMarkCircle: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

export const ThumbsUp: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M6.633 10.5l-1.84-1.84a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 000 1.06l1.06 1.06a.75.75 0 001.06 0l1.84-1.84zM6.633 10.5v5.25a.75.75 0 00.75.75h2.19c.483 0 .964.078 1.423.23l3.114 1.04a4.5 4.5 0 001.423.23h1.294c.969 0 1.853-.469 2.457-1.229a11.951 11.951 0 002.649-7.521c0-.435-.023-.863-.068-1.285a2.25 2.25 0 00-2.054-1.715H15.25a.75.75 0 00-.725 1.282c.287.622.287 1.292 0 1.914a2.25 2.25 0 01-1.565 1.08c-.28.062-.56.095-.844.095h-5.042a.75.75 0 00-.75.75v5.25z" />
    </svg>
);

export const ThumbsDown: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.542 8.261a24.42 24.42 0 01-4.163 5.702c-1.483 1.482-3.498 2.223-5.584 2.223-1.605 0-3.18-.44-4.577-1.229a11.95 11.95 0 01-3.41-3.41c-.788-1.396-1.229-2.973-1.229-4.577 0-2.086.741-4.101 2.223-5.584a24.42 24.42 0 015.702-4.163zM15.75 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" transform="rotate(180 12 12)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.367 13.5c-.806 0-1.533.446-2.031 1.08a9.041 9.041 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75A2.25 2.25 0 017.5 19.5c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H4.374c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 012.25 12c0-1.605.44-3.18 1.229-4.577a11.951 11.951 0 013.41-3.41C7.675 3.24 8.87 3 10.093 3c.723 0 1.437.108 2.128.313a2.25 2.25 0 012.013 2.501c-.085.34-.16.673-.228.996a4.498 4.498 0 00.322 1.672c.303.76.93 1.332 1.653 1.715a9.041 9.041 0 012.861 2.4c.498.634 1.225 1.08 2.031 1.08h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M17.367 13.5l1.84 1.84a.75.75 0 001.06 0l1.06-1.06a.75.75 0 000-1.06l-1.06-1.06a.75.75 0 00-1.06 0l-1.84 1.84zM17.367 13.5v-5.25a.75.75 0 00-.75-.75h-2.19c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H7.156c-.969 0-1.853.469-2.457 1.229A11.951 11.951 0 002.25 12c0 .435.023.863.068 1.285a2.25 2.25 0 002.054 1.715H8.75a.75.75 0 00.725-1.282c-.287-.622-.287-1.292 0-1.914a2.25 2.25 0 011.565-1.08c.28-.062.56-.095.844-.095h5.042a.75.75 0 00.75-.75v-5.25z" />
    </svg>
);

export const CheckSquare: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


export const Scale: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.153.24c-1.186 0-2.345-.343-3.344-.975L12 14.25m0 0l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.153.24c1.186 0 2.345-.343 3.344-.975L12 14.25m-6.75 4.97a48.416 48.416 0 01-3-.52c-1.01-.143-2.01-.317-3-.52m3 .52l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.153.24c1.186 0 2.345-.343 3.344-.975L12 14.25" />
    </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ filled, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321h5.365c.527 0 .745.684.362 1.01l-4.34 3.155a.563.563 0 00-.182.635l1.644 4.98c.154.468-.41.841-.816.52l-4.34-3.155a.563.563 0 00-.652 0l-4.34 3.155c-.406.295-.97-.052-.816-.52l1.644-4.98a.563.563 0 00-.182-.635l-4.34-3.155c-.383-.326-.165-1.01.362-1.01h5.365a.563.563 0 00.475-.321l2.125-5.111z" />
    </svg>
);

export const BallotIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5m3-15H5.25c-1.12 0-2.066.914-2.066 2.034v13.932c0 1.12.946 2.034 2.066 2.034h13.5c1.12 0 2.066-.914 2.066-2.034V8.784c0-1.12-.946-2.034-2.066-2.034H18M11.25 6.75l.75-2.25m-1.5 2.25L9 4.5m1.5 2.25L9 4.5m3 2.25l.75-2.25m-1.5 2.25L12 4.5m1.5 2.25l-.75 2.25m-7.5-2.25h9" />
    </svg>
);
