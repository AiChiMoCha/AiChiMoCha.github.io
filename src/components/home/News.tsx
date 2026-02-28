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

const TAG_STYLES: Record<string, string> = {
    Award:      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Conference: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Paper:      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Talk:       'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    News:       'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
};

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
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
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-2">
                {items.map((item, index) => {
                    const tagStyle = item.tag
                        ? (TAG_STYLES[item.tag] ?? TAG_STYLES['News'])
                        : null;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.05 * index }}
                            className="flex items-start gap-3 py-2 border-l-2 border-neutral-200 dark:border-neutral-700 pl-3 hover:border-accent transition-colors duration-200"
                        >
                            {/* Date */}
                            <span className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 w-16 flex-shrink-0 font-mono">
                                {formatDate(item.date)}
                            </span>

                            {/* Content + tag */}
                            <div className="flex flex-wrap items-center gap-2 min-w-0">
                                {tagStyle && (
                                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${tagStyle}`}>
                                        {item.tag}
                                    </span>
                                )}
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    {item.content}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
}
