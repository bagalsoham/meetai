import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { da } from "zod/v4/locales";


export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    try {
      const data = await db.select().from(agents);
      return data;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch agents",
        cause: err,
      });
    }
  }),
});
