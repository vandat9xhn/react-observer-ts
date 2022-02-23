import { ElmOptionsObserver } from '../types/common';

//
interface observeVirtualScrollProps extends ElmOptionsObserver {
    handleIsIntersecting: (isIntersecting: boolean) => void;
}

//
export function observeVirtualScroll({
    elm,
    options = { rootMargin: '500px 0' },
    handleIsIntersecting
}: observeVirtualScrollProps) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.boundingClientRect.height) {
                handleIsIntersecting(entry.isIntersecting);
            }
        });
    }, options);

    observer.observe(elm);
}
