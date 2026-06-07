export type DonationCampaign = "default" | "matrimony";

export type DonationQuery = {
  campaign: DonationCampaign;
  paymentLinkEnvName:
    | "STRIPE_PAYMENT_LINK_ID"
    | "STRIPE_PAYMENT_LINK_ID_MATRIMONY";
  includeDonorDetails: false;
  maxPages: number;
  createdFilter?: {
    gte?: number;
    lte?: number;
  };
};

type DonationQueryResult =
  | {
      ok: true;
      value: DonationQuery;
    }
  | {
      ok: false;
      status: 400;
      message: string;
    };

const campaignEnvNames: Record<DonationCampaign, DonationQuery["paymentLinkEnvName"]> = {
  default: "STRIPE_PAYMENT_LINK_ID",
  matrimony: "STRIPE_PAYMENT_LINK_ID_MATRIMONY",
};

export function parseDonationQuery(searchParams: URLSearchParams): DonationQueryResult {
  const campaign = searchParams.get("campaign") || "default";

  if (campaign !== "default" && campaign !== "matrimony") {
    return {
      ok: false,
      status: 400,
      message: "Unsupported donation campaign",
    };
  }

  const since = parseOptionalDate(searchParams.get("since"));
  if (since.error) {
    return {
      ok: false,
      status: 400,
      message: "Invalid since date",
    };
  }

  const until = parseOptionalDate(searchParams.get("until"));
  if (until.error) {
    return {
      ok: false,
      status: 400,
      message: "Invalid until date",
    };
  }

  if (since.value !== undefined && until.value !== undefined && since.value > until.value) {
    return {
      ok: false,
      status: 400,
      message: "since must be before until",
    };
  }

  const createdFilter = buildCreatedFilter(since.value, until.value);

  return {
    ok: true,
    value: {
      campaign,
      paymentLinkEnvName: campaignEnvNames[campaign],
      includeDonorDetails: false,
      maxPages: 5,
      ...(createdFilter ? { createdFilter } : {}),
    },
  };
}

function parseOptionalDate(
  value: string | null
): { error: false; value?: number } | { error: true } {
  if (!value) {
    return { error: false };
  }

  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const date = new Date(isDateOnly ? `${value}T00:00:00Z` : value);

  if (Number.isNaN(date.getTime())) {
    return { error: true };
  }

  return {
    error: false,
    value: Math.floor(date.getTime() / 1000),
  };
}

function buildCreatedFilter(
  since: number | undefined,
  until: number | undefined
): DonationQuery["createdFilter"] | undefined {
  if (since === undefined && until === undefined) {
    return undefined;
  }

  return {
    ...(since !== undefined ? { gte: since } : {}),
    ...(until !== undefined ? { lte: until } : {}),
  };
}

