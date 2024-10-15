import clsx from 'clsx';

interface DashboardOverviewProps {
    className?: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({className}) => {
    return(
        <section id="overview" className={clsx(className)}>
            <div className='flex flex-col'>
                <p className='text-base text-gray-600'>Vue d'ensemble</p>
                <p className='text-3xl text-black text-left'>Résumé de mes services</p>
                <p className='text-sm text-gray-500'>Choisissez un domaine à configurer</p>
                {/** News header 2 ? */}
                {/** Pull out infos */}
                
            </div>
        </section>
    )
}

export default DashboardOverview;