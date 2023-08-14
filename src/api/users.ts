import { TeamMember, Invite } from "../shared/types";

const mockUsers: TeamMember[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Joe",
      lastName: "Blogs",
      phone: "555-55-51",
      email: "mail@example.com",
    },
    status: "pending",
    role: "Administrator",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Sarah",
      lastName: "Connors",
      phone: "555-55-52",
      email: "mail@example.com",
    },
    status: "pending",
    role: "Administrator",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Joe",
      lastName: "Blogs",
      phone: "555-55-53",
      email: "mail@example.com",
    },
    status: "pending",
    role: "Standard",
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "Sarah",
      lastName: "Connors",
      phone: "555-55-54",
      email: "mail@example.com",
    },
    status: "pending",
    role: "Standard",
  },
  {
    id: 5,
    user: {
      id: 5,
      name: "Sarah",
      lastName: "Connors",
      phone: "555-55-55",
      email: "mail@example.com",
    },
    status: "pending",
    role: "Standard",
  },
];

const mockInvites: Invite[] = [
  {
    id: 1,
    phone: "555-55-11",
    role: "Administrator",
  },
  {
    id: 2,
    phone: "555-55-12",
    role: "Standard",
  },
];

const delay = (timeout = 2000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const getUsers = async (): Promise<TeamMember[]> => {
  await delay();
  return mockUsers;
};

export const getInvites = async (): Promise<Invite[]> => {
  await delay();
  return mockInvites;
};
