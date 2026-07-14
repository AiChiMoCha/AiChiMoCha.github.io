'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    ClipboardDocumentIcon
} from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import { cn, formatVenue } from '@/lib/utils';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
}

const chipClass = (active: boolean) =>
    cn(
        'eyebrow px-3 py-1.5 rounded-md border transition-colors duration-200',
        active
            ? 'bg-primary text-background border-primary'
            : 'border-neutral-300 text-neutral-500 hover:border-primary hover:text-primary'
    );

export default function PublicationsList({ config, publications, embedded = false }: PublicationsListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
    const [selectedType, setSelectedType] = useState<string | 'all'>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [expandedBibtexId, setExpandedBibtexId] = useState<string | null>(null);

    // Extract unique years and types for filters
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(publications.map(p => p.year)));
        return uniqueYears.sort((a, b) => b - a);
    }, [publications]);

    const types = useMemo(() => {
        const uniqueTypes = Array.from(new Set(publications.map(p => p.type)));
        return uniqueTypes.sort();
    }, [publications]);

    // Filter publications
    const filteredPublications = useMemo(() => {
        return publications.filter(pub => {
            const matchesSearch =
                pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.authors.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                pub.journal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.conference?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesYear = selectedYear === 'all' || pub.year === selectedYear;
            const matchesType = selectedType === 'all' || pub.type === selectedType;

            return matchesSearch && matchesYear && matchesType;
        });
    }, [publications, searchQuery, selectedYear, selectedType]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? 'mb-2' : 'mb-6'}>
                <h1 className={`${embedded ? "text-[2rem]" : "text-[2.75rem]"} font-serif font-bold tracking-tight leading-tight text-primary mb-2`}>{config.title}</h1>
                {config.description && (
                    <p className="font-serif italic text-base text-neutral-500 max-w-2xl mb-4">
                        {config.description}
                    </p>
                )}
                <div className="rule-double" />
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-4 space-y-4 pt-2">
                <div className="flex gap-6 items-end">
                    <div className="relative flex-grow">
                        <MagnifyingGlassIcon className="absolute left-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search publications…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-7 pr-4 py-2 bg-transparent border-0 border-b border-neutral-300 text-sm focus:outline-none focus:border-primary transition-colors duration-200 placeholder:text-neutral-400"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            'eyebrow flex items-center pb-2 transition-colors duration-200',
                            showFilters ? 'text-primary' : 'text-neutral-500 hover:text-primary'
                        )}
                    >
                        <FunnelIcon className="h-4 w-4 mr-1.5" />
                        Filters
                    </button>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="py-4 border-b border-neutral-200 space-y-4">
                                {/* Year Filter */}
                                <div className="flex flex-wrap items-baseline gap-2">
                                    <span className="eyebrow text-neutral-400 mr-2 w-10">Year</span>
                                    <button onClick={() => setSelectedYear('all')} className={chipClass(selectedYear === 'all')}>
                                        All
                                    </button>
                                    {years.map(year => (
                                        <button key={year} onClick={() => setSelectedYear(year)} className={chipClass(selectedYear === year)}>
                                            {year}
                                        </button>
                                    ))}
                                </div>

                                {/* Type filter hidden for now — restore by re-enabling this block */}
                                {false && (
                                    <div className="flex flex-wrap items-baseline gap-2">
                                        <span className="eyebrow text-neutral-400 mr-2 w-10">Type</span>
                                        <button onClick={() => setSelectedType('all')} className={chipClass(selectedType === 'all')}>
                                            All
                                        </button>
                                        {types.map(type => (
                                            <button key={type} onClick={() => setSelectedType(type)} className={chipClass(selectedType === type)}>
                                                {type.replace('-', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Publications List */}
            <div>
                {filteredPublications.length === 0 ? (
                    <div className="text-center py-12 text-sm text-neutral-500 italic">
                        No publications found matching your criteria.
                    </div>
                ) : (
                    filteredPublications.map((pub, index) => (
                        <motion.article
                            key={pub.id}
                            id={pub.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.08 * index }}
                            className="flex gap-5 py-7 border-b border-neutral-200 last:border-b-0 scroll-mt-24 lg:scroll-mt-28"
                        >
                            <span className="hidden sm:block w-8 flex-shrink-0 font-serif italic text-xl text-neutral-300 leading-none pt-0.5">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="flex flex-col md:flex-row gap-6 flex-grow min-w-0">
                                {pub.preview && (
                                    <div className="w-full md:w-44 flex-shrink-0">
                                        <div className="aspect-video md:aspect-[4/3] relative overflow-hidden bg-neutral-100">
                                            <Image
                                                src={`/papers/${pub.preview}`}
                                                alt={pub.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <p className="eyebrow text-neutral-400 mb-1.5">
                                        {formatVenue(pub.journal || pub.conference)}{(pub.journal || pub.conference) && pub.year ? ' · ' : ''}{pub.year}
                                    </p>
                                    <h3 className={`${embedded ? "text-lg" : "text-xl"} font-serif font-semibold text-primary mb-1.5 leading-snug`}>
                                        {pub.title}
                                    </h3>
                                    <p className="text-sm text-neutral-500 mb-2">
                                        {pub.authors.map((author, idx) => (
                                            <span key={idx}>
                                                <span className={author.isHighlighted ? 'font-semibold text-primary' : ''}>
                                                    {author.name}
                                                </span>
                                                {author.isCorresponding && (
                                                    <sup className="ml-0 text-neutral-500">†</sup>
                                                )}
                                                {idx < pub.authors.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </p>

                                    {pub.description && (
                                        <p className="text-sm text-neutral-500 italic mb-3 line-clamp-3">
                                            {pub.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {pub.url && (
                                            <a
                                                href={pub.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={chipClass(false)}
                                            >
                                                Paper
                                            </a>
                                        )}
                                        {pub.bibtex && (
                                            <button
                                                onClick={() => setExpandedBibtexId(expandedBibtexId === pub.id ? null : pub.id)}
                                                className={chipClass(expandedBibtexId === pub.id)}
                                            >
                                                BibTeX
                                            </button>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {expandedBibtexId === pub.id && pub.bibtex ? (
                                            <motion.div
                                                key="bibtex"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden mt-4"
                                            >
                                                <div className="relative bg-neutral-50 p-4 rounded-md border border-neutral-200">
                                                    <pre className="text-xs text-neutral-600 overflow-x-auto whitespace-pre-wrap font-mono">
                                                        {pub.bibtex}
                                                    </pre>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(pub.bibtex || '');
                                                        }}
                                                        className="absolute top-2 right-2 p-1.5 rounded-md bg-background text-neutral-500 hover:text-accent border border-neutral-200 transition-colors"
                                                        title="Copy to clipboard"
                                                    >
                                                        <ClipboardDocumentIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : null}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.article>
                    ))
                )}
            </div>
        </motion.div>
    );
}
