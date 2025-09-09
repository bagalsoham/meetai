import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
  // Get the actual session instead of hardcoded user
  const session = await auth.api.getSession({ 
    headers: await headers() 
  });

  return { 
    session,
    userId: session?.user?.id || null 
  };
});

// Avoid exporting the entire t-object
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  // Get session fresh in the middleware since ctx might not have it
  const session = await auth.api.getSession({ 
    headers: await headers() 
  });

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorised message',
    });
  }

  return next({
    ctx: { 
      ...ctx, 
      auth: session,
      user: session.user 
    },
  });
});