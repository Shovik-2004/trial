import React from 'react';
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ModelScreen: { model: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'ModelScreen'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Electrical Engineering */}
      <Button title="Electric Motor" onPress={() => navigation.navigate('ModelScreen', { model: 'electric_motor.glb' })} />
      <Button title="Rotor Assembly" onPress={() => navigation.navigate('ModelScreen', { model: 'rotor_assembly.glb' })} />
      <Button title="Transformer" onPress={() => navigation.navigate('ModelScreen', { model: 'transformer.glb' })} />

      {/* Medical Anatomy */}
      <Button title="Human Brain" onPress={() => navigation.navigate('ModelScreen', { model: 'human_brain.glb' })} />
      <Button title="Human Heart" onPress={() => navigation.navigate('ModelScreen', { model: 'human_heart.glb' })} />
      <Button title="Human Skeleton" onPress={() => navigation.navigate('ModelScreen', { model: 'human_skeleton.glb' })} />

      {/* Space and Astronomy */}
      <Button title="Solar System" onPress={() => navigation.navigate('ModelScreen', { model: 'solar_system.glb' })} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
});

export default HomeScreen;
