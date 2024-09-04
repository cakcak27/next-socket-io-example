"use client";

// import { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import signup from "@/app/actions/auth";
import { Button, TextInput } from "flowbite-react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";

export function SignupForm() {
    const [state, action] = useFormState(signup, undefined);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col w-96">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sign Up
            </h5>

            <form action={action} className="flex flex-col gap-2">
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="name">Name</label>
                    </div>
                    <TextInput id="name" name="name" placeholder="Name" />
                </div>
                <span className="text-sm text-rose-500">{state?.errors?.name && <p>{state.errors.name}</p>}</span>
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="email">Email</label>
                    </div>
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                </div>
                <span className="text-sm text-rose-500">{state?.errors?.email && <p>{state.errors.email}</p>}</span>
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <div className="relative mt-1">
                        <input
                            id="password"
                            name="password"
                            placeholder="Password"
                            type={showPassword ? "password" : "text"}
                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            {!showPassword ? (
                                <VscEye
                                    size="32"
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <VscEyeClosed
                                    size="32"
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <span className="text-sm text-rose-500">{state?.errors?.password && (
                    <div>
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}</span>
                <SubmitButton />
            </form>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button color="blue" disabled={pending} type="submit">
            Sign Up
        </Button>
    );
}
