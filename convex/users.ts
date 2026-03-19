import { ConvexError, v } from "convex/values";

import { mutation } from "./_generated/server";
import { authComponent, createAuth } from "./auth";

const walletAddressValidator = /^0x[a-fA-F0-9]{40}$/;

export const updateWallet = mutation({
  args: {
    walletAddress: v.string(),
  },
  returns: v.object({
    userId: v.string(),
    walletAddress: v.string(),
  }),
  handler: async (ctx, args) => {
    const normalizedWalletAddress = args.walletAddress.trim().toLowerCase();

    if (!walletAddressValidator.test(normalizedWalletAddress)) {
      throw new ConvexError({
        code: "INVALID_WALLET_ADDRESS",
        message: "Wallet address must be a 0x-prefixed 40-hex string.",
      });
    }

    const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Authentication required.",
      });
    }

    const updateBody: Record<string, string> = {
      walletAddress: normalizedWalletAddress,
    };

    await auth.api.updateUser({
      headers,
      body: updateBody,
    });

    return {
      userId: session.user.id,
      walletAddress: normalizedWalletAddress,
    };
  },
});
