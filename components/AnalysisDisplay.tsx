
import React, { useState, useEffect } from 'react';

interface AnalysisDisplayProps {
    content: string | null;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ content }) => {
    const [visibleContent, setVisibleContent] = useState(content);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        if (content !== visibleContent) {
            setIsFading(true);
            setTimeout(() => {
                setVisibleContent(content);
                setIsFading(false);
            }, 300);
        }
    }, [content, visibleContent]);


    return (
        <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            {visibleContent ? (
                <div dangerouslySetInnerHTML={{ __html: visibleContent }} />
            ) : (
                <div className="text-center text-gray-500 py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Inicia tu análisis</h3>
                    <p className="mt-1 text-sm text-gray-500">Selecciona una perspectiva teórica y un caso de estudio.</p>
                </div>
            )}
        </div>
    );
};

export default AnalysisDisplay;
