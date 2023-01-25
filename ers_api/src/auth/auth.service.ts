import { Injectable } from '@nestjs/common';
import { ErsService } from '../ers/ers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private ersService: ErsService, private jwtService: JwtService) {}

  async validateUser(userEmail: string, pass: string): Promise<any> {
    const user = await this.ersService.findOne(userEmail);
    if (user && user.password === pass) {
      if (user.userName === 'admin') {
        const admin = await this.ersService.findAll();
        return { admin: admin };
      } else {
        const { password, userEmail, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    let payload = {};
    if (user.hasOwnProperty('admin')) {
      payload = user;
    } else {
      payload = {
        userName: user._doc.userName,
        userEmail: user._doc.userEmail,
        userMobileNumber: user._doc.userMobileNumber,
      };
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async delete(user: any) {
  //   const payload = { username: user._doc.userName, userid: user._doc.userId };
  //   this.ersService.removeImage(id)
  //   return {

  //   };
  // }
}

// @Injectable()
// export class AuthService {
//   constructor(private ersService: ErsService) {}

//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.ersService.findOne(username);
//     if (user && user.password === pass) {
//       const { password, ...result } = user;
//       console.log(password);
//       return result;
//     }
//     return null;
//   }
// }
