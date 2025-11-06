import SharedText, { sharedTextProps } from "./shared_text"

export default function SharedH5({ text }: sharedTextProps) {
    const webFontSize = 16
    const mobileFontSize = 8

    return (
        <SharedText text={text} webFontSize={webFontSize} mobileFontSize={mobileFontSize}/>
    )
}