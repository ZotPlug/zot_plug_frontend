'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/buttons/basic_button"
import { useRouter } from 'next/navigation'
import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"

export default function Friends() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

	return (
		<div className="min-h-screen w-full bg-sky-200 p-6">
					
			<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
				<div className="mt-10 pb-6 flex flex-row w-full">
					<div className="w-full flex justify-start">
						<SharedH1 text="Friends" mode="light"/>
					</div>
					
					<div className="w-full flex justify-end">
						<BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}`) } />
					</div>
				</div>
			</div>

			<div className='mt-10 flex flex-col md:flex-row gap-8 w-full'>
				
				{/* Left Column */}
				<div className="w-full md:w-1/3 flex flex-col gap-6">
					<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
						<SharedH2 text="Your Friends" mode="light" />
					</div>
				</div>
				
				{/* Middle Column */}
				<div className="w-full md:w-1/3 flex flex-col gap-6">
					<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
						<SharedH2 text="Friends' Plugs" mode="light" />						
					</div>
				</div>

				{/* Right Column */}
				<div className="w-full md:w-1/3 flex flex-col gap-6">
					<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
						<SharedH2 text="Add Friends" mode="light" />						
					</div>
				</div>
			</div>
		</div>
	)
}

