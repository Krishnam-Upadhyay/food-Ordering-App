import ProductListItem from "@components/ProductListItem";
import { Text, View } from "../../components/Themed";

import products from "@assets/data/products";

const product: any = products[0];

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={product} />
    </View>
  );
}
