import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BikeDocument = Bike & Document;

@Schema()
export class Bike {
  _id: string;
  @Prop({ required: true })
  name: string;
}

export const BikeSchema = SchemaFactory.createForClass(Bike);
