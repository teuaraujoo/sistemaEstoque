import StatsCard from '../components/Dashboard/StatsCard';
import VendasGrid from '../components/Dashboard/VendasGrid';
import MovesGrid from '../components/Dashboard/MovesGrid';

function Dashboard() {

   
    return (
        <div className="bg-gray-300 min-h-full p-4">
            <StatsCard />
            <div className="flex gap-10">
                <VendasGrid />
                <MovesGrid />
            </div>
        </div>
    )
}

export default Dashboard;