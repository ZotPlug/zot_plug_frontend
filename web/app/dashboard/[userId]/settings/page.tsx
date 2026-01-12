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
		<div className="min-h-screen w-full bg-sky-200 p-6">

			<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">

				<div className="mt-10 pb-6 flex flex-row w-full">
					<div className="w-full flex justify-start">
						<SharedH1 text="Settings" mode="light"/>
					</div>
					
					<div className="w-full flex justify-end">
						<BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}`) } />
					</div>
				</div>

					<SharedH3 text="Settings content to come..." mode="light"/>
				
			</div>
		</div>
	)
}

