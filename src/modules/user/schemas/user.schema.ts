import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hook pre-save para fazer o hash da senha
UserSchema.pre('save', async function (next: () => void) {
  const user = this as User;

  // Só faça hash se a senha for nova ou modificada
  if (!user.isModified('password')) {
    return next();
  }

  // Gera o salt e faz o hash da senha
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});
