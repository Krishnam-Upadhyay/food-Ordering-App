import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const ProductsDetailsScreen = () => {
  const { Id } = useLocalSearchParams<any>();
  return (
    <View>
      <Stack.Screen options={{ title: "Details: " + Id }} />
      <Text style={{ color: "white" }}>{Id}</Text>
    </View>
  );
};

export default ProductsDetailsScreen;

const styles = StyleSheet.create({});
