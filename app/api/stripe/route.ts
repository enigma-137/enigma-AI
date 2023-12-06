// import { auth, currentUser } from "@clerk/nextjs";
// import { NextResponse } from "next/server";

// import prismadb from "@/lib/prismadb";

// import { stripe } from "@/lib/stripe";
// import { absoluteUrl } from "@/lib/utils";



// const settingsUrl = absoluteUrl("/settings")

// export async function Get(){
//     try{
//         const {userId} = auth()
//         const user = await currentUser()

//         if(!userId || !user){
//             return new Response("Unauthorized", {status: 401})
//         } 

//         const userSubscription = await prismadb.userSubscription.findUnique({
//             where: {
//                 userId
//             }
//         })
//         if(userSubscription && userSubscription.StripeCustomerId){

//             const stripeSession = await stripe.billingPortal.sessions.create({
//                 customer: userSubscription.StripeCustomerId,
//                 return_url: settingsUrl

//             })

//             return new NextResponse(JSON.stringify({url: stripeSession.url}))

//         }

//     }catch(error){
//         console.log("STRIPE_ERROR: ", error);

//         return new NextResponse("Internal error", {status: 500})
//     }
// }