import { prop } from '@typegoose/typegoose';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { Schema } from 'mongoose';

export class ApiUser {
  // Created automatically, just needed for TS
  readonly _id: Schema.Types.ObjectId;

  @prop({ required: true })
  userName: string;

  @prop({ required: true, unique: true })
  @IsPhoneNumber('IN')
  userMobileNumber: number;

  @prop({ required: true, unique: true })
  @IsEmail()
  userEmail: string;

  @prop({ required: true })
  password: string;

  @prop({ default: { data: null, contentType: null } })
  userImage: {
    data: Buffer;
    contentType: string;
  };

  @prop({ default: Date.now() })
  createdAt: Date;

  // We'll manually populate this property
  // url: string;
  @prop()
  url: string;
}
