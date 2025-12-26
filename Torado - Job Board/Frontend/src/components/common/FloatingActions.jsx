import React from "react";
import { Layers, FileText, ShoppingBag } from "lucide-react";

/**
 * FloatingActions component that displays sticky buttons on the right side.
 * @param {Object} props
 * @param {Function} props.onOpenDemos - Callback to open the Demos modal.
 */
const FloatingActions = ({ onOpenDemos }) => {
  const actions = [
    {
      id: "demos",
      label: "Demos",
      icon: Layers,
      onClick: onOpenDemos,
      className: "text-slate-800",
    },
    {
      id: "docs",
      label: "Docs",
      icon: FileText,
      onClick: () =>
        window.open("https://torado.envytheme.com/documentation/", "_blank"),
      className: "text-slate-800",
    },
    {
      id: "buy",
      label: "Buy Now",
      icon: ShoppingBag,
      onClick: () =>
        window.open("https://torado.envytheme.com/#pricing", "_blank"),
      className: "text-slate-800",
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-none">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          className={`
            pointer-events-auto group
            flex flex-col items-center justify-center w-18 h-18 md:w-18 md:h-18
            bg-white border border-slate-200 border-r-0 rounded-l-xl
            shadow-[-4px_2px_15px_rgba(0,0,0,0.08)]
            hover:bg-slate-50 hover:-translate-x-1 transition-all duration-300
            ${action.className}
          `}
        >
          <action.icon
            size={22}
            strokeWidth={1.5}
            className="mb-1 transition-transform duration-300 group-hover:-rotate-12"
          />
          <span className="text-[11px] md:text-xs font-bold tracking-tight">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FloatingActions;
