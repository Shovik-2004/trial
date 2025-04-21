import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Zap, Microscope, BookOpen } from 'lucide-react-native';
import CategoryCard from '@/components/CategoryCard';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();

  const navigateToCategory = (category: string) => {
    router.push({
      pathname: '/(tabs)/topics',
      params: { category },
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.greeting,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            Welcome back,
          </Text>
          <Text
            style={[
              styles.username,
              {
                color: colors.primaryText,
              },
            ]}
          >
            {user?.username || 'User'}
          </Text>
        </View>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
          }}
          style={styles.avatar}
        />
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.featuredSection,
            {
              backgroundColor: colors.primary + '10',
              borderColor: colors.primary + '30',
            },
          ]}
        >
          <View style={styles.featuredContent}>
            <Text
              style={[
                styles.featuredTitle,
                {
                  color: colors.primaryText,
                },
              ]}
            >
              Augmented Reality Education
            </Text>
            <Text
              style={[
                styles.featuredDescription,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              Explore 3D models and learn through immersive AR experiences
            </Text>
            <TouchableOpacity
              style={[
                styles.featuredButton,
                {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => router.push('/(tabs)/topics')}
            >
              <Text
                style={[
                  styles.featuredButtonText,
                  {
                    color: '#FFFFFF',
                  },
                ]}
              >
                Explore Now
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg',
            }}
            style={styles.featuredImage}
          />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.primaryText,
            },
          ]}
        >
          Educational Categories
        </Text>

        <CategoryCard
          title="Electrical Engineering"
          description="Explore motors, rotors, transformers and other electrical components in 3D"
          imageUrl="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg"
          onPress={() => navigateToCategory('electrical')}
        />

        <CategoryCard
          title="Medical Anatomy"
          description="Learn about human anatomy with detailed 3D models of organs and systems"
          imageUrl="https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg"
          onPress={() => navigateToCategory('medical')}
        />

        <CategoryCard
          title="Space & Astronomy"
          description="Discover the solar system and explore planets in augmented reality"
          imageUrl="https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg"
          onPress={() => navigateToCategory('school')}
        />

        <View style={styles.featuresSection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.primaryText,
              },
            ]}
          >
            App Features
          </Text>

          <View style={styles.featuresGrid}>
            <View
              style={[
                styles.featureCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.iconBackground,
                  {
                    backgroundColor: colors.primary + '15',
                  },
                ]}
              >
                <Zap size={24} color={colors.primary} />
              </View>
              <Text
                style={[
                  styles.featureTitle,
                  {
                    color: colors.primaryText,
                  },
                ]}
              >
                Interactive 3D
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  {
                    color: colors.secondaryText,
                  },
                ]}
                numberOfLines={2}
              >
                Interact with detailed 3D models
              </Text>
            </View>

            <View
              style={[
                styles.featureCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.iconBackground,
                  {
                    backgroundColor: colors.accent + '15',
                  },
                ]}
              >
                <Microscope size={24} color={colors.accent} />
              </View>
              <Text
                style={[
                  styles.featureTitle,
                  {
                    color: colors.primaryText,
                  },
                ]}
              >
                Detailed Labels
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  {
                    color: colors.secondaryText,
                  },
                ]}
                numberOfLines={2}
              >
                Learn with accurate component labels
              </Text>
            </View>

            <View
              style={[
                styles.featureCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.iconBackground,
                  {
                    backgroundColor: colors.secondary + '15',
                  },
                ]}
              >
                <BookOpen size={24} color={colors.secondary} />
              </View>
              <Text
                style={[
                  styles.featureTitle,
                  {
                    color: colors.primaryText,
                  },
                ]}
              >
                Multi-Subject
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  {
                    color: colors.secondaryText,
                  },
                ]}
                numberOfLines={2}
              >
                Content across various disciplines
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  featuredSection: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 16,
    borderWidth: 1,
  },
  featuredContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  featuredDescription: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  featuredButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  featuredImage: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 16,
    fontFamily: 'Inter-Bold',
  },
  featuresSection: {
    marginTop: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
});