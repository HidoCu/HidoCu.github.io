import { createAnimationConfigs } from '@/hooks/animation/snow';
import { RotationMode } from '@/hooks/animation/snow/types';

const animationConfigs = createAnimationConfigs([
  /* batch 1 average */
  {
    x: {
      val: 12,
      perUnit: true,
    },
    y: {
      val: 16,
      perUnit: true,
    },
    beginEndDistance: {
      val: 100,
    },
    distance: {
      val: 400,
    },
    beginEndDuration: 1,
    duration: 4,
    size: 240,
    rotateDuration: 5,
    rotation: RotationMode.CW,
    broadcastDuration: 2,
    delay: 0,
  },
  {
    x: {
      val: 32,
      perUnit: true,
    },
    y: {
      val: 43,
      perUnit: true,
    },
    beginEndDistance: {
      val: 100,
    },
    distance: {
      val: 400,
    },
    beginEndDuration: 1,
    duration: 4,
    size: 180,
    rotateDuration: 4,
    rotation: RotationMode.CCW,
    broadcastDuration: 1,
    delay: .2,
  },
  {
    x: {
      val: 55,
      perUnit: true,
    },
    y: {
      val: 31,
      perUnit: true,
    },
    beginEndDistance: {
      val: 80,
    },
    distance: {
      val: 630,
    },
    beginEndDuration: 1,
    duration: 6,
    size: 140,
    rotateDuration: 4,
    rotation: RotationMode.CCW,
    broadcastDuration: .5,
    delay: .5,
  },
  {
    x: {
      val: 74,
      perUnit: true,
    },
    y: {
      val: 7,
      perUnit: true,
    },
    beginEndDistance: {
      val: 110,
    },
    distance: {
      val: 520,
    },
    beginEndDuration: 1,
    duration: 5,
    size: 140,
    rotateDuration: 4,
    rotation: RotationMode.CW,
    broadcastDuration: 1,
    delay: 1.2,
  },
  {
    x: {
      val: 91,
      perUnit: true,
    },
    y: {
      val: 65,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 320,
    },
    beginEndDuration: 1,
    duration: 5,
    size: 140,
    rotateDuration: 3,
    rotation: RotationMode.CCW,
    broadcastDuration: 1,
    delay: 1.2,
  },
  
  /* batch 2 low place */
  {
    x: {
      val: 5,
      perUnit: true,
    },
    y: {
      val: 32,
      perUnit: true,
    },
    beginEndDistance: {
      val: 120,
    },
    distance: {
      val: 45,
      perUnit: true
    },
    beginEndDuration: .7,
    duration: 3,
    size: 120,
    rotateDuration: 4.5,
    rotation: RotationMode.CCW,
    broadcastDuration: .2,
    delay: .5,
  },
  {
    x: {
      val: 25,
      perUnit: true,
    },
    y: {
      val: 6,
      perUnit: true,
    },
    beginEndDistance: {
      val: 100,
    },
    distance: {
      val: 60,
      perUnit: true
    },
    beginEndDuration: 2,
    duration: 12,
    size: 240,
    rotateDuration: 7,
    rotation: RotationMode.CCW,
    broadcastDuration: 1,
    delay: 2,
  },
  {
    x: {
      val: 48,
      perUnit: true,
    },
    y: {
      val: 71,
      perUnit: true,
    },
    beginEndDistance: {
      val: 160,
    },
    distance: {
      val: 320,
    },
    beginEndDuration: 2.5,
    duration: 6,
    size: 200,
    rotateDuration: 8,
    rotation: RotationMode.CW,
    broadcastDuration: 2,
    delay: .7,
  },
  {
    x: {
      val: 69,
      perUnit: true,
    },
    y: {
      val: 50,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 430,
    },
    beginEndDuration: .8,
    duration: 3,
    size: 170,
    rotateDuration: 4,
    rotation: RotationMode.CW,
    broadcastDuration: 1.4,
    delay: 1.8,
  },
  {
    x: {
      val: 85,
      perUnit: true,
    },
    y: {
      val: 17,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 70,
      perUnit: true
    },
    beginEndDuration: 1,
    duration: 8,
    size: 250,
    rotateDuration: 9,
    rotation: RotationMode.CW,
    broadcastDuration: 1,
    delay: 2.5,
  },
  
  /* batch 3 high place */
  {
    x: {
      val: 9,
      perUnit: true,
    },
    y: {
      val: -15,
      perUnit: true,
    },
    beginEndDistance: {
      val: 100,
    },
    distance: {
      val: 40,
      perUnit: true
    },
    beginEndDuration: 1,
    duration: 5,
    size: 150,
    rotateDuration: 5,
    rotation: RotationMode.CW,
    broadcastDuration: .5,
    delay: .4,
  },
  {
    x: {
      val: 31,
      perUnit: true,
    },
    y: {
      val: -7,
      perUnit: true,
    },
    beginEndDistance: {
      val: 150,
    },
    distance: {
      val: 45,
      perUnit: true
    },
    beginEndDuration: 3,
    duration: 15,
    size: 160,
    rotateDuration: 10,
    rotation: RotationMode.CW,
    broadcastDuration: .2,
    delay: 0.5,
  },
  {
    x: {
      val: 47,
      perUnit: true,
    },
    y: {
      val: -25,
      perUnit: true,
    },
    beginEndDistance: {
      val: 140,
    },
    distance: {
      val: 80,
      perUnit: true,
    },
    beginEndDuration: 1.2,
    duration: 8,
    size: 350,
    rotateDuration: 5,
    rotation: RotationMode.CW,
    broadcastDuration: 5,
    delay: .5,
  },
  {
    x: {
      val: 67,
      perUnit: true,
    },
    y: {
      val: -15,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 530,
    },
    beginEndDuration: .8,
    duration: 4,
    size: 180,
    rotateDuration: 4,
    rotation: RotationMode.CCW,
    broadcastDuration: .2,
    delay: 1.25,
  },
  {
    x: {
      val: 88,
      perUnit: true,
    },
    y: {
      val: -10,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 70,
      perUnit: true
    },
    beginEndDuration: 1,
    duration: 8,
    size: 220,
    rotateDuration: 5,
    rotation: RotationMode.CCW,
    broadcastDuration: .6,
    delay: 2,
  },
  
  /* batch 4-1 lasting slow */
  {
    x: {
      val: 11,
      perUnit: true,
    },
    y: {
      val: 33,
      perUnit: true,
    },
    beginEndDistance: {
      val: 150,
    },
    distance: {
      val: 70,
      perUnit: true
    },
    beginEndDuration: 4,
    duration: 24,
    size: 140,
    rotateDuration: 8,
    rotation: RotationMode.CCW,
    broadcastDuration: 1,
    delay: 4,
  },
  {
    x: {
      val: 27,
      perUnit: true,
    },
    y: {
      val: 8,
      perUnit: true,
    },
    beginEndDistance: {
      val: 150,
    },
    distance: {
      val: 75,
      perUnit: true
    },
    beginEndDuration: 4,
    duration: 30,
    size: 160,
    rotateDuration: 10,
    rotation: RotationMode.CW,
    broadcastDuration: .5,
    delay: 12,
  },
  {
    x: {
      val: 52,
      perUnit: true,
    },
    y: {
      val: 44,
      perUnit: true,
    },
    beginEndDistance: {
      val: 140,
    },
    distance: {
      val: 30,
      perUnit: true,
    },
    beginEndDuration: 8,
    duration: 45,
    size: 240,
    rotateDuration: 10,
    rotation: RotationMode.CCW,
    broadcastDuration: 2,
    delay: 6,
  },
  {
    x: {
      val: 62,
      perUnit: true,
    },
    y: {
      val: 34,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 60,
      perUnit: true
    },
    beginEndDuration: 5,
    duration: 30,
    size: 220,
    rotateDuration: 15,
    rotation: RotationMode.CW,
    broadcastDuration: .2,
    delay: 1.25,
  },
  {
    x: {
      val: 92,
      perUnit: true,
    },
    y: {
      val: 5,
      perUnit: true,
    },
    beginEndDistance: {
      val: 200,
    },
    distance: {
      val: 85,
      perUnit: true
    },
    beginEndDuration: 12,
    duration: 45,
    size: 170,
    rotateDuration: 10,
    rotation: RotationMode.CW,
    broadcastDuration: .6,
    delay: 2,
  },
  
  /* batch 4-2 lasting slow */
  {
    x: {
      val: 14,
      perUnit: true,
    },
    y: {
      val: 14,
      perUnit: true,
    },
    beginEndDistance: {
      val: 150,
    },
    distance: {
      val: 65,
      perUnit: true
    },
    beginEndDuration: 8,
    duration: 28,
    size: 170,
    rotateDuration: 12,
    rotation: RotationMode.CCW,
    broadcastDuration: 1,
    delay: 18,
  },
  {
    x: {
      val: 33,
      perUnit: true,
    },
    y: {
      val: 28,
      perUnit: true,
    },
    beginEndDistance: {
      val: 250,
    },
    distance: {
      val: 60,
      perUnit: true
    },
    beginEndDuration: 8,
    duration: 38,
    size: 195,
    rotateDuration: 12,
    rotation: RotationMode.CW,
    broadcastDuration: 3,
    delay: 22,
  },
  {
    x: {
      val: 48,
      perUnit: true,
    },
    y: {
      val: 18,
      perUnit: true,
    },
    beginEndDistance: {
      val: 140,
    },
    distance: {
      val: 55,
      perUnit: true,
    },
    beginEndDuration: 6,
    duration: 45,
    size: 205,
    rotateDuration: 12,
    rotation: RotationMode.CW,
    broadcastDuration: 2,
    delay: 20,
  },
  {
    x: {
      val: 60,
      perUnit: true,
    },
    y: {
      val: 15,
      perUnit: true,
    },
    beginEndDistance: {
      val: 150,
    },
    distance: {
      val: 90,
      perUnit: true
    },
    beginEndDuration: 15,
    duration: 50,
    size: 240,
    rotateDuration: 14,
    rotation: RotationMode.CCW,
    broadcastDuration: 3,
    delay: 12,
  },
  {
    x: {
      val: 86,
      perUnit: true,
    },
    y: {
      val: 5,
      perUnit: true,
    },
    beginEndDistance: {
      val: 200,
    },
    distance: {
      val: 75,
      perUnit: true
    },
    beginEndDuration: 12,
    duration: 48,
    size: 215,
    rotateDuration: 10,
    rotation: RotationMode.CCW,
    broadcastDuration: 4,
    delay: 16,
  },
]);

export default animationConfigs;
