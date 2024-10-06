import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import * as bcrypt from 'bcrypt';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateCustomer(username: string, password: string): Promise<any> {
    const customer = await this.customerService.findByPhone(username);
    if (customer && bcrypt.compare(password, customer.password)) {
      const { password, ...result } = customer;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { user: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
