'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/components/basic_button"
import { useRouter } from 'next/navigation'

export default function PowerUsage() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

	return (
		<div>
			<h1>Power Usage</h1>
            <BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}`) } />
		</div>
	)
}

