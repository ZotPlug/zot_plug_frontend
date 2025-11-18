import SharedText, { sharedTextProps } from "./shared_text"

export default function SharedH3({ text, mode }: sharedTextProps) {
    const webFontSize = 30
    const mobileFontSize = 15

    return (
        <SharedText 
            text={text} 
            webFontSize={webFontSize} 
            mobileFontSize={mobileFontSize} 
            modeOverride={mode}
        />
    )
}