// // // src/app/api/suggestions/route.ts

// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";
// // import { currentUser } from "@clerk/nextjs/server";

// // export async function GET() {
// //   const user = await currentUser();
// //   if (!user?.id) return NextResponse.json([], { status: 200 });

// //   const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
// //   if (!profile) return NextResponse.json([], { status: 200 });

// //   const list = await prisma.suggestion.findMany({
// //     where: { profileId: profile.id },
// //     orderBy: { createdAt: "desc" },
// //   });
// //   return NextResponse.json(list);
// // }

// // src/app/api/suggestions/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   // 1) Who’s making the request?
//   const user = await currentUser();
//   if (!user?.id) {
//     // not signed in → just return an empty list
//     return NextResponse.json([], { status: 200 });
//   }

//   // 2) Find their profile
//   const profile = await prisma.profile.findUnique({
//     where: { userId: user.id },
//   });
//   if (!profile) {
//     // no profile yet → still return empty list
//     return NextResponse.json([], { status: 200 });
//   }

//   // 3) Load the AI suggestions for that profile
//   const list = await prisma.suggestion.findMany({
//     where: { profileId: profile.id },
//     orderBy: { createdAt: "desc" },
//   });

//   // 4) Return as JSON
//   return NextResponse.json(list);
// }

// src/app/api/suggestions/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();
  if (!user?.id) return NextResponse.json([], { status: 200 });

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) return NextResponse.json([], { status: 200 });

  const list = await prisma.suggestion.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(list);
}
