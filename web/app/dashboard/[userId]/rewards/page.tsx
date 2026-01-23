// web/app/dashboard/%5BuserId%5D/rewards/page.tsx
'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/buttons/basic_button"
import { useRouter } from 'next/navigation'
import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"

export default function Rewards() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

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
