//
interface observerStickyProps {
    fake_elm: Element;
    fake_bottom?: number;
    options?: IntersectionObserverInit;

    callbackOver: () => void;
    callbackNotOver: () => void;
}

//
export function observerSticky({
    fake_elm,
    fake_bottom = 0,
    options,

    callbackOver,
    callbackNotOver
}: observerStickyProps) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.boundingClientRect.bottom <= fake_bottom) {
                callbackOver();
            } else {
                callbackNotOver();
            }
        }, options);
    });

    observer.observe(fake_elm);

    return observer;
}
