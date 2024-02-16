import { buildSchema } from "graphql";
import casual from "casual";

const TOTAL_USERS = 2000;

interface User {
  name: string;
  address: string;
  phone: string;
}

interface Pagination {
  offset: number;
  limit: number;
}

interface Response {
  totalCount: number;
  users: User[];
  pageInfo: { start: number; hasNextPage: boolean };
}

casual.define("user", () => {
  return {
    name: casual.full_name,
    address: casual.address,
    phone: casual.phone,
  };
});

//@ts-ignore
const allRecords: User[] = Array.from(
  { length: TOTAL_USERS },
  () => casual.user
);

export const schema = buildSchema(`
    type User {
        name: String!
        address: String!
        phone: String!
    }
    type PageInfo {
      start: Int
      hasNextPage: Boolean
    }
    type Response {
      totalCount: Int
      users: [User]
      pageInfo: PageInfo
    }
    type Query {
        getUsers(offset: Int, limit: Int): Response
    }
`);

export const resolvers = {
  getUsers: (args: Pagination = { offset: 0, limit: 20 }): Response => {
    console.log(args);
    const { offset, limit } = args;
    const hasNextRecords = TOTAL_USERS > limit + offset;
    return {
      totalCount: TOTAL_USERS,
      users: allRecords.slice(offset, offset + limit),
      pageInfo: {
        hasNextPage: hasNextRecords,
        start: hasNextRecords ? limit + offset : 0,
      },
    };
  },
};
