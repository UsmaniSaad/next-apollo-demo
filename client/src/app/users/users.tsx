"use client";

import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import User from "./user";

const query = gql`
  query getUsers($offset: Int, $limit: Int) {
    getUsers(offset: $offset, limit: $limit) {
      totalCount
      users {
        name
        address
        phone
      }
      pageInfo {
        start
        hasNextPage
      }
    }
  }
`;

export interface IUser {
  name: string;
  address: string;
  phone: string;
}

interface Response {
  getUsers: {
    users: IUser[];
    totalCount: number;
    pageInfo: { start: number; hasNextPage: boolean };
  };
}

const LIMIT = 20;

const Users = () => {
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState<IUser[]>([]);

  const divRef = React.useRef<HTMLDivElement>(null);

  /**Get data passing offset and limit
   * limit: constant
   * page: state
  */
  const { data, error } = useQuery<Response>(query, {
    variables: { offset: page * LIMIT, limit: LIMIT },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    /**Scroll to the bottom when new data arrives */
    if (divRef.current)
      divRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
  }, [users]);

  const memoizedData: IUser[] = React.useMemo(() => {
    return data?.getUsers.users || [];
  }, [data]);

  useEffect(() => {
    setUsers((pre) => [...pre, ...memoizedData]);
  }, [memoizedData]);

  useEffect(() => {
    /**Scroll to the bottom when new data arrives */
    if (divRef.current)
      divRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
  }, [users]);

  useEffect(() => {
    setUsers((pre) => [...pre, ...memoizedData]);
  }, [memoizedData]);

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      {error ? (
        <p>Oh no, there was an err</p>
      ) : data ? (
        <>
          <div className="inline-grid grid-cols-4 gap-4" ref={divRef}>
            {users.map((user: IUser, index) => (
              <User key={user.name + index} {...user} />
            ))}
          </div>

          {data.getUsers.pageInfo.hasNextPage && (
            <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mt-4 mx-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => setPage(page + 1)}
            >
              Load more
            </button>
          )}
        </>
      ) : null}
    </main>
  );
};

export default Users;
