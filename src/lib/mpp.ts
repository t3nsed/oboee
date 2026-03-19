import { Mppx, tempo } from "mppx/nextjs";

// =============================================================================
// MIGRATION: Testnet -> Mainnet
// When switching to production with tempo wallet, change these values:
//
// 1. RECIPIENT_ADDRESS -> your mainnet wallet address (from `tempo wallet -t whoami`)
// 2. CURRENCY_ADDRESS  -> mainnet USDC: "0x..." (check https://docs.tempo.xyz/quickstart/tokenlist)
// 3. RPC_URL           -> "https://rpc.tempo.xyz" (or remove to use default)
//
// Everything else stays the same. No code changes needed.
// =============================================================================

// Your wallet address that receives payments
const RECIPIENT_ADDRESS =
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" as const; // TODO: replace with your address

// TIP-20 token used for payments
// Testnet: pathUSD
// Mainnet: swap to real USDC address from token list
const CURRENCY_ADDRESS =
  "0x20c0000000000000000000000000000000000000" as const; // MIGRATION: swap for mainnet USDC

export const mppx = Mppx.create({
  methods: [
    tempo({
      currency: CURRENCY_ADDRESS,
      recipient: RECIPIENT_ADDRESS,
      // MIGRATION: uncomment for mainnet fee sponsorship
      // feePayer: privateKeyToAccount('0x...'),
    }),
  ],
});
