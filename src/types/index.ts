export type ProductCardType = {
  image: string;
  name: string | undefined;
  sub: string;
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

export type CategoryItems = {
  category: Category;
  items: Item[];
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
