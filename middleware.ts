export {default} from "next-auth/middleware"

// TODO: replace with library-camunda middleware
export const config = {matcher: ["/quiz/:id/evaluation", "/quiz/:id/learn", "/quiz/create"]}