export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Nanny {
about: string;
avatar_url: string;
birthday: string;
characters: string[];
education: string;
experience: string;
kids_age: string;
location: string;
name: string;
price_per_hour: number;
rating: number;
reviews: Review[];

}


export type NanniesFilter =
  | "name-asc"
  | "name-desc"
  | "price-low"
  | "price-high"
  | "popular"
  | "not-popular"
  | "all";

export type NanniesCursor = {
  value: string | number | null;
  key: string;
};

export type NannyWithId = Nanny & { id: string };