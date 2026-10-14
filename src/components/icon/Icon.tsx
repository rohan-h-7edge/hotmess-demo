import React from 'react';
import { Image, ImageSource } from 'expo-image';
import { moderateScale } from '@/utils/scaling';

interface IconProps {
  source: ImageSource | number;
  color: string;
  size?: number;
}

const DEFAULT_SIZE = moderateScale(24);

export default function Icon({ source, color, size = DEFAULT_SIZE }: IconProps) {
  return <Image source={source} tintColor={color} style={{ width: size, height: size }} />;
}
