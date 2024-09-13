export class ProductResponse <T>{
    products : T;
}
export class ProductResponse2{
  product : UpdateProductModel;
  images: Image[];
}

export class Product{
    productId: string;
    name: string;
    description: string;
    price: number;
    stock : number;
}
export class UpdateProductModel{
    name: string;
    description: string;
    price: number;
    productCode: string;
    stock: number;
    categoryId: string;
    category: Category;
    companyId: string | null;
    company: any | null;
    id: string;
    createdDate: Date;
    updatedDate: Date | null;
    deletedDate: Date | null;
    
}
export class Image {
    imageUrl: string;
    imageName: string;
    entityType: string;
    entityId: string;
    id: string;
    createdDate: Date;
    updatedDate: Date | null;
    deletedDate: Date | null;
  
    constructor(
      imageUrl: string,
      imageName: string,
      entityType: string,
      entityId: string,
      id: string,
      createdDate: Date,
      updatedDate: Date | null = null,
      deletedDate: Date | null = null
    ) {
      this.imageUrl = imageUrl;
      this.imageName = imageName;
      this.entityType = entityType;
      this.entityId = entityId;
      this.id = id;
      this.createdDate = createdDate;
      this.updatedDate = updatedDate;
      this.deletedDate = deletedDate;
    }
  }
  export class Category {
    name: string;
    parentCategoryId: string;
    id: string;
    createdDate: Date | null;
    updatedDate: Date | null;
    deletedDate: Date | null;
  
    constructor(
      name: string,
      parentCategoryId: string,
      id: string,
      createdDate: Date | null = null,
      updatedDate: Date | null = null,
      deletedDate: Date | null = null
    ) {
      this.name = name;
      this.parentCategoryId = parentCategoryId;
      this.id = id;
      this.createdDate = createdDate;
      this.updatedDate = updatedDate;
      this.deletedDate = deletedDate;
    }
  }
  
  export class DefaultFilter{
    productId:string;
    productUrl:string;
    productName:string;
    productDescription:string;
    productPrice:number;
  }

  export class ProductCountModel{
      productsCount: number;
  }