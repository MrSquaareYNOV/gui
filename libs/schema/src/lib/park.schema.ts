import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParkDocument = Park & Document;

@Schema()
export class Park {
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  location: string;
  @Prop()
  stationsIds: string[];
  @Prop()
  totalBikes: number;
}

export const ParkSchema = SchemaFactory.createForClass(Park);
