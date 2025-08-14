import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      name: string;
      role: string;
      permissions: string[];
    };
    accessToken: string;
    tokenType: string;
  }

  interface User {
    email: string;
    name: string;
    accessToken: string;
    tokenType: string;
    role: string;
    permissions: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    tokenType: string;
    role: string;
    permissions: string[];
  }
}
