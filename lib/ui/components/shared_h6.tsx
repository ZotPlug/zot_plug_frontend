import SharedText, { sharedTextProps } from "./shared_text"

export default function SharedH6({ text, mode }: sharedTextProps) {
    const webFontSize = 12
    const mobileFontSize = 6

    return (
        <SharedText 
            text={text} 
            webFontSize={webFontSize} 
            mobileFontSize={mobileFontSize} 
            modeOverride={mode}
        />
    )
}
