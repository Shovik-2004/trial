import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useARModelsStore, ARModel } from '@/store/arModelsStore';
import ModelCard from '@/components/ModelCard';
import PlanetSelector from '@/components/PlanetSelector';
import ARCamera from '@/components/ARCamera';
import ARViewer from '@/components/ARViewer';
import { ArrowLeft, Zap, Brain, Orbit } from 'lucide-react-native';

export default function TopicsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const { models, selectedModel, setSelectedModel } = useARModelsStore();
  const [activeCategory, setActiveCategory] = useState<string>(params.category || 'electrical');
  const [showScanner, setShowScanner] = useState(false);
  const [showARViewer, setShowARViewer] = useState(false);

  useEffect(() => {
    if (params.category) {
      setActiveCategory(params.category);
    }
  }, [params.category]);

  const filteredModels = models.filter(model => model.category === activeCategory);
  
  const planetModels = models.filter(
    model => model.category === 'school' && model.subCategory === 'planet'
  );
  
  const handleSelectModel = (model: ARModel) => {
    setSelectedModel(model);
    setShowScanner(true);
  };
  
  const handleBackFromScanner = () => {
    setShowScanner(false);
    setSelectedModel(null);
  };
  
  const handleModelDetected = () => {
    setShowScanner(false);
    setShowARViewer(true);
  };
  
  const handleBackFromARViewer = () => {
    setShowARViewer(false);
    setSelectedModel(null);
  };

  if (showScanner && selectedModel) {
    return (
      <ARCamera
        model={selectedModel}
        onBack={handleBackFromScanner}
        onModelDetected={handleModelDetected}
      />
    );
  }

  if (showARViewer && selectedModel) {
    return <ARViewer model={selectedModel} onBack={handleBackFromARViewer} />;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.primaryText,
            },
          ]}
        >
          Educational Topics
        </Text>
      </View>
      
      <View style={styles.categoryTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.categoryTab,
              activeCategory === 'electrical' && styles.activeTab,
              activeCategory === 'electrical' && { borderColor: colors.primary },
            ]}
            onPress={() => setActiveCategory('electrical')}
          >
            <Zap
              size={20}
              color={activeCategory === 'electrical' ? colors.primary : colors.secondaryText}
            />
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    activeCategory === 'electrical'
                      ? colors.primary
                      : colors.secondaryText,
                },
              ]}
            >
              Electrical
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryTab,
              activeCategory === 'medical' && styles.activeTab,
              activeCategory === 'medical' && { borderColor: colors.primary },
            ]}
            onPress={() => setActiveCategory('medical')}
          >
            <Brain
              size={20}
              color={activeCategory === 'medical' ? colors.primary : colors.secondaryText}
            />
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    activeCategory === 'medical'
                      ? colors.primary
                      : colors.secondaryText,
                },
              ]}
            >
              Medical
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryTab,
              activeCategory === 'school' && styles.activeTab,
              activeCategory === 'school' && { borderColor: colors.primary },
            ]}
            onPress={() => setActiveCategory('school')}
          >
            <Orbit
              size={20}
              color={activeCategory === 'school' ? colors.primary : colors.secondaryText}
            />
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    activeCategory === 'school'
                      ? colors.primary
                      : colors.secondaryText,
                },
              ]}
            >
              Space
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeCategory === 'school' && (
          <PlanetSelector
            planets={planetModels} 
            onSelectPlanet={handleSelectModel}
          />
        )}
        
        <View style={styles.modelsGrid}>
          {filteredModels
            .filter(model => {
              // For school category, only show the solar system model in the main list
              if (activeCategory === 'school') {
                return model.subCategory === 'solar-system';
              }
              return true;
            })
            .map(model => (
              <ModelCard
                key={model.id}
                model={model}
                onPress={() => handleSelectModel(model)}
              />
            ))}
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  categoryTabs: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  categoryText: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  modelsGrid: {
    marginTop: 8,
  },
});