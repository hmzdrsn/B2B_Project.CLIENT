export class Discount {
  discountId: string;
  discountCode: string;
  discountAmount: number;
  isPercentage: boolean;
  validFrom: string;
  validUntil: string;
  maxUsagePerUser: number;
  companyId: string;
}

export class DiscountWithoutDetail{
  discountId: string;
  discountCode: string;
  discountAmount: number;
  isPercentage: boolean;
}

export class UserDiscount{
  userDiscountId:string;
  username:string;
  discountCode:string;
}
export class ProductDiscount{
  productDiscountId:string;
  productName:string;
  discountCode:string;
}