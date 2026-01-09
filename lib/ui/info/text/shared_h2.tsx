import SharedText, { sharedTextProps } from "./shared_text"

export default function SharedH2({ text, mode }: sharedTextProps) {
    const webFontSize = 40
    const mobileFontSize = 30

    return (
        <SharedText 
            text={text} 
            webFontSize={webFontSize} 
            mobileFontSize={mobileFontSize} 
            modeOverride={mode}
        />
    )
}