/**
 * Splits a text string into individual character spans for animation
 * @param text - The text to split
 * @param className - CSS class to apply to each character span
 * @returns Array of span elements
 */
export function splitText(text: string, className: string = "inline-block whitespace-pre") {
    return text.split("").map((char, i) => ({
        key: i,
        char,
        className
    }));
}

/**
 * Renders split text characters as spans
 */
export function SplitText({
    text,
    className = "inline-block whitespace-pre",
    charClassName = ""
}: {
    text: string;
    className?: string;
    charClassName?: string;
}) {
    return (
        <>
            {text.split("").map((char, i) => (
                <span key={i} className={`${className} ${charClassName}`}>
                    {char}
                </span>
            ))}
        </>
    );
}
