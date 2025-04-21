import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { ARModel } from '@/store/arModelsStore';

interface PlanetSelectorProps {
  planets: ARModel[];
  onSelectPlanet: (planet: ARModel) => void;
}

export default function PlanetSelector({ planets, onSelectPlanet }: PlanetSelectorProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: colors.primaryText,
          },
        ]}
      >
        Explore Our Solar System
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {planets.map((planet) => (
          <TouchableOpacity
            key={planet.id}
            style={[
              styles.planetCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onSelectPlanet(planet)}
          >
            <Image source={{ uri: planet.markerImage }} style={styles.planetImage} />
            <Text
              style={[
                styles.planetName,
                {
                  color: colors.primaryText,
                },
              ]}
            >
              {planet.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
  planetCard: {
    width: 120,
    height: 160,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  planetImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 8,
  },
  planetName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});