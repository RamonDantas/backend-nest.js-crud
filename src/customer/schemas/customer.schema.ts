import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

// Pre-save hook to hash the password
CustomerSchema.pre('save', async function (next: () => void) {
  const user = this as Customer;

  // Only hash if the password is new or changed
  if (!user.isModified('password')) {
    return next();
  }

  // Generates the salt and hashes the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});
