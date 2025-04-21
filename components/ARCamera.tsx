import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, ChevronLeft, Repeat, Scan } from 'lucide-react-native'; // 🔁 Updated icon here
import { useTheme } from '@/contexts/ThemeContext';
import { ARModel } from '@/store/arModelsStore';

interface ARCameraProps {
  model: ARModel;
  onBack: () => void;
  onModelDetected: () => void;
}

export default function ARCamera({ model, onBack, onModelDetected }: ARCameraProps) {
  const { colors } = useTheme();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        setScanning(false);
        onModelDetected();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [scanning, onModelDetected]);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const startScanning = () => {
    setScanning(true);
  };

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.message, { color: colors.text }]}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Camera size={64} color={colors.primary} />
        <Text style={[styles.message, { color: colors.text }]}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.card + 'CC' }]}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.primaryText }]}>{model.name}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.webCameraPlaceholder}>
          <Camera size={64} color={colors.primary} />
          <Text style={[styles.message, { color: colors.text, marginTop: 16 }]}>
            Camera preview not available on web.
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary, marginTop: 24 }]}
            onPress={onModelDetected}
          >
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Show 3D Model</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={[styles.header, { backgroundColor: colors.card + 'CC' }]}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.primaryText }]}>{model.name}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.overlay}>
          {scanning ? (
            <View style={[styles.scanningOverlay, { borderColor: colors.primary }]}>
              <Text
                style={[
                  styles.scanningText,
                  {
                    color: colors.primary,
                    backgroundColor: colors.background + 'CC',
                  },
                ]}
              >
                Scanning...
              </Text>
            </View>
          ) : (
            <View style={styles.targetFrame}>
              <View
                style={[
                  styles.targetCorner,
                  styles.topLeft,
                  { borderColor: colors.primary },
                ]}
              />
              <View
                style={[
                  styles.targetCorner,
                  styles.topRight,
                  { borderColor: colors.primary },
                ]}
              />
              <View
                style={[
                  styles.targetCorner,
                  styles.bottomLeft,
                  { borderColor: colors.primary },
                ]}
              />
              <View
                style={[
                  styles.targetCorner,
                  styles.bottomRight,
                  { borderColor: colors.primary },
                ]}
              />
            </View>
          )}
        </View>

        <View style={styles.bottomControls}>
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: colors.card + 'CC' }]}
            onPress={toggleCameraFacing}
          >
            <Repeat size={24} color={colors.primary} /> {/* ✅ Replaced here */}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.scanButton,
              { backgroundColor: scanning ? colors.error : colors.primary },
            ]}
            onPress={startScanning}
            disabled={scanning}
          >
            <Scan size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.placeholder} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  backButton: { padding: 4 },
  title: { fontSize: 18, fontWeight: '600' },
  placeholder: { width: 32 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  targetFrame: { width: 250, height: 250, position: 'relative' },
  targetCorner: { position: 'absolute', width: 30, height: 30, borderWidth: 4 },
  topLeft: {
    top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 12,
  },
  scanningOverlay: {
    width: 280,
    height: 280,
    borderWidth: 2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  scanningText: {
    fontSize: 16,
    fontWeight: '600',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    marginHorizontal: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  webCameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});
