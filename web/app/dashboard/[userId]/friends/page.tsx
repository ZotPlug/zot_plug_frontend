'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/components/basic_button"
import { useRouter } from 'next/navigation'

export default function Friends() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

	return (
		<div>
			<h1>Friends</h1>
            <BasicButton text='Plugs' onPress={() => router.push(`/dashboard/${userId}/plugs`) } />
		</div>
	)
}

