import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { AmbientLight, PerspectiveCamera, PointLight, Scene, Group } from 'three';
import { ARModel } from '@/store/arModelsStore';
import { ChevronLeft, RefreshCcw, ZoomIn, ZoomOut } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';

interface ARViewerProps {
  model: ARModel;
  onBack: () => void;
}

export default function ARViewer({ model, onBack }: ARViewerProps) {
  const theme = useTheme();
  const { colors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  let timeout: NodeJS.Timeout | null = null;
  let frameId: number | null = null;
  let renderer: Renderer | null = null;
  let scene: Scene | null = null;
  let camera: PerspectiveCamera | null = null;
  let modelGroup: Group | null = null;

  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      const newZoom = zoomLevel + 0.2;
      setZoomLevel(newZoom);
      if (camera) camera.position.z = 5 / newZoom;
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      const newZoom = zoomLevel - 0.2;
      setZoomLevel(newZoom);
      if (camera) camera.position.z = 5 / newZoom;
    }
  };

  const handleReset = () => {
    setZoomLevel(1);
    if (camera) camera.position.set(0, 0, 5);
  };

  const onContextCreate = async (gl: WebGLRenderingContext) => {  // Fix here, use WebGLRenderingContext instead of ExpoWebGLRenderingContext
    renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x000000, 0);

    scene = new Scene();
    camera = new PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    camera.position.z = 5;

    const ambientLight = new AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    modelGroup = new Group();
    scene.add(modelGroup);

    try {
      setIsLoading(true);
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('An error occurred while setting up the 3D scene');
      setIsLoading(false);
    }

    const render = () => {
      frameId = requestAnimationFrame(render);

      if (modelGroup && model.animation?.type === 'rotation') {
        const speed = model.animation.speed || 0.01;
        const axis = model.animation.axis;
        if (axis === 'x') modelGroup.rotation.x += speed;
        else if (axis === 'y') modelGroup.rotation.y += speed;
        else if (axis === 'z') modelGroup.rotation.z += speed;
      }

      renderer?.render(scene!, camera!);

      if ('endFrameEXP' in gl && typeof (gl as any).endFrameEXP === 'function') {
        (gl as any).endFrameEXP();
      }
    };

    render();
  };

  useEffect(() => {
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>{model.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.arContainer}>
        {isLoading ? (
          <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.loadingText, { color: colors.text }]}>Loading 3D model...</Text>
          </View>
        ) : error ? (
          <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.errorText, { color: colors.error || '#ff4d4d' }]}>
              {error}
            </Text>
          </View>
        ) : (
          <GLView style={styles.glView} onContextCreate={onContextCreate} />
        )}
      </View>

      <View style={[styles.controls, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity style={[styles.controlButton, { backgroundColor: colors.primary + '20' }]} onPress={handleZoomOut}>
          <ZoomOut size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, { backgroundColor: colors.primary + '20' }]} onPress={handleReset}>
          <RefreshCcw size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, { backgroundColor: colors.primary + '20' }]} onPress={handleZoomIn}>
          <ZoomIn size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.labelsContainer, { backgroundColor: colors.card + 'CC' }]}>
        <Text style={[styles.labelsTitle, { color: colors.text }]}>Component Labels</Text>
        {model.labels.map((label, index) => (
          <View key={index} style={[styles.labelItem, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.labelText, { color: colors.text }]}>{label.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: { padding: 4 },
  title: { fontSize: 18, fontWeight: '600' },
  placeholder: { width: 28 },
  arContainer: { flex: 1 },
  glView: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  errorText: { fontSize: 16, textAlign: 'center' },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  labelsContainer: {
    position: 'absolute',
    right: 16,
    top: 80,
    padding: 12,
    borderRadius: 8,
    maxWidth: 160,
  },
  labelsTitle: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  labelItem: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 4, marginVertical: 4 },
  labelText: { fontSize: 12 },
});
