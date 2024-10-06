import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Customer full name',
    example: 'João da Silva',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Customer phone',
    example: '+351 919 123 456',
  })
  readonly phone: string;

  @ApiProperty({
    description: 'Customer password',
    example: '123456',
  })
  readonly password: string;
}
