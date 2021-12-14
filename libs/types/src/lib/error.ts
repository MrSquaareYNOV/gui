export type Error = {
  code: string;
  message: string;
};

export class Errors {
  constructor(public list: Error[]) {}
}
