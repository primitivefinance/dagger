type Props = {
    children?: React.ReactNode
}

/**
 * @notice Important Component - Fits the website content into a 2/3 centered box.
 * @dev This component needs to be flex to fill the small space above the header.
 */
const Container = ({ children }: Props): JSX.Element => {
    return (
        <div className="mx-auto w-4/5 md:w-3/5 lg:w-1/2 flex flex-col">
            {children}
        </div>
    )
}

export default Container
