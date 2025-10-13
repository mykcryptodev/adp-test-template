export type CurrencyPrices = {
  aed: number;
  ars: number;
  aud: number;
  bch: number;
  bdt: number;
  bhd: number;
  bmd: number;
  bnb: number;
  brl: number;
  btc: number;
  cad: number;
  chf: number;
  clp: number;
  cny: number;
  czk: number;
  dkk: number;
  dot: number;
  eos: number;
  eth: number;
  eur: number;
  gbp: number;
  gel: number;
  hkd: number;
  huf: number;
  idr: number;
  ils: number;
  inr: number;
  jpy: number;
  krw: number;
  kwd: number;
  lkr: number;
  ltc: number;
  mmk: number;
  mxn: number;
  myr: number;
  ngn: number;
  nok: number;
  nzd: number;
  php: number;
  pkr: number;
  pln: number;
  rub: number;
  sar: number;
  sek: number;
  sgd: number;
  sol: number;
  thb: number;
  try: number;
  twd: number;
  uah: number;
  usd: number;
  vef: number;
  vnd: number;
  xag: number;
  xau: number;
  xdr: number;
  xlm: number;
  xrp: number;
  yfi: number;
  zar: number;
  bits: number;
  link: number;
  sats: number;
};

export type LocalizedStrings = {
  en: string;
  zh: string;
  'zh-tw': string;
  de: string;
  fr: string;
  es: string;
  ja: string;
  id: string;
  ru: string;
  ko: string;
  ar: string;
  th: string;
  vi: string;
  it: string;
  pl: string;
  tr: string;
  hu: string;
  nl: string;
  ro: string;
  sv: string;
  cs: string;
  da: string;
  el: string;
  hi: string;
  no: string;
  sk: string;
  uk: string;
  he: string;
  fi: string;
  bg: string;
  hr: string;
  lt: string;
  sl: string;
  pt: string;
};

export type Links = {
  homepage: string[];
  whitepaper: string;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  snapshot_url: string | null;
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: number | null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
};

export type Image = {
  thumb: string;
  small: string;
  large: string;
};

export type IcoData = {
  ico_start_date: string;
  ico_end_date: string;
  short_desc: string;
  description: string | null;
  links: Record<string, string | null>;
  softcap_currency: string;
  hardcap_currency: string;
  total_raised_currency: string;
  softcap_amount: number | null;
  hardcap_amount: number | null;
  total_raised: number | null;
  quote_pre_sale_currency: string;
  base_pre_sale_amount: number | null;
  quote_pre_sale_amount: number | null;
  quote_public_sale_currency: string;
  base_public_sale_amount: number;
  quote_public_sale_amount: number;
  accepting_currencies: string;
  country_origin: string;
  pre_sale_start_date: string | null;
  pre_sale_end_date: string | null;
  whitelist_url: string;
  whitelist_start_date: string | null;
  whitelist_end_date: string | null;
  bounty_detail_url: string;
  amount_for_sale: number | null;
  kyc_required: boolean;
  whitelist_available: boolean | null;
  pre_sale_available: boolean | null;
  pre_sale_ended: boolean;
};

export type ROI = {
  times: number;
  currency: string;
  percentage: number;
};

export type SparklineData = {
  price: number[];
};

export type CommunityData = {
  facebook_likes: number | null;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: number | null;
};

export type DeveloperData = {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: {
    additions: number;
    deletions: number;
  };
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series: number[];
};

export type Market = {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
  has_referral_params?: boolean;
};

export type ConvertedPrice = {
  btc: number;
  eth: number;
  usd: number;
};

export type Ticker = {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: ConvertedPrice;
  converted_volume: ConvertedPrice;
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: string | null;
  coin_id: string;
  target_coin_id?: string;
  coin_mcap_usd: number;
};

export type StatusUpdate = {
  description: string;
  category: string;
  created_at: string;
  user: string;
  user_title: string;
  pin: boolean;
  project: {
    type: string;
    id: string;
    name: string;
    image: {
      thumb: string;
      small: string;
      large: string;
    };
  };
};

export type MarketData = {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<
    string,
    {
      decimal_place: number | null;
      contract_address: string;
    }
  >;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: string[];
  localization: LocalizedStrings;
  description: LocalizedStrings;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  ico_data: IcoData;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: {
    current_price: CurrencyPrices;
    total_value_locked: number | null;
    mcap_to_tvl_ratio: number | null;
    fdv_to_tvl_ratio: number | null;
    roi: ROI;
    ath: CurrencyPrices;
    ath_change_percentage: CurrencyPrices;
    ath_date: Record<string, string>;
    atl: CurrencyPrices;
    atl_change_percentage: CurrencyPrices;
    atl_date: Record<string, string>;
    market_cap: CurrencyPrices;
    market_cap_fdv_ratio: number;
    total_volume: CurrencyPrices;
    high_24h: CurrencyPrices;
    low_24h: CurrencyPrices;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    price_change_24h_in_currency: CurrencyPrices;
    price_change_percentage_1h_in_currency: CurrencyPrices;
    price_change_percentage_24h_in_currency: CurrencyPrices;
    price_change_percentage_7d_in_currency: CurrencyPrices;
    price_change_percentage_14d_in_currency: CurrencyPrices;
    price_change_percentage_30d_in_currency: CurrencyPrices;
    price_change_percentage_60d_in_currency: CurrencyPrices;
    price_change_percentage_200d_in_currency: CurrencyPrices;
    price_change_percentage_1y_in_currency: CurrencyPrices;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_change_24h_in_currency: CurrencyPrices;
    market_cap_change_percentage_24h_in_currency: CurrencyPrices;
    total_supply: number;
    max_supply: number | null;
    max_supply_infinite: boolean;
    circulating_supply: number;
    sparkline_7d: SparklineData;
    last_updated: string;
  };
  community_data: CommunityData;
  developer_data: DeveloperData;
  status_updates: StatusUpdate[];
  last_updated: string;
  tickers: Ticker[];
};
