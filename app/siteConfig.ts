export const siteConfig = {
  name: "Euler Pulse",
  url: "https://www.eulerpulse.com",
  description: "Surface Alpha for EulerSwap",
  baseLinks: {
    home: "/",
    allswaps: {
      overview: "/all-swaps/overview",
      trends: "/all-swaps/trends",
      breakdown: "/all-swaps/breakdown",
    },
    allvolumes: {
      overview: "/all-volumes/overview",
      trends: "/all-volumes/trends",
      breakdown: "/all-volumes/breakdown",
    },
    allfees: {
      overview: "/all-fees/overview",
      trends: "/all-fees/trends",
      breakdown: "/all-fees/breakdown",
    },
    allpools: {
      overview: "/all-pools/overview",
      trends: "/all-pools/trends",
    },
    allassets: {
      overview: "/all-assets/overview",
      trends: "/all-assets/volumes",
      breakdown: "/all-assets/fees",
    },
    ethereumswaps: {
      overview: "/ethereum-swaps/overview",
      trends: "/ethereum-swaps/trends",
    },
    ethereumvolumes: {
      overview: "/ethereum-volumes/overview",
      trends: "/ethereum-volumes/trends",
    },
    ethereumfees: {
      overview: "/ethereum-fees/overview",
      trends: "/ethereum-fees/trends",
    },
    ethereumpools: {
      overview: "/ethereum-pools/overview",
      trends: "/ethereum-pools/trends",
    },
    ethereumassets: {
      overview: "/ethereum-assets/overview",
      trends: "/ethereum-assets/trends",
    },
    unichainswaps: {
      overview: "/unichain-swaps/overview",
      trends: "/unichain-swaps/trends",
    },
    unichainvolumes: {
      overview: "/unichain-volumes/overview",
      trends: "/unichain-volumes/trends",
    },
    unichainfees: {
      overview: "/unichain-fees/overview",
      trends: "/unichain-fees/trends",
    },
    unichainpools: {
      overview: "/unichain-pools/overview",
      trends: "/unichain-pools/trends",
    },
    unichainassets: {
      overview: "/unichain-assets/overview",
      trends: "/unichainassets/trends",
    },
  },
};

export type SiteConfigType = typeof siteConfig;
