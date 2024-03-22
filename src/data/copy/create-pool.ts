import { CardToggleOption } from "@/components/CardRadioGroup";

export const title: string = "Create New DFMM Pool";

export const subtitle: string =
  "Determine parameters, define a DFMM strategy contract, and deposit assets.";

type Tag = { title: string; sub: string };
type ToggleItem = { value: string; title: string; description: string };

export const tags: Tag[] = [
  { title: "Pair", sub: "Select the tokens to include in the pool." },
  { title: "Strategy", sub: "Select a DFMM strategy." },
  { title: "Fee Rate", sub: "Cost of automated portfolio rebalancing." },
  { title: "Pool Weights", sub: "Portfolio composition of a particular pair." },
  {
    title: "Strategy Controller",
    sub: "Smart contract address of a DFMM strategy.",
  },
  {
    title: "Add Liquidity",
    sub: "Determine the required asset quantities for pool creation.",
  },
];

export const strats: CardToggleOption[] = [
  {
    value: "GeometricMean",
    title: "G3M",
    description: "Geometric mean strategy.",
  },
  {
    value: "CLP",
    title: "CLP",
    description: "Concentrated liquidity strategy",
  },
];

export const feeLevels: CardToggleOption[] = [
  {
    value: "0.01",
    title: "0.01%",
    description: "Highly correlated asset pairs with negligible volatility.",
  },
  {
    value: "0.05",
    title: "0.05%",
    description:
      "Correlated asset pairs, such as stablecoins, with low volatility.",
  },
  {
    value: "0.3",
    title: "0.30%",
    description: "Asset pairs with normal volaility.",
  },
];

export const weights: CardToggleOption[] = [
  { value: "80", title: "20%/80%", description: "lorem" },
  { value: "70", title: "30%/70%", description: "ipsum" },
  { value: "50", title: "50%/50%", description: "Even portfolio composition." },
];

