import { create } from 'zustand';

export interface ARModel {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  modelUrl: string;
  markerImage: string;
  description: string;
  labels: { name: string; position: [number, number, number] }[];
  animation?: {
    type: string;
    axis?: 'x' | 'y' | 'z';
    speed?: number;
  };
}

interface ARModelsState {
  models: ARModel[];
  selectedModel: ARModel | null;
  setSelectedModel: (model: ARModel | null) => void;
}

export const useARModelsStore = create<ARModelsState>((set) => ({
  models: [
    // Electrical Category
    {
      id: 'motor',
      name: 'Electric Motor',
      category: 'electrical',
      subCategory: 'motor',
      modelUrl: 'https://example.com/models/motor.glb',
      markerImage: 'https://images.pexels.com/photos/2547413/pexels-photo-2547413.jpeg',
      description: 'A 3D model of an electric motor showing all internal components.',
      labels: [
        { name: 'Stator', position: [0, 0.5, 0] },
        { name: 'Rotor', position: [0, 0, 0.5] },
        { name: 'Shaft', position: [0, 0, -0.5] },
        { name: 'Bearing', position: [0.5, 0, 0] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.01,
      },
    },
    {
      id: 'rotor',
      name: 'Rotor Assembly',
      category: 'electrical',
      subCategory: 'rotor',
      modelUrl: 'https://example.com/models/rotor.glb',
      markerImage: 'https://images.pexels.com/photos/162631/industrial-machine-turning-metal-steel-162631.jpeg',
      description: 'Detailed view of a rotor assembly with windings and core components.',
      labels: [
        { name: 'Shaft', position: [0, 0, 0] },
        { name: 'Core', position: [0, 0.3, 0] },
        { name: 'Windings', position: [0.2, 0, 0] },
        { name: 'End Ring', position: [0, 0, 0.3] },
      ],
      animation: {
        type: 'rotation',
        axis: 'z',
        speed: 0.01,
      },
    },
    {
      id: 'transformer',
      name: 'Transformer',
      category: 'electrical',
      subCategory: 'transformer',
      modelUrl: 'https://example.com/models/transformer.glb',
      markerImage: 'https://images.pexels.com/photos/2569842/pexels-photo-2569842.jpeg',
      description: 'Power transformer with core and windings visible.',
      labels: [
        { name: 'Core', position: [0, 0, 0] },
        { name: 'Primary Winding', position: [0.3, 0, 0] },
        { name: 'Secondary Winding', position: [-0.3, 0, 0] },
        { name: 'Insulation', position: [0, 0.3, 0] },
      ],
    },
    
    // Medical Category
    {
      id: 'brain',
      name: 'Human Brain',
      category: 'medical',
      subCategory: 'brain',
      modelUrl: 'https://example.com/models/brain.glb',
      markerImage: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
      description: 'Detailed 3D model of the human brain showing different regions.',
      labels: [
        { name: 'Frontal Lobe', position: [0, 0, 0.3] },
        { name: 'Parietal Lobe', position: [0, 0.3, 0] },
        { name: 'Temporal Lobe', position: [0.3, 0, 0] },
        { name: 'Cerebellum', position: [0, -0.3, 0] },
        { name: 'Brain Stem', position: [0, -0.3, -0.2] },
      ],
    },
    {
      id: 'heart',
      name: 'Human Heart',
      category: 'medical',
      subCategory: 'heart',
      modelUrl: 'https://example.com/models/heart.glb',
      markerImage: 'https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg',
      description: 'Anatomically accurate model of the human heart with all chambers and vessels.',
      labels: [
        { name: 'Right Atrium', position: [0.2, 0, 0] },
        { name: 'Left Atrium', position: [-0.2, 0, 0] },
        { name: 'Right Ventricle', position: [0.2, -0.2, 0] },
        { name: 'Left Ventricle', position: [-0.2, -0.2, 0] },
        { name: 'Aorta', position: [0, 0.3, 0] },
      ],
      animation: {
        type: 'pulse',
        speed: 0.5,
      },
    },
    {
      id: 'skeleton',
      name: 'Human Skeleton',
      category: 'medical',
      subCategory: 'skeleton',
      modelUrl: 'https://example.com/models/skeleton.glb',
      markerImage: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg',
      description: 'Complete human skeletal system with all major bones labeled.',
      labels: [
        { name: 'Skull', position: [0, 0.5, 0] },
        { name: 'Spine', position: [0, 0.2, 0] },
        { name: 'Ribcage', position: [0, 0.1, 0.1] },
        { name: 'Pelvis', position: [0, -0.1, 0] },
        { name: 'Femur', position: [0.1, -0.3, 0] },
      ],
    },
    
    // School/Solar System Category
    {
      id: 'solar-system',
      name: 'Solar System',
      category: 'school',
      subCategory: 'solar-system',
      modelUrl: 'https://example.com/models/solar-system.glb',
      markerImage: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg',
      description: 'Interactive model of our solar system with all planets.',
      labels: [
        { name: 'Sun', position: [0, 0, 0] },
        { name: 'Mercury', position: [0.1, 0, 0] },
        { name: 'Venus', position: [0.2, 0, 0] },
        { name: 'Earth', position: [0.3, 0, 0] },
        { name: 'Mars', position: [0.4, 0, 0] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.005,
      },
    },
    {
      id: 'mercury',
      name: 'Mercury',
      category: 'school',
      subCategory: 'planet',
      modelUrl: 'https://example.com/models/mercury.glb',
      markerImage: 'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg',
      description: 'The smallest planet in our solar system and closest to the Sun.',
      labels: [
        { name: 'Caloris Basin', position: [0, 0.2, 0] },
        { name: 'Surface Cratering', position: [0.2, 0, 0] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.01,
      },
    },
    {
      id: 'venus',
      name: 'Venus',
      category: 'school',
      subCategory: 'planet',
      modelUrl: 'https://example.com/models/venus.glb',
      markerImage: 'https://images.pexels.com/photos/39896/space-station-moon-landing-apollo-15-james-irwin-39896.jpeg',
      description: 'The second planet from the Sun with a thick atmosphere.',
      labels: [
        { name: 'Cloud Layer', position: [0, 0.3, 0] },
        { name: 'Volcanic Surface', position: [0, 0, 0.3] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.008,
      },
    },
    {
      id: 'earth',
      name: 'Earth',
      category: 'school',
      subCategory: 'planet',
      modelUrl: 'https://example.com/models/earth.glb',
      markerImage: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg',
      description: 'Our home planet with oceans, continents, and atmosphere.',
      labels: [
        { name: 'North America', position: [-0.2, 0.2, 0.2] },
        { name: 'Africa', position: [0.1, 0.1, 0.3] },
        { name: 'Pacific Ocean', position: [-0.3, 0, -0.1] },
        { name: 'Antarctica', position: [0, -0.3, 0] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.01,
      },
    },
    {
      id: 'mars',
      name: 'Mars',
      category: 'school',
      subCategory: 'planet',
      modelUrl: 'https://example.com/models/mars.glb',
      markerImage: 'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg',
      description: 'The red planet with polar ice caps and the largest volcano in the solar system.',
      labels: [
        { name: 'Olympus Mons', position: [0, 0.2, 0.2] },
        { name: 'Valles Marineris', position: [0.2, 0, 0] },
        { name: 'North Pole', position: [0, 0.3, 0] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.008,
      },
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      category: 'school',
      subCategory: 'planet',
      modelUrl: 'https://example.com/models/jupiter.glb',
      markerImage: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg',
      description: 'The largest planet in our solar system with distinct cloud bands.',
      labels: [
        { name: 'Great Red Spot', position: [0.3, 0, 0.1] },
        { name: 'Cloud Bands', position: [0, 0, 0.3] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.02,
      },
    },
    {
      id: 'saturn',
      name: 'Saturn',
      category: 'school',
      subCategory: 'planet',
      modelUrl: 'https://example.com/models/saturn.glb',
      markerImage: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg',
      description: 'Known for its distinctive ring system.',
      labels: [
        { name: 'Rings', position: [0.4, 0, 0] },
        { name: 'Hexagonal Polar Vortex', position: [0, 0.3, 0] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.015,
      },
    },
    {
      id: 'uranus',
      name: 'Uranus',
      category: 'school',
      subCategory: 'planet',
      modelUrl: 'https://example.com/models/uranus.glb',
      markerImage: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg',
      description: 'The seventh planet from the Sun, rotating on its side.',
      labels: [
        { name: 'Ring System', position: [0.3, 0, 0] },
        { name: 'Atmosphere', position: [0, 0.2, 0.2] },
      ],
      animation: {
        type: 'rotation',
        axis: 'z',
        speed: 0.01,
      },
    },
    {
      id: 'neptune',
      name: 'Neptune',
      category: 'school',
      subCategory: 'planet',
      modelUrl: 'https://example.com/models/neptune.glb',
      markerImage: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg',
      description: 'The eighth and farthest planet with strong winds.',
      labels: [
        { name: 'Great Dark Spot', position: [0.2, 0, 0.2] },
        { name: 'Atmosphere Bands', position: [0, 0, 0.3] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.012,
      },
    },
    {
      id: 'pluto',
      name: 'Pluto',
      category: 'school',
      subCategory: 'planet',
      modelUrl: 'https://example.com/models/pluto.glb',
      markerImage: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg',
      description: 'A dwarf planet in the Kuiper belt.',
      labels: [
        { name: 'Heart Formation', position: [0, 0, 0.15] },
        { name: 'Surface Features', position: [0.15, 0, 0] },
      ],
      animation: {
        type: 'rotation',
        axis: 'y',
        speed: 0.005,
      },
    },
  ],
  selectedModel: null,
  setSelectedModel: (model) => set({ selectedModel: model }),
}));