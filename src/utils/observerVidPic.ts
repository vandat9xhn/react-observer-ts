//
interface observerVidPicProps {
    elements: (HTMLVideoElement | HTMLImageElement)[];
    options?: IntersectionObserverInit;
    callback: () => void;
}

//
export function observerVidPic({
    elements,
    callback = () => {},
    options = {
        threshold: 0
    }
}: observerVidPicProps) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target as typeof elements[0];

                if (target.dataset.src) {
                    target.src = target.dataset.src;
                    target.removeAttribute('data-src');
                    observer.unobserve(target);
                    callback();
                }
            }
        });
    }, options);

    elements.forEach((element) => {
        element && observer.observe(element);
    });
}
