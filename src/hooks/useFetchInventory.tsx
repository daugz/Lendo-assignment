import { useEffect, useState } from "react";
import { Product } from "../types";

export const useFetchInventory = () => {
  const [inventory, setInventory] = useState<Product[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchInventory = async () => {
    const inventoryResponse = await fetch("../api/inventory.json");
    const inventoryData = await inventoryResponse.json();

    setInventory(inventoryData?.items);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchInventory();
    } catch (error) {
      setIsError(true);
      console.error("Error when fetching inventory", error);
    }
  }, []);
  return { inventory, isLoading, isError };
};
