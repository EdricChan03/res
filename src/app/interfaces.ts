export interface Icon {
  id?: string;
  codepoint?: string;
  version?: string;
  name?: string;
  aliases?: string[];
  tags?: string[];
  author?: string;
}

export interface Contributor {
  id?: string;
  name?: string;
  avatar?: string;
  twitter?: string;
  count?: string;
}

export declare type SearchCategory = 'alias' | 'author' | 'name' | 'tag';
