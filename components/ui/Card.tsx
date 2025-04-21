import React from 'react';
import { View, Text, StyleSheet, ViewProps, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface CardProps extends ViewProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  contentStyle?: ViewProps['style'];
}

export default function Card({
  children,
  title,
  subtitle,
  onPress,
  icon,
  style,
  contentStyle,
  ...props
}: CardProps) {
  const { colors } = useTheme();

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      {(title || icon) && (
        <View style={styles.header}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <View style={styles.titleContainer}>
            {title && (
              <Text
                style={[
                  styles.title,
                  {
                    color: colors.primaryText,
                  },
                ]}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: colors.secondaryText,
                  },
                ]}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  content: {
    padding: 16,
  },
});