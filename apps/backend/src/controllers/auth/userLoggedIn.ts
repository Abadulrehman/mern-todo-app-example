import { Request, Response } from "express";
import { getUserFromRequest } from "../../utils/token";

const userLoggedIn = async (req: Request, res: Response) => {
  const user = await getUserFromRequest(req);

  if (user == null) {
    return res.json({ loggedIn: false, user: null});
  }

  res.json({ loggedIn: true, user: user.id, userEmail: user.email});
};

export default userLoggedIn;
