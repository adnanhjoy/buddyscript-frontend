"use client";

import { useRouter } from "next/navigation";
import { useActionState, startTransition } from "react";
import { userSignupMutation } from "@/lib/auth/authApi";

interface State {
    error: string | null;
}

const initialState: State = { error: null };

export default function RegistrationForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState<State, FormData>(
        async (_prev, formData) => {
            const password = formData.get("password") as string;
            const repeatPassword = formData.get("repeatPassword") as string;

            if (password !== repeatPassword) {
                return { error: "Passwords do not match" };
            }

            try {
                await userSignupMutation({
                    firstName: formData.get("firstName") as string,
                    lastName: formData.get("lastName") as string,
                    email: formData.get("email") as string,
                    password,
                });
                router.push("/");
                return { error: null };
            } catch (e) {
                return { error: e instanceof Error ? e.message : "Registration failed" };
            }
        },
        initialState
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startTransition(() => {
            formAction(new FormData(e.currentTarget));
        });
    }

    return (
        <form className="_social_registration_form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8" htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control _social_registration_input"
                            required
                            autoComplete="given-name"
                        />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8" htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control _social_registration_input"
                            required
                            autoComplete="family-name"
                        />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8" htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control _social_registration_input"
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control _social_registration_input"
                            required
                            autoComplete="new-password"
                            minLength={6}
                        />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8" htmlFor="repeatPassword">Repeat Password</label>
                        <input
                            id="repeatPassword"
                            name="repeatPassword"
                            type="password"
                            className="form-control _social_registration_input"
                            required
                            autoComplete="new-password"
                            minLength={6}
                        />
                    </div>
                </div>
            </div>
            {state.error && (
                <div className="row">
                    <div className="col-12">
                        <div className="alert alert-danger py-2" role="alert" style={{ whiteSpace: "pre-line" }}>{state.error}</div>
                    </div>
                </div>
            )}
            <div className="row">
                <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                    <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                        <button
                            type="submit"
                            className="_social_registration_form_btn_link _btn1"
                            disabled={isPending}
                        >
                            {isPending ? "Registering..." : "Register"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
