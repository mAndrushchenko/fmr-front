import { TBook } from './store';

export type TPaymentData = {
  cardNumber: number
  cardDate: number
  cardCVV: number
  token: string
  basketList: TBook[]
}