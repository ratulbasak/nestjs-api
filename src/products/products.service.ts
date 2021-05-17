import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {  Product } from './products.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>,) {}

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title: title, 
            description: desc, 
            price: price
        });
        const result = await newProduct.save();
        console.log(result);
        return result;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        console.log(products);
        return products;

    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        console.log(product);
        return {id: product.id, title: product.title, description: product.description, price: product.price};
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updateProduct = await this.findProduct(productId);
        if (title) {
            updateProduct.title = title;
        }
        if (desc) {
            updateProduct.description = desc;
        }
        if (price) {
            updateProduct.price = price;
        }
        updateProduct.save();
        console.log(updateProduct)
        return updateProduct;
    }

    private async findProduct(productId: string,): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(productId);
        } catch (error) {
            throw new NotFoundException('could not find product')
        }
    
        if (!product) {
            throw new NotFoundException('could not find product')
        }
        return product;
    }


    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({_id: prodId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('coulod not find product.')
        }
    }
}
