import clsx from 'clsx';
import "./test.css";

interface BackgroundTestP {
    className?: string
}

const BackgroundTestP: React.FC<BackgroundTestP> = ({className}) => {
    return (
        <>
            <div className={clsx(className, "min-h-screen repeating-background")}>
    
            </div>
        </>
    )
};

export default BackgroundTestP;