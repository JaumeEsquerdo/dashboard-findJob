export const Button = ({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className={`shadow-[0_0_0_2px_var(--color-main)]
  hover:shadow-[0_0_0_2px_var(--color-main),0_4px_0_2px_var(--color-main)] lg:hover:-translate-y-1.5 transform focus:translate-0 lg:active:-translate-y-1 lg:active:shadow-[0_0_0_2px_var(--color-main),0_2px_0_2px_var(--color-main)] cursor-pointer px-4 py-2 rounded-2xl font-medium transition bg-whiteSpecial text-main w-fit duration-200 ${className}`} {...props}>
            {children}
        </button>
    )
}