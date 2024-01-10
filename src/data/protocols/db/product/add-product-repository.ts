import { AddProductModel } from '../../../../domain/usecases/add-product'

export interface AddProductRepository {
  add (productData: AddProductModel): Promise<void>
}
