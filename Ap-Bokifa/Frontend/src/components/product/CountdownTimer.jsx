import React from "react";
import { useCountdown } from "/src/hooks/useCountdown"; // Adjust path if needed

const CountdownTimer = ({ saleEndDate }) => {
    const { days, hours, minutes, seconds, isExpired } =
        useCountdown(saleEndDate);

    if (isExpired) {
        return (
            <span className="text-red-600 font-semibold my-4 block">
                This sale has ended!
            </span>
        );
    }

    const isDanger = days < 1; // Check if we are under 1 day

    // 🚀 Styles to match the new UI (no boxes, no bold)
    const numberStyle = `text-3xl ${
        isDanger ? "text-red-600" : "text-gray-700"
    }`;
    const labelStyle = "text-sm text-gray-500";
    // Colon aligns with numbers
    const colonStyle = `text-3xl ${
        isDanger ? "text-red-600" : "text-gray-700"
    } px-1`;

    return (
        <div className="my-6 bg-gray-200 py-6">
            <p className="font-semibold text-gray-800 mb-3 text-center">
                Sale ends in:
            </p>
            {/* Use 'items-baseline' to align the text of the numbers 
              and colons along their bottom edge.
            */}
            <div className="flex items-baseline justify-center gap-10   ">
                {/* Days */}
                <div className="flex flex-col items-center min-w-[50px]">
                    <span className={numberStyle}>
                        {days} {/* No padding for days, as in the image */}
                    </span>
                    <span className={labelStyle}>Days</span>
                </div>

                <span className={colonStyle}>:</span>

                {/* Hours */}
                <div className="flex flex-col items-center min-w-[50px]">
                    <span className={numberStyle}>
                        {String(hours).padStart(2, "0")}
                    </span>
                    <span className={labelStyle}>Hours</span>
                </div>

                <span className={colonStyle}>:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center min-w-[50px]">
                    <span className={numberStyle}>
                        {String(minutes).padStart(2, "0")}
                    </span>
                    <span className={labelStyle}>Minutes</span>
                </div>

                <span className={colonStyle}>:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center min-w-[50px]">
                    <span className={numberStyle}>
                        {String(seconds).padStart(2, "0")}
                    </span>
                    <span className={labelStyle}>Seconds</span>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
