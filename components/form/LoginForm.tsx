"use client";

import { useRouter } from "next/navigation";
import { useActionState, startTransition } from "react";
import { userLoggedIn } from "@/lib/auth/authApi";

interface State {
    error: string | null;
}

const initialState: State = { error: null };

export default function LoginForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState<State, FormData>(
        async (_prev, formData) => {
            try {
                await userLoggedIn({
                    email: formData.get("email") as string,
                    password: formData.get("password") as string,
                });
                router.push("/");
                return { error: null };
            } catch (e) {
                return { error: e instanceof Error ? e.message : "Login failed" };
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
        <form className="_social_login_form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8" htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control _social_login_input"
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control _social_login_input"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                </div>
            </div>
            {state.error && (
                <div className="row">
                    <div className="col-12">
                        <div className="alert alert-danger py-2" role="alert">{state.error}</div>
                    </div>
                </div>
            )}
            <div className="row">
                <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                    <div className="_social_login_form_btn _mar_t40 _mar_b60">
                        <button
                            type="submit"
                            className="_social_login_form_btn_link _btn1"
                            disabled={isPending}
                        >
                            {isPending ? "Logging.." : "Login now"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
