/**
 * SoftBackdrop - Decorative background component that renders two soft
 * gradient blurs (pink tones) positioned behind page content.
 * Uses fixed positioning with -z-1 so it sits behind all other elements.
 */
const SoftBackdrop = () => {
    return (
        < div className='fixed inset-0 -z-1 pointer-events-none' >
            {/* Large centered top gradient blur */}
            <div className='absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-pink-800/35 to-transparent rounded-full blur-3xl' />
            {/* Smaller bottom-right gradient blur */}
            <div className='absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-pink-700/35 to-transparent rounded-full blur-2xl' />
        </div >
    )
}

export default SoftBackdrop