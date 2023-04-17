export interface CountryView {
  id: number;
  name: string;
}

export interface ResourceView {
  title: string;
  url: string;
  summary: string;
  thumbnail: string;
  tags: string[];
}

export interface TagView {
  tag: string;
  count: number;
}
