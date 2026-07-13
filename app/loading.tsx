import React from "react";

const Loading: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%",
            }}
        >
            <p style={{ color: "var(--muted-foreground)" }}>Loading...</p>
        </div>
    );
};

export default Loading;