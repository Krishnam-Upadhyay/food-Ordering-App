import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { useCart } from "@provider/cartProvider";
import CartListItem from "@components/CartListItem";

const CartScreen = () => {
  const { items } = useCart();
  return (
    <View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
