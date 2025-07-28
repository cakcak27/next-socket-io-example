"use client";

import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { socket } from "./utils/socket";
import { useSocket } from "./hooks/useSocket";
import { SignupForm } from "./components/ui/signup-form";

export function Home() {
    const [isConnected] = useSocket();
    const [message, setMessage] = useState("");
    useEffect(()=>{

        socket.on("hello", (message)=>{
            console.log("hello", message)  // This will print "hello change_hello" in the console
            setMessage(message)
            // socket.emit("hello", "change_hello")
        })

        return () => {
            socket.off("hello")
        }

    },[isConnected])

    return (
        <Card className="max-w">

            <SignupForm />
            <div className="flex flex-col">
                <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            </div>
        </Card>
    );
}
