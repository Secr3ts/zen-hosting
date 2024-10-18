import clsx from 'clsx';
import useSWR, { mutate } from 'swr';
import { UserInterface } from '@/lib/interfaces';
import NoPlan from './NoPlan';
import PlanDisplay from './PlanDisplay';

interface DashboardOverviewProps {
    className?: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ className }) => {
    const fetcher = (url: string) => fetch(url, { method: 'GET' }).then(res => res.json());

    const { data, error, isLoading } = useSWR('/api/userDetail', fetcher); 

    return (
        <section id="overview" className={clsx(className)}>
            <div className='flex flex-col gap-1'>
                <p className='text-base text-gray-600'>Vue d'ensemble
                    <br />
                    <span className='text-3xl text-black text-left'>Résumé de mon offre</span>
                    <br />
                    <span className='text-sm text-gray-500'>Choisissez un service à configurer</span>
                </p>
                {/** News header 2 ? */}
                {/** Pull out infos */}
                <div className='gap-2 text-black'>
                    {
                        data && <div>{data.subscriptionPlan ? <PlanDisplay /> : <NoPlan /> }</div>
                    }
                </div>
            </div>
        </section>
    )
}

export default DashboardOverview;