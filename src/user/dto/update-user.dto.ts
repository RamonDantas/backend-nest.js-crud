import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'João da Silva',
  })
  readonly name?: string;

  @ApiProperty({
    description: 'User email',
    example: 'joao.silva@email.com',
  })
  readonly email?: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  readonly password?: string;
}
