import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 1rem",
            }}
        >
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        pointerEvents: "none",
                        userSelect: "none",
                        fontSize: "16rem",
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: "-0.08em",
                    }}
                >
                    <span
                        style={{
                            color: "#e5e7eb",
                        }}
                    >
                        404
                    </span>
                </div>

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "2rem",
                                fontWeight: 600,
                                margin: 0,
                            }}
                        >
                            Page not found
                        </h1>

                        <p
                            style={{
                                maxWidth: "24rem",
                                fontSize: "0.875rem",
                                color: "#6b7280",
                                margin: "0 auto",
                            }}
                        >
                            The page you are looking for doesn&apos;t exist or has been moved.
                        </p>

                        <Link href="/" aria-label="Home">
                            <button
                                type="button"
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "0.5rem",
                                    background: "#000",
                                    color: "#fff",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                }}
                            >
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}