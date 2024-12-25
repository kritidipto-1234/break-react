import { useRef, useState, useEffect } from "react";
//custom implementation of react.memo

//forwardRef
const ReactMemo = <T extends React.ComponentType<any>>(
  Component: T,
  areEqual?: (prevProps: Readonly<React.ComponentProps<T>>, nextProps: Readonly<React.ComponentProps<T>>) => boolean
) => {

    function shallowEqual(prevProps: Readonly<React.ComponentProps<T>>, nextProps: Readonly<React.ComponentProps<T>>) {
        for (const key in prevProps) {
            if (prevProps[key] !== nextProps[key]) {
                return false;
            }
        }


        for (const key in nextProps) {
            if (prevProps[key] !== nextProps[key]) {
                return false;
            }
        }
        return true;
    }

    function MemoisedComponenet(props: React.ComponentProps<T>) {
        const prevProps = useRef<React.ComponentProps<T> | undefined>(undefined);
        const cachedComponent = useRef<React.ReactNode | undefined>(undefined);


        if (prevProps.current){
            if (areEqual && areEqual(prevProps.current, props)){
                return cachedComponent.current;
            }
            else if (!areEqual && shallowEqual(prevProps.current, props)){
                return cachedComponent.current;
            }
        }
        
        prevProps.current = props;
        cachedComponent.current = <Component {...props} />;

        return cachedComponent.current;
    }
    return MemoisedComponenet;
};

export default ReactMemo;

//watch
// https://www.youtube.com/watch?v=m4QbeS9BTNU

