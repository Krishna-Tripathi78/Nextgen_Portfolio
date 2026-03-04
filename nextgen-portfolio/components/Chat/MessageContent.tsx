interface MessageContentProps {
    content: string;
    isUser: boolean;
}

export function MessageContent({ content, isUser }: MessageContentProps) {
    if (isUser) {
        return <p className="text-sm whitespace-pre-wrap">{content}</p>;
    }

    // Parse markdown-style formatting
    const formatText = (text: string) => {
        const parts: React.ReactNode[] = [];
        let currentIndex = 0;
        let key = 0;

        // Split by lines first to handle bullet points
        const lines = text.split('\n');

        lines.forEach((line, lineIndex) => {
            // Check if line is a bullet point
            const bulletMatch = line.match(/^[•\-\*]\s*\*\*(.*?)\*\*(.*)$/);
            if (bulletMatch) {
                parts.push(
                    <div key={`line-${lineIndex}`} className="flex gap-2 mb-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <div>
                            <span className="font-bold text-slate-900 dark:text-slate-50">
                                {bulletMatch[1]}
                            </span>
                            <span className="text-slate-700 dark:text-slate-200">
                                {bulletMatch[2]}
                            </span>
                        </div>
                    </div>
                );
                return;
            }

            // Handle regular bold text in the line
            let lineContent = line;
            const boldRegex = /\*\*(.*?)\*\*/g;
            let match;
            let lastIndex = 0;
            const lineParts: React.ReactNode[] = [];

            while ((match = boldRegex.exec(lineContent)) !== null) {
                // Add text before bold
                if (match.index > lastIndex) {
                    lineParts.push(
                        <span key={`text-${key++}`}>
                            {lineContent.substring(lastIndex, match.index)}
                        </span>
                    );
                }
                // Add bold text
                lineParts.push(
                    <strong
                        key={`bold-${key++}`}
                        className="font-bold text-slate-900 dark:text-slate-50"
                    >
                        {match[1]}
                    </strong>
                );
                lastIndex = match.index + match[0].length;
            }

            // Add remaining text
            if (lastIndex < lineContent.length) {
                lineParts.push(
                    <span key={`text-${key++}`}>{lineContent.substring(lastIndex)}</span>
                );
            }

            if (lineParts.length > 0) {
                parts.push(
                    <p key={`line-${lineIndex}`} className="mb-2 last:mb-0">
                        {lineParts}
                    </p>
                );
            } else if (line.trim()) {
                parts.push(
                    <p key={`line-${lineIndex}`} className="mb-2 last:mb-0">
                        {line}
                    </p>
                );
            }
        });

        return parts.length > 0 ? parts : <p>{text}</p>;
    };

    return (
        <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {formatText(content)}
        </div>
    );
}
