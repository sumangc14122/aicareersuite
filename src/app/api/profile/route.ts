// // // // import { NextResponse } from 'next/server';
// // // // import getAuth from '@clerk/nextjs';
// // // // import prisma from '@/lib/prisma';

// // // // export async function POST(req: Request) {
// // // //   const { userId } = getAuth();
// // // //   if (!userId) return NextResponse.error();

// // // //   const data = await req.json();

// // // //   const profile = await prisma.userProfile.upsert({
// // // //     where: { userId },
// // // //     update: { ...data },
// // // //     create: { userId, ...data },
// // // //   });

// // // //   return NextResponse.json(profile);
// // // // }

// // // // export async function GET(req: Request) {
// // // //   const { searchParams } = new URL(req.url);
// // // //   const id = searchParams.get('id');
// // // //   if (id) {
// // // //     const profile = await prisma.userProfile.findUnique({ where: { id } });
// // // //     return NextResponse.json(profile);
// // // //   }

// // // //   const { userId } = getAuth();
// // // //   if (userId) {
// // // //     const profile = await prisma.userProfile.findUnique({ where: { userId } });
// // // //     return NextResponse.json(profile);
// // // //   }

// // // //   return NextResponse.json([]);
// // // // }

// // // // src/app/api/profile/route.ts
// // // import { NextResponse } from "next/server";
// // // import prisma from "@/lib/prisma";  // adjust path to your prisma client

// // // export async function POST(request: Request) {
// // //   try {
// // //     const data = await request.json();

// // //     // ensure required fields:
// // //     if (!data.userId || !data.name) {
// // //       return NextResponse.json(
// // //         { error: "Missing userId or name" },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     const profile = await prisma.profile.create({
// // //       data: {
// // //         userId: data.userId,
// // //         name: data.name,
// // //         tagline: data.tagline,
// // //         bio: data.bio,
// // //         jobTitle: data.jobTitle,
// // //         socialLink: data.socialLink,
// // //         industry: data.industry,
// // //         resumeUrl: data.resumeUrl,
// // //         coverLetterUrl: data.coverLetterUrl,
// // //         isPublic: data.isPublic,
// // //       },
// // //     });

// // //     return NextResponse.json(profile);
// // //   } catch (err: any) {
// // //     console.error("API Error:", err);
// // //     return NextResponse.json(
// // //       { error: "Internal Server Error" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // src/app/api/profile/route.ts
// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";

// // export async function POST(request: Request) {
// //   try {
// //     const data = await request.json();
// //     const {
// //       userId,
// //       name,
// //       tagline,
// //       bio,
// //       jobTitle,
// //       socialLink,
// //       industry,
// //       resumeUrl,
// //       coverLetterUrl,
// //       isPublic,
// //     } = data;

// //     if (!userId || !name) {
// //       return NextResponse.json(
// //         { error: "Missing userId or name" },
// //         { status: 400 }
// //       );
// //     }

// //     const profile = await prisma.profile.upsert({
// //       where: { userId: userId },
// //       update: {
// //         name,
// //         tagline,
// //         bio,
// //         jobTitle,
// //         socialLink,
// //         industry,
// //         resumeUrl,
// //         coverLetterUrl,
// //         isPublic,
// //       },
// //       create: {
// //         userId,
// //         name,
// //         tagline,
// //         bio,
// //         jobTitle,
// //         socialLink,
// //         industry,
// //         resumeUrl,
// //         coverLetterUrl,
// //         isPublic,
// //       },
// //     });

// //     // Returns the existing or newly created profile
// //     return NextResponse.json(profile);
// //   } catch (err: any) {
// //     console.error("API Error:", err);
// //     return NextResponse.json(
// //       { error: "Internal Server Error" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // src/app/api/profile/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     const {
//       userId,
//       name,
//       profilePicture,
//       tagline,
//       bio,
//       jobTitle,
//       socialLink,
//       industry,
//       resumeUrl,
//       coverLetterUrl,
//       skills,
//       projects,
//       isPublic,
//     } = data;

//     if (!userId || !name) {
//       return NextResponse.json(
//         { error: "Missing userId or name" },
//         { status: 400 }
//       );
//     }

//     const profile = await prisma.profile.upsert({
//       where: { userId },
//       update: {
//         name,
//         profilePicture,
//         tagline,
//         bio,
//         jobTitle,
//         socialLink,
//         industry,
//         resumeUrl,
//         coverLetterUrl,
//         skills,
//         projects,
//         isPublic,
//       },
//       create: {
//         userId,
//         name,
//         profilePicture,
//         tagline,
//         bio,
//         jobTitle,
//         socialLink,
//         industry,
//         resumeUrl,
//         coverLetterUrl,
//         skills,
//         projects,
//         isPublic,
//       },
//     });

//     return NextResponse.json(profile);
//   } catch (err: any) {
//     console.error("API Error:", err);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });
  return NextResponse.json(profile);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      userId,
      name,
      profilePicture,
      tagline,
      bio,
      jobTitle,
      socialLink,
      industry,
      resumeUrl,
      coverLetterUrl,
      skills,
      projects,
      isPublic,
    } = data;

    if (!userId || !name) {
      return NextResponse.json(
        { error: "Missing userId or name" },
        { status: 400 },
      );
    }

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        name,
        profilePicture,
        tagline,
        bio,
        jobTitle,
        socialLink,
        industry,
        resumeUrl,
        coverLetterUrl,
        skills,
        projects,
        isPublic,
      },
      create: {
        userId,
        name,
        profilePicture,
        tagline,
        bio,
        jobTitle,
        socialLink,
        industry,
        resumeUrl,
        coverLetterUrl,
        skills,
        projects,
        isPublic,
      },
    });

    return NextResponse.json(profile);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
