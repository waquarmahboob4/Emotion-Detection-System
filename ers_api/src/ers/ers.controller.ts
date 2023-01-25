import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
  Request,
  Body,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ErsService } from './ers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryDto } from './ers.dto';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('ers')
export class ErsController {
  constructor(
    private readonly authService: AuthService,
    private readonly ersService: ErsService,
  ) {}
  @Post('')
  @UseInterceptors(FileInterceptor('userImage'))
  async uploadImage(
    @UploadedFile() userImage,
    @Res() res,
    @Req() req,
    @Body() body,
  ) {
    const image = await this.ersService.create(userImage, body);
    // const image = await this.ersService.create(body);
    const newImage = image.toObject();

    const host = req.get('host');
    newImage.userImage = undefined;
    newImage.url = `http://${host}/ers/${newImage._id}`;

    return res.send(newImage);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    // return { msg: 'Logged In!' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getImages(@Req() req, @Query() reqParam: QueryDto, @Res() res) {
    const host = req.get('host');
    if (Object.keys(reqParam).length) {
      const images = await this.ersService.getuserNameQuery(reqParam);
      images.forEach((image) => {
        image.url = `http://${host}/ers/${image._id}`;
      });
      return images.length !== 0
        ? images
        : res
            .status(HttpStatus.OK)
            .json({ msg: `User of ${JSON.stringify(reqParam)} doesnot exist` });
    } else {
      const images = await this.ersService.findAll();
      images.forEach((image) => {
        image.url = `http://${host}/ers/${image._id}`;
      });

      return images.length !== 0
        ? images
        : res
            .status(HttpStatus.OK)
            .json({ msg: `Currently 0 registered User` });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getImage(@Res() res, @Body() body, @Param('id') id) {
    const image = await this.ersService.getById(id);
    if (!image) throw new NotFoundException('User does not exist!');
    res.setHeader('Content-Type', image.userImage.contentType);
    return res.send(image.userImage.data.buffer);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteImage(@Res() res, @Body() body, @Param('id') id) {
    const image = await this.ersService.removeImage(id);

    if (!image) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({ msg: 'User removed.' });
  }
}
