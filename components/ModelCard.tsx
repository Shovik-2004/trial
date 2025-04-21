import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { ARModel } from '@/store/arModelsStore';

interface ModelCardProps {
  model: ARModel;
  onPress: () => void;
}

export default function ModelCard({ model, onPress }: ModelCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: model.markerImage }} style={styles.image} />
      <View style={styles.content}>
        <Text
          style={[
            styles.name,
            {
              color: colors.primaryText,
            },
          ]}
        >
          {model.name}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color: colors.secondaryText,
            },
          ]}
          numberOfLines={2}
        >
          {model.description}
        </Text>
        <View style={styles.details}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: colors.primary + '20',
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color: colors.primary,
                },
              ]}
            >
              {model.category}
            </Text>
          </View>
          {model.animation && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: colors.accent + '20',
                  marginLeft: 8,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color: colors.accent,
                  },
                ]}
              >
                Animated
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});