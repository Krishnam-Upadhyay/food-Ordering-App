import { Image, Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Colors from "@/constants/Colors";
import products from "@assets/data/products";
import { Product } from "../types";
import { Link } from "expo-router";

const product: any = products[0];

type ProductType = {
  product: Product;
};

export const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: ProductType) => {
  return (
    <Link
      href={{
        pathname: "/menu/[Id]",
        params: { Id: product?.id },
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "black",
  },
  price: {
    color: Colors.light.tint,
  },
});
