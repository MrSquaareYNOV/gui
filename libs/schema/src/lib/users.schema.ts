import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Station } from './stations.schema';


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;
  @Prop()
  password?: string;
  @Prop()
  rentalBikeId?: string;
  @Prop()
  rentalPosition?: string;
  @Prop({ required: true })
  permission: number;
  @Prop({ required: true })
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
