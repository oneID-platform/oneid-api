import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() payload: CreateStoreDto,
    @LoggedInUserDecorator() user: { id: string },
  ) {
    console.log(payload.name);
    return this.storeService.create(payload, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() payload: UpdateStoreDto) {
    return this.storeService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.storeService.delete(id);
  }
}
