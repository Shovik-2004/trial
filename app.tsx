import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ModelScreen from './screens/ModelScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ModelScreen" component={ModelScreen} /> {/* ✅ Add this line */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
