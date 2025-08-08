import { createFactory } from "hono/factory";
import type { z } from "zod";
import { zValidator } from "../validator";
import type { GetCurrentUserContext } from "./current-user.context";
import { getCurrentUserResponse } from "./current-user.zod";

const factory = createFactory();
export const getCurrentUserHandlers = factory.createHandlers(
  zValidator("response", getCurrentUserResponse),
  async (c: GetCurrentUserContext) => {
    const user: z.infer<typeof getCurrentUserResponse> = {
      id: "123",
      name: "John Doe",
    };
    return c.json(user);
  },
);
