"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export const AppBar=()=>{
    const session=useSession();
    console.log(session.data?.user)

    return(
        <div className="flex justify-between">
            <div>
                1vs1
            </div>
            <div>
                {
                    session.data?.user
                    ?<button className="m-2 p-2 bg-blue-400 rounded-xl cursor-pointer" onClick={()=>signOut()}>signOut</button>
                    :<button className="m-2 p-2 bg-blue-400 rounded-xl cursor-pointer" onClick={()=>signIn()}>signIn</button>
                }         
            </div>
        </div>
    )
}