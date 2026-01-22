import SharedText, { sharedTextProps } from "./shared_text"

export default function SharedH1({ text, mode }: sharedTextProps) {
    const webFontSize = 70
    const mobileFontSize = 40

    return (
        <SharedText 
            text={text} 
            webFontSize={webFontSize} 
            mobileFontSize={mobileFontSize} 
            modeOverride={mode}
        />
    )
}