import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StationDocument = Station & Document;

@Schema()
export class Station {
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  location: string;
  @Prop()
  currentBikesIds: string[];
  @Prop()
  totalBikes: number;
  @Prop({ required: true })
  id: string;
}

export const StationSchema = SchemaFactory.createForClass(Station);
