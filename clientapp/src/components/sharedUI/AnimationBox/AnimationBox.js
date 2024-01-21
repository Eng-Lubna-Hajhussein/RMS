import React, { useState, useEffect, useRef } from 'react';
import styles from './AnimationBox.module.css';


/**
 * AnimationBox Component.
 * 
 * @param {{
 *   type: 'fadeIn' | 'fadeOut' | 'fadeInGrow' | 'fadeOutGrow' | 'slideIn' | 'slideOut' | 'grow' | 'slideInRotate' | 'slideOutRotate'  | 'fadeOutSlideOut' | 'wobble' | 'hinge' | 'flip' | 'flipInX' | 'flipOutX' | 'flipInY' | 'flipOutY' | 'rollIn' | 'rollOut' | 'rotateIn' | 'rotateOut' | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight' | 'slideOutUp' | 'slideOutDown' | 'slideOutLeft' | 'slideOutRight',
 *   easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | [other CSS timing functions],
 *   trigger: 'auto' | 'manual',
 *   forceTrigger: boolean,
 *   animationMode: 'forward' | 'loop' | 'reverse'
 * }} props The properties.
 */

const AnimationBox = ({
    children,
    type,
    duration = '1s',
    delay = '1s',
    easing = 'linear',
    trigger = 'auto',
    forceTrigger = false,
    animationMode = 'forward'
}) => {
    const [active, setActive] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);
    const animationRef = useRef(null);

    useEffect(() => {
        if (trigger === "manual" && forceTrigger) {
            setActive(true);
        }
    }, [forceTrigger, trigger]);

    const computedClass = active ? styles[`animation-${type}`] : '';

    let initialStyles = {};
    if (type.includes("fadeIn") || type.includes("flash") || type === "rotateIn") {
        initialStyles.opacity = 0;
    }
    if (type.includes("slideIn") || type.includes("swing") || type.includes("jello") || type.includes("flipIn") || type.includes("rollIn")) {
        initialStyles.transform = 'translateX(-100%)';
    }
    if (type.includes("grow") || type.includes("rubberBand")) {
        initialStyles.transform = 'scale(0)';
    }
    if (type.includes("bounce") || type.includes("pulse")) {
        initialStyles = {};
    }


    let animationDirection = 'normal';
    let animationIterationCount = '1';

    if (animationMode === 'loop') {
        animationIterationCount = 'infinite';
    } else if (animationMode === 'reverse') {
        animationDirection = 'alternate';
        animationIterationCount = 'infinite';
    }

    useEffect(() => {
        const node = animationRef.current;
        if (node) {
            node.addEventListener('animationend', handleAnimationEnd);
            return () => {
                node.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, [type, animationMode]);

    const handleAnimationEnd = (e) => {
        if ((
            type.includes('slideOut') ||
            type.includes('SlideOut') ||
            type.includes('fadeOut') ||
            type.includes("flash") ||
            type.includes("swing") ||
            type.includes("rubberBand") ||
            type.includes("hinge") ||
            type.includes("flipOut") ||
            type.includes("rollOut") ||
            type.includes("rotateOut")

        )
            && animationMode === "forward") {
            setShouldRender(false);
        }
    };

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (trigger === 'auto') {
                    if (entry.isIntersecting) {
                        setActive(true);
                    } else {
                        setActive(false);
                    }
                } else if (trigger === 'manual' && forceTrigger && entry.isIntersecting) {
                    setActive(true);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: [0, 1]
        });

        if (animationRef.current) {
            observer.observe(animationRef.current);
        }

        return () => {
            if (animationRef.current) {
                observer.unobserve(animationRef.current);
            }
        };
    }, [animationRef, trigger, forceTrigger]);


    return (
        <React.Fragment>
            {type==='none'?<React.Fragment>{children}</React.Fragment>: (shouldRender && (
                <div className={styles.overflowContainer} style={{textAlign:"left"}}>
                    <div
                        ref={animationRef}
                        className={computedClass}
                        style={{
                            ...initialStyles,
                            animationDuration: duration,
                            animationDelay: delay,
                            animationTimingFunction: easing,
                            animationDirection: animationDirection,
                            animationIterationCount: animationIterationCount
                        }}
                    >
                        {children}
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
};

export default React.memo(AnimationBox);

