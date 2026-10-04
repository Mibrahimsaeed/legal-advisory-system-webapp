import { checkoutApi } from "@/lib/api/checkout.api";
import { getErrorMessage } from "@/lib/api/client";
import { createAppAsyncThunk } from "@/lib/store/createAppAsyncThunk";
import type { DemoPaymentPayload } from "@/lib/store/features/checkout/checkout.types";

export const confirmDemoPayment = createAppAsyncThunk(
  "checkout/confirmDemoPayment",
  async (payload: DemoPaymentPayload, { rejectWithValue }) => {
    try {
      return await checkoutApi.confirmDemoPayment(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
