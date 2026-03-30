import StatsCard from '../components/Dashboard/statsCard';
import VendasGrid from '../components/Dashboard/VendasGrid';

function Dashboard() {

    return (
        <div className="bg-gray-300 min-h-full p-4">
            <StatsCard />
            <VendasGrid />
        </div>
    )
}

export default Dashboard;