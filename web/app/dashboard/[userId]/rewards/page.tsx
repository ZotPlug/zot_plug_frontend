'use client'
import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"

export default function Rewards() {
	return (
		<>
			{/* Header */}
			<SharedH1 text={'Rewards'} mode="light" />

			{/* Rewards Content */}
			<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
					<SharedH2 text="List of Rewards" mode="light" />
			</div>
		</>
	)
}
