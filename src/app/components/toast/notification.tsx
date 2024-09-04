"use client";

import { Button, Toast } from "flowbite-react";
import { MdLoop } from "react-icons/md";
import { useSocket } from "../../hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../utils/socket";

const NotificationSound = "/assets/audio/message-notification.mp3"

export default function Notification() {
    const [isConnected] = useSocket();
    const audioPlayer: any = useRef(null);
    const [notification, setNotification] = useState({
        isShow: false,
        title: "",
        message: "",
        color: "success",
    });

    if (isConnected) {
        socket.on("notification", (data) => {
            console.log("notification", data);
            setNotification((prev) => ({
                ...prev,
                ...data,
                isShow: true,
            }));
          });
    }
    // useEffect(() => {
    //     return () => {
    //         socket.off("notification");
    //       };
    // }, [isConnected]);

    if (!notification.isShow) {
        return null;
    }


    return (
        <div className="absolute top-2 right-2 bg-red">
            <Toast>
                <div className="flex items-start">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300">
                        <MdLoop className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                            {notification.title}
                        </span>
                        <div className="mb-2 text-sm font-normal">
                            {notification.message}
                        </div>
                        <div className="flex gap-2">
                            <div className="w-auto">
                                <Button size="xs">Update</Button>
                            </div>
                            <div className="w-auto">
                                <Button color="light" size="xs">
                                    Not now
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Toast.Toggle
                        onDismiss={() => {
                            setNotification((prev) => ({
                                ...prev,
                                isShow: false,
                            }));
                        }}
                    />
                </div>
            </Toast>
            <audio autoPlay ref={audioPlayer} src={NotificationSound} />
        </div>
    );
}
