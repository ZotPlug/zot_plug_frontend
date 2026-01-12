import { useRouter } from 'expo-router'
import Welcome from 'ui/landingPage/welcome'

export default function Home() {
  const router = useRouter()
  /* useQuery, when you want to query data on page load */
  //const { data: test_data, isLoading } = useQuery({
  //  queryKey: ['test'],
  //  queryFn: async () => await testDataPost()
  //})

  ///* useEffect is situational, use if you want a action to run on first render */
  //function log_test_data() {
  //  console.log(test_data)
  //}

  //useEffect(() => {
  //  if (!isLoading) {
  //    console.log(test_data)
  //  }
  //}, [isLoading, test_data])

  return (
    <Welcome 
        onLogin={() => router.push('/auth?mode=login')}
        onSignUp={() => router.push('/auth?mode=signup')}
        logoPath={require('../assets/images/landing_page_logo.png')}/>

  )

  //return (
  //  <>
  //    <View className="flex flex-col justify-center mt-4 gap-y-4">
  //      <Test />
  //      <TestButton onPress={log_test_data} />
  //      <BasicButton text='Login' onPress={() => router.push('/auth?mode=login')} />
  //      <BasicButton text='Test Page' onPress={() => router.push('/(tabs)')} />
  //    </View>
  //  </>
  //);
}
