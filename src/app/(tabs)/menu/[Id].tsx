import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import { defaultImage } from "@components/ProductListItem";
import Button from "@components/Button";
import { useCart } from "@provider/cartProvider";
import { PizzaSize } from "@types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductsDetailsScreen = () => {
  const { Id } = useLocalSearchParams<any>();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();

  const product = products.find((item: any) => item.id.toString() === Id);

  //Add To Cart Function
  const addToCart = () => {
    if (!product) {
      return;
    }

    addItem(product, selectedSize);
    // console.log(product, selectedSize);
  };

  if (!product) {
    return <Text>Product Not Found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />

      <Image
        source={{ uri: product?.image || defaultImage }}
        style={styles.image}
      />

      <Text>Select Sizes</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? "black" : "grey" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product?.price}</Text>

      <Button text="Add To Cart" onPress={addToCart} />
    </View>
  );
};

export default ProductsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
