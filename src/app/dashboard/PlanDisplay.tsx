import { UserInterface } from "@/lib/interfaces";
import clsx from 'clsx';

interface PlanDisplayProps {
    className?: string,
    userDetail?: UserInterface
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({className, userDetail}) => {
    return(
        <div className={clsx(className)}>

        </div>
    )
}

export default PlanDisplay;