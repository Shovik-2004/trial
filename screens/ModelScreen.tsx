import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ThreeDModelViewer from '../components/ThreeDModelViewer';

const ModelScreen = () => {
  const route = useRoute();
  const { model } = route.params as { model: string };

  return (
    <View style={{ flex: 1 }}>
      <ThreeDModelViewer modelPath={`/models/${model}`} />
    </View>
  );
};

export default ModelScreen;
