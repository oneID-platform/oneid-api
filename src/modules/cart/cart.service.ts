import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { CreateCartDto, GetCartDto, UpdateCartDto } from './dto/cart.dto';
import { User, UserDocument } from '../user/user.schema';
import { Product, ProductDocument } from '../product/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    try {
      const cart = await this.cartModel.create({
        ...createCartDto,
      });

      if (!cart) {
        throw new NotFoundException(
          'Error in creating cart, please try again.',
        );
      }

      return cart;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in creating cart, please try again.',
      );
    }
  }
  
  async getCartById(payload: GetCartDto) {
    const { id } = payload;

    return await this.cartModel.findById(id);
  }

  async getAllProducts(payload: GetCartDto) {
    const { id } = payload;

    const cart = await this.cartModel.findById(id).populate('products');

    return cart.items;
  }

  async findOne(id: string): Promise<Cart> {
    return await this.cartModel.findById(id).populate('products');
  }

  async update(id: string, payload: UpdateCartDto): Promise<Cart> {
    return await this.cartModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async delete(id: string): Promise<Cart> {
    return await this.cartModel.findByIdAndDelete(id);
  }
}