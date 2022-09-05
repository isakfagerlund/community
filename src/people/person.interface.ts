export interface BasePerson {
  name: string,
  description: string,
  address: string,
  country: string
}

export interface Person extends BasePerson {
  id: number,
}