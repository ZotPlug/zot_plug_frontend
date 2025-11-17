// web/app/dashboard/%5BuserId%5D/power_usage/page.tsx
'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/components/basic_button"
import { useRouter } from 'next/navigation'
import SharedH1 from "ui/components/shared_h1";

export default function PowerUsage() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

	return (
		<div className="min-h-screen w-full bg-sky-200 p-6">
			<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
				<SharedH1 text='Power Usage' mode="light"/>

				<div className="mt-6">
					<BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}`) } />
				</div>
			</div>
		</div>
	)
}

