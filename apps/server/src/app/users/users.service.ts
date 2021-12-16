import { UserDTO, Errors, UserPermission } from '@gui-nx/types';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { v4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@gui-nx/schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //  private _users: UserDTO[] = [];

  onModuleInit() {
    this.createUser({
      email: 'admin',
      password: 'admin',
      permission: UserPermission.ADMIN,
    });
  }

  async findAll(): Promise<User[]> {
    return (await this.userModel.find().exec()).map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();

      return userWithoutPassword;
    });
  }

  async find(id: string): Promise<User | undefined> {
    const user = await this.userModel.find({ id }).exec();

    if (!user) {
      throw new Errors([{ code: 'USER_NOT_FOUND', message: 'User not found' }]);
    }

    const { password, ...userWithoutPassword } = user[0].toObject();

    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.find({ email }).exec();

    if (!user) {
      throw new Errors([{ code: 'USER_NOT_FOUND', message: 'User not found' }]);
    }

    const { ...userWithPassword } = user[0].toObject();

    return userWithPassword;
  }

  async createUser(user: Omit<UserDTO, 'id'>): Promise<User> {
    const createdUser = await new this.userModel({ ...user, id: v4() }).save();

    const { password, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  async updateUser(
    id: string,
    user: Partial<Omit<UserDTO, 'id'>>
  ): Promise<User | undefined> {
    const editedUser = await this.userModel
      .findOneAndUpdate({ id }, user)
      .exec();

    const { password, ...userWithoutPassword } = editedUser;

    return userWithoutPassword;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findOneAndDelete({ id }).exec();
  }
}
