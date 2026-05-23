
import Link from "next/link";
import Image from "next/image";
import {
    Button,
    Card,
    Chip,
    Pagination,
} from "@heroui/react";
import {
    PawPrint,
    Eye,
    Trash2,
    Clock,
    CheckCircle,
    XCircle,
    Calendar,
    Heart,
} from "lucide-react";
import RequestTableRow from "@/components/RequestTableRow";
import { geRequestsById } from "@/lib/pets/data";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";


const MyRequestsPage = async () => {
    // const [requests, setRequests] = useState(myRequestsData);
    // const [currentPage, setCurrentPage] = useState(1);
    // const rowsPerPage = 5;
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userId = session?.user?.id

    const { token } = await auth.api.getToken({
        headers: await headers(), 
    });

    const Requests = await geRequestsById(userId, token);

    // Pagination logic
    // const totalPages = Math.ceil(requests.length / rowsPerPage);
    // const startIndex = (currentPage - 1) * rowsPerPage;
    // const endIndex = startIndex + rowsPerPage;
    // const currentRequests = requests.slice(startIndex, endIndex);

    // Stats calculations
    const totalRequests = Requests.length;
    const pendingRequests = Requests.filter(req => req.status === "pending").length;
    const approvedRequests = Requests.filter(req => req.status === "approved").length;
    const rejectedRequests = Requests.filter(req => req.status === "rejected").length;

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                        <PawPrint size={24} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        My Requests
                    </h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    View and manage all your adoption requests
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalRequests}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                            <PawPrint size={24} className="text-teal-600 dark:text-teal-400" />
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{pendingRequests}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                            <Clock size={24} className="text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{approvedRequests}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{rejectedRequests}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                            <XCircle size={24} className="text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Requests Table - Simple div-based table */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Heart size={18} className="text-teal-500" />
                        All Adoption Requests
                    </h2>

                    {/* Table Header */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr className="text-left">
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">PET NAME</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">REQUEST DATE</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">PICKUP DATE</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">STATUS</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Requests.map((request) => (
                                    <RequestTableRow key={request._id} request={request} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {/* {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <Pagination
                                total={totalPages}
                                page={currentPage}
                                onChange={setCurrentPage}
                                color="primary"
                                variant="bordered"
                                radius="full"
                            />
                        </div>
                    )} */}
                </div>
            </Card>

            {/* Empty State - No Requests */}
            {Requests.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Heart size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No Adoption Requests Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You haven&apos;t submitted any adoption requests yet.
                    </p>
                    <Button className="bg-linear-to-r from-teal-600 to-emerald-500 text-white">
                        <Link href="/all-pets">
                            Browse Pets
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MyRequestsPage;