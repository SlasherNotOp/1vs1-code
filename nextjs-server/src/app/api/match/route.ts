import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { matchId, user1Id, user2Id } = await req.json();

        const user1 = await prismaClient.user.findUnique({ where: { id: user1Id } });
        const user2 = await prismaClient.user.findUnique({ where: { id: user2Id } });

        if (!user1) {
            return NextResponse.json({ message: "User 1 not found" }, { status: 404 });
        }
        if (!user2) {
            return NextResponse.json({ message: "User 2 not found" }, { status: 404 });
        }

        //get a random problem from db
        const randomProblemId=12
        await prismaClient.match.create({
            data: {
                id: matchId,
                user1Id,
                user2Id,
                problemId:randomProblemId
            },
        });

        return NextResponse.json({ problemId:randomProblemId }, { status: 201 });

    } catch (error) {
        console.error("Error creating match:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
