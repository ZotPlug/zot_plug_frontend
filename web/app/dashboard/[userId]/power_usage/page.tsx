// web/app/dashboard/%5BuserId%5D/power_usage/page.tsx
'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/buttons/basic_button"
import { useRouter } from 'next/navigation'
import SharedH1 from "ui/info/text/shared_h1";
import SharedH3 from "ui/info/text/shared_h3";

export default function PowerUsage() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

	return (
		<>
			{/* Header */}
			<SharedH1 text={'Power Usage'} mode="light" />
		
			{/* Content Placeholder */}
			<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
					<SharedH3 text="Power Usage Content to come..." mode="light" />
			</div>
		</>
	)
}

// return (
// 	<div className="min-h-screen w-full bg-sky-200 p-6">
// 		<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
		
// 			<div className="mt-10 pb-6 flex flex-row w-full">
// 				<div className="w-full flex justify-start">
// 					<SharedH1 text="Power Usage Overview" mode="light"/>
// 				</div>
				
// 				<div className="w-full flex justify-end">
// 					<BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}`) } />
// 				</div>
// 			</div>

// 				<SharedH3 text="Power Usage Content to come..." mode="light"/>
			
// 		</div>
// 	</div>
// )