import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { useJobStore } from './src/store/jobstore';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

 const hasHydrated = useJobStore((state) => state.hasHydrated);
console.log('fontsLoaded:', fontsLoaded, 'hasHydrated:', hasHydrated);

  if (!fontsLoaded || !hasHydrated) return null;

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}