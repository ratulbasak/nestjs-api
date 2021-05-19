import { Controller, Post, Body, Get, Param, Patch, Delete, Req, Res, Request, HttpStatus, Catch, UseFilters } from '@nestjs/common'
import { ProductDto } from 'src/model/products.dto';
import { ProductsService } from './products.service';
import { request, Response } from 'express';
import { HttpExceptionFilter } from 'src/middleware/http-exception.filter';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async addProducts(@Body() createProductDto: ProductDto, @Res() res: Response) {
        const generatedId = await this.productsService.insertProduct(createProductDto);
        res.status(HttpStatus.CREATED).send({'success': true, 'method': request.method, 'status': res.statusCode, 'data': generatedId});
    }

    @Get()
    @UseFilters(new HttpExceptionFilter())
    async getAllProducts(@Req() req: Request, @Res() res: Response) {
        const products = await this.productsService.getProducts(req);
        res.status(HttpStatus.OK).json({'success': true, 'method': req.method, 'status': res.statusCode, 'data': products});
    }

    @Get(':id')
    @UseFilters(new HttpExceptionFilter())
    async getProduct(@Param('id') prodId: string, @Req() req: Request, @Res() res: Response) {
        const product = await this.productsService.getSingleProduct(prodId);
        res.status(HttpStatus.OK).send({'success': true, 'method': req.method, 'status': res.statusCode, 'data': product});
    }

    @Patch(':id')
    @UseFilters(new HttpExceptionFilter())
    async updateProduct(
        @Param('id') prodId: string,
        @Body() completeBody: {
            title: string, description: string, price: number
        },
        @Req() req: Request, @Res() res: Response
    ) {
        const updateProduct = await this.productsService.updateProduct(prodId, completeBody.title, completeBody.description, completeBody.price);

        res.status(HttpStatus.OK).send({'success': true, 'method': req.method, 'status': res.statusCode, 'data': updateProduct});
    }

    @Delete(':id')
    @UseFilters(new HttpExceptionFilter())
    async removeProduct(@Param('id') prodId: string, @Req() req: Request, @Res() res: Response) {
        await this.productsService.deleteProduct(prodId);
        res.status(HttpStatus.OK).send({'success': true, 'method': req.method, 'status': res.statusCode, 'data': 'deleted'});
    }
}
