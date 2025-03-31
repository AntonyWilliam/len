export interface Sample {
  id: string;
  industry: string;
  title: string;
  link: string;
  year: number;
  type: string;
  audience: string;
  notes: string;
}

export type Industry = string;

export type SampleType = string;

export type Audience = string;

export interface FilterOptions {
  industries: Industry[];
  types: SampleType[];
  audiences: Audience[];
  years: number[];
}