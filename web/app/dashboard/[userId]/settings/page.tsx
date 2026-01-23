'use client'
import SharedH1 from "ui/info/text/shared_h1"
import SharedH3 from "ui/info/text/shared_h3"

export default function Settings() {
	return (
		<>
			{/* Header */}
			<SharedH1 text={'Settings'} mode="light" />

			{/* Settings Content */}
			<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
					<SharedH3 text="Settings content to come..." mode="light" />
			</div>
		</>
	)
}
