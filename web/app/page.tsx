'use client'
import { Test } from 'ui/test'
import { TestButton } from 'ui/test_button'
import BasicButton from 'ui/components/basic_button'
import { useQuery } from '@tanstack/react-query'
import { fetch_test } from './api_utils/api_actions'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useResponsiveLayout, DeviceType } from './window_utils'
import Button_1 from 'ui/buttons/button_1'
import Shared_H1 from 'ui/info/text/shared_h1'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  ///* useQuery, when you want to query data on page load */
  //const { data: test_data, isLoading } = useQuery({
  //  queryKey: ['test'],
  //  queryFn: async () => await fetch_test()
  //})

  ///* useEffect is situational, use if you want a action to run on first render */
  //useEffect(() => {
  //  if (!isLoading) {
  //    console.log(test_data)
  //  }
  //}, [isLoading, test_data])

  // TODO: make this a component and pass in the device type to it
  const layout: DeviceType = useResponsiveLayout()

  let logoSize: number
  switch (layout) {
    case DeviceType.Mobile:
        logoSize = 200
        break
    case DeviceType.Tablet:
        logoSize = 280
        break
    case DeviceType.Desktop:
        logoSize = 280
        break
  }

  return (
    <>
        <div className="bg-gradient-to-br from-[#EAF6FF] to-[#DDE2FA] min-h-screen w-screen">
            <div className="flex justify-center flex-col items-center pt-30">
                <Shared_H1 text="Welcome to"/>
                <div className="pt-5"></div>
                <Image
                    src='/images/landing_page/landing_page_logo.svg' 
                    width={logoSize} 
                    height={logoSize} 
                    objectFit='contain'
                    alt="Zotplug Logo"/>
                <div className="pt-10"></div>
                <div className={layout === DeviceType.Mobile ? "flex flex-col" : "flex"}>
                    <Button_1 text="Login"/>
                    <Button_1 text="Sign Up"/>
                </div>
            </div>
        </div>
    </>
  )



  //return (
  //  <>
  //    {/* Tailwind in-line styling */}
  //    <div className="bg-red-500 w-full h-10"> test test</div>
  //    { /* Shared UI comp, check proj_root/ui to check how this works */}
  //    <div className="bg-green-500 w-full h-10">
  //      {isLoading ? "Fetching_data" : "Data logged to client console"}
  //    </div>
  //    <div className="flex flex-col justify-center mt-4 gap-y-4">
  //      <Test />
  //      <TestButton onPress={async () => {
  //        const data = await fetch_test()
  //        console.log(data)
  //      }} />
  //      <BasicButton text='Login' onPress={() => router.push('/auth?mode=login')} />
  //    </div>
  //  </>
  //);
}
