import TransactionStatus from "./TransactionStatus";

const tableContent = [
    { id: 16885373, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'paid', action: 'Details' },
    { id: 29698788, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Seller', status: 'pending', action: 'Details' },
    { id: 36576563, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'cancelled', action: 'Details' },
    { id: 46862533, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'refunded', action: 'Details' },
    { id: 46334531, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'created', action: 'Details' },
    { id: 46834957, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'funded', action: 'Details' },
    { id: 46856234, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'in dispute', action: 'Details' },
    { id: 46856545, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'expired', action: 'Details' },
];

export default function TransactionTable() {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Transaction Title</th>
                        <th>Created On</th>
                        <th>Amount</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Dynamically render rows */}
                    {tableContent.map((item) => (
                        <tr key={item.id} className="hover">
                            <th>{item.id}</th>
                            <td>{item.title}</td>
                            <td>{item.created}</td>
                            <td>{item.amount}</td>
                            <td>{item.role}</td>
                            <td><TransactionStatus status={item.status}/></td>
                            <td className="font-semibold text-center shadow-xs text-green-700 text-sm rounded-md py-1 px-1 cursor-pointer hover:bg-teal-600 hover:text-white">{item.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}