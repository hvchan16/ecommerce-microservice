import axios from "axios";
import NodeCache from "node-cache";
import { ShippingRequest, ShippingResponse } from "../models/Shipping";

// Initialize cache with a TTL of 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });

// Retrieve Shipping API configurations from environment variables
const SHIPPING_API_URL =
  process.env.SHIPPING_API_URL || "http://localhost:3001/shipping/calculate";
// SHIPPING_API_KEY is not used with Mock Shipping API but kept for potential real API integration
const SHIPPING_API_KEY = process.env.SHIPPING_API_KEY || "your_api_key_here";

export const getShippingCost = async (
  request: ShippingRequest
): Promise<ShippingResponse> => {
  const cacheKey = `${JSON.stringify(request.items)}-${
    request.deliveryLocation
  }`;

  // Check if response is cached
  const cachedResponse = cache.get<ShippingResponse>(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    // Make a POST request to the Shipping API
    const response = await axios.post(
      SHIPPING_API_URL,
      {
        items: request.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        deliveryLocation: request.deliveryLocation,
      },
      {
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${SHIPPING_API_KEY}`, // Uncomment if using a real API with auth
        },
      }
    );

    // Parse the Shipping API response
    const shippingData: ShippingResponse = {
      cost: response.data.cost,
      status: response.data.status,
    };

    // Cache the response
    cache.set(cacheKey, shippingData);

    return shippingData;
  } catch (error) {
    console.error("Error fetching shipping cost:", error);
    throw new Error("Failed to fetch shipping cost.");
  }
};
