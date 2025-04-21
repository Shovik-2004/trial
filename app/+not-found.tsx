import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/ui/Button';

export default function NotFoundScreen() {
  const { colors } = useTheme();
  
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background }
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: colors.primaryText }
          ]}
        >
          This screen doesn't exist.
        </Text>
        
        <Link href="/" asChild>
          <Button 
            title="Go to Home Screen" 
            style={styles.button}
          />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: 'Inter-SemiBold',
  },
  button: {
    marginTop: 16,
  },
});