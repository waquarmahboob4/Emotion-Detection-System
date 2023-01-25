import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiUser } from './ers.model';
import { QueryDto } from './ers.dto';

@Injectable()
export class ErsService {
  constructor(
    @InjectModel(ApiUser)
    private readonly imageModel: ReturnModelType<typeof ApiUser>,
  ) {}

  async create(userImage, createCatDto: { name: string; userImage: Buffer }) {
    // async create(createCatDto: { name: string }) {
    const newImage = await new this.imageModel(createCatDto);
    newImage.userImage.data = userImage.buffer;
    newImage.userImage.contentType = userImage.mimetype;
    return newImage.save();
  }

  async findOne(userEmail: string): Promise<ApiUser | null> {
    return await this.imageModel.findOne({ userEmail }).exec();
  }

  async findAll(): Promise<ApiUser[] | null> {
    return await this.imageModel.find({}, { userImage: 0 }).lean().exec();
    // return await this.imageModel.find().exec();
    // return await this.imageModel.find().exec();
  }

  async getById(id): Promise<ApiUser> {
    return await this.imageModel.findById(id).exec();
  }

  async getuserNameQuery(reqParam: QueryDto): Promise<ApiUser[] | null> {
    const { userName } = reqParam;
    let tasks = await this.imageModel
      .find({}, { companyLogo: 0 })
      .lean()
      .exec();
    if (userName) {
      tasks = await tasks.filter((task) => task.userName === userName);
    }

    return await tasks;
  }

  async removeImage(id): Promise<ApiUser> {
    return this.imageModel.findByIdAndDelete(id);
  }
}
