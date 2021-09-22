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
  }

  type Mutation {
    updateHighScore(name: String, totalScore: Int, club100: Boolean, club100num: Int): mysqlResponse
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
        const r = await query("select * from highscores order by totalscore desc limit 10");
        
        for (let i = 0; i < r.length; i++) {
          const dateFormat = dayjs(r[i].scoredate).format("MMM DD, YYYY");
          r[i].scoredate = dateFormat;
      }
        return r;
    },
    // Mutations --
    updateHighScore: async (args) => {
        const r = await query("insert into highscores set ?", [args]);
        return r;
    }
};

export default {
    schema,
    root
}