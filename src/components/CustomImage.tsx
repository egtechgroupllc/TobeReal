import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type CustomImgProps = {
  source: string;
} & ImageProps;

export default function CustomImage({source, ...props}: CustomImgProps) {
  const isImgAsset = typeof source === 'number';


  return <Image {...props} source={isImgAsset ? source : {uri: source}} />;
}

const styles = StyleSheet.create({});
