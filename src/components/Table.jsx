import React, { useMemo } from 'react';

const Table = ({prof}) => {
  
    return (
        <div className="w-full overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full ">
                <table className="min-w-full ">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Nom</th>
                        <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Date</th>
                        <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Horraire</th>
                        <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">Lieu</th>
                    </tr>
                </thead>
                <tbody className="bg-indigo-900 divide-y divide-gray-200">
                    <tr>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {examsName.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 font-semibold'>{name}</li>
                        ))}
                        </ul>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    );
  };
  
  export default Table;
  