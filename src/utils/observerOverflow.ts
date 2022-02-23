import { ElmOptionsObserver } from '../types/common';

//
interface observerOverflowProps extends ElmOptionsObserver {
    detectOverflow: ({
        entry
    }: {
        entry: IntersectionObserverEntry;
    }) => boolean;

    callbackOverflow: ({
        entry,
        observer
    }: {
        entry: IntersectionObserverEntry;
        observer: IntersectionObserver;
    }) => void;
}

//
export function observerOverflow({
    elm,
    options,
    detectOverflow,
    callbackOverflow,
}: observerOverflowProps) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (detectOverflow({ entry: entry })) {
                callbackOverflow({ entry: entry, observer: observer });
            }
        }, options);
    });

    observer.observe(elm);
}
