import React from "react";

// --- Icon implementations (using lucide-react) ---

// Icon for Fast Delivery (Package)
const PackageIcon = ({ className }) =><img src="/src/assets/delivery.png" alt="" />

// Icon for Best Prices & Offers (Gift)
const GiftIcon = ({ className }) => <img src="/src/assets/gift.png" alt="" />;

// Icon for Great Daily Deal (Percent Badge)
const PercentIcon = ({ className }) => <img src="/src/assets/deals.png" alt="" />;

// Icon for Click & Collect (Store/Shop)
const StoreIcon = ({ className }) => <img src="/src/assets/books.png" alt="" />;

// --- Feature Data ---
const features = [
    {
        icon: PackageIcon,
        title: "FAST DELIVERY",
        description: "Free standard delivery on all orders",
    },
    {
        icon: GiftIcon,
        title: "BEST PRICES & OFFERS",
        description: "Multiple gift options available",
    },
    {
        icon: PercentIcon,
        title: "GREAT DAILY DEAL",
        description: "Save big on orders $50 or more",
    },
    {
        icon: StoreIcon,
        title: "CLICK & COLLECT",
        description: "Check availability at your local stores",
    },
];

const FeatureCard = ({ Icon, title, description }) => {
    return (
        <div className="flex flex-col items-center text-center p-6 md:p-8 space-y-4 transition duration-300 ">
            {/* Icon - Styled with a circle background for better visibility */}
            <div className="p-3  rounded-full ">
                <Icon className="w-8 h-8 text-indigo-600" />
            </div>

            {/* Content */}
            <div className="space-y-1">
                <h3 className="text-base font-bold tracking-wide uppercase text-gray-800">
                    {title}
                </h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
};

// Main App Component (renamed from Services for standard React file structure)

export const Services = () => {
    return (
            <div className="w-full  mx-auto pb-20  bg-white border-b-2 border-stone-200  overflow-hidden ">
                {/* Responsive Grid Logic:
                    1. Default (< 768px): grid-cols-1 (1x4 Vertical Line)
                    2. md (>= 768px): md:grid-cols-2 (2x2 Grid)
                    3. xl (>= 1280px): xl:grid-cols-4 (4x1 Desktop Grid)
                    
                    Note: We use the standard 'xl' breakpoint (1280px) to handle the >1200px desktop view.
                */}
                <div
                    className="grid grid-cols-1 
                            md:grid-cols-2 
                            xl:grid-cols-4 
"
                >
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            Icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
    );
};
