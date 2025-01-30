const tableContent = [
    { id: 1, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'Pending', action: 'Details' },
    { id: 2, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'Pending', action: 'Details' },
    { id: 3, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'Pending', action: 'Details' },
    { id: 4, title: 'Buy Car', created: 'Oct 26, 2024', amount: 200000, role: 'Buyer', status: 'Pending', action: 'Details' },
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
                            <td>{item.status}</td>
                            <td className="font-semibold text-center shadow-xs text-green-700 text-sm rounded-md py-1 px-1 cursor-pointer hover:bg-teal-600 hover:text-white">{item.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}