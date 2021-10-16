import { buildSchema } from 'graphql';
import { query } from "./dbconnect.js";
import * as jsonwebtoken from 'jsonwebtoken';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import publicIp from 'public-ip';

import config from './config.js';
const privateKey = config.keys.jwt;

dayjs.extend(utc);
dayjs.extend(timezone);

export const schema = buildSchema(`
  type Query {
    greet: String
    allParts: [Part]
    part(id: Int!): Part
    allPhotos: [Photo]
    photo(part_id: Int!): [Photo]
    highscores: [HighScore]
    partCount: Int
    getStats: [Stat]
    login(user: String, password: String): UserObject
    userIP: String
    jwt(user: String!, admin: Boolean!): JWT
    auth(token: String!): AuthObject
  }

  type Mutation {
    updateHighScore(name: String, totalScore: Int, club100: Boolean, club100num: Int): mysqlResponse
    newPart(win: String, lose1: String, lose2: String, lose3: String): mysqlResponse
    newPhotos(part_id: Int, filename1: String, filename2: String): photoReturnObject
    setStats(won: Boolean, selectionlost: Boolean, timeoverlost: Boolean, correctanswers: Int, totalscore: Int, answerspeed: Float, gametimelength: Int, mouseoverevents: Int, mobile: Boolean, browser: String, city: String, region: String, country: String): mysqlResponse
  }

  type AuthObject {
    valid: Boolean
    user: String
    admin: Boolean
}

  type JWT {
    token: String
  }

  type User {
    id: Int
    user: String
    password: String
    admin: Boolean
  }

  type UserObject {
    user: String
    admin: Boolean
  }

  type Part {
    id: Int
    win: String
    lose1: String
    lose2: String
    lose3: String
  }

  type Photo {
    id: Int
    part_id: Int
    filename: String
  }

  type HighScore {
    id: Int
    name: String
    totalscore: Int
    club100: Boolean
    club100num: Int
    scoredate: String
  }

  type mysqlResponse {
    fieldCount: Int
    afffieldCount: Int
    affectedRows: Int
    insertId: Int
    serverStatus: Int
    warningCount: Int
    message: String
    protocol41: Boolean
    changedRows: Int
}

  type photoReturnObject {
    photo1: Int
    photo2: Int
  }

  type Stat {
    id: Int
    won: Boolean
    selectionlost: Boolean
    timeoverlost: Boolean
    correctanswers: Int
    totalscore: Int
    answerspeed: Float
    gametimelength: Int
    mouseoverevents: Int
    mobile: Boolean
    browser: String
    city: String
    region: String
    country: String
    datetimeplayed: String
  }

`);

export const root = {
  greet: () => {
    return "Hello Satan!"
  },
  allParts: async () => {
    const r = await query("select * from parts");
    return r;
  },
  part: async (args) => {
    const r = await query("select * from parts where id = ?", [args.id]);
    return r[0];
  },
  allPhotos: async () => {
    const r = await query("select * from photos");
    return r;
  },
  photo: async (args) => {
    const r = await query("select * from photos where part_id = ?", [args.part_id]);
    return r;
  },
  highscores: async () => {
    const r = await query("select * from highscores order by totalscore desc, scoredate desc limit 10");

    for (let i = 0; i < r.length; i++) {
      const dateFormat = dayjs(r[i].scoredate).format("MMM DD, YYYY");
      r[i].scoredate = dateFormat;
    }
    return r;
  },
  partCount: async () => {
    const r = await query("select count(*) as 'parts' from parts");
    return r[0].parts;
  },
  getStats: async () => {
    const r = await query("select * from stats order by id desc");
    for (let i = 0; i < r.length; i++) {
      const dateFormat = dayjs(r[i].datetimeplayed).tz("America/Chicago").format("MMM DD, YYYY h:mma");
      r[i].datetimeplayed = dateFormat;
    }
    return r;
  },
  userIP: async () => {
    const userIPAddress = await publicIp.v4();
    return userIPAddress;
  },
  jwt: async (args) => {
    // Create and returns JWT object--
    const userObject = {
      user: args.user,
      admin: args.admin
    };
    console.log(userObject);
    const token = await jsonwebtoken.default.sign({ data: userObject }, privateKey, { expiresIn: '1d' });
    const jwtObject = {
      token
    };
    return jwtObject;
  },
  auth: async (args) => {
    // Creates and returns an authObject for the front end --
    let authObject = {};
    const token = args.token;
    const auth = await jsonwebtoken.default.verify(token, privateKey, function (err, decoded) {
      if (err) {
        authObject = {
          valid: false,
          user: null,
          admin: false
        };
      } else {
        authObject = {
          valid: true,
          user: decoded.data.user,
          admin: decoded.data.admin
        };
      }
    });
    return authObject;
  },
  // Auth --
  login: async (args) => {
    const r = await query("select * from users where user = ?", [args.user]);
    const dbUser = r[0].user;
    const dbAdmin = r[0].admin;
    const inputPassword = args.password;
    const dbPassword = r[0].password;

    if (inputPassword === dbPassword) {
      const userObject = {
        user: dbUser,
        admin: dbAdmin
      }

      return userObject;
    } else {
      const nullObject = {
        user: null,
        admin: null
      }
      return nullObject;
    }

    return (inputPassword === dbPassword) ? r[0].user : null;
  },
  // Mutations --
  updateHighScore: async (args) => {
    const r = await query("insert into highscores set ?", [args]);
    return r;
  },
  newPart: async (args) => {
    const r = await query("insert into parts set ?", [args]);
    return r;
  },
  newPhotos: async (args) => {
    const r1 = await query("insert into photos set part_id = ?, filename = ?", [args.part_id, args.filename1]);
    const photoNewId1 = r1.insertId;

    const r2 = await query("insert into photos set part_id = ?, filename = ?", [args.part_id, args.filename2]);
    const photoNewId2 = r2.insertId;

    const photoIdNumbers = {
      photo1: photoNewId1,
      photo2: photoNewId2
    }

    return photoIdNumbers
  },
  setStats: async (args) => {
    const r = await query("insert into stats set ?", [args]);
    return r;
  }
};

export default {
  schema,
  root
}