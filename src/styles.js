const mainTransition = "transition-all duration-500 ease-in-out"

const styles = {
    outerWrapper: "py-10 md:py-20 h-auto",
    wrapper: "max-w-[1200px] px-4 mx-auto",

    heading1: "text-5xl sm:text-6xl md:text-7xl font-bold",
    heading2: "text-4xl sm:text-5xl md:text-6xl font-bold",
    heading3: "text-3xl sm:text-4xl md:text-5xl font-semibold",
    heading4: "text-2xl sm:text-3xl md:text-4xl font-semibold",
    heading5: "text-xl sm:text-2xl md:text-3xl font-medium",
    heading6: "text-lg sm:text-xl md:text-2xl font-medium",
    paragraph1: "text-lg sm:text-xl md:text-2xl font-medium max-w-[60ch]",
    paragraph2: "text-base sm:text-lg md:text-xl font-medium max-w-[60ch]",
    paragraph3: "text-sm sm:text-base md:text-lg max-w-[60ch]",
    paragraph4: "text-xs sm:text-sm md:text-base max-w-[60ch]",

    inputLabel: "text-xl flex flex-col gap-1",

    input: "w-full py-1 px-3 outline outline-solid outline-gray-200 focus:outline focus:outline-solid focus:outline-gray-200 rounded-sm",

    primaryButton: `py-3 px-6 text-[11px] font-bold tracking-widest text-primary hover:bg-primary hover:text-light-primary border border-solid border-primary ${mainTransition}`,
    secondaryButton: `py-[10px] px-8 text-xs font-semibold text-light-primary border border-solid border-light-primary hover:bg-light-primary hover:text-dark ${mainTransition}`,
    ghostButton: "bg-slate-800 hover:bg-slate-700 text-white py-2 px-6 rounded-md transition-all ease-in-out duration-500",

    newCard: "bg-gray-50",
    acceptableCard: "bg-green-200",
    rejectedCard: "bg-yellow-200",
    editedCard: "bg-blue-200",

    rejectButton: `h-fit text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-white font-medium px-3 py-1 rounded-full ${mainTransition}`,
    deleteButton: `h-fit text-red-400 border border-red-400 hover:bg-red-400 hover:text-white font-medium px-3 py-1 rounded-full ${mainTransition}`,
    acceptButton: `h-fit text-green-400 border border-green-400 hover:bg-green-400 hover:text-white font-medium px-3 py-1 rounded-full ${mainTransition}`,
    confirmButton: `text-blue-400 border border-blue-400 hover:bg-blue-400 hover:text-white font-medium px-3 py-1 rounded-full ${mainTransition}`,
    cancelButton: `text-red-400 border border-red-400 hover:bg-red-400 hover:text-white font-medium px-3 py-1 rounded-full ${mainTransition}`,
    transition500: `${mainTransition}`
}

export default styles;