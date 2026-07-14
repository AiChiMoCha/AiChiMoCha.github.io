'use client';

import { motion } from 'framer-motion';

export interface NewsItem {
    date: string;
    content: string;
    tag?: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

function formatDate(dateStr: string): string {
    // Parse Y-M-D parts directly - Date("2026-07-01") is UTC and can
    // shift a day backwards in western timezones
    const parts = dateStr.split('-').map(Number);
    const d = parts.length >= 2
        ? new Date(parts[0], parts[1] - 1, parts[2] || 1)
        : new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function News({ items, title = 'News' }: NewsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <div className="mb-3">
                <h2 className="font-serif text-[1.75rem] leading-tight tracking-tight font-bold text-primary mb-3">{title}</h2>
                <div className="rule-double" />
            </div>
            <div>
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        className="flex items-baseline gap-4 py-3 border-b border-neutral-200 last:border-b-0"
                    >
                        {/* Date */}
                        <span className="eyebrow text-neutral-400 w-20 flex-shrink-0">
                            {formatDate(item.date)}
                        </span>

                        {/* Content + tag */}
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 min-w-0">
                            {item.tag && (
                                <span className="eyebrow text-accent flex-shrink-0">
                                    {item.tag}
                                </span>
                            )}
                            <p className="text-sm text-neutral-700 leading-relaxed">
                                {item.content}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
