import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'This route Post create customer' })
  @ApiResponse({
    status: 200,
    description: 'Customer returned successfully.',
    type: CreateCustomerDto,
  })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'This route Get all customers' })
  @ApiResponse({
    status: 200,
    description: 'Customers returned successfully.',
    type: [CreateCustomerDto],
  })
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'This route Get customer by id' })
  @ApiResponse({
    status: 200,
    description: 'Customers returned successfully.',
    type: CreateCustomerDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'This route Put customer by id' })
  @ApiResponse({
    status: 200,
    description: 'Customer returned successfully.',
    type: UpdateCustomerDto,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'This route Delete customer by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
