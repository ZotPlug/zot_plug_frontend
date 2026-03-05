import SharedText, { sharedTextProps } from "./shared_text"

export default function SharedH4({ text, mode }: sharedTextProps) {
    const webFontSize = 16
    const mobileFontSize = 16

    return (
        <SharedText 
            text={text} 
            webFontSize={webFontSize} 
            mobileFontSize={mobileFontSize} 
            modeOverride={mode}
        />
    )
}
