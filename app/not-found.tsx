import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <div className="relative flex flex-col items-center text-center">
                <div className="pointer-events-none select-none text-[10rem] font-extrabold leading-none tracking-tighter sm:text-[12rem] md:text-[16rem]">
                    <span className="bg-gradient-to-b from-foreground/10 to-foreground/5 bg-clip-text text-transparent">
                        404
                    </span>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="space-y-4">
                        <h1 className="text-lg font-semibold text-foreground sm:text-xl md:text-2xl">
                            Page not found
                        </h1>
                        <p className="mx-auto max-w-xs text-sm text-muted-foreground sm:max-w-sm">
                            The page you are looking for doesn&apos;t exist or has been moved.
                        </p>


                        <Link href="/" aria-label="Home">
                            <button type="button" >
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
