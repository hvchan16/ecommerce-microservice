import { Request, Response } from "express";
import { ShippingRequest, ShippingResponse } from "../models/types";

// Function to calculate shipping cost based on items and delivery location
export const calculateShipping = (req: Request, res: Response) => {
  const shippingRequest: ShippingRequest = req.body;

  // Validate request data
  if (
    !shippingRequest ||
    !shippingRequest.items ||
    !Array.isArray(shippingRequest.items) ||
    !shippingRequest.deliveryLocation
  ) {
    res.status(400).json({ message: "Invalid shipping request data." });
  }

  const { items, deliveryLocation } = shippingRequest;

  // Example Logic:
  // Base cost + cost per item + location-based adjustment

  const baseCost = 5.0;
  const costPerItem = 2.0;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  let cost = baseCost + totalItems * costPerItem;

  // Location-based adjustments
  switch (deliveryLocation.toLowerCase()) {
    case "new york":
      cost += 10.0;
      break;
    case "los angeles":
      cost += 12.0;
      break;
    case "chicago":
      cost += 8.0;
      break;
    default:
      cost += 5.0;
      break;
  }

  // Determine shipping status
  const status = "Pending";

  const shippingResponse: ShippingResponse = {
    cost: parseFloat(cost.toFixed(2)),
    status,
  };

  res.json(shippingResponse);
};
