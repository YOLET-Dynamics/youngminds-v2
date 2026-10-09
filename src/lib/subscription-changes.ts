/** Changes a donor can request through the assisted subscription form. Shared by the form and its API. */
export const subscriptionChangeOptions = {
  amount: "Change amount",
  payment: "Update payment method",
  cancel: "Pause or cancel",
  other: "Something else",
} as const;

export type SubscriptionChange = keyof typeof subscriptionChangeOptions;

export const subscriptionChangeValues = Object.keys(subscriptionChangeOptions) as [
  SubscriptionChange,
  ...SubscriptionChange[],
];
