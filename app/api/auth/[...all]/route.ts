import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/features/console/auth/lib/server";

export const { GET, POST } = toNextJsHandler(auth);
