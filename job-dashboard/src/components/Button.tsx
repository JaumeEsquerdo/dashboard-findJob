type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    bgColor?: string;
    textColor?: string;
    shadowColor?: string;
};

export const Button = ({
    children,
    className = '',
    bgColor = 'bg-whiteSpecial',
    textColor = 'text-main',
    shadowColor = 'var(--color-main)',
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`
        shadow-[0_0_0_2px_${shadowColor}]
        hover:shadow-[0_0_0_2px_${shadowColor},0_4px_0_2px_${shadowColor}]
        lg:hover:-translate-y-1.5 transform focus:translate-0
        lg:active:-translate-y-1 lg:active:shadow-[0_0_0_2px_${shadowColor},0_2px_0_2px_${shadowColor}]
        cursor-pointer px-4 py-2 rounded-2xl font-medium transition
        ${bgColor} ${textColor} w-fit duration-150 ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
};