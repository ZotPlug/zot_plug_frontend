'use client'
import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"

export default function Friends() {
	return (
		<>
			{/* Header */}
			<SharedH1 text={`Friends`} mode="light" />

			{/* Quick Summary */}
			<div className="bg-stone-100 border border-gray-300 rounded-lg p-5 shadow-md">
				<SharedH2 text="Quick Summary" mode="light" />
			</div>
		</>
	)
}
