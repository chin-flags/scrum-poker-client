export type User = {
    name: string,
    userId: string,
    isAdmin: string,
}

export type Session = {
    _id: string;
    name: string;
    admin: string;
    type: string;
    players?: [string];
    stories?: [string];
    status: string;
    code: string;
  };