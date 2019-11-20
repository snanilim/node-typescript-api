import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as config from 'config';
import {const_msg} from '../../helper';
import {APIError} from '../../core';

const schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

const roles = ['user', 'admin'];
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      maxlength: 50,
      minlength: 3,
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      maxlength: 128,
      minlength: 6,
      trim: true
    },
    name: {
      type: String,
      maxlength: 50,
      minlength: 3,
      trim: true
    },
    phone: {
      type: String,
      maxlength: 13,
      minlength: 11,
      trim: true
    },
    service: {
      facebook: String,
      google: String
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
      trim: true
    },
    picture: {
      type: String,
      trim: true
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    }
  },
  schemaOptions
);

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  userInfo() {
    const userInfo = {};
    const fields = ['id', 'name', 'email', 'picture', 'role', 'createdAt'];

    fields.forEach((field) => {
      userInfo[field] = this[field];
    });
    return userInfo;
  },

  token() {
    const payload = {
      sub: this.id,
      iat: moment().unix(),
      exp: moment()
        .add(config.get('jwtTimeExpire'), 'minutes')
        .unix()
    };
    return jwt.sign(payload, config.get('token_secret'));
  },

  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
});

userSchema.statics = {
  roles,

  async getOneUser(userID) {
    try {
      const user = await this.findOne({_id: userID});
      return user;
    } catch (err) {
      throw new APIError(err);
    }
  },

  async getAllUser({page = 1, perPage = 20, name, email, role}) {
    const queryObj = {name, email, role};
    const findQuery = Object.keys(queryObj)
      .filter((key) => queryObj[key] !== undefined)
      .reduce((obj, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = queryObj[key];
        return obj;
      }, {});
    try {
      return this.find(findQuery)
        .sort({createdAt: -1})
        .skip(perPage * (page - 1))
        .limit(perPage)
        .exec();
    } catch (error) {
      return error;
    }
  },

  async findAndGenerateToken(options) {
    try {
      const {email, password, refreshObj} = options;
      if (!email)
        throw new APIError({
          message: const_msg.EMAIL_IS_REQUIRED,
          status: const_msg.NOT_FOUND_CODE
        });
      const user = await this.findOne({email}).exec();

      const err = {
        status: const_msg.UNAUTHORIZED_CODE,
        isPublic: true,
        message: ''
      };

      if (password) {
        if (user && (await user.comparePassword(password))) {
          return {user, accessToken: user.token()};
        }
        err.message = const_msg.UNAUTHORIZED;
      } else if (refreshObj && refreshObj.userEmail === email) {
        return {user, accessToken: user.token()};
      } else {
        err.message = const_msg.UNAUTHORIZED;
      }
      throw new APIError(err);
    } catch (error) {
      throw error;
    }
  },

  checkDuplicateEmail(error: any) {
    if (
      error.code === 11000 &&
      (error.name === 'BulkWriteError' || error.name === 'MongoError')
    ) {
      throw new APIError({
        message: const_msg.EMAIL_EXIST,
        error: {
          field: 'email',
          location: 'body',
          message: [const_msg.EMAIL_EXIST]
        },
        status: const_msg.CONFLICT_CODE,
        stack: error.stack,
        isPublic: true
      });
    }
    return error;
  }
};

const User = mongoose.model('User', userSchema);
export default User;
