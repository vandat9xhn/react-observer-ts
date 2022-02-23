import { ElmOptionsObserver } from '../types/common';

//
interface observerDisplayProps extends ElmOptionsObserver {
    callbackDisplay: () => void;
    callbackNoDisplay: () => void;
}

//
export function observerDisplay({
    elm,
    options,
    callbackDisplay = () => {},
    callbackNoDisplay = () => {},
}: observerDisplayProps) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                callbackDisplay();
            } else {
                callbackNoDisplay();
            }
        }, options);
    });

    observer.observe(elm);
}
