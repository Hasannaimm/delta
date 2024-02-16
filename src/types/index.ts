export type ProductCardType = {
  image: string | undefined;
  name: string | undefined;
  sub: string | undefined;
  id: number | undefined;
  catid: number | undefined;
};

export type Sub = {
  name: string;
};

export type CategoryProps = {
  id: number | boolean;
  name: string | boolean;
  img_url: string;
};

export type Category = {
  id: number;
  name: string | undefined;
  img_url: string;
};

export type Item = {
  id: number;
  name: string | undefined;
  img_url: string;
  category_id: number;
  description: string;
  usagee: string;
  weight: string;
};

export type RandomProp = {
  random: Item[];
};

export type ProductProps = {
  category?: Category; // Make it optional by adding "?"
  item: Item;
  random: RandomProp[];
};

export type CategoryItems = {
  category: Category | undefined;
  items: Item[] ;
  current_page: number | undefined;
  last_page: number | undefined;
  total: number | undefined;
  from: number | undefined;
  to: number |undefined;
};

export type videoProps = {
  ishome: boolean;
};
export type AdItem = {
  id: number;
  url: string;
  location: "home_ad" | "banner" | "category_ad";
};

export type AdList = AdItem[];

interface Ad {
  id: number;
  url: string;
  location: string;
}

export interface AdData {
  home_ad: Ad | undefined;
  banner: Ad | undefined;
  category_ad: Ad | undefined;
}

interface CategoryHome {
  id: number;
  lang_id: number;
  name: string;
  img_url: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface ItemHome {
  id: number;
  name: string;
  img_url: string;
  category_id: number;
  category: CategoryHome;
}

export interface aboutUsProps {
  id: number;
  title: string;
  description?: string | TrustedHTML | undefined;
  img_url: string;
}
