import axios from "axios";
import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/lib/utils";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) return;

  const user = await prismadb.client.findUnique({
    where: { email: userEmail },
  });

  return user;
};

export default getUser;
