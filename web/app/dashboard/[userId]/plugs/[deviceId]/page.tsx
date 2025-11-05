'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/components/basic_button"
import SharedH1 from "ui/components/shared_h1"
import { useRouter } from 'next/navigation'

export default function DevicePage() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

	return (
		<div>
            <SharedH1 text='Device Page'/>

            <BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}/plugs`) } />
		</div>
	)
}