import { buildSchema } from 'graphql';
import { query } from "./dbconnect.js";
import dayjs from 'dayjs';

export const schema = buildSchema(`
  type Query {
    greet: String
    allParts: [Part]
    part(id: Int!): Part
    allPhotos: [Photo]
    photo(part_id: Int!): [Photo]
    highscores: [HighScore]
    partCount: Int
  }

  type Mutation {
    updateHighScore(name: String, totalScore: Int, club100: Boolean, club100num: Int): mysqlResponse
    newPart(win: String, lose1: String, lose2: String, lose3: String): mysqlResponse
    newPhotos(part_id: Int, filename1: String, filename2: String): photoReturnObject
    setStats(won: Boolean, selectionlost: Boolean, timeoverlost: Boolean, correctanswers: Int, totalscore: Int, answerspeed: Float, gametimelength: Int, mouseoverevents: Int): mysqlResponse
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