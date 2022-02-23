//
interface observerAppearanceProps {
    elm: Element;
    options?: IntersectionObserverInit;
    data_appearance?: string;
}

//
export const observerAppearance = ({
    elm,
    options,
    data_appearance = 'data-appearance'
}: observerAppearanceProps) => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.setAttribute(data_appearance, '1');
                observer.unobserve(target);
            } else {
                if (target.getAttribute(data_appearance)) {
                    target.removeAttribute(data_appearance);
                    observer.unobserve(target);
                }
            }
        });
    }, options);

    observer.observe(elm);
};
