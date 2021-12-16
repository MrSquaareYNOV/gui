import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserPermission } from '@gui-nx/types';

export type UserDocument = User & Document;

@Schema()
export class User {
  id: string;
  @Prop({ required: true })
  email: string;
  @Prop()
  password?: string;
  @Prop()
  rentalBikeId?: string;
  @Prop()
  rentalPosition?: string;
  @Prop({ required: true })
  permission: UserPermission;
}

export const UserSchema = SchemaFactory.createForClass(User);
// Duplicate the ID field.
UserSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  virtuals: true
});
