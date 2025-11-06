import SharedText, { sharedTextProps } from "./shared_text"

export default function SharedH4({ text }: sharedTextProps) {
    const webFontSize = 20
    const mobileFontSize = 10

    return (
        <SharedText text={text} webFontSize={webFontSize} mobileFontSize={mobileFontSize}/>
    )
}