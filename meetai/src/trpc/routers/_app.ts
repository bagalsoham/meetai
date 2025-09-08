import { agentsRouter } from '@/modules/agents/server/procedures';
import { baseProcedure, createTRPCRouter } from '../init';
import { meetings } from '@/db/schema';
import { meetingsRouter } from '@/modules/meetings/server/procedures';
export const appRouter = createTRPCRouter({
  agents:agentsRouter,
  meetings:meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;