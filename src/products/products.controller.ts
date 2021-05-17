import { nullLiteral } from '@babel/types';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common'
import { title } from 'process';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProducts(@Body() completeBody: {
        title: string, description: string, price: number
    } ) {
        const generatedId = await this.productsService.insertProduct(
            completeBody.title, 
            completeBody.description, 
            completeBody.price);
        return { 'data': generatedId }
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts()
        return {'data': products};
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string,) {
        const product = await this.productsService.getSingleProduct(prodId);
        return product;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body() completeBody: {
            title: string, description: string, price: number
        }
    ) {
        const updateProduct = await this.productsService.updateProduct(prodId, completeBody.title, completeBody.description, completeBody.price);
        return {'data': updateProduct};

    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return {'msg': 'deleted'};
    }
}
