import { ElmOptionsObserver } from '../types/common';

//
interface observeToDoProps extends ElmOptionsObserver {
    when_over: boolean;
    callback: () => void;
}

//
export function observeToDo({
    elm,
    when_over = false,
    callback,

    options = {
        root: null,
        rootMargin: `500px`,
        threshold: 0
    }
}: observeToDoProps) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (
                entry.isIntersecting ||
                (when_over && entry.boundingClientRect.bottom <= 0)
            ) {
                callback();
                observer.unobserve(entry.target);
            }
        });
    }, options);

    observer.observe(elm);
}
