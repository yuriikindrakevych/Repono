import React from 'react';

/* Repono icon set — Lucide-style line icons, 1.75 stroke, rounded caps.
   Ported from the design system UI kit to ES modules. Sized in `em`,
   inherit currentColor. */

const svgProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    width: '1em',
    height: '1em',
};

const Icon = (children) => function ReponoIcon(props) {
    return (
        <svg {...svgProps} {...props}>
            {children}
        </svg>
    );
};

export const Terminal = Icon(<><path d="m4 17 6-6-6-6" /><path d="M12 19h8" /></>);
export const Package = Icon(
    <>
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
    </>
);
export const Key = Icon(
    <>
        <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L21 5" />
        <path d="m21 2-9.6 9.6" />
        <circle cx="7.5" cy="15.5" r="5.5" />
    </>
);
export const Shield = Icon(
    <>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
    </>
);
export const Refresh = Icon(
    <>
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
    </>
);
export const Check = Icon(<path d="M20 6 9 17l-5-5" />);
export const ArrowRight = Icon(<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>);
export const ChevronDown = Icon(<path d="m6 9 6 6 6-6" />);
export const ChevronRight = Icon(<path d="m9 18 6-6-6-6" />);
export const GitBranch = Icon(
    <>
        <line x1="6" x2="6" y1="3" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
    </>
);
export const Plug = Icon(
    <>
        <path d="M12 22v-5" />
        <path d="M9 7V2" />
        <path d="M15 7V2" />
        <path d="M6 13V8h12v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z" />
    </>
);
export const Receipt = Icon(
    <>
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 17.5v1.5M12 6v1.5" />
    </>
);
export const Globe = Icon(
    <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
    </>
);
export const Lock = Icon(
    <>
        <rect width="18" height="11" x="3" y="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
);
