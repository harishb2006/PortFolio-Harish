"use client";

/**
 * @author: @dorian_baffier
 * @description: Social Button
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Twitter, Instagram, Linkedin, Link } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialButton({
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const shareButtons = [
        { icon: Twitter, label: "Share on Twitter", url: "https://twitter.com/intent/tweet?url=" },
        { icon: Instagram, label: "Share on Instagram", url: "https://instagram.com" },
        { icon: Linkedin, label: "Share on LinkedIn", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
        { icon: Link, label: "Copy link", url: null },
    ];

    const handleShare = (index: number) => {
        setActiveIndex(index);
        const button = shareButtons[index];
        
        if (button.url === null) {
            // Copy link
            navigator.clipboard.writeText(window.location.href);
        } else {
            // Open social media
            window.open(button.url + encodeURIComponent(window.location.href), '_blank');
        }
        
        setTimeout(() => setActiveIndex(null), 300);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <motion.div
                animate={{
                    opacity: isVisible ? 0 : 1,
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                }}
            >
                <Button
                    className={cn(
                        "min-w-40 relative",
                        "bg-white/80 backdrop-blur-sm",
                        "hover:bg-white",
                        "text-zinc-800",
                        "border-2 border-[#e15f41]/30",
                        "hover:border-[#e15f41]/50",
                        "hover:shadow-xl",
                        "transition-all duration-300",
                        "font-semibold",
                        className
                    )}
                    {...props}
                >
                    <span className="flex items-center gap-2">
                        <Link className="w-4 h-4" />
                        Share
                    </span>
                </Button>
            </motion.div>

            <motion.div
                className="absolute top-0 left-0 flex h-10 overflow-hidden rounded-full"
                animate={{
                    width: isVisible ? "auto" : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1],
                }}
            >
                {shareButtons.map((button, i) => (
                    <motion.button
                        type="button"
                        key={`share-${button.label}`}
                        aria-label={button.label}
                        onClick={() => handleShare(i)}
                        className={cn(
                            "h-10",
                            "w-10",
                            "flex items-center justify-center",
                            "bg-[#e15f41]",
                            "text-white",
                            i === 0 && "rounded-l-full",
                            i === 3 && "rounded-r-full",
                            "border-r border-white/20 last:border-r-0",
                            "hover:bg-[#f5a623]",
                            "outline-none",
                            "relative overflow-hidden",
                            "transition-colors duration-200"
                        )}
                        animate={{
                            opacity: isVisible ? 1 : 0,
                            x: isVisible ? 0 : -20,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                            delay: isVisible ? i * 0.05 : 0,
                        }}
                    >
                        <motion.div
                            className="relative z-10"
                            animate={{
                                scale: activeIndex === i ? 0.85 : 1,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }}
                        >
                            <button.icon className="w-4 h-4" />
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: activeIndex === i ? 0.15 : 0,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}
