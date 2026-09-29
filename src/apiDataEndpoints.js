const trimTrailingSlashes = (value) => value.replace(/\/+$/, "");

export const apiDataEndpoints = {
  getSolderingProgramByManufacturingOrderUidLatestOne: (
    apiDataBaseUrl,
    manufacturingOfUid
  ) => {
    const url = new URL(
      `${trimTrailingSlashes(apiDataBaseUrl)}/SolderingPrograms/latest-by-manufacturing-order`
    );
    url.searchParams.set("manufacturingOfUid", manufacturingOfUid);
    return url.toString();
  },
};
