export type ProductNutritionalInformationModel = {
  calorie: string
  carbohydrate: string
  total_sugars: string
  added_sugars: string
  proteins: string
  total_fat: string
  saturated_fat: string
  trans_fats: string
  dietary_fiber: string
  sodium: string
}

export type ProductModel = {
  id: string
  category: string
  name: string
  price: string
  nutritionalInformation: ProductNutritionalInformationModel
}
