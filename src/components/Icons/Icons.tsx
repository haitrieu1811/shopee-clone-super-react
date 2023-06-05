interface IconProps {
    className?: string;
}

export const CartIcon = ({ className }: IconProps) => (
    <svg viewBox='0 0 26.6 25.6' className={className}>
        <polyline
            points='2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1'
            fill='none'
            stroke='#ffffff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='2.5'
        ></polyline>
        <circle cx='10.7' cy='23' r='2.2' stroke='#ffffff' fill='#ffffff'></circle>
        <circle cx='19.7' cy='23' r='2.2' stroke='#ffffff' fill='#ffffff'></circle>
    </svg>
);

export const SearchIcon = ({ className }: IconProps) => (
    <svg viewBox='0 0 19 19' className={className}>
        <g fillRule='evenodd' stroke='none' strokeWidth='1'>
            <g transform='translate(-1016 -32)'>
                <g>
                    <g transform='translate(405 21)'>
                        <g transform='translate(611 11)'>
                            <path d='m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z'></path>
                            <path d='m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z'></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

export const GlobalIcon = ({ className }: IconProps) => (
    <svg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
        <path
            d='M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
        ></path>
        <path
            d='M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
        ></path>
        <path d='M1.33398 8H14.6673' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'></path>
    </svg>
);

export const ChevronDownIcon = ({ className }: IconProps) => (
    <svg viewBox='0 0 12 12' className={className}>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
            fill='currentColor'
        ></path>
    </svg>
);

export const BarIcon = ({ className }: IconProps) => (
    <svg viewBox='0 0 12 10' className={className}>
        <g fillRule='evenodd' stroke='none' strokeWidth='1'>
            <g transform='translate(-373 -208)'>
                <g transform='translate(155 191)'>
                    <g transform='translate(218 17)'>
                        <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                        <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                        <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

export const FilterIcon = ({ className }: IconProps) => (
    <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x='0' y='0' className={className}>
        <g>
            <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
            ></polyline>
        </g>
    </svg>
);

export const CheckIcon = ({ className }: IconProps) => (
    <svg enableBackground='new 0 0 12 12' viewBox='0 0 12 12' x='0' y='0' className={className}>
        <g>
            <path d='m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z'></path>
        </g>
    </svg>
);

export const NextIcon = ({ className }: IconProps) => (
    <svg viewBox='0 0 7 11' className={className}>
        <path
            d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
            fillRule='nonzero'
        ></path>
    </svg>
);

export const PrevIcon = ({ className }: IconProps) => (
    <svg viewBox='0 0 7 11' className={className}>
        <path
            d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
            fillRule='nonzero'
        ></path>
    </svg>
);

export const StartFillIcon = ({ className }: IconProps) => (
    <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x='0' y='0' className={className}>
        <polygon
            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
        ></polygon>
    </svg>
);

export const StartEmptyIcon = ({ className }: IconProps) => (
    <svg viewBox='0 0 30 30' className={className}>
        <defs>
            <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                <stop offset='0%' stopColor='#FFD211'></stop>
                <stop offset='100%' stopColor='#FFAD27'></stop>
            </linearGradient>
        </defs>
        <path
            fill='none'
            fillRule='evenodd'
            stroke='url(#star__hollow)'
            strokeWidth='2'
            d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
        ></path>
    </svg>
);

export const PencilIcon = ({ className }: IconProps) => (
    <svg viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg' className={className}>
        <path
            d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
            fill='#9B9B9B'
            fillRule='evenodd'
        ></path>
    </svg>
);

export const AddCartIcon = ({ className }: IconProps) => (
    <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x='0' y='0' className={className}>
        <g>
            <g>
                <polyline
                    points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                ></polyline>
                <circle cx='6' cy='13.5' r='1'></circle>
                <circle cx='11.5' cy='13.5' r='1'></circle>
            </g>
            <line fill='none' strokeLinecap='round' strokeMiterlimit='10' x1='7.5' x2='10.5' y1='7' y2='7'></line>
            <line fill='none' strokeLinecap='round' strokeMiterlimit='10' x1='9' x2='9' y1='8.5' y2='5.5'></line>
        </g>
    </svg>
);

export const MinusIcon = ({ className }: IconProps) => (
    <svg enableBackground='new 0 0 10 10' viewBox='0 0 10 10' x='0' y='0' className={className}>
        <polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5'></polygon>
    </svg>
);

export const PlusIcon = ({ className }: IconProps) => (
    <svg enableBackground='new 0 0 10 10' viewBox='0 0 10 10' x='0' y='0' className={className}>
        <polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5'></polygon>
    </svg>
);

export const QuestionIcon = ({ className }: IconProps) => (
    <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x='0' y='0' className={className}>
        <g>
            <circle cx='7.5' cy='7.5' fill='none' r='6.5' strokeMiterlimit='10'></circle>
            <path
                d='m5.3 5.3c.1-.3.3-.6.5-.8s.4-.4.7-.5.6-.2 1-.2c.3 0 .6 0 .9.1s.5.2.7.4.4.4.5.7.2.6.2.9c0 .2 0 .4-.1.6s-.1.3-.2.5c-.1.1-.2.2-.3.3-.1.2-.2.3-.4.4-.1.1-.2.2-.3.3s-.2.2-.3.4c-.1.1-.1.2-.2.4s-.1.3-.1.5v.4h-.9v-.5c0-.3.1-.6.2-.8s.2-.4.3-.5c.2-.2.3-.3.5-.5.1-.1.3-.3.4-.4.1-.2.2-.3.3-.5s.1-.4.1-.7c0-.4-.2-.7-.4-.9s-.5-.3-.9-.3c-.3 0-.5 0-.7.1-.1.1-.3.2-.4.4-.1.1-.2.3-.3.5 0 .2-.1.5-.1.7h-.9c0-.3.1-.7.2-1zm2.8 5.1v1.2h-1.2v-1.2z'
                stroke='none'
            ></path>
        </g>
    </svg>
);
