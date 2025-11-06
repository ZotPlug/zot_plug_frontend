import SharedText, { sharedTextProps } from "./shared_text"

export default function SharedH3({ text }: sharedTextProps) {
    const webFontSize = 30
    const mobileFontSize = 20

    return (
        <SharedText text={text} webFontSize={webFontSize} mobileFontSize={mobileFontSize}/>
    )
}