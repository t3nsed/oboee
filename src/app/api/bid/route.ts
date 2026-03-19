import { mppx } from "@/lib/mpp";

export const POST = mppx.charge({ amount: "0.01" })(() =>
  Response.json({
    accepted: true,
    timestamp: Date.now(),
  })
);
