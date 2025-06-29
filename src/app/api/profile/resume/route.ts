// // src/app/api/profile/resume/route.ts

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function PATCH(request: Request) {
//   const viewer = await currentUser();
//   if (!viewer?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { resumeUrl } = await request.json();
//   if (!resumeUrl) {
//     return NextResponse.json(
//       { error: "Missing resumeUrl" },
//       { status: 400 }
//     );
//   }

//   // ensure the profile exists
//   const existing = await prisma.profile.findUnique({
//     where: { userId: viewer.id },
//   });
//   if (!existing) {
//     return NextResponse.json(
//       { error: "Profile not found" },
//       { status: 404 }
//     );
//   }

//   // update only the resumeUrl field
//   const updated = await prisma.profile.update({
//     where: { userId: viewer.id },
//     data: { resumeUrl },
//   });

//   return NextResponse.json(updated);
// }

// src/app/api/profile/resume/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PATCH(request: Request) {
  const viewer = await currentUser();
  if (!viewer?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resumeUrl } = await request.json();
  if (!resumeUrl) {
    return NextResponse.json({ error: "Missing resumeUrl" }, { status: 400 });
  }

  // Upsert the profile: if it exists, update resumeUrl; if not, create it
  const profile = await prisma.profile.upsert({
    where: { userId: viewer.id },
    update: { resumeUrl },
    create: {
      userId: viewer.id,
      name: viewer.firstName ?? "New User",
      resumeUrl,
      isPublic: false,
    },
  });

  return NextResponse.json(profile);
}
