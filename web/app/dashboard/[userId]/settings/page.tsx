// web/app/dashboard/%5BuserId%5D/settings/page.tsx
'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/buttons/basic_button"
import SharedH1 from "ui/info/text/shared_h1"
import SharedH3 from "ui/info/text/shared_h3"
import { useRouter } from 'next/navigation'

export default function Settings() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

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
