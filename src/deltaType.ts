export type Attributes = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  background?: string;
  color?: string;
};
export type Op = { insert: string; attributes?: Attributes };

export type Delta = Op[];
