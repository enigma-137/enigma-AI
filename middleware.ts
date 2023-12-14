import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes: ["/"]
    // allows homepage to be accessible
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 