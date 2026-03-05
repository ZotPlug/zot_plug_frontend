import SharedText, { sharedTextProps } from "./shared_text"

export default function SharedH1({ text, mode, center=false }: sharedTextProps) {
    const webFontSize = 58
    const mobileFontSize = 40

    return (
        <SharedText 
            text={text} 
            webFontSize={webFontSize} 
            mobileFontSize={mobileFontSize} 
            modeOverride={mode}
            center={center}
        />
    )
}